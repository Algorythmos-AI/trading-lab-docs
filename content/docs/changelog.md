---
title: Changelog
description: "245 merged pull requests, by week. Generated on 2026-10-13."
---

Titles and dates of merged pull requests. Weeks start on Monday (UTC).

## Week of 2026-10-12

### Forex HFT (4)

- 2026-10-13 · #25 · HFT-EXP-0009: the first funding of the float on the paper account, and the break a reconnection left
- 2026-10-12 · #24 · Cash is read under the tag the gateway sends, and an entry no longer spends what another sleeve's cover needs
- 2026-10-12 · #23 · Paper trading on spot with a cash float: limits in force, a cost model, and the control sleeve's first step
- 2026-10-12 · #22 · The probe's run with orders: what the account refuses on spot, the measured quote rate, and a hold at shadow until it can open positions

### Stocks & Options (9)

- 2026-10-12 · #214 · refactor(dashboard): shared pieces for the options desk
- 2026-10-12 · #213 · test(dashboard): the first pictures of the options desk
- 2026-10-12 · #212 · test(dashboard): pictures of the options desk, compared on every run
- 2026-10-12 · #211 · feat(ops): the host says when a deploy is ready; it never deploys (ADR 0007)
- 2026-10-12 · #210 · feat(options): the map's hourly range
- 2026-10-12 · #209 · fix(options): the host reads every page of bars
- 2026-10-12 · #208 · feat(options): a page per name, linked zones, compact rows and the feed agreement count
- 2026-10-12 · #207 · feat(options): the host job can send hourly bars, and the site accepts them
- 2026-10-12 · #206 · feat(options): the edition can carry the volatility index and earnings dates

## Week of 2026-10-05

### Forex HFT (21)

- 2026-10-11 · #21 · The first probe of the real paper gateway: what it measured, and three gaps it exposed
- 2026-10-11 · #20 · Leftovers: three challenger places, the publishing steps, provenance in model files, pruning, counts, and a cross-platform check of fits
- 2026-10-11 · #19 · Requirements on directional change, taken from a second knowledge-base release
- 2026-10-11 · #18 · A small sequence model as a third model kind, with no new dependency, scored in fixed point
- 2026-10-11 · #17 · Trader: at the tape's limit it stops entering, then flattens, and never leaves a position unwatched
- 2026-10-11 · #16 · Imported history: tick files the owner exported, in a store of their own, never counted as this venue's results
- 2026-10-11 · #15 · The scorer in its own process, sleeve state across a restart, and the two commands the experiments name
- 2026-10-11 · #14 · Operations: backup of everything that cannot be rebuilt, a bounded event tape, daily and weekly reports, and a deploy gate
- 2026-10-11 · #13 · Directional Change sleeve: a detector, two rule-based baselines and a random-walk null
- 2026-10-11 · #12 · Gradient boosting as a second model kind, as an optional install, scored without the library
- 2026-10-11 · #11 · IBKR adapter: a minimum size finer than one unit is one whole unit
- 2026-10-11 · #10 · Paper lock: the broker's newer paper ids carry one letter after DU
- 2026-10-11 · #9 · The weekly learning loop: training, challengers in shadow, the promote-keep-rollback decision and drift monitors
- 2026-10-11 · #8 · Learning foundations: features, labels, leak-checked datasets, validation, a model registry, ridge, an ML sleeve skeleton and the promotion decision
- 2026-10-11 · #7 · F4, second half: the trader process, two books side by side, and the staged rollout of sleeves
- 2026-10-10 · #6 · F4, first half: the risk gate, the order manager with a write-ahead outbox, and reconciliation
- 2026-10-10 · #5 · Host layer: units, pre-flight gate, install script, status, alerts, snapshot publisher, backup and runbooks
- 2026-10-10 · #4 · F2 and F3: recorder, replay, shadow venue with a cost model, control sleeve and feasibility map
- 2026-10-10 · #3 · The status snapshot contract, version 1
- 2026-10-10 · #2 · Requirements taken from the private knowledge base, cited by id
- 2026-10-10 · #1 · F1: venue port, staged paper lock, IBKR adapter, fake broker and capability probe

