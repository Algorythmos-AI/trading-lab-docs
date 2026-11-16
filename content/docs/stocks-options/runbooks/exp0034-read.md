---
title: "EXP-0034: the one read (DEC-0051 section 8)"
description: "Copied from trading-lab-research@03b91fe (docs/runbooks/exp0034-read.md) on 2026-11-16. Do not edit here."
---

> 3 line(s) of the source are withheld on this page and marked `[withheld]`. Read the file in its repository for the rest.

[withheld]
or groups a signal record, an outcome or a bar of the window, by this script or by hand.

## Who

The owner. An automated contributor never runs the read, never copies the store for it, and never fetches the bars
for it.

## What it needs

- A local copy of the PRIVATE store's `desk/log/`, `desk/signal/` and `desk/feeds/board/` for the window, at the same
  keys (`<copy>/desk/log/<day>/<HHMM>.json`, and so on). Keep it outside the repository.
- The saved SIP bars, one file per session with its `.sha256` beside it, fetched by
  `wt.research.exp0034_outcome.fetch_session_bars` (feed `sip`, at least 30 minutes after the close, never replaced).
  Keep them outside the repository.
- From EXP-0034's `README.md`: the start date, Amendment 1's parameter hash and signal-code hash (and any defect-fix
  code hash recorded there before the read), the engine labels the identity check passed, the outcome code's
  SHA-256 recorded for precondition 3, and DEC-0048's switch date.

## Run it

```
.venv/bin/python scripts/exp0034_read.py --read --store <copy> --bars <bars> --start <YYYY-MM-DD> \
    --params-hash <hex> --code-hash <hex> --engine <label> --outcome-sha256 <hex> \
    --selection-switch <YYYY-MM-DD>
```

| Exit | Meaning |
|---|---|
| 0 | `research/experiments/EXP-0034-desk-signal-gates/results.json` written, once; the verdict printed |
| 2 | refused: no `--read`, the results file already exists, or an argument is missing |
| 3 | an early end was found: no verdict; the dates and causes printed go into EXP-0034's `README.md` |
| 4 | not due yet: nothing is computed or printed beyond that; do not run it again until it is due |

The results file is RESTRICTED-adjacent research output: it holds SAFE figures only (counts, estimate, range,
[withheld]
it, with the pre-set action.

## What it does not check

Calendar-row edits, card-number amendments, trade-rule limit changes and blind breaches are early ends the inputs
cannot show: check them against the repository history and write any into the README before the read.
`--dry-run-synthetic` exists for the tests only.
