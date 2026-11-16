// Generated facts: states, schedules, counts and the research register, read from structured files in the
// platform repositories at origin/main. Called by sync.mjs. Nothing here copies prose: from a research record
// it takes the id from the file name, and from its status line only a known status word and a date.
import { mkdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

// Paths whose change makes these pages stale. `sync --check` watches them.
export const FACT_PATHS = {
  'hft-lab': ['config/ops.yaml', 'research', 'docs/adr', 'docs/runbooks'],
  'crypto-lab': ['research', 'docs/adr', 'docs/runbooks'],
  'trading-lab-research': ['config/dashboard.yaml', 'src/wt/ops/schedule.py', 'research', 'docs/adr', 'docs/runbooks'],
};
// The other repositories these pages read, and exactly what is read from them. `sync --check` watches these
// files (by content, so a shallow clone is enough) and, for the knowledge base, its release tags.
export const EXTRA_SOURCES = [
  { repo: 'trading-kb', clone: 'trading-kb', files: (all) => all.filter((f) => /^collections\/[a-z]+\/kb\.lock\.json$/.test(f)), tags: true },
  { repo: 'algorythmos-handbook', clone: 'algorythmos-handbook', files: () => ['catalog.yaml'], tags: false },
];

const STATUS_WORDS = ['pre-registered', 'registered', 'proposed', 'accepted', 'rejected', 'superseded', 'withdrawn', 'failed', 'passed', 'frozen', 'closed', 'open', 'done', 'decided'];
const KIND = { HYP: 'Hypothesis', EXP: 'Experiment', DEC: 'Decision', LL: 'Lesson' };
const fm = (title, description) => `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n`;
const count = (list, dir) => list.filter((f) => f.startsWith(dir + '/') && /\/\d{4}-[^/]+\.md$|\/[a-z][^/]*\.md$/.test(f) && !/readme\.md$/i.test(f)).length;

function register(show, files) {
  const records = new Map();
  for (const f of files.filter((x) => x.startsWith('research/'))) {
    const part = f.split('/')[2] ?? '';
    const m = part.match(/^((?:[A-Z]+-)?(HYP|EXP|DEC|LL)-(?:[A-Z]+-)?\d+)/);
    if (!m) continue;
    const rec = records.get(m[1]) ?? { id: m[1], kind: KIND[m[2]], files: [] };
    rec.files.push(f);
    records.set(m[1], rec);
  }
  for (const rec of records.values()) {
    rec.status = '—';
    rec.date = '—';
    if (rec.files.some((f) => /superseded/i.test(basename(f)))) rec.status = 'superseded';
    const primary =
      rec.files.find((f) => /protocol\.md$/.test(f)) ?? rec.files.find((f) => /\.(md|ya?ml)$/.test(f) && !/report\.md$/.test(f)) ?? rec.files.find((f) => /\.md$/.test(f));
    if (!primary) continue;
    const line = show(primary).split('\n').find((l) => /status/i.test(l));
    if (!line) continue;
    const low = line.toLowerCase();
    // The word that comes first on the line, so "accepted on ... Proposed on ..." reads as accepted.
    if (rec.status === '—') {
      const first = STATUS_WORDS.map((w) => [w, low.indexOf(w)]).filter(([, i]) => i >= 0).sort((a, b) => a[1] - b[1] || b[0].length - a[0].length)[0];
      rec.status = first ? first[0] : '—';
    }
    rec.date = (line.match(/\b20\d{2}-\d{2}-\d{2}\b/) ?? ['—'])[0];
  }
  const num = (id) => Number(id.match(/(\d+)$/)[1]);
  return [...records.values()].sort((a, b) => a.kind.localeCompare(b.kind) || num(a.id) - num(b.id));
}

const registerTable = (rows) =>
  rows.length
    ? `| Id | Kind | Status | Date on its status line |\n|---|---|---|---|\n${rows.map((r) => `| \`${r.id}\` | ${r.kind} | ${r.status} | ${r.date} |`).join('\n')}\n`
    : 'No records.\n';
const tally = (rows) => Object.entries(rows.reduce((a, r) => ((a[r.kind] = (a[r.kind] ?? 0) + 1), a), {})).map(([k, n]) => `| ${k} records | ${n} |`).join('\n');

export function writeFacts({ root, git, today, shas, prCounts }) {
  const out = (section, name, text) => {
    mkdirSync(join(root, 'content/docs', section), { recursive: true });
    writeFileSync(join(root, 'content/docs', section, name), text);
  };
  const stamp = (repo) => `Generated from \`${repo}@${shas[repo].slice(0, 7)}\` on ${today}. Do not edit; run the sync.`;
  const ls = (clone) => git(clone, 'ls-tree', '-r', '--name-only', 'origin/main').split('\n').filter(Boolean);
  const show = (clone) => (path) => git(clone, 'show', `origin/main:${path}`);
  const counts = (repo, files, rows) =>
    `## Counts\n\n| | |\n|---|---|\n| Design records | ${count(files, 'docs/adr')} |\n| Runbooks | ${count(files, 'docs/runbooks')} |\n${tally(rows)}\n| Merged pull requests | ${prCounts[repo]} |\n`;

  // Forex HFT: phase states from config/ops.yaml.
  {
    const files = ls('hft-lab');
    const yaml = show('hft-lab')('config/ops.yaml');
    const block = yaml.slice(yaml.search(/^phases:/m)).split('\n').slice(1);
    const phases = [];
    for (const l of block) {
      const m = l.match(/^\s+(F\d):\s*([a-z_]+)\s*$/);
      if (!m) break;
      phases.push(m);
    }
    if (phases.length !== 8) throw new Error(`hft-lab config/ops.yaml: expected 8 phases, read ${phases.length}`);
    const rows = register(show('hft-lab'), files);
    out('forex-hft', 'facts.md',
      fm('Facts and register', 'Phase states, counts and the research register, generated from the repository.') +
      `${stamp('hft-lab')}\n\n## Phase states\n\nFrom \`config/ops.yaml\`.\n\n| Phase | State |\n|---|---|\n${phases.map((m) => `| ${m[1]} | ${m[2].replace('_', ' ')} |`).join('\n')}\n\n` +
      counts('hft-lab', files, rows) + `\n## Research register\n\nIds, statuses and dates only.\n\n${registerTable(rows)}`);
  }

  // Crypto.
  {
    const files = ls('crypto-lab');
    const rows = register(show('crypto-lab'), files);
    out('crypto', 'facts.md',
      fm('Facts and register', 'Counts and the research register, generated from the repository.') +
      `${stamp('crypto-lab')}\n\n` + counts('crypto-lab', files, rows) + `\n## Research register\n\nIds, statuses and dates only.\n\n${registerTable(rows)}`);
  }

  // Stocks & Options: gates from config/dashboard.yaml, the schedule from src/wt/ops/schedule.py.
  {
    const clone = '_monorepo-read';
    const files = ls(clone);
    const gates = [...show(clone)('config/dashboard.yaml').matchAll(/^\s+- \{id: (K0|G\d), name: "([^"]+)"[^}]*?status: ([a-z_]+)/gm)];
    if (gates.length < 7) throw new Error(`config/dashboard.yaml: expected 7 gates, read ${gates.length}`);
    const sched = show(clone)('src/wt/ops/schedule.py');
    const jobs = [];
    const starts = [...sched.matchAll(/^\s+Job\("([a-z-]+)"/gm)];
    starts.forEach((m, i) => {
      const body = sched.slice(m.index, starts[i + 1]?.index ?? sched.length);
      const et = body.match(/\bet="([^"]+)"/);
      const every = body.match(/every (\d+ minutes?[^"]*?)(?:"|,|;)/);
      jobs.push([m[1], et ? et[1] + ' New York' : every ? 'every ' + every[1].trim() : 'on an interval']);
    });
    if (!jobs.length) throw new Error('src/wt/ops/schedule.py: no jobs read');
    const rows = register(show(clone), files);
    out('stocks-options', 'facts.md',
      fm('Facts and register', 'Gate states, the job schedule, counts and the research register, generated from the repository.') +
      `${stamp('trading-lab-research')}\n\n## Gate states\n\nFrom \`config/dashboard.yaml\`.\n\n| Gate | Name | State |\n|---|---|---|\n${gates.map((g) => `| ${g[1]} | ${g[2]} | ${g[3].replace('_', ' ')} |`).join('\n')}\n\n` +
      `## Job schedule\n\nFrom \`src/wt/ops/schedule.py\`.\n\n| Job | When |\n|---|---|\n${jobs.map((j) => `| \`${j[0]}\` | ${j[1]} |`).join('\n')}\n\n` +
      counts('trading-lab-research', files, rows) + `\n## Research register\n\nIds, statuses and dates only.\n\n${registerTable(rows)}`);
  }

  // Knowledge base: counts from each collection's lock file, and tag names. Nothing else is read.
  {
    const files = ls('trading-kb').filter((f) => /^collections\/[a-z]+\/kb\.lock\.json$/.test(f));
    const rows = files.map((f) => {
      const d = JSON.parse(show('trading-kb')(f));
      return `| \`${f.split('/')[1]}\` | ${d.sources ?? '—'} | ${d.claims ?? '—'} | ${d.verified ?? '—'} |`;
    });
    const tags = git('trading-kb', 'tag', '--list').split('\n').filter(Boolean);
    out('knowledge-base', 'facts.md',
      fm('Facts', 'Collection counts and release tags, generated from the repository.') +
      `${stamp('trading-kb')}\n\n## Collections with a release\n\n| Collection | Sources | Claims | Verified |\n|---|---|---|---|\n${rows.join('\n')}\n\n## Release tags\n\n${tags.map((t) => `- \`${t}\``).join('\n')}\n`);
  }

  // Repositories: the trading entries of the organisation's catalog (algorythmos-handbook since 2026-11-09).
  {
    const cat = show('algorythmos-handbook')('catalog.yaml');
    const field = (line, k) => (line.match(new RegExp(`\\b${k}: ([A-Za-z0-9/_.-]+)`)) ?? [, '—'])[1];
    const rows = cat.split('\n').filter((l) => /^\s+- \{repo: /.test(l) && /product: (trading-lab|hft-lab|crypto-lab|trading-kb)\b/.test(l));
    if (rows.length < 6) throw new Error(`catalog.yaml: expected the trading repositories, read ${rows.length}`);
    out('shared', 'repositories.md',
      fm('Repositories', 'The trading repositories as the organisation catalog records them.') +
      `${stamp('algorythmos-handbook')}\n\n| Repository | Kind | Lifecycle | Visibility now | Intended | Data class | Planned name |\n|---|---|---|---|---|---|---|\n` +
      rows.map((l) => `| \`${field(l, 'repo').split('/')[1]}\` | ${field(l, 'kind')} | ${field(l, 'lifecycle')} | ${field(l, 'visibility')} | ${field(l, 'intended_visibility')} | ${field(l, 'data_class')} | ${field(l, 'target_name')} |`).join('\n') + '\n');
  }
}
