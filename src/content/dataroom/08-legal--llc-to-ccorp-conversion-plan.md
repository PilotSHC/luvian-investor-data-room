---
section: "08-legal"
slug: "llc-to-ccorp-conversion-plan"
title: "LLC → Delaware C-Corp Conversion Plan"
---

> Why this matters to investors: every C-corp legal template in this folder, and the YC SAFE in the next, **only become operative once the Flip is complete**. This document explains the path from where Luvian Labs LLC is today to where it needs to be at the Series A.

**Status:** Planned. Not yet engaged with counsel.
**Trigger:** Earlier of (a) lead investor commitment to a Convertible Note round, or (b) demand for institutional priced equity.
**Estimated cost:** $2,500 – $5,000 (counsel fees + filing fees).
**Estimated timeline:** 3 – 6 weeks end-to-end.

---

## Why a Flip Is Required for Institutional Pre-Seed → Series A

| Reason | Detail |
|---|---|
| **SAFEs only convert into preferred stock** | LLCs do not have stock. SAFE conversion mechanics break. |
| **VC fund LP agreements typically prohibit holding LLC interests** | LLC membership generates K-1s, state-tax nexus, and unrelated-business taxable income (UBTI) — toxic for tax-exempt LPs. |
| **Most VCs will not invest into an LLC at any stage** | Even angels are mixed; institutional money is uniformly C-corp-only. |
| **ISO grants require a corporation** | Cannot grant Incentive Stock Options from an LLC; capped to NSOs and profits interests, both of which complicate cap-table / tax mechanics. |
| **§1202 QSBS exclusion** | Available only to **stock** of a C-corp; the 5-year holding period starts at the Flip, so flipping early matters. |

## The Two Mechanically-Equivalent Paths

### Path A — Statutory Conversion (preferred for Delaware)

If the LLC is formed in **Delaware** (or in another state that allows direct LLC → Corp conversion):

1. The Member adopts a Plan of Conversion.
2. File a **Certificate of Conversion** + **Certificate of Incorporation** with the Delaware Secretary of State, simultaneously.
3. The LLC ceases to exist; "Luvian, Inc." comes into being.
4. All assets, liabilities, contracts, IP, and obligations of the LLC pass automatically by operation of law to the corporation.
5. Membership interest converts to founder common stock per the Plan of Conversion.

**Pros:** clean, single-step, no asset transfer mechanics.
**Cons:** only works in states whose LLC act + corp law support direct conversion (DE does, CA does, WY does; some states do not).

### Path B — Reorganization via Merger or Asset Transfer

If the LLC is in a state without a clean conversion statute, or for tax-planning reasons:

1. Form a new Delaware corporation, **Luvian, Inc.**, with the founder as sole stockholder.
2. The LLC merges into Luvian, Inc. (or contributes assets in exchange for stock under IRC § 351).
3. Membership interest converts to founder common stock.
4. Old LLC is dissolved.

**Pros:** works regardless of LLC state of formation.
**Cons:** more steps, slightly higher legal cost, may require third-party consents on contracts that don't transfer automatically.

Both paths can be structured as **tax-free** under IRC § 351 if executed before any taxable appreciation event.

## Counsel-Visible Checklist (working list)

