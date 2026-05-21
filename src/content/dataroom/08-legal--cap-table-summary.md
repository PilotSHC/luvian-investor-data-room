---
section: "08-legal"
slug: "cap-table-summary"
title: "Cap Table — Summary"
---

**Entity:** Luvian Labs LLC (single-member LLC; jurisdiction TBD-confirm)
**Sole member:** Stephan Claxton — 100% membership interest
**Round in progress:** Convertible Promissory Note(s); auto-convert at LLC → Inc Flip (the "Delaware Flip") or on a Qualified Financing.

> **Why a convertible note (and not a SAFE)?** SAFEs are designed to convert into preferred stock, which LLCs do not have. Most institutional investors will not invest into an LLC via SAFE. The standard pre-seed instrument for an LLC is a **Convertible Promissory Note** with an automatic conversion trigger on the planned LLC → Inc reorganization. Once Luvian Labs LLC reorganizes as **Luvian, Inc.** (Delaware C-corp), all future investors will use the YC Post-Money Cap SAFE (already templated in `../05_Agreements_and_Contracts/SAFE_Post_Money_Cap_TEMPLATE.md`).

**Editable structured data:** `Capitalization_Table_2026_05.csv`.
**Carta record:** _N/A pre-flip._ Pulley supports LLC cap tables; consider standing one up before the first note close.

---

## Pre-Round Cap Table (today)

| Holder | Security | % of Total |
|---|---|---:|
| Stephan Claxton | Membership Interest | **100.0%** |
| **Total** | | **100.0%** |

No outside money. No convertible notes outstanding. No issued profits-interest grants.
No Operating Agreement signed yet (default state-law rules apply until the Operating Agreement is executed). Operating Agreement template is at `Operating_Agreement_TEMPLATE.md`.

## Round In Progress — Convertible Notes (Base Case $1.75M)

| Holder | Instrument | Amount | Valuation Cap | Status |
|---|---|---:|---:|---|
| _Lead Investor_ | Convertible Note | $750K – $1.0M | $[CAP] | TBD |
| _Angel #1_ | Convertible Note | $50K – $250K | $[CAP] | TBD |
| _Angel #2_ | Convertible Note | $50K – $250K | $[CAP] | TBD |
| _Strategic Angel_ | Convertible Note | $50K – $250K | $[CAP] | TBD |

Standard note terms (negotiable with lead):
- **Interest:** 5% simple, accruing
- **Maturity:** 24 months (auto-extends to next financing or LLC→Inc conversion if not yet triggered)
- **Conversion trigger:** Qualified Financing of ≥ $2M, OR LLC-to-C-corp reorganization, whichever first
- **Conversion price:** lower of (i) Valuation Cap, (ii) Qualified Financing price × (1 - discount)
- **Discount:** 0–20% (default 0% if cap is set)
- **Pro-rata participation rights:** offered to ≥ $250K checks via separate side letter
- **No voting / no membership rights at LLC level**

## Post-Flip Pro Forma (illustrative — $1.75M total, $14M cap)

The Delaware Flip is a structured action: LLC → Delaware C-corp via tax-free reorganization (IRC § 351). On flip:

| Action | Outcome |
|---|---|
| Stephan's 100% LLC membership | → Founder Common Stock in Luvian, Inc. (subject to RSPA with 4yr/1yr-cliff vesting; credit for time-served) |
| Outstanding Convertible Notes | Auto-convert to Series Seed Preferred Stock at the cap |
| ESOP top-up | Established at 12.5% post-money (standard pre-money pool) |
| Cap table | Re-papers in Carta as a Delaware C-corp |

| Post-Flip Holder | Approximate % |
|---|---:|
| Stephan (founder common, post-RSPA) | ~75.4% |
| ESOP / Equity Incentive Plan | ~12.5% |
| Note holders → Series Seed Preferred | ~12.1% |
| **Total** | **100%** |

## Open Items

- [ ] Lock the **valuation cap** with the lead — 2026-06-15.
- [ ] Confirm **state of LLC formation** and update this room (DE / WY / CA / etc.) — 2026-05-31.
- [ ] Confirm whether Operating Agreement has been signed (single-member LLCs are typical to skip but it is best practice) — 2026-05-31.
- [ ] Engage **outside counsel of record** for the Flip — 2026-06-15.
- [ ] Stand up cap-table tooling (Pulley supports LLCs; Carta is C-corp-only until the Flip) — 2026-06-30.
- [ ] First note close — target 2026-Q3.

## Versioning

| Version | Date | Notes |
|---|---|---|
| `2026_05` | 2026-05-21 | Initial sanitized summary; reflects pre-flip LLC stage with sole member Stephan Claxton. |