### Crypto (2)

- 2026-10-11 · #2 · sync: trading-lab-research at c8d92e1
- 2026-10-10 · #1 · docs: how a later change in the old repository arrives here now that main is published

### Stocks & Options (138)

- 2026-10-11 · #205 · feat(options): a notice when a rule triggers, and a countdown to the next hourly close
- 2026-10-11 · #204 · test(dashboard): stop a rare false failure in the live-checkout test
- 2026-10-11 · #203 · feat(options): rules today on the Live view
- 2026-10-11 · #202 · research(options): EXP-0023, the four rules replicated from this repository's code
- 2026-10-11 · #201 · docs(research): DEC-0029 proposed, pricing the probation rules' cases as options
- 2026-10-11 · #200 · feat(options): where each probation rule stands during the session
- 2026-10-11 · #199 · feat(options): the edition script can run a shadow night
- 2026-10-11 · #198 · docs(research): DEC-0028 and HYP-0025 to 0028, the options desk and its four rules
- 2026-10-11 · #197 · feat(options): the edition builder can write format 2
- 2026-10-11 · #196 · feat(options): the edition builder moves into the repository
- 2026-10-11 · #195 · feat(options): the levels engine and the rule replay move into the repository
- 2026-10-11 · #194 · fix(options): an expired option is worth its intrinsic value; honest decay in the last hour
- 2026-10-11 · #193 · feat(options): delta and a day's decay on the paper positions; the cost panel is scanned open
- 2026-10-11 · #192 · feat(dashboard): a key can be the primary publisher for its own desk only
- 2026-10-11 · #191 · feat(options): volatility by strike in the contract pane
- 2026-10-11 · #190 · feat(options): what an at-the-money call and put cost, on the brief view
- 2026-10-11 · #189 · fix(options): open-interest marks, after review
- 2026-10-11 · #188 · fix(options): the open-interest read can no longer hold up or stop the positions
- 2026-10-11 · #187 · feat(options): open-interest marks on the level map
- 2026-10-11 · #186 · feat(options): open interest in the options live document
- 2026-10-11 · #185 · feat(options): the priced contract's breakeven on the level map
- 2026-10-10 · #184 · feat(options): the host job that publishes the paper option positions
- 2026-10-10 · #183 · feat(options): paper option positions on the desk, read only
- 2026-10-10 · #182 · Options edition, second format: the site accepts the day's context, events and each name's volatility
- 2026-10-10 · #181 · feat(ops): a desk that has moved to its own repository runs nothing here
- 2026-10-10 · #180 · feat(dashboard): a third desk, HFT, in the header and on its own page
- 2026-10-10 · #179 · Options desk: a contract pane that prices one call or put
- 2026-10-10 · #178 · Option arithmetic for the desk: value, sensitivities, implied volatility, in Python and TypeScript on one set of vectors
- 2026-10-10 · #177 · Options desk: one pane at a time on a phone, with a bar to switch panes and step through names
- 2026-10-10 · #176 · docs(audit): the plan's last five pull requests are merged
- 2026-10-10 · #172 · Options desk: a command palette on Cmd K or Ctrl K
- 2026-10-10 · #171 · Deploy gate: say why the market calendar could not be read
- 2026-10-10 · #170 · refactor(ml): wt.ml.examples holds an example and what is worked out from a list of them; the scorer takes the inputs' identity
- 2026-10-10 · #173 · feat(dashboard): the scan on the Overview, near misses, the funnel of record, and a banner that knows a failed scan
- 2026-10-10 · #175 · docs: where the stocks plan stands; the README and layout describe the VM; DEC-0011's ids are taken
- 2026-10-10 · #174 · feat(forward): strategy B replayed on each session's recorded bars, beside what the runner journaled
- 2026-10-10 · #169 · test(ml): pin the inputs' identity, the training set's hash, the weights and the scorer's answer
- 2026-10-10 · #168 · feat(scanner): data-quality counts for each scan, record only; the dry run pages on a failed or IEX-only scan
- 2026-10-10 · #167 · Level map: a crosshair that reads a price, and layers that switch off
- 2026-10-10 · #166 · Options desk: phone-safe monitor, shortcuts that survive a mouse click, a fresh desk per edition
- 2026-10-10 · #165 · Options desk: the monitor, the selected name's map and three views in one frame
- 2026-10-10 · #164 · Fix a racy browser test that blocked the dashboard deploy on main
- 2026-10-10 · #163 · Engineering wiki: the crypto desk's own sections
- 2026-10-10 · #162 · Dashboard test harness: failure states, one pane fails alone, accessibility scan, layout-shift check
- 2026-10-10 · #161 · Crypto data harvest, step 3: hourly labels, feature rows and the Data harvest panel (DEC-0027)
- 2026-10-10 · #159 · Crypto data harvest, step 2: 1-hour rule books and the exploration book (DEC-0027)
- 2026-10-10 · #160 · Engineering wiki: the stocks desk's own sections
- 2026-10-10 · #158 · Crypto data harvest, step 1: registered rules on 30 coins in their own paper books (DEC-0027)
- 2026-10-10 · #157 · Engineering wikis: one per desk, with a shared Lab platform section
- 2026-10-10 · #156 · Dashboard: per-name quote cache, editions in /api/health, drift check for every generated type
- 2026-10-10 · #155 · Options page: word it for single calls and puts, mark unregistered findings, say what R measures
- 2026-10-10 · #154 · Radar page: scorecard, picks, lines and week as pictures
- 2026-10-10 · #153 · Today page: session clock and open position bar
- 2026-10-10 · #152 · Options page: close strength vs option price map
- 2026-10-10 · #151 · Options page: live dot and trail, state chips, needs-a-look sort, stale guard, focus mode
- 2026-10-10 · #150 · Options page: glance strip, level maps and charts instead of tables
- 2026-10-09 · #149 · Live prices: refresh every 2 seconds
- 2026-10-09 · #148 · Live prices: also read Alpaca's own APCA\_ key names
- 2026-10-09 · #147 · Options e2e: stop the SPY link check racing the live panel
- 2026-10-09 · #146 · dashboard: live prices on the Options page (Alpaca IEX)
- 2026-10-09 · #145 · dashboard: add the Options page for the after-close options levels
- 2026-10-09 · #144 · docs: classify the dashboard's radar editions as PRIVATE owner research
- 2026-10-09 · #143 · feat(dashboard): Radar page for the daily pre-market radar
- 2026-10-09 · #142 · fix(deploy): one deploy stages at a time; a second is refused as busy, not as a failed suite
- 2026-10-09 · #141 · feat(crypto): market monitor: market state, coins strongest first, correlation, holdings, results in R
- 2026-10-09 · #140 · feat(dashboard): the G2 panel shows sessions left out because the runner could not check its inputs (DEC-0024, decision 1)
- 2026-10-09 · #139 · fix(scorecard): read the dry run's stage files by their real names; failed scans in the dry run; Tier 1 in the thin-scan alert
- 2026-10-09 · #138 · feat(scorecard): the signals both the dry run and the forward test saw, in counts (DEC-0023, section 2)
- 2026-10-09 · #137 · feat(dashboard): each trial's book shows how many sealed shadow outcomes are resolved (DEC-0023, section 4)
- 2026-10-09 · #136 · feat(forward): sealed shadow outcomes for signals that admission refused (DEC-0023, section 4)
- 2026-10-09 · #135 · feat(scorecard): the dry run's funnel against the forward test's, in counts (DEC-0023, section 2)
- 2026-10-09 · #134 · feat(runner): journal how many sessions sigma rests on, and the marks where only the spread check blocked (DEC-0024, decisions 3 and 6)
- 2026-10-09 · #133 · feat(dashboard): a challenger's result shows what it made before costs and what the costs were
- 2026-10-09 · #132 · docs(research): the crypto desk in one page, four lessons learned, and the deploy steps
- 2026-10-08 · #131 · feat(dashboard): the crypto tournament's performance views: fall from the high, return by month, signal funnel
- 2026-10-08 · #130 · feat(crypto): every result says what it is worth (cost in R on challenger verdicts, confirmable edge, limits, signal-row definitions)
- 2026-10-08 · #129 · feat(dashboard): a book for every registered trial, read from the forward ledger (DEC-0023)
- 2026-10-08 · #128 · fix(forward): a scan with no data is an error for the session, not a day without trades (DEC-0024, decision 2)
- 2026-10-08 · #127 · *(title withheld)*
- 2026-10-08 · #126 · docs(research): DEC-0023 and DEC-0024, the stocks desk's evidence charter and two gate definitions (records only)
- 2026-10-08 · #125 · test(signals): strategy B never looks ahead, and its three readings are held together
- 2026-10-08 · #124 · feat(dashboard): the Today page shows why the gapping names went no further
- 2026-10-08 · #123 · *(title withheld)*
- 2026-10-08 · #122 · *(title withheld)*
- 2026-10-08 · #121 · fix(test): the forward funnel test no longer fails when the commit hash spells a word it looks for
- 2026-10-08 · #120 · feat(crypto): ranked entries (HYP-0024) and EXP-0022: the variant fails gate C1; the order makes no measurable difference
- 2026-10-08 · #119 · feat(forward): the funnel of record for each session, in counts, beside the ledger
- 2026-10-08 · #118 · feat(routine): each stage records why its kept names went no further
- 2026-10-08 · #117 · feat(scanner): a record of why each name did or did not reach each tier, in counts
- 2026-10-08 · #116 · docs(audit): the stocks desk forensic audit, with the host's counts for 28 September to 7 October
- 2026-10-08 · #115 · *(title withheld)*
- 2026-10-08 · #114 · test(scanner): the frozen selection and admission functions are pinned by golden outputs and source hashes
- 2026-10-08 · #113 · docs(research): DEC-0025 and HYP-0024, ranked entries for a full book (records only, for the owner's decision)
- 2026-10-08 · #112 · feat(crypto): backtest reports show cost in R, R before costs and a buy-and-hold line
- 2026-10-08 · #111 · docs(research): DEC-0022, a correction: a trade costs a quarter of an R, not half
- 2026-10-08 · #110 · fix(dashboard): the crypto desk's hourly history is pruned after 90 days too
- 2026-10-08 · #109 · feat(dashboard): the stocks desk in pictures: Paper B's running total, its results by band and by day
- 2026-10-08 · #108 · feat(dashboard): the crypto tournament in pictures: every book's return, each trade's result, the challengers' ranges
- 2026-10-08 · #107 · feat(dashboard): the Machine learning page shows the model's card, its scores and its history
- 2026-10-08 · #106 · feat(dashboard): the crypto model has its own Machine learning page, with charts
- 2026-10-08 · #105 · feat(dashboard): a challenger's result on the earlier two years is shown with its verdict
- 2026-10-08 · #104 · feat(ops): the two daily crypto jobs have dead-man checks
- 2026-10-08 · #103 · fix(ops): an ML environment that cannot import its libraries is never swapped in; the host image installs OpenMP
- 2026-10-08 · #102 · feat(dashboard): the desk-wide limits on the crypto Risk page, and plain words for the new refusals
- 2026-10-08 · #100 · feat(ml): a model is tied to the definitions of its inputs; make research-index
- 2026-10-08 · #99 · *(title withheld)*
- 2026-10-08 · #101 · fix(dashboard): Next.js 16.3.8, for the image-optimization request-forgery advisory
- 2026-10-07 · #98 · fix(ops): the ML environment's build holds no lock a job waits on, and its swap waits for the learning job
- 2026-10-07 · #97 · feat(crypto): DEC-0020 and EXP-0021, resting-limit entries screened: no sleeve passes, the desk is not changed
- 2026-10-07 · #95 · feat(crypto): DEC-0019, limits across the whole desk (EXP-0020), and what a model lineage is
- 2026-10-07 · #96 · feat(dashboard): the model on the Research page: what is in force, the tests it has faced, the last training
- 2026-10-07 · #94 · feat(crypto): the learning loop on the desk: outcomes, shadow scoring, promotion tests, weekly retraining
- 2026-10-07 · #93 · feat(dashboard): the Challengers panel: every idea tried, with the verdict of its backtest
- 2026-10-07 · #92 · feat(crypto): challengers part 2: the daily draw, registration, gate C1, admission, retirement and the owner's switch
- 2026-10-07 · #91 · fix(ops): the ML environment is built beside the live one, after the job locks are released
- 2026-10-07 · #90 · test(ml): a signal has the same inputs in the training set as on the desk
- 2026-10-07 · #89 · fix(ml): training weights, breadth and the training universe were wrong; DEC-0018 and EXP-0019 replace EXP-0017 and EXP-0018
- 2026-10-07 · #88 · feat(ml): DEC-0017, probability calibration, and the rerun it allows (EXP-0018)
- 2026-10-07 · #87 · feat(crypto): the engine runs a sleeve from its own specification: bar length, stop distance, filters
- 2026-10-07 · #86 · feat(ml): the training pipeline, and its first result (EXP-0017): no model beats taking every signal
- 2026-10-07 · #85 · feat(crypto): record every signal with its inputs, and follow any signal to its outcome
- 2026-10-07 · #84 · feat(ml): the ML platform: a separate hash-locked environment, a scorer process, and a trading side that never depends on it
- 2026-10-07 · #83 · docs(research): DEC-0016, the crypto learning charter: what may learn and act by itself, and its limits
- 2026-10-07 · #82 · feat(crypto): gate C1 backtest through the desk's own code, and its first result (EXP-0016)
- 2026-10-07 · #81 · fix(crypto): R is measured against the risk taken at entry, not the stop as it stood at the exit
- 2026-10-07 · #80 · feat(ops): the daily summary says what Paper B and the crypto sleeves did, from the host
- 2026-10-06 · #79 · feat(crypto): the tournament board: each sleeve's book, open positions, closed trades, signals and why it did not trade
- 2026-10-06 · #78 · feat(crypto): the tournament sleeves: three 4-hour strategies, each on its own paper book, beside the baseline
- 2026-10-06 · #77 · docs(research): DEC-0014 and DEC-0015, the crypto tournament: incubation paper trading and three pre-registered strategies
- 2026-10-06 · #76 · fix(dashboard): show the ledger before the first trade, and date an older session's outcome on the Overview
- 2026-10-06 · #75 · feat(ops): publish every 5 minutes in the US session; read the run history from its end
- 2026-10-06 · #74 · feat(dashboard): Paper B's profit and loss, trades, open position and why it did or did not trade
- 2026-10-06 · #73 · fix(runner): Paper B could never place an entry; act on the signal bar that just closed
- 2026-10-05 · #72 · fix(status): the deploy action speaks of the host, and schedule times show Sydney beside New York
- 2026-10-05 · #71 · feat(dashboard): a Today page that shows the pre-market scan and the paper session as they happen
- 2026-10-05 · #70 · fix(backup): a stocks ledger that only grew since the day's first backup is not a rewrite
- 2026-10-05 · #69 · fix(backup): a second backup of a day is not a failed anchor (the locked bucket answers 409, not 412)
- 2026-10-05 · #68 · fix(crypto): four things the live crypto pages got wrong on day one

