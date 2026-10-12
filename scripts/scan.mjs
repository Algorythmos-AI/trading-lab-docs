// Shared by the gate (check.mjs) and the copier (sync.mjs): wording the organisation's rules keep out, and the
// shapes of things that must never be copied in with a runbook.
// Banned words are built from parts so this file does not contain the words it bans.
export const BANNED = [
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

export const SECRET_SHAPES = [
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

// Addresses that identify nothing: loopback, any-interface, and the ranges reserved for documentation.
const HARMLESS = /^(127\.0\.0\.1|0\.0\.0\.0|192\.0\.2\.\d+|198\.51\.100\.\d+|203\.0\.113\.\d+)$/;

export function scanText(file, text, { shapes = true, strictAddresses = true } = {}) {
  const hits = [];
  const lower = text.toLowerCase();
  for (const w of BANNED) if (lower.includes(w)) hits.push(`${file}: banned wording "${w}"`);
  if (shapes) {
    for (const [re, what] of SECRET_SHAPES) {
      for (const m of text.matchAll(re)) {
        if (!strictAddresses && HARMLESS.test(m[0])) continue;
        hits.push(`${file}: looks like a ${what}: ${m[0].slice(0, 6)}…`);
      }
    }
  }
  return hits;
}
