// Line-level withholding for copied pages. A line is withheld when it carries wording the organisation's rules
// keep out, an address or identifier, or a word of any 8-word run found in the private phrase index. The rest of
// the page is kept, so a runbook is not lost for one line. Pure functions: no file or network access.
import { createHash } from 'node:crypto';
import { scanText } from './scan.mjs';

const WORD = /[\p{L}\p{N}]+/gu;
const NGRAM = 8;
const norm = (s) => s.normalize('NFKC').toLowerCase();

/** True when the text shares a run of 8 words with the index. `phrases` holds hash prefixes of one width. */
export function sharesPhrase(text, phrases, width) {
  const words = norm(text).match(WORD) ?? [];
  for (let i = 0; i + NGRAM <= words.length; i++) {
    if (phrases.has(hash(words.slice(i, i + NGRAM), width))) return true;
  }
  return false;
}
const hash = (words, width) => createHash('sha256').update(words.join(' ')).digest('hex').slice(0, width);

function badLines(lines, phrases, width) {
  const bad = new Set();
  lines.forEach((line, i) => {
    if (scanText('', line, { strictAddresses: false }).length) bad.add(i);
  });
  const tokens = [];
  lines.forEach((line, i) => {
    for (const w of norm(line).match(WORD) ?? []) tokens.push([w, i]);
  });
  for (let i = 0; i + NGRAM <= tokens.length; i++) {
    const gram = tokens.slice(i, i + NGRAM);
    if (phrases.has(hash(gram.map((t) => t[0]), width))) for (const t of gram) bad.add(t[1]);
  }
  return bad;
}

/**
 * Returns { text, withheld } with offending lines replaced by a marker, or { dropped: reason } when the page
 * cannot be made clean or would lose more than `maxShare` of its lines.
 */
export function withhold(text, phrases, width, { maxShare = 0.4, passes = 6 } = {}) {
  let lines = text.split('\n');
  const total = lines.filter((l) => l.trim()).length || 1;
  let withheld = 0;
  for (let pass = 0; pass < passes; pass++) {
    const bad = badLines(lines, phrases, width);
    if (!bad.size) return { text: lines.join('\n'), withheld };
    withheld += bad.size;
    if (withheld / total > maxShare) return { dropped: 'too much of it would be withheld' };
    const next = [];
    lines.forEach((line, i) => {
      if (!bad.has(i)) return next.push(line);
      // One marker per run of withheld lines. A table row keeps the table's shape.
      const marker = line.trimStart().startsWith('|') ? '| [row withheld] |' : '[withheld]';
      if (next[next.length - 1] !== marker || marker.startsWith('|')) next.push(marker);
    });
    lines = next;
  }
  return { dropped: 'it could not be made clean' };
}
