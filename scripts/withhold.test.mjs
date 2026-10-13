import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { sharesPhrase, withhold } from './withhold.mjs';
import { scanText } from './scan.mjs';

const WIDTH = 16;
const index = (...sentences) => {
  const set = new Set();
  for (const s of sentences) {
    const w = s.toLowerCase().match(/[\p{L}\p{N}]+/gu);
    for (let i = 0; i + 8 <= w.length; i++) set.add(createHash('sha256').update(w.slice(i, i + 8).join(' ')).digest('hex').slice(0, WIDTH));
  }
  return set;
};
const SECRET = 'quartz lanterns drift over nine silent copper harbours at dusk';
const phrases = index(SECRET);
const tool = 'cl' + 'aude';

test('a clean page is returned unchanged', () => {
  const text = '# Title\n\nStart the job.\n\n- step one\n- step two\n';
  assert.deepEqual(withhold(text, phrases, WIDTH), { text, withheld: 0 });
});

test('a line with a restricted phrase is withheld and the rest kept', () => {
  const body = Array.from({ length: 10 }, (_, i) => `Ordinary line number ${i} of this runbook.`).join('\n');
  const r = withhold(`${body}\nNote: ${SECRET}.\nLast line.`, phrases, WIDTH);
  assert.equal(r.withheld, 1);
  assert.ok(r.text.includes('[withheld]') && r.text.includes('Last line.') && !r.text.includes('quartz'));
  assert.equal(sharesPhrase(r.text, phrases, WIDTH), false);
});

test('a phrase split over two lines withholds both', () => {
  const body = Array.from({ length: 10 }, (_, i) => `Ordinary line number ${i}.`).join('\n');
  const r = withhold(`${body}\nquartz lanterns drift over nine\nsilent copper harbours at dusk\nend`, phrases, WIDTH);
  assert.equal(r.withheld, 2);
  assert.equal(r.text.split('\n').filter((l) => l === '[withheld]').length, 1, 'one marker for the run');
});

test('banned wording and addresses are withheld by line', () => {
  const body = Array.from({ length: 10 }, (_, i) => `Ordinary line number ${i}.`).join('\n');
  const r = withhold(`${body}\nAsk ${tool} to do it.\nssh to 10.1.2.3 now\nloopback 127.0.0.1 is fine`, phrases, WIDTH);
  assert.equal(r.withheld, 2);
  assert.ok(r.text.includes('127.0.0.1') && !r.text.includes('10.1.2.3') && !r.text.toLowerCase().includes(tool));
});

test('a table row is replaced by a row', () => {
  const body = Array.from({ length: 10 }, (_, i) => `| row ${i} | fine |`).join('\n');
  const r = withhold(`| a | b |\n|---|---|\n${body}\n| host | 10.9.8.7 |`, phrases, WIDTH);
  assert.ok(r.text.endsWith('| [row withheld] |'));
});

test('a page that would lose most of its lines is dropped', () => {
  const r = withhold(`Ask ${tool}.\nAsk ${tool} again.\nOne fine line.`, phrases, WIDTH);
  assert.ok(r.dropped);
});

test('the scanner flags what it should and spares what it should', () => {
  assert.equal(scanText('f', 'A plain sentence about paper trading.').length, 0);
  assert.equal(scanText('f', 'version 16.17.1 and 2026-10-13').length, 0);
  assert.ok(scanText('f', 'acct DU' + '1234567').length > 0);
  assert.ok(scanText('f', 'mail someone' + '@' + 'example.org').length > 0);
});
