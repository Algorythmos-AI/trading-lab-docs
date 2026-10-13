#!/usr/bin/env node
// Copies design records and runbooks from the platform repositories, and writes the changelog, at each
// repository's origin/main. Reads only the paths listed here. Writes:
//   content/docs/<section>/records/*.md, content/docs/<section>/runbooks/*.md   copied, never edited here
//   content/docs/changelog.md                                                    generated
//   sync.lock.json                                                               which commit each came from
// `node scripts/sync.mjs --check` writes nothing and exits 1 when a source has moved since the last sync.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join, posix } from 'node:path';
import { scanText } from './scan.mjs';
import { FACT_PATHS, writeFacts } from './facts.mjs';
import { sharesPhrase, withhold } from './withhold.mjs';

const root = new URL('..', import.meta.url).pathname;
const clones = process.env.DOCS_CLONES ?? join(homedir(), 'Code/platforms');
const SOURCES = [
  { section: 'forex-hft', repo: 'hft-lab', clone: 'hft-lab', label: 'Forex HFT' },
  { section: 'crypto', repo: 'crypto-lab', clone: 'crypto-lab', label: 'Crypto' },
  { section: 'stocks-options', repo: 'trading-lab-research', clone: '_monorepo-read', label: 'Stocks & Options' },
];
// The only paths this script may read from a platform repository.
const KINDS = [
  { dir: 'docs/adr', out: 'records', title: 'Design records', blurb: 'Each records one decision and why. Copied; change the source, then sync.' },
  { dir: 'docs/runbooks', out: 'runbooks', title: 'Runbooks', blurb: 'Step-by-step instructions for one operation or one incident. Copied; change the source, then sync.' },
];
const CHANGELOG_REPOS = [...SOURCES.map((s) => ({ repo: s.repo, label: s.label })), { repo: 'trading-kb', label: 'Knowledge Base' }];

const check = process.argv.includes('--check');
const today = new Date().toISOString().slice(0, 10);
const git = (clone, ...args) =>
  execFileSync('git', ['-C', join(clones, clone), ...args], { encoding: 'utf8', maxBuffer: 1 << 28 });

const lockPath = join(root, 'sync.lock.json');
const lock = existsSync(lockPath) ? JSON.parse(readFileSync(lockPath, 'utf8')) : { sources: {} };

if (check) {
  let moved = 0;
  for (const s of SOURCES) {
    git(s.clone, 'fetch', '-q', 'origin', 'main');
    const now = git(s.clone, 'rev-parse', 'origin/main').trim();
    const was = lock.sources[s.repo]?.sha;
    if (now !== was) {
      // Only a change under the copied paths, or under a path the generated facts read, makes them stale.
      const changed = was ? git(s.clone, 'diff', '--name-only', was, now, '--', ...new Set([...KINDS.map((k) => k.dir), ...FACT_PATHS[s.repo]])).trim() : 'never synced';
      if (changed) {
        moved++;
        console.log(`${s.repo}: watched paths changed since ${was?.slice(0, 7) ?? 'never'}:\n  ${changed.split('\n').join('\n  ')}`);
      }
    }
  }
  console.log(moved ? `\n${moved} source(s) moved. Run: node scripts/sync.mjs` : `copies are current (synced ${lock.synced_on})`);
  process.exit(moved ? 1 : 0);
}

// The private phrase index (see build-leak-index.mjs). A copied file or a pull-request title that shares a run
// of 8 words with restricted material is left out here, before the gate would refuse it.
const idxPath = process.env.DOCS_LEAK_CORPUS ?? join(root, '.leak/corpus.idx');
if (!existsSync(idxPath)) {
  console.error(`phrase index not found at ${idxPath}. Run: node scripts/build-leak-index.mjs`);
  process.exit(2);
}
const phrases = new Set(readFileSync(idxPath, 'utf8').split('\n').filter((l) => l && !l.startsWith('#')));
const width = [...phrases][0].length;
const restricted = (text) => sharesPhrase(text, phrases, width);

// Everything that needs the network is fetched before any file is written, so a timeout leaves the tree as it was.
const prLists = {};
for (const r of CHANGELOG_REPOS) {
  // The network to GitHub drops now and then; three tries, then fail with nothing written.
  for (let attempt = 1; ; attempt++) {
    try {
      const out = execFileSync('gh', ['pr', 'list', '-R', `Algorythmos-AI/${r.repo}`, '--state', 'merged', '--limit', '500', '--json', 'number,title,mergedAt'], { encoding: 'utf8', maxBuffer: 1 << 26, stdio: ['ignore', 'pipe', 'pipe'] });
      prLists[r.repo] = JSON.parse(out);
      break;
    } catch (e) {
      if (attempt === 3) throw new Error(`could not list pull requests of ${r.repo}: ${String(e.stderr ?? e.message).trim().split('\n').pop()}`);
    }
  }
}
for (const extra of ['trading-kb', '.github-private']) git(extra, 'fetch', '-q', '--tags', 'origin', 'main');

