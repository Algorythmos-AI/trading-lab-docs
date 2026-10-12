#!/usr/bin/env node
// The gate before every push: this repository is private and runs no CI, so nothing else stands between a
// mistake and the site. Any failing step fails the whole check. Nothing is skipped silently.
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const failures = [];
const step = (name, fn) => {
  process.stdout.write(`- ${name} ... `);
  try {
    const note = fn();
    console.log(note ? `ok (${note})` : 'ok');
  } catch (e) {
    console.log('FAILED');
    failures.push(`${name}: ${e.message}`);
  }
};
const run = (cmd, args, env = {}) => {
  const r = spawnSync(cmd, args, { cwd: root, encoding: 'utf8', env: { ...process.env, ...env } });
  if (r.status !== 0) throw new Error((r.stdout + r.stderr).trim().split('\n').slice(-25).join('\n'));
  return r.stdout;
};

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', '.next', 'out', '.git', '.source', '.vercel'].includes(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}
const tracked = () =>
  execFileSync('git', ['ls-files', '-co', '--exclude-standard'], { cwd: root, encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)
    .filter((f) => existsSync(join(root, f)));
const TEXT = /\.(mdx?|tsx?|mjs|json|css|txt|ya?ml)$/;

// Words the organisation's rules keep out of every file, commit and page (decision D-016), and wording that
// implies more people than there are. Built from parts so this file does not contain the words it bans.
const BANNED = [
  ['co', 'authored', 'by'].join('-'),
  ['generated', 'with'].join(' '),
  'cl' + 'aude',
  'chat' + 'gpt',
  'open' + 'ai',
  'anth' + 'ropic',
  'co' + 'pilot',
  'our ' + 'team',
  'our ' + 'founders',
];
// Shapes of things that must never be copied in with a runbook.
const SECRET_SHAPES = [
  [/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, 'IPv4 address'],
  [/\bD[UF]\d{5,9}[A-Z]?\b/g, 'broker account id'],
  [/\bPA[0-9A-Z]{8,12}\b/g, 'paper account number'],
  [/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}\b/g, 'e-mail address'],
  [/\b(?:prj|team|dpl)_[A-Za-z0-9]{16,}\b/g, 'Vercel id'],
  [/\b(?:AKIA|PK|SK|CK)[0-9A-Z]{16,}\b/g, 'key id'],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}\b/g, 'GitHub token'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/g, 'private key'],
  [/\b[a-z][a-z0-9-]{4,28}-\d{6}\b/g, 'cloud project id'],
];
const SHAPE_SKIP = /^(pnpm-lock\.yaml|LICENSE|scripts\/(check\.mjs|leakcheck\.py)|sync\.lock\.json)$/;

export function scanText(file, text) {
  const hits = [];
  const lower = text.toLowerCase();
  for (const w of BANNED) if (lower.includes(w)) hits.push(`${file}: banned wording "${w}"`);
  if (!SHAPE_SKIP.test(file)) {
    for (const [re, what] of SECRET_SHAPES) {
      for (const m of text.matchAll(re)) hits.push(`${file}: looks like a ${what}: ${m[0].slice(0, 6)}…`);
    }
  }
  return hits;
}

const selfTest = process.argv.includes('--self-test');

step('wording and secret shapes', () => {
  const hits = [];
  let n = 0;
  for (const f of tracked()) {
    if (!TEXT.test(f) || f === 'pnpm-lock.yaml') continue;
    n++;
    hits.push(...scanText(f, readFileSync(join(root, f), 'utf8')));
  }
  if (hits.length) throw new Error('\n  ' + hits.join('\n  '));
  return `${n} files`;
});

step('scanner catches planted text', () => {
  const planted = ['see ' + 'cl' + 'aude', 'host 203.0.113.' + '7', 'acct DU' + '1234567', 'gh' + 'p_' + 'a'.repeat(36)];
  const missed = planted.filter((t) => scanText('planted.md', t).length === 0);
  if (missed.length) throw new Error(`not caught: ${missed.length} of ${planted.length}`);
});

step('restricted text (terms and 8-word phrases)', () => {
  const terms = process.env.DOCS_LEAK_TERMS ?? join(root, '.leak/terms.txt');
  const corpus = process.env.DOCS_LEAK_CORPUS ?? join(root, '.leak/corpus.idx');
  for (const [what, p] of [['term list', terms], ['phrase index', corpus]]) {
    if (!existsSync(p)) throw new Error(`${what} not found at ${p}. Run: node scripts/build-leak-index.mjs`);
  }
  // Scan the working tree as it would be committed, through a throwaway index so nothing gets staged.
  const index = join(root, '.git', 'leakcheck-index');
  const env = { GIT_INDEX_FILE: index };
  try {
    run('git', ['read-tree', '--empty'], env);
    // The lockfile is machine-written version ranges; its number runs collide with the index by chance.
    run('git', ['add', '-A', '--', '.', ':!pnpm-lock.yaml'], env);
    run('python3', ['scripts/leakcheck.py', '--repo', '.', '--terms', terms, '--corpus', corpus, '--allow', 'scripts/leakcheck-allow.txt'], env);
  } finally {
    rmSync(index, { force: true });
  }
});

if (!selfTest) {
  step('lint', () => void run('pnpm', ['-s', 'lint']));
  step('types', () => void run('pnpm', ['-s', 'typecheck']));
  step('build', () => void run('pnpm', ['-s', 'build']));
  step('links', () => {
    const out = join(root, 'out');
    const pages = [...walk(out)].filter((f) => f.endsWith('.html'));
    const exists = (href) => {
      const clean = decodeURI(href.split('#')[0].split('?')[0]).replace(/\/$/, '');
      if (clean === '') return true;
      return ['.html', '/index.html', ''].some((s) => existsSync(join(out, clean + s)));
    };
    const bad = [];
    for (const page of pages) {
      const html = readFileSync(page, 'utf8');
      for (const m of html.matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)[^"]*"/g)) {
        if (m[1].startsWith('/_next/')) continue;
        if (!exists(m[1])) bad.push(`${relative(out, page)} -> ${m[1]}`);
      }
    }
    if (bad.length) throw new Error('\n  ' + [...new Set(bad)].join('\n  '));
    return `${pages.length} pages`;
  });
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed:\n` + failures.map((f) => '* ' + f).join('\n'));
  process.exit(1);
}
console.log('\nAll checks passed.');