### Knowledge Base (7)

- 2026-10-11 · #7 · shared collection: twelve requirements on directional change
- 2026-10-11 · #6 · shared collection: two directional-change papers, carded and verified
- 2026-10-10 · #5 · hft collection: context cards from the owner's own documents, verified
- 2026-10-10 · #4 · hft collection: syntheses, contradictions, gaps, requirements and reading list
- 2026-10-10 · #3 · hft collection: every claim verified by a second reader
- 2026-10-10 · #2 · hft collection: source cards and claims for all 16 papers
- 2026-10-10 · #1 · Knowledge-base tooling and the hft collection's inventory, custody and extracts

## Week of 2026-09-28

### Stocks & Options (64)

- 2026-10-04 · #67 · fix(backup): each desk anchors its own ledgers, and a crypto journal that only grew is not a rewrite
- 2026-10-04 · #66 · feat(crypto): put the crypto desk on the host: two interval jobs, daily backup, healthcheck, owner controls (phase 4)
- 2026-10-04 · #65 · feat(crypto): the desk trades the USD pairs; DEC-0012 accepted (trial family C at 4)
- 2026-10-04 · #64 · feat(crypto): the crypto desk's snapshot, its own slot and watchdog, and a Stocks | Crypto switch (ADR 0005, phase 3)
- 2026-10-04 · #63 · feat(crypto): the crypto desk's core: public market data, quality gate, strategy with exits, paper book, risk, bar cycle
- 2026-10-04 · #62 · feat(ops): desks, so a second desk can share the host without touching the first (ADR 0005, phase 1)
- 2026-10-04 · #61 · docs(crypto): ADR 0005 (desks) and the crypto desk's pre-registration (DEC-0012, HYP-0020)
- 2026-10-04 · #60 · chore(dashboard): the roadmap reflects the move to the cloud host
- 2026-10-04 · #59 · fix(status): the org source keeps its milestones and CI runs when the project board can't be read
- 2026-10-04 · #58 · fix(dashboard): old once-per-day alerts stop showing as firing; the text says "the host", not "the Mac"
- 2026-10-04 · #57 · fix(host): the VM publishes every 15 minutes, its collector passes, and an empty pool is not a crash
- 2026-10-01 · #56 · fix(backup): the restore test restores the ledgers by name
- 2026-10-01 · #55 · fix(r2): send a strong ETag in If-Match, so the lease can be renewed
- 2026-09-30 · #54 · ci: dashboard-gate always runs; main commits keep their checks; one list of contract paths (B1)
- 2026-09-30 · #53 · fix(ops): backups are per host and actually include data/; shadow pings mask nothing; host heartbeat
- 2026-09-30 · #52 · feat(runner): journal what Paper B would decide, even while entries are off (A-dec)
- 2026-09-30 · #47 · fix(publish): a hung collector or a network drop no longer costs a publish
- 2026-09-30 · #51 · feat(ops): hostsync moves a host's runtime state, verified end to end (cutover v2)
- 2026-09-30 · #50 · fix(host): VM units sized for e2-medium, complete fingerprinted installs, safe boot recovery, primary secrets
- 2026-09-30 · #49 · fix(deploy): a deploy is one locked transaction on one exact, green commit (B7)
- 2026-09-30 · #48 · fix(status): the VM shows its jobs loaded, and the schedule shows each job's next run
- 2026-09-30 · #46 · perf(data): nightly jobs load each symbol's last rows, not the whole daily store (A-P2)
- 2026-09-30 · #45 · GCP free-tier host: file secrets source and e2-micro first boot
- 2026-09-30 · #44 · fix(publish): a shadow host never publishes under the primary's key; the VM fetches DASHBOARD\_KEY\_ID
- 2026-09-30 · #43 · fix(infra): the quota policy also re-allows A1 under its regional quota names
- 2026-09-30 · #41 · chore(mandate): record the 1-share AAPL position as owner-accepted legacy
- 2026-09-30 · #42 · fix(infra): keep the OCI stack Terraform 1.5-compatible (Resource Manager's newest) and validate with 1.5.7
- 2026-09-30 · #38 · chore(deps): bump the actions group across 1 directory with 2 updates
- 2026-09-30 · #40 · chore(deps): hold TypeScript, ESLint and @types/node majors until the toolchain supports them
- 2026-09-30 · #33 · fix(control): unkill/reset-latch refuse while paper B runs; durable latch ordering (R7)
- 2026-09-30 · #30 · feat(dashboard): v3 panels — limits, digest, performance, blotter, SLA, audit, glossary
- 2026-09-30 · #29 · feat(contract): snapshot v3 — risk, performance, SLA, blotter, digest, audit
- 2026-09-30 · #35 · feat(journal): hash-chain the paper journal; fsync the events G2 rests on (R3)
- 2026-09-30 · #28 · feat(ops): off-host evidence backups, write-once anchors, the primary lease, shadow role
- 2026-09-30 · #26 · feat(ops): host-portable jobs for the Linux VM; SIGTERM-safe runner; healthchecks pings
- 2026-09-30 · #34 · fix(rollback): cancel-only broker handle; only the runner imports the paper broker (R6)
- 2026-09-30 · #32 · fix(watchdog): keep paging on ET weekdays after the published windows run out (R8)
- 2026-09-30 · #31 · chore(security): nonce CSP, hash-required installs, npm Dependabot, pnpm audit
- 2026-09-30 · #27 · feat(infra): OCI Always Free trading host as code (ADR 0004)
- 2026-09-30 · #25 · ops: deploy safety: verified dashboard deploys, dashboard-before-publisher guard, watchdog drill
- 2026-09-29 · #23 · fix(runner): never abandon a position; exactly-once booking; in-session alerts
- 2026-09-29 · #24 · fix(dashboard): tell the truth: G2, trials, disk, mandate, CI repo, no free text
- 2026-09-29 · #22 · fix(dashboard): publishes stored again; the watchdog pages again
- 2026-09-29 · #19 · chore(deps): bump the actions group with 2 updates
- 2026-09-29 · #16 · docs: README, ADR 0001, runbooks and SECURITY.md
- 2026-09-29 · #21 · feat(research): corrected evaluation method (opt-in), run manifests, hashed lockfile (DEC-0011 part 3)
- 2026-09-29 · #20 · fix(research): data corrections and an audit-grade forward ledger (DEC-0011 part 2)
- 2026-09-29 · #17 · feat(dashboard): private status dashboard on Vercel (lab.algorythmos.com)
- 2026-09-29 · #18 · feat(ops): weekly evidence PR of immutable forward-evidence copies
- 2026-09-29 · #15 · fix(data): drop duplicated ETF minute bars; draft DEC-0011 audit corrections
- 2026-09-29 · #13 · feat(ops): sanitized snapshot publisher for the Vercel dashboard
- 2026-09-29 · #14 · fix(oms): execution safety: paper lock, pre-trade guard, state machine, persistence
- 2026-09-29 · #12 · feat(ops): runtime safety net, runtime state in var/, computed deploy gate
- 2026-09-29 · #11 · ci: engineering foundation (CI, security scan, pre-commit, Makefile)
- 2026-09-28 · #10 · feat(forward): run the ten round-3 trials nightly, with catch-up and per-strategy markers
- 2026-09-28 · #9 · data(exp0015a): owner verdicts in; CAT-01 recorded as a fail; DEC-0010 in effect
- 2026-09-28 · #8 · fix(forward): cap the daily-bar request 16 minutes before now
- 2026-09-28 · #7 · feat(ops): status dashboard across research, operations and the org backlog
- 2026-09-28 · #6 · feat(routine): hybrid live feed, SIP to the 15-min delay plus IEX tail (SPEC-0001 v1.0.1)
- 2026-09-28 · #5 · fix(data): drop duplicate symbol-days in load\_daily
- 2026-09-28 · #4 · SPEC-0001 approved; EXP-0015a owner blind labels; track the missing src/wt packages
- 2026-09-28 · #3 · feat(r3): SPEC-0001 engine, causal pool, runners, evaluation and routine
- 2026-09-28 · #2 · feat(catalyst): SPEC-0001 catalyst classifier and EXP-0015a accuracy check
- 2026-09-28 · #1 · feat(spec): SPEC-0001 Warrior methodology specification (draft v1.0.0)