const yaml = (s) => JSON.stringify(s.replace(/\s+/g, ' ').trim());
const leftOut = [];
const redacted = [];
const newLock = { synced_on: today, sources: {} };

for (const s of SOURCES) {
  git(s.clone, 'fetch', '-q', 'origin', 'main');
  const sha = git(s.clone, 'rev-parse', 'origin/main').trim();
  const short = sha.slice(0, 7);
  newLock.sources[s.repo] = { sha, files: 0 };

  // Every file that will exist after the copy, so links between copied pages can be kept.
  const plan = [];
  for (const k of KINDS) {
    const files = git(s.clone, 'ls-tree', '-r', '--name-only', 'origin/main', k.dir).split('\n').filter((f) => f.endsWith('.md'));
    for (const f of files) {
      if (posix.relative(k.dir, f).includes('/')) continue; // top level of the folder only
      plan.push({ kind: k, src: f, name: basename(f).toLowerCase() === 'readme.md' ? null : basename(f) });
    }
  }
  // Decide first which files are left out, so no kept page links to one that is not there. A page is kept with
  // its offending lines withheld; it is left out whole only when too much of it would go.
  for (const p of plan.filter((x) => x.name)) {
    const r = withhold(git(s.clone, 'show', `origin/main:${p.src}`), phrases, width);
    if (r.dropped) {
      leftOut.push({ repo: s.repo, file: p.src, why: r.dropped });
      p.name = null;
      continue;
    }
    p.text = r.text;
    p.withheld = r.withheld;
    if (r.withheld) redacted.push({ repo: s.repo, file: p.src, lines: r.withheld });
  }
  const kept = new Map(plan.filter((p) => p.name).map((p) => [p.src, `/${s.section}/${p.kind.out}/${p.name.replace(/\.md$/, '')}`]));

  for (const k of KINDS) {
    const outDir = join(root, 'content/docs', s.section, k.out);
    rmSync(outDir, { recursive: true, force: true });
    const rows = [];
    for (const p of plan.filter((x) => x.kind === k && x.name)) {
      let text = p.text;
      const h1 = text.match(/^#\s+(.+)$/m);
      const title = (h1 ? h1[1] : p.name.replace(/\.md$/, '')).replace(/[`*_]/g, '');
      if (h1) text = text.replace(h1[0], '').replace(/^\s+/, '');
      // A link to another copied page keeps working; any other relative link becomes plain text with its path.
      text = text.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)([^)]*)\)/g, (all, bang, label, target) => {
        if (/^(https?:|mailto:|#)/.test(target)) return all;
        const [path, hash] = target.split('#');
        const resolved = posix.normalize(posix.join(dirname(p.src), path));
        const to = kept.get(resolved);
        if (to && !bang) return `[${label}](${to}${hash ? '#' + hash : ''})`;
        return `${label} (\`${resolved}\`)`;
      });
      const note = p.withheld ? `> ${p.withheld} line(s) of the source are withheld on this page and marked \`[withheld]\`. Read the file in its repository for the rest.\n\n` : '';
      const front = `---\ntitle: ${yaml(title)}\ndescription: ${yaml(`Copied from ${s.repo}@${short} (${p.src}) on ${today}. Do not edit here.`)}\n---\n\n${note}`;
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, p.name), front + text);
      rows.push(`| [${title.replace(/\|/g, '\\|')}](/${s.section}/${k.out}/${p.name.replace(/\.md$/, '')}) | \`${p.src}\` |`);
      newLock.sources[s.repo].files++;
    }
    if (rows.length) {
      writeFileSync(
        join(outDir, 'index.md'),
        `---\ntitle: ${k.title}\ndescription: ${yaml(`${rows.length} copied from ${s.repo}@${short} on ${today}.`)}\n---\n\n${k.blurb}\n\n| Title | Source |\n|---|---|\n${rows.join('\n')}\n`,
      );
      writeFileSync(join(outDir, 'meta.json'), JSON.stringify({ title: k.title, defaultOpen: false, pages: ['index', '...'] }, null, 2) + '\n');
    }
  }
}

