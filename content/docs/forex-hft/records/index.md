---
title: Design records
description: "29 copied from hft-lab@23137ed on 2026-10-12."
---

Each records one decision and why. Copied; change the source, then sync.

| Title | Source |
|---|---|
| [ADR 0001: The paper-only lock](/forex-hft/records/0001-paper-only-lock) | `docs/adr/0001-paper-only-lock.md` |
| [ADR 0002: Integer prices and nanosecond receive timestamps](/forex-hft/records/0002-integer-prices-and-nanosecond-timestamps) | `docs/adr/0002-integer-prices-and-nanosecond-timestamps.md` |
| [ADR 0003: Two books; the shadow book is the result of record](/forex-hft/records/0003-two-books) | `docs/adr/0003-two-books.md` |
| [ADR 0004: The recorder is separate from the trader](/forex-hft/records/0004-recorder-separate-from-trader) | `docs/adr/0004-recorder-separate-from-trader.md` |
| [ADR 0005: Deterministic replay as the main test strategy](/forex-hft/records/0005-deterministic-replay) | `docs/adr/0005-deterministic-replay.md` |
| [ADR 0007: Living on a shared host without hurting the other desks](/forex-hft/records/0007-shared-host-isolation) | `docs/adr/0007-shared-host-isolation.md` |
| [ADR 0008: The learning loop: weekend training, automatic promotion, automatic rollback](/forex-hft/records/0008-learning-loop) | `docs/adr/0008-learning-loop.md` |
| [ADR 0009: The venue port, its guard and the fake broker](/forex-hft/records/0009-venue-port-guard-and-fake-broker) | `docs/adr/0009-venue-port-guard-and-fake-broker.md` |
| [ADR 0010: Access route: the TWS API through IB Gateway first](/forex-hft/records/0010-access-route) | `docs/adr/0010-access-route.md` |
| [ADR 0011: A synchronous, pumped port; asyncio stays inside the adapter](/forex-hft/records/0011-synchronous-pumped-port) | `docs/adr/0011-synchronous-pumped-port.md` |
| [ADR 0012: The recording format: fixed-width records in checksummed blocks](/forex-hft/records/0012-recording-format) | `docs/adr/0012-recording-format.md` |
| [ADR 0013: The shadow venue's cost model](/forex-hft/records/0013-shadow-cost-model) | `docs/adr/0013-shadow-cost-model.md` |
| [ADR 0014: A sleeve is a pure function; the idle and the control sleeve come first](/forex-hft/records/0014-sleeves-as-pure-functions) | `docs/adr/0014-sleeves-as-pure-functions.md` |
| [ADR 0015: The independent risk gate](/forex-hft/records/0015-risk-gate) | `docs/adr/0015-risk-gate.md` |
| [ADR 0016: The order manager, its outbox, and reconciliation](/forex-hft/records/0016-order-manager-and-outbox) | `docs/adr/0016-order-manager-and-outbox.md` |
| [ADR 0017: The host layer: units from code, a gate before the install, one status reading](/forex-hft/records/0017-host-layer) | `docs/adr/0017-host-layer.md` |
| [ADR 0018: Publishing the status snapshot: one reading, checked, signed, and sent only with the owner's key](/forex-hft/records/0018-snapshot-publish) | `docs/adr/0018-snapshot-publish.md` |
| [ADR 0019: The trader loop, its tape, and the staged rollout](/forex-hft/records/0019-trader-loop-and-staged-rollout) | `docs/adr/0019-trader-loop-and-staged-rollout.md` |
| [ADR 0020: Features and labels: what is known when](/forex-hft/records/0020-features-and-labels-timing) | `docs/adr/0020-features-and-labels-timing.md` |
| [ADR 0021: Validation: splits by week, a hold-out read once, counted trials, three numbers](/forex-hft/records/0021-validation-splits-trials-and-the-three-numbers) | `docs/adr/0021-validation-splits-trials-and-the-three-numbers.md` |
| [ADR 0022: The model file, the model registry, the exact ridge model, and the scorer](/forex-hft/records/0022-model-file-registry-and-scorer) | `docs/adr/0022-model-file-registry-and-scorer.md` |
| [ADR 0023: The weekly learning loop as processes: training, the lineup journal, the decision, the scorer](/forex-hft/records/0023-weekly-learning-loop) | `docs/adr/0023-weekly-learning-loop.md` |
| [ADR 0024: The Directional Change detector, two baseline sleeves on it, and the null they are read against](/forex-hft/records/0024-directional-change-sleeve) | `docs/adr/0024-directional-change-sleeve.md` |
| [ADR 0025: Gradient boosting: one optional library to train with, whole-number trees to score with](/forex-hft/records/0025-gradient-boosting-optional-set-and-whole-number-trees) | `docs/adr/0025-gradient-boosting-optional-set-and-whole-number-trees.md` |
| [ADR 0026: Sleeve state across a restart, and the two commands the registered experiments name](/forex-hft/records/0026-sleeve-state-across-a-restart) | `docs/adr/0026-sleeve-state-across-a-restart.md` |
| [ADR 0027: A deploy gate, a tape that is bounded, a backup that is whole, and two reports](/forex-hft/records/0027-deploy-gate-and-reports) | `docs/adr/0027-deploy-gate-and-reports.md` |
| [ADR 0028: Imported history: a store of its own, provenance in the data, no download, and no promotion on it](/forex-hft/records/0028-imported-history) | `docs/adr/0028-imported-history.md` |
| [ADR 0029: A small sequence network: fitted with arrays and no new library, read through windows, scored in fixed point](/forex-hft/records/0029-sequence-network-windows-and-fixed-point-scoring) | `docs/adr/0029-sequence-network-windows-and-fixed-point-scoring.md` |
| [ADR 0031: Spot on a cash account: a float in every traded currency, and positions as deviations from it](/forex-hft/records/0031-spot-inventory-on-a-cash-account) | `docs/adr/0031-spot-inventory-on-a-cash-account.md` |
