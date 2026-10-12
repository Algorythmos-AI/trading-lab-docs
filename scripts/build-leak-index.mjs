#!/usr/bin/env node
// Builds .leak/corpus.idx: hashes of every 8-word phrase in the material that must never appear on these
// pages. The index holds hashes only, is git-ignored, and is rebuilt whenever the sources move.
//   1. the knowledge base's own index (DOCS_KB_INDEX)
//   2. research/** of the stocks and options repository at origin/main (DOCS_MONOREPO, a local clone)
//   3. the local knowledge folder of that repository, when present (DOCS_KNOWLEDGE)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const home = homedir();
const kbIndex = process.env.DOCS_KB_INDEX ?? join(home, 'Code/platforms/trading-kb/_work/leak_corpus.idx');
const monorepo = process.env.DOCS_MONOREPO ?? join(home, 'Code/platforms/_monorepo-read');
const knowledge = process.env.DOCS_KNOWLEDGE ?? join(home, 'trading/knowledge');
const PROSE = /\.(md|txt|ya?ml)$/;

const git = (...args) => execFileSync('git', ['-C', monorepo, ...args], { encoding: 'utf8', maxBuffer: 1 << 28 });
for (const [what, p] of [['knowledge-base index', kbIndex], ['stocks and options clone', monorepo]]) {
  if (!existsSync(p)) {
    console.error(`missing ${what}: ${p}`);
    process.exit(2);
  }
}

const tmp = mkdtempSync(join(tmpdir(), 'leak-'));
try {
  git('fetch', '-q', 'origin', 'main');
  const sha = git('rev-parse', 'origin/main').trim();
  const files = git('ls-tree', '-r', '--name-only', 'origin/main', 'research').split('\n').filter((f) => PROSE.test(f));
  const inputs = [];
  for (const f of files) {
    const out = join(tmp, 'research', f);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, git('show', `origin/main:${f}`));
    inputs.push(out);
  }
  let local = 0;
  if (existsSync(knowledge)) {
    const walk = (d) => {
      for (const n of readdirSync(d)) {
        const p = join(d, n);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(md|txt)$/.test(n)) (inputs.push(p), local++);
      }
    };
    walk(knowledge);
  }
  const part = join(tmp, 'research.idx');
  execFileSync('python3', [join(root, 'scripts/leakcheck.py'), '--build-corpus', part, ...inputs], { stdio: 'inherit' });

  const hashes = new Set();
  for (const p of [kbIndex, part]) {
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const h = line.trim();
      if (h && !h.startsWith('#')) hashes.add(h);
    }
  }
  const widths = new Set([...hashes].map((h) => h.length));
  if (widths.size !== 1) throw new Error(`indexes disagree on hash width: ${[...widths]}`);
  mkdirSync(join(root, '.leak'), { recursive: true });
  writeFileSync(
    join(root, '.leak/corpus.idx'),
    `# docs leak corpus: knowledge base + research@${sha.slice(0, 12)} (${files.length} files) + ${local} local knowledge files\n` +
      [...hashes].sort().join('\n') + '\n',
  );
  // Terms: names of people and organisations that must not appear. Repository names are dropped from the
  // inherited list: that list was written for a public repository, and these pages are private.
  const termFiles = [join(dirname(kbIndex), 'leak_terms.txt'), join(dirname(kbIndex), '..', 'private-terms', 'pii_terms.txt')];
  const terms = new Set();
  for (const p of termFiles) {
    if (!existsSync(p)) throw new Error(`missing term list: ${p}`);
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const t = line.trim();
      if (t && !t.startsWith('#') && !/^(trading|hft|crypto|options)-[a-z-]+$/.test(t)) terms.add(t);
    }
  }
  writeFileSync(join(root, '.leak/terms.txt'), '# local only; never committed\n' + [...terms].join('\n') + '\n');
  console.log(`wrote .leak/terms.txt: ${terms.size} terms`);
  console.log(`wrote .leak/corpus.idx: ${hashes.size} phrases; research@${sha.slice(0, 12)}, ${files.length} files; knowledge ${local} files`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
