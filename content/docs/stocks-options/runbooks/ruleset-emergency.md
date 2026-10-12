---
title: "Ruleset emergency"
description: "Copied from trading-lab-research@6562d6f (docs/runbooks/ruleset-emergency.md) on 2026-10-12. Do not edit here."
---

`main` is protected by a repository ruleset. A pull request and the `test` check are required, and there are no
bypass actors.

**If CI is down and a fix must land:**
1. GitHub → the repo → Settings → Rules → Rulesets → the `main` ruleset → set Enforcement to **Disabled**.
2. Merge the fix through its PR.
3. Set Enforcement back to **Active** at once, and note it in the PR.

Org rule: only the owner changes rulesets.
