---
section: "04-legal-and-corporate"
slug: "ip-assignment-index"
title: "IP Assignment — Index"
---# IP Assignment — Index

> The single most reviewed item in pre-seed diligence. **Every contributor
> to the codebase must have signed a CIIA (Confidential Information & Invention
> Assignment) agreement.** This file inventories who has signed what.

Originals in `../_private/Legal/IP/` (gitignored).

---

## Founder IP Assignments (CIIA)

| Founder | CIIA signed? | Date | Filename |
|---|---|---|---|
| Jarred Gou | _TBD_ | _TBD_ | `_private/Legal/IP/CIIA_JarredGou_<date>.pdf` |
| Colin Zhang | _TBD_ | _TBD_ | `_private/Legal/IP/CIIA_ColinZhang_<date>.pdf` |
| Stephan Claxton | _TBD_ | _TBD_ | `_private/Legal/IP/CIIA_StephanClaxton_<date>.pdf` |

> **Critical:** This must show executed signatures from every founder
> covering all pre-incorporation work. Investors will check this in
> diligence. Owner Jarred — target 2026-06-15.

## Contractor / Past Contributor IP Assignments

For every individual who has committed code, designs, or written content
that is now in the repository:

| Person | Role | Engagement period | CIIA / IP assignment? | Status |
|---|---|---|---|---|
| _TBD — fill from `git log --format='%aN %aE' \| sort -u`_ | | | | |

**Action:** before sharing this room with a serious lead, run:

```bash
git log --format='%aN <%aE>' | sort -u
```

…and confirm every non-founder name has a signed IP assignment in `_private/Legal/IP/`.
List them in the table above.

## Third-Party IP / OSS Inventory

The product depends on open-source software. Standard pre-seed risk
assessment:

| Risk | Status | Notes |
|---|---|---|
| Copyleft (GPL/AGPL) in production code | _TBD_ — **must verify** | Run a license scan; flag any GPL/AGPL deps. AGPL is a hard block. |
| Permissive (MIT, Apache, BSD) | OK | Most of our stack — React, Vite, Zustand, Tailwind, Supabase, etc. |
| Vendor T&Cs accepted | OK | Anthropic, Auth0, Vercel, Supabase. Confirm DPAs in `../05_Agreements_and_Contracts/`. |
| Patent landscape (MBSE / SysML) | _TBD_ | Run a basic FTO sweep before Series A. Cameo and Rhapsody have known patent portfolios. |
| Trademark — "Luvian" | _TBD_ | File USPTO TM application. Owner Jarred, target 2026-09-01. |
| Domain control | _TBD_ | Confirm `luvian.app` and `luvian.ai` (if held) are in a corporate registrar account, not a personal one. |

## Patents & Filings

No patents filed to date. Defensive publication strategy is the current
default — see `docs/coding_rules.md` and `docs/decisions/decision_log.md`
for context.

## Open Items

- [ ] Sign all 3 founder CIIAs — owner Jarred, 2026-06-15.
- [ ] Run OSS license scan (FOSSA / Snyk) — owner Jarred, 2026-07-01.
- [ ] Confirm contractor / past contributor IP assignments — 2026-06-30.
- [ ] File "Luvian" trademark — 2026-09-01.
- [ ] Confirm domain ownership — 2026-05-31.
