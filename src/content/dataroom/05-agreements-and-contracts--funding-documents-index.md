---
section: "05-agreements-and-contracts"
slug: "funding-documents-index"
title: "Funding Documents — Index"
---# Funding Documents — Index

**Round status:** Pre-seed in process. **No prior funding rounds closed.** This file inventories what _will_ exist once the round closes.

**Issuer at this stage:** Luvian Labs LLC (single-member LLC). After the planned LLC → Delaware C-corp Reorganization, future rounds are issued by Luvian, Inc.

---

## Pre-Flip Instrument: Convertible Promissory Note

**Active template:** `Convertible_Note_TEMPLATE.md`.
**Why not a SAFE?** SAFEs convert into preferred stock; LLCs do not have stock. The convertible note has an explicit conversion trigger on the Reorganization (LLC→Inc.), bridging the two stages cleanly. See `../04_Legal_and_Corporate/LLC_to_Ccorp_Conversion_Plan.md`.

| Parameter | Value |
|---|---|
| Round size | $1.5M – $2.0M |
| Round target (base) | $1.75M |
| Instrument | Convertible Promissory Note |
| Valuation cap | _TBD_ — set on lead-investor commitment |
| Discount | 0% (cap-only) — negotiable to 20% |
| Interest rate | 5% simple, accruing |
| Maturity | 24 months |
| Conversion trigger | Earlier of: (a) Qualified Financing of ≥ $2M priced equity, OR (b) LLC → C-corp Reorganization |
| MFN clause | Standard MFN — best terms among series |
| Pro-rata side letter | Offered to ≥ $250K checks |
| Voting / membership rights | None pre-conversion |
| Closing structure | Rolling close (one-by-one as committed); first close on lead, then close angels within 60 days |

## Post-Flip Instrument: YC SAFE (Post-Money Valuation Cap)

**Activates** after Luvian Labs LLC has reorganized as Luvian, Inc.
**Active template (post-flip):** `SAFE_Post_Money_Cap_TEMPLATE.md` — pull the latest official YC PDF at execution time.

## Inventory (post-close, target state)

| Investor | Instrument | Amount | Cap | Date | Filename |
|---|---|---|---|---|---|
| _Lead investor_ | Convertible Note | $750K – $1.0M | _TBD_ | _TBD_ | `_private/Contracts/Funding/CN_<investor>_<date>.pdf` |
| _Angel #1_ | Convertible Note (MFN) | $50K – $250K | _TBD_ | _TBD_ | `_private/Contracts/Funding/CN_<investor>_<date>.pdf` |
| _Angel #2_ | Convertible Note (MFN) | $50K – $250K | _TBD_ | _TBD_ | `_private/Contracts/Funding/CN_<investor>_<date>.pdf` |
| _Strategic angel_ | Convertible Note (MFN) | $50K – $250K | _TBD_ | _TBD_ | `_private/Contracts/Funding/CN_<investor>_<date>.pdf` |

> Update this table on each close. Drop the executed PDFs in `_private/Contracts/Funding/`. Do **not** commit signed Notes to git.

## Investor Targets (sanitized)

Names + per-investor positioning + status live in `../_private/Investor_Pipeline_2026_05.md` (gitignored). Sanitized totals only:

| Stage | Count | Aggregate target | Notes |
|---|---:|---|---|
| Lead conversations | _TBD_ | $750K–$1M | One firm or one strong individual lead |
| Strategic angels (operator / domain) | _TBD_ | $250K–$500K | Automotive ASIL, aerospace, MBSE-adjacent |
| Long-tail angels | _TBD_ | $250K–$500K | Existing network, smaller checks |

## Legal Checklist (per Note close)

- [ ] Convertible Note executed with the latest version of `Convertible_Note_TEMPLATE.md`.
- [ ] Cap, discount, interest, maturity captured in the schedule.
- [ ] Pro-rata side letter executed (≥ $250K checks).
- [ ] Wire confirmation received and reconciled in Mercury / Brex.
- [ ] Pulley updated with the new Note.
- [ ] **Form D filed within 15 days of first sale** (Reg D Rule 506(b)) — confirm with counsel; § 4(a)(2) is also available for small friends-and-family rounds.
- [ ] State blue-sky / notice filings (counsel handles).
- [ ] Investor onboarded to data room with NDA.
- [ ] Cap-table summary updated — `../04_Legal_and_Corporate/Cap_Table_Summary_2026_05.md`.
- [ ] Funding-documents inventory updated (this file).

## Open Items

- [ ] Set valuation cap with lead — 2026-06-15.
- [ ] First lead-investor close — target 2026-Q3.
- [ ] Confirm Reg D vs. § 4(a)(2) exemption with counsel — 2026-06-30.
- [ ] Pro-rata side-letter template stored in `_private/Legal/Templates/` — 2026-06-15.
- [ ] **At Reorganization:** convert all outstanding Notes to Series Seed Preferred per Section 3(b) of each Note; switch this room's active instrument to the SAFE template; update Carta (post-flip; pre-flip use Pulley).
