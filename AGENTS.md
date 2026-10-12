# AGENTS.md: rules for contributors to trading-lab-docs

Read the organisation's rules first (`.github-private` `AGENTS.md` and `catalog.yaml`). This file adds the rules
specific to this repository. Where the two conflict, the organisation file's "Never" sections win.

## Hard rules

1. **Documentation only.** No trading code, no credentials, no runtime data, no server code. The site is a
   static export.
2. **Private and behind sign-in.** The repository stays private. The Vercel project keeps Vercel
   Authentication on all deployments. Never attach a domain or push content while that setting is anything else.
3. **Nothing restricted.** See the table below. When unsure, leave it out and link the source repository path.
4. **Copied pages are not edited here.** Design records and runbooks come from the platform repositories at a
   recorded commit. Change the source, then sync.
5. **Every claim about standing has a source**: a file in a platform repository at a commit.
6. **Commits and pull requests.** Branch, pull request, `pnpm check` green, squash-merge. Author:
   the owner's commit identity, as the organisation file gives it. Follow organisation decision D-016 on attribution.
7. **Wording.** Describe platforms and work. Do not write copy that implies a staff, a board or several founders.

## Data classes

| Class | Examples | In this repository |
|---|---|---|
| RESTRICTED | Specification text, setup names, decision and hypothesis prose, experiment reports, lessons, news headlines, knowledge-base text | Never |
| PRIVATE | Host notes, runbooks, log lines, paper balances | Yes |
| SAFE | Counts, ids, statuses, dates, statistics, design records written in our own words | Yes |

Never, even though this repository is private: secrets, account ids, host names and addresses, cloud project
ids, e-mail addresses.

## The gate

`pnpm check` (also the pre-push hook). It fails closed: if the private term list or phrase index is missing, the
check fails rather than skipping. Rebuild the index with `node scripts/build-leak-index.mjs`.

## Layout

```
content/docs/   pages; meta.json in each folder sets the order
components/     page components
scripts/        the gate and its helpers
```
