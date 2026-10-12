# trading-lab-docs

One documentation site for the trading platforms (stocks and options, crypto, forex HFT) and the shared
knowledge base: what is built, how it runs, where each stands, and the roadmap.

- **Status:** being built.
- **Owner:** @skalaliya
- **Runs at:** `docs.algorythmos.com` (Vercel, sign-in required on every address)
- **Data class:** confidential. Private repository; never public.

## Run locally

```bash
pnpm install
pnpm hooks                          # once: the pre-push gate
node scripts/build-leak-index.mjs   # once, and when the sources move
pnpm dev
```

## Before every push

```bash
pnpm check
```

This repository runs no CI, so `pnpm check` is the gate. It scans wording and secret shapes, scans for
restricted text, lints, checks types, builds, and checks every internal link. The pre-push hook runs it.

## Layout

```
content/docs/   the pages (MDX), one folder per section
components/     page components (status chip, the map)
app/            layout and routing; static export, no server code
scripts/        check.mjs, leakcheck.py, build-leak-index.mjs
vercel.json     headers: noindex, CSP
```

## Rules

See `AGENTS.md`. The short version: no specification text, setup names, research prose or knowledge-base text,
ever; every change through a pull request.