- [ ] **Engage counsel** (Cooley GO / Gunderson / Stripe Atlas Legal / Clerky) — 2026-06-15.
- [ ] Confirm LLC state of formation (drives which Path applies) — 2026-05-31.
- [ ] Obtain reservation of name "**Luvian, Inc.**" with the Delaware Secretary of State.
- [ ] Adopt **Plan of Conversion / Plan of Reorganization** (Member written consent).
- [ ] Draft + adopt **Certificate of Incorporation** — see `Certificate_of_Incorporation_TEMPLATE.md`.
- [ ] Draft + adopt **Bylaws** — see `Bylaws_TEMPLATE.md`.
- [ ] Adopt **Initial Board Consent** appointing officers, ratifying the Reorganization, adopting the Bylaws, authorizing the issuance of founder common stock, adopting the Equity Incentive Plan, authorizing banking, etc. — see `Initial_Board_Consent_TEMPLATE.md`.
- [ ] Issue founder common stock to **Stephan Claxton** under a **Founder RSPA** with 4-year vesting, 1-year cliff, **with credit for time-served as Founder of the LLC** (i.e., already past the cliff at issuance) — see `Founder_RSPA_TEMPLATE.md`.
- [ ] **File 83(b) election within 30 days of stock issuance** — `83b_Election_TEMPLATE.md`. **THIS IS THE SINGLE MOST COMMON PRE-SEED LEGAL DISASTER. Do not miss this deadline.**
- [ ] Convert outstanding **Convertible Notes** into Series Seed Preferred Stock per their conversion mechanics (Section 3(b) of the Note).
- [ ] Adopt **Equity Incentive Plan** — `Equity_Incentive_Plan_TEMPLATE.md` — typically reserves 12.5% post-money.
- [ ] Have all founders, employees, and contractors re-execute **CIIA** in the new entity's name — `CIIA_TEMPLATE.md`.
- [ ] Re-paper all material contracts (vendor MSAs, design-partner LOIs/MSAs, etc.) into the corporation's name. Send notices of assignment.
- [ ] **Obtain a new EIN** for Luvian, Inc. (the Inc. is a new entity; the LLC's EIN does not carry over).
- [ ] Open new banking, payroll, insurance, and benefits accounts in the corporation's name.
- [ ] Stand up cap-table tooling on **Carta** (now eligible because the company is a C-corp).
- [ ] File **Form D** with the SEC for the converted Notes if not already filed.
- [ ] File any **state blue-sky / notice filings** (Cooley typically handles).
- [ ] Update vendor lists, payment processors, banking ACH details, Stripe, AWS / Vercel / Supabase / Anthropic billing addresses, etc. — small but cumulative.
- [ ] Dissolve the LLC formally with the original state of formation.
- [ ] Update the data room: archive `Operating_Agreement_TEMPLATE.md`, `Convertible_Note_TEMPLATE.md`; activate `Certificate_of_Incorporation_TEMPLATE.md`, `Bylaws_TEMPLATE.md`, `Founder_RSPA_TEMPLATE.md`, `83b_Election_TEMPLATE.md`, `SAFE_Post_Money_Cap_TEMPLATE.md`.

## Total Estimated Cost

| Item | Cost |
|---|---|
| Outside counsel (Cooley GO startup package, or equivalent) | $2,000 – $4,000 |
| Delaware filing fees | ~$500 |
| Original-state dissolution fees | $50 – $200 |
| New EIN application | $0 (free via IRS SS-4) |
| Carta seat | $2,000 – $4,000 / year |
| **Total cash cost** | **~$5K** |

## Total Estimated Timeline (assuming counsel engaged 2026-06-15)

| Week | Milestone |
|---|---|
| W1 | Counsel engaged. State of formation confirmed. Path selected. |
| W2 | Plan of Conversion (or Plan of Reorganization) drafted. Cert. of Inc. drafted. Bylaws drafted. EIP drafted. Founder RSPA drafted. |
| W3 | Filings made with Delaware. Member consent executed. |
| W4 | Founder stock issued. **83(b) filed** (deadline-critical). Convertible Notes converted (if Qualified Financing has closed). |
| W5 | New EIN. New banking. New benefits. |
| W6 | Re-papering of material contracts. Carta seat. Update of data room. |

## Key Risks

| Risk | Mitigation |
|---|---|
| **Missed 83(b) deadline (30 days from stock issuance)** | Founder personally calendars. Counsel calendars. Send certified mail with return receipt. Save the receipt. **NEVER let this deadline slip.** |
| **Tax-free reorganization fails IRC § 351** | Counsel drafts the Plan to satisfy § 351 before any independent third-party investment that could be treated as boot. |
| **Material contracts contain anti-assignment clauses** | Inventory contracts before the Flip; obtain consents in advance for any that block. |
| **State-of-formation surprise** | Confirm LLC state today and reserve "Luvian, Inc." in Delaware before announcing the Flip publicly. |
| **Investor pressure to flip before counsel ready** | Resist; the Flip is reversible only at significant cost. Convertible Notes already contractually anticipate the Flip via Section 3(b) — investors are not at risk. |

## Owner

Stephan Claxton — Founder.
Backstop counsel-of-record at the firm engaged in the round.

## Versioning

| Version | Date | Notes |
|---|---|---|
| `2026_05` | 2026-05-21 | Initial planning document. Not yet engaged with counsel. |
