---
title: "Facts and register"
description: "Gate states, the job schedule, counts and the research register, generated from the repository."
---

Generated from `trading-lab-research@03b91fe` on 2026-11-16. Do not edit; run the sync.

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

From `src/wt/ops/schedule.py`.

| Job | When |
|---|---|
| `routine` | Mon..Fri 07:30 New York |
| `paper-b` | Mon..Fri 08:30 New York |
| `forward` | Mon..Fri 12:40 New York |
| `weekly` | Fri 20:00 New York |
| `dashboard` | every 5 minutes in the US session |
| `paper-o` | Mon..Fri 09:00 New York |
| `options-live` | every 5 minutes in the US session |
| `deploy-notify` | on an interval |
| `deploy-auto` | on an interval |
| `pipeline-check` | on an interval |
| `options-review` | Mon..Fri 16:30 New York |
| `econ-calendar` | Fri 21:30 New York |

## Counts

| | |
|---|---|
| Design records | 11 |
| Runbooks | 24 |
| Decision records | 50 |
| Experiment records | 35 |
| Hypothesis records | 59 |
| Lesson records | 6 |
| Merged pull requests | 442 |

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
| `DEC-0011` | Decision | accepted | 2026-10-25 |
| `DEC-0012` | Decision | accepted | 2026-10-04 |
| `DEC-0013` | Decision | — | — |
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
| `DEC-0029` | Decision | withdrawn | 2026-10-25 |
| `DEC-0030` | Decision | accepted | 2026-10-18 |
| `DEC-0031` | Decision | accepted | 2026-10-20 |
| `DEC-0032` | Decision | accepted | 2026-10-20 |
| `DEC-0033` | Decision | accepted | 2026-10-20 |
| `DEC-0034` | Decision | accepted | 2026-10-22 |
| `DEC-0035` | Decision | accepted | 2026-10-23 |
| `DEC-0036` | Decision | accepted | 2026-10-24 |
| `DEC-0037` | Decision | pre-registered | 2026-10-24 |
| `DEC-0038` | Decision | accepted | 2026-10-27 |
| `DEC-0039` | Decision | accepted | 2026-10-29 |
| `DEC-0040` | Decision | accepted | 2026-11-04 |
| `DEC-0041` | Decision | accepted | 2026-11-05 |
| `DEC-0042` | Decision | accepted | 2026-11-06 |
| `DEC-0043` | Decision | accepted | 2026-11-06 |
| `DEC-0044` | Decision | accepted | 2026-11-11 |
| `DEC-0045` | Decision | accepted | 2026-11-11 |
| `DEC-0046` | Decision | proposed | 2026-11-12 |
| `DEC-0047` | Decision | proposed | 2026-11-12 |
| `DEC-0049` | Decision | accepted | 2026-11-12 |
| `DEC-0050` | Decision | accepted | 2026-11-12 |
| `DEC-0051` | Decision | proposed | 2026-11-13 |
| `EXP-0001` | Experiment | registered | — |
| `EXP-DEBUG-0001` | Experiment | — | — |
| `EXP-0002` | Experiment | — | — |
| `EXP-0003` | Experiment | — | — |
| `EXP-0004` | Experiment | registered | — |
| `EXP-0005` | Experiment | — | — |
| `EXP-0006` | Experiment | — | — |
| `EXP-0007` | Experiment | — | — |
| `EXP-0008` | Experiment | — | — |
| `EXP-0009` | Experiment | — | — |
| `EXP-0010` | Experiment | — | — |
| `EXP-0011` | Experiment | — | — |
| `EXP-0012` | Experiment | — | — |
| `EXP-0013` | Experiment | — | — |
| `EXP-0014` | Experiment | — | — |
| `EXP-0015` | Experiment | registered | — |
| `EXP-0016` | Experiment | — | — |
| `EXP-0017` | Experiment | superseded | — |
| `EXP-0018` | Experiment | superseded | — |
| `EXP-0019` | Experiment | — | — |
| `EXP-0020` | Experiment | — | — |
| `EXP-0021` | Experiment | — | — |
| `EXP-0022` | Experiment | — | — |
| `EXP-0023` | Experiment | — | — |
| `EXP-0024` | Experiment | — | — |
| `EXP-0025` | Experiment | — | — |
| `EXP-0026` | Experiment | — | — |
| `EXP-0027` | Experiment | — | — |
| `EXP-0028` | Experiment | — | — |
| `EXP-0029` | Experiment | — | — |
| `EXP-0030` | Experiment | — | — |
| `EXP-0031` | Experiment | — | — |
| `EXP-0032` | Experiment | — | — |
| `EXP-0033` | Experiment | — | — |
| `EXP-0034` | Experiment | — | — |
| `HYP-0001` | Hypothesis | — | — |
| `HYP-0002` | Hypothesis | — | — |
| `HYP-0003` | Hypothesis | — | — |
| `HYP-0004` | Hypothesis | — | — |
| `HYP-0005` | Hypothesis | — | — |
| `HYP-0006` | Hypothesis | — | — |
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
| `HYP-0020` | Hypothesis | withdrawn | — |
| `HYP-0021` | Hypothesis | — | — |
| `HYP-0022` | Hypothesis | — | — |
| `HYP-0023` | Hypothesis | — | — |
| `HYP-0024` | Hypothesis | — | — |
| `HYP-0025` | Hypothesis | pre-registered | — |
| `HYP-0026` | Hypothesis | pre-registered | — |
| `HYP-0027` | Hypothesis | pre-registered | — |
| `HYP-0028` | Hypothesis | pre-registered | — |
| `HYP-0029` | Hypothesis | pre-registered | — |
| `HYP-0030` | Hypothesis | pre-registered | — |
| `HYP-0031` | Hypothesis | pre-registered | — |
| `HYP-0032` | Hypothesis | pre-registered | 2026-10-25 |
| `HYP-0033` | Hypothesis | pre-registered | 2026-10-25 |
| `HYP-0034` | Hypothesis | pre-registered | — |
| `HYP-0035` | Hypothesis | pre-registered | — |
| `HYP-0036` | Hypothesis | pre-registered | — |
| `HYP-0037` | Hypothesis | pre-registered | — |
| `HYP-0038` | Hypothesis | pre-registered | — |
| `HYP-0039` | Hypothesis | pre-registered | — |
| `HYP-0040` | Hypothesis | pre-registered | — |
| `HYP-0041` | Hypothesis | pre-registered | — |
| `HYP-0042` | Hypothesis | pre-registered | — |
| `HYP-0043` | Hypothesis | pre-registered | — |
| `HYP-0044` | Hypothesis | pre-registered | — |
| `HYP-0045` | Hypothesis | pre-registered | — |
| `HYP-0046` | Hypothesis | pre-registered | — |
| `HYP-0047` | Hypothesis | pre-registered | — |
| `HYP-0048` | Hypothesis | pre-registered | — |
| `HYP-0049` | Hypothesis | pre-registered | — |
| `HYP-0050` | Hypothesis | pre-registered | — |
| `HYP-0051` | Hypothesis | pre-registered | 2026-11-12 |
| `HYP-0052` | Hypothesis | pre-registered | 2026-11-12 |
| `HYP-0053` | Hypothesis | pre-registered | 2026-11-12 |
| `HYP-0054` | Hypothesis | pre-registered | 2026-11-12 |
| `HYP-0055` | Hypothesis | pre-registered | 2026-11-12 |
| `HYP-0056` | Hypothesis | pre-registered | — |
| `HYP-0057` | Hypothesis | pre-registered | — |
| `HYP-0058` | Hypothesis | pre-registered | — |
| `HYP-0059` | Hypothesis | pre-registered | 2026-11-13 |
| `LL-0001` | Lesson | — | — |
| `LL-0002` | Lesson | — | — |
| `LL-0003` | Lesson | — | — |
| `LL-0004` | Lesson | — | — |
| `LL-0005` | Lesson | — | — |
| `LL-0006` | Lesson | — | — |
