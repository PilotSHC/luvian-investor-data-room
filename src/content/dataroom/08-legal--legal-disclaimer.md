---
section: "08-legal"
slug: "legal-disclaimer"
title: "Legal Templates — Read This First"
---

**The `*_TEMPLATE.md` files in this folder and `../05_Agreements_and_Contracts/` are DRAFTS, not legal advice.**

## What These Are

Standard-form starting drafts modeled on widely-used public templates:

| Template family | Source we used as the model |
|---|---|
| YC Post-Money SAFE | [YC SAFE documents](https://www.ycombinator.com/documents) — the canonical pre-seed instrument |
| Certificate of Incorporation, Bylaws, Initial Board Consent | Cooley GO + Stripe Atlas + Clerky standard-form templates |
| Founder Restricted Stock Purchase Agreement (RSPA) | Cooley GO + Clerky founder RSPA |
| 83(b) election | IRS guidance + Cooley GO standard form |
| Equity Incentive Plan (EIP) | Cooley GO standard 2026 plan |
| CIIA (Confidential Info & Invention Assignment) | Cooley GO + YC starter pack |
| Offer letter | YC starter pack |
| Mutual / one-way NDAs | YC starter pack + CommonPaper |
| Customer pilot MSA | CommonPaper standard MSA |

## What These Are Not

- **They are not legal advice.** No attorney-client relationship is formed by reading or using these files.
- **They are not customized for your facts.** Where the template has `[BRACKETS]`, you must fill in. Where it makes assumptions (DE C-corp, 4-yr vest, post-money SAFE, double-trigger acceleration), confirm those still match the deal.
- **They are not jurisdiction-flexible.** Drafts assume a Delaware C-corp with a California office or California governing law. If facts differ (e.g. Wyoming entity, EU office, government customer), have counsel rewrite.
- **They are not regulatory-cleared.** Securities-law review is required for any SAFE or stock issuance. Reg D filing requirements depend on the facts of the offering.
- **They have not been signed.** Nothing in this folder represents a binding agreement until executed by the parties.

## Mandatory Steps Before Any Document Is Used

1. **Engage outside counsel** of record for the company. Recommended: Cooley, Gunderson Dettmer, WSGR, Orrick, Latham (top-tier startup practices), or for budget-conscious pre-seed: Clerky, Stripe Atlas legal, or a fractional GC.
2. **Have counsel review and customize** every template before execution.
3. **Confirm board / stockholder approvals** as required for each action (e.g. share issuance, plan adoption, SAFE execution).
4. **File required forms** (DE incorp, 83(b) within 30 days, Form D after first SAFE close if applicable, state qualifications).
5. **Update Carta** (or equivalent) immediately on each issuance.

## Filing & Calendar Pitfalls (the ones that actually bite pre-seed companies)

| Risk | Mitigation |
|---|---|
| **83(b) missed window** (must file with IRS within 30 days of grant) | File certified mail with return receipt; keep proof in `_private/Legal/83b/` |
| **DE franchise tax not paid** by March 1 each year | Calendar reminder + automatic Carta or Stripe Atlas filing |
| **Failure to file Form D** within 15 days of first SAFE sale (if Reg D 506(b)/(c)) | Have counsel confirm exemption; file if required |
| **Founder RSPA never executed** at incorporation (so vesting never started) | Verify executed copies in `_private/Legal/Employment/` |
| **CIIA never signed** by founders / contractors (so IP is not assigned to the company) | Block onboarding on signature; track in `IP_Assignment_INDEX.md` |
| **Treasury / common stock issued without payment of par value** | Each founder pays at least par value × shares (often a few cents) on issuance; keep wire receipts |
| **Foreign qualifications skipped** when company has employees in CA / NY / etc. | Engage a registered-agent service (Stripe Atlas, Doola, CT Corporation) per state |

## File Naming for Executed Versions

Once a template is executed:

- Store the executed copy in `../_private/Legal/<category>/`
- Use the filename `<DocType>_<Party>_<YYYY_MM_DD>_EXECUTED.pdf`
  - e.g. `RSPA_JarredGou_2024_03_15_EXECUTED.pdf`
- The `EXECUTED_*` glob is **gitignored** — never commit signed legal docs.
- Update the matching `*_INDEX.md` file with: status = ✅ filed (date), filename, location.

## Maintenance

Templates update over time. Re-pull the source templates (YC, Cooley GO) annually and reconcile material changes. Track template version at the top of each file (`Template Version: YC SAFE 2024-revision-1` etc.).

---

**TL;DR:** These are paste-and-fill drafts to make counsel's job faster and cheaper, **not** a substitute for counsel. Engage a real attorney before any of these is signed.
