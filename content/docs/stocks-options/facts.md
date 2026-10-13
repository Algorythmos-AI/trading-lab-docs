---
title: "Facts and register"
description: "Gate states, the job schedule, counts and the research register, generated from the repository."
---

Generated from `trading-lab-research@f4b65b7` on 2026-10-13. Do not edit; run the sync.

## Gate states

From `config/dashboard.yaml`.

| Gate | Name | State |
|---|---|---|
| K0 | Knowledge extraction | done |
| G0 | Data readiness | done |
| G1 | Backtest proof of edge | failed |
| G2 | Forward and paper evidence | in progress |
| G3 | Broker acceptance | not started |
| G4 | Live tiny | not started |
| G5 | Scale | not started |

## Job schedule

From `src/wt/ops/schedule.py`. Includes the crypto jobs until that desk is cut over.

| Job | When |
|---|---|
| `routine` | Mon..Fri 07:30 New York |
| `paper-b` | Mon..Fri 08:30 New York |
| `forward` | Mon..Fri 12:40 New York |
| `weekly` | Fri 20:00 New York |
| `dashboard` | every 5 minutes in the US session |
| `options-live` | every 5 minutes in the US session |
| `deploy-notify` | on an interval |
| `crypto` | on an interval |
| `dashboard-crypto` | every 15 minutes |
| `crypto-challengers` | Mon..Sun 03:30 New York |
| `crypto-learn` | Mon..Sun 04:30 New York |

## Counts

| | |
|---|---|
| Design records | 6 |
| Runbooks | 17 |
| Decision records | 28 |
| Experiment records | 20 |
| Hypothesis records | 28 |
| Lesson records | 6 |
| Merged pull requests | 211 |

## Research register

Ids, statuses and dates only.

| Id | Kind | Status | Date on its status line |
|---|---|---|---|
| `DEC-0001` | Decision | — | — |
| `DEC-0002` | Decision | — | — |
| `DEC-0003` | Decision | — | — |
| `DEC-0004` | Decision | — | — |
| `DEC-0005` | Decision | — | — |
| `DEC-0006` | Decision | — | — |
| `DEC-0007` | Decision | — | — |
| `DEC-0008` | Decision | — | — |
| `DEC-0009` | Decision | — | — |
| `DEC-0010` | Decision | — | 2026-09-29 |
| `DEC-0011` | Decision | proposed | — |
| `DEC-0012` | Decision | accepted | 2026-10-04 |
| `DEC-0014` | Decision | accepted | 2026-10-06 |
| `DEC-0015` | Decision | accepted | 2026-10-06 |
| `DEC-0016` | Decision | accepted | 2026-10-07 |
| `DEC-0017` | Decision | accepted | 2026-10-07 |
| `DEC-0018` | Decision | accepted | 2026-10-07 |
| `DEC-0019` | Decision | accepted | 2026-10-08 |
| `DEC-0020` | Decision | accepted | 2026-10-08 |
| `DEC-0021` | Decision | accepted | 2026-10-08 |
| `DEC-0022` | Decision | accepted | 2026-10-08 |
| `DEC-0023` | Decision | accepted | 2026-10-08 |
| `DEC-0024` | Decision | accepted | 2026-10-08 |
| `DEC-0025` | Decision | accepted | 2026-10-08 |
| `DEC-0026` | Decision | accepted | 2026-10-08 |
| `DEC-0027` | Decision | accepted | 2026-10-10 |
| `DEC-0028` | Decision | accepted | 2026-10-11 |
| `DEC-0029` | Decision | proposed | 2026-10-12 |
| `EXP-DEBUG-0001` | Experiment | — | — |
| `EXP-0002` | Experiment | — | — |
| `EXP-0003` | Experiment | — | — |
| `EXP-0005` | Experiment | — | — |
| `EXP-0006` | Experiment | — | — |
| `EXP-0007` | Experiment | — | — |
| `EXP-0008` | Experiment | — | — |
| `EXP-0011` | Experiment | — | — |
| `EXP-0012` | Experiment | — | — |
| `EXP-0013` | Experiment | — | — |
| `EXP-0014` | Experiment | — | — |
| `EXP-0015` | Experiment | accepted | 2026-09-29 |
| `EXP-0016` | Experiment | — | — |
| `EXP-0017` | Experiment | superseded | — |
| `EXP-0018` | Experiment | superseded | — |
| `EXP-0019` | Experiment | — | — |
| `EXP-0020` | Experiment | — | — |
| `EXP-0021` | Experiment | — | — |
| `EXP-0022` | Experiment | — | — |
| `EXP-0023` | Experiment | — | — |
| `HYP-0001` | Hypothesis | pre-registered | — |
| `HYP-0002` | Hypothesis | pre-registered | — |
| `HYP-0003` | Hypothesis | pre-registered | — |
| `HYP-0004` | Hypothesis | pre-registered | — |
| `HYP-0005` | Hypothesis | pre-registered | — |
| `HYP-0006` | Hypothesis | pre-registered | — |
| `HYP-0007` | Hypothesis | — | — |
| `HYP-0008` | Hypothesis | — | — |
| `HYP-0009` | Hypothesis | — | — |
| `HYP-0010` | Hypothesis | pre-registered | 2026-09-29 |
| `HYP-0011` | Hypothesis | pre-registered | 2026-09-29 |
| `HYP-0012` | Hypothesis | pre-registered | 2026-09-29 |
| `HYP-0013` | Hypothesis | pre-registered | 2026-09-29 |
| `HYP-0014` | Hypothesis | pre-registered | 2026-09-29 |
| `HYP-0015` | Hypothesis | pre-registered | 2026-09-29 |
| `HYP-0016` | Hypothesis | pre-registered | 2026-09-29 |
| `HYP-0017` | Hypothesis | pre-registered | 2026-09-29 |
| `HYP-0018` | Hypothesis | pre-registered | 2026-09-29 |
| `HYP-0019` | Hypothesis | pre-registered | 2026-09-29 |
| `HYP-0020` | Hypothesis | pre-registered | 2026-10-04 |
| `HYP-0021` | Hypothesis | pre-registered | 2026-10-06 |
| `HYP-0022` | Hypothesis | pre-registered | 2026-10-06 |
| `HYP-0023` | Hypothesis | pre-registered | 2026-10-06 |
| `HYP-0024` | Hypothesis | pre-registered | — |
| `HYP-0025` | Hypothesis | pre-registered | — |
| `HYP-0026` | Hypothesis | pre-registered | — |
| `HYP-0027` | Hypothesis | pre-registered | — |
| `HYP-0028` | Hypothesis | pre-registered | — |
| `LL-0001` | Lesson | — | — |
| `LL-0002` | Lesson | — | — |
| `LL-0003` | Lesson | — | — |
| `LL-0004` | Lesson | — | — |
| `LL-0005` | Lesson | — | — |
| `LL-0006` | Lesson | — | — |