// Changelog: merged pull requests by week. Titles and dates only.
const weekOf = (iso) => {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
};
const weeks = new Map();
let total = 0;
let withheld = 0;
for (const r of CHANGELOG_REPOS) {
  for (const pr of prLists[r.repo]) {
    const w = weekOf(pr.mergedAt);
    if (!weeks.has(w)) weeks.set(w, new Map());
    const byRepo = weeks.get(w);
    if (!byRepo.has(r.label)) byRepo.set(r.label, []);
    byRepo.get(r.label).push(pr);
    total++;
  }
}
const line = (pr) => {
  const banned = scanText('title', pr.title, { shapes: false }).length > 0;
  if (banned || restricted(pr.title)) return `- ${pr.mergedAt.slice(0, 10)} · #${pr.number} · *(title withheld)*\n`;
  return `- ${pr.mergedAt.slice(0, 10)} · #${pr.number} · ${pr.title.replace(/[<>{}]/g, '').replace(/([*_`\[\]])/g, '\\$1')}\n`;
};
const renderLog = (only) => {
  let n = 0;
  let body = '';
  for (const w of [...weeks.keys()].sort().reverse()) {
    let week = '';
    for (const r of CHANGELOG_REPOS) {
      if (only && r.label !== only) continue;
      const prs = weeks.get(w).get(r.label);
      if (!prs) continue;
      n += prs.length;
      if (!only) week += `\n### ${r.label} (${prs.length})\n`;
      week += '\n' + prs.sort((a, b) => b.mergedAt.localeCompare(a.mergedAt)).map(line).join('');
    }
    if (week) body += `\n## Week of ${w}\n${week}`;
  }
  const head = `---\ntitle: Changelog\ndescription: ${yaml(`${n} merged pull requests${only ? ` in ${only}` : ''}, by week. Generated on ${today}.`)}\n---\n\nTitles and dates of merged pull requests. Weeks start on Monday (UTC).\n`;
  return head + body;
};
const log = renderLog(null);
withheld = (log.match(/\(title withheld\)/g) ?? []).length;
rmSync(join(root, 'content/docs/changelog.mdx'), { force: true });
writeFileSync(join(root, 'content/docs/changelog.md'), log);
for (const r of [...SOURCES, { section: 'knowledge-base', label: 'Knowledge Base' }]) {
  writeFileSync(join(root, 'content/docs', r.section, 'changelog.md'), renderLog(r.label));
}

// What was copied from where, and what was left out and why.
let page = `---\ntitle: Copied pages\ndescription: ${yaml(`Which commit each copied page came from, and what was left out. Generated on ${today}.`)}\n---\n\n## Sources\n\n| Repository | Commit | Files copied |\n|---|---|---|\n`;
for (const [repo, v] of Object.entries(newLock.sources)) page += `| \`${repo}\` | \`${v.sha.slice(0, 7)}\` | ${v.files} |\n`;
page += `\n## Left out\n\nA line is withheld when it carries wording the rules keep out, an address or identifier, or part of a phrase shared with restricted material. A file is left out whole only when too much of it would be withheld. Read it in its repository.\n\n| Repository | File | Why |\n|---|---|---|\n`;
for (const l of leftOut) page += `| \`${l.repo}\` | \`${l.file}\` | ${l.why} |\n`;
page += `\n## Lines withheld\n\nThese pages are copied with some lines withheld and marked. Everything else on them is the source's own text.\n\n| Repository | File | Lines withheld |\n|---|---|---|\n`;
for (const l of redacted) page += `| \`${l.repo}\` | \`${l.file}\` | ${l.lines} |\n`;
page += `\n## Changelog\n\n${withheld} pull-request title(s) are withheld for the same reasons.\n`;
mkdirSync(join(root, 'content/docs/shared'), { recursive: true });
writeFileSync(join(root, 'content/docs/shared/copied-pages.md'), page);

const shas = Object.fromEntries(Object.entries(newLock.sources).map(([repo, v]) => [repo, v.sha]));
for (const extra of ['trading-kb', '.github-private']) shas[extra] = git(extra, 'rev-parse', 'origin/main').trim();
writeFacts({ root, git, today, shas, prCounts: Object.fromEntries(Object.entries(prLists).map(([k, v]) => [k, v.length])) });
writeFileSync(join(root, 'lib/synced.json'), JSON.stringify({ synced_on: today, sources: Object.fromEntries(Object.entries(shas).map(([k, v]) => [k, v.slice(0, 7)])) }, null, 2) + '\n');

newLock.left_out = leftOut;
newLock.lines_withheld = redacted;
writeFileSync(lockPath, JSON.stringify(newLock, null, 2) + '\n');
for (const [repo, v] of Object.entries(newLock.sources)) console.log(`${repo}@${v.sha.slice(0, 7)}: ${v.files} files`);
console.log(`changelog: ${total} pull requests`);
if (redacted.length) console.log(`lines withheld in ${redacted.length} file(s): ${redacted.reduce((a, r) => a + r.lines, 0)}`);
if (leftOut.length) console.log(`left out (${leftOut.length}):\n` + leftOut.map((l) => `  ${l.repo}:${l.file}  [${l.why}]`).join('\n'));
