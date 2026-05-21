---
section: "03-financials"
slug: "financial-model-summary"
title: "Financial Model — Executive Summary"
---# Financial Model — Executive Summary (2026-05)

**Source:** `presentations/financial-model/index.html` (5-year P&L, unit
economics, competitive landscape, funding scenarios, sensitivity analysis —
15 charts, 12 tables).

**Editable workbook:** `Financial_Model_2026_05.xlsx` — _TBD_, target
2026-06-15. Until then, this markdown summary is the authoritative
investor-facing version.

---

## Top-Line Assumptions

| Driver | 2026 | 2027 | 2028 | 2029 | 2030 |
|---|---|---|---|---|---|
| Paid design partners | 0 | 3 | 8 | 16 | 30 |
| Average ACV | n/a | $100K | $150K | $200K | $250K |
| Net revenue retention | n/a | 100% | 110% | 115% | 120% |
| Gross margin | n/a | 70% | 75% | 78% | 80% |
| Headcount EOY | 5 | 11 | 22 | 38 | 60 |

> **All figures are forward-looking and subject to material variance.**
> Pre-revenue companies are extremely sensitive to design-partner timing;
> the round funds the next 18 months precisely so we can _convert the
> assumptions into evidence_.

## Use of Funds (this round, 18-month plan)

| Bucket | % of round | Rationale |
|---|---:|---|
| Engineering hires (5 hires) | 55% | Core hires: senior full-stack, senior platform/SysML, AI/ML engineer, design engineer, founding sales engineer. |
| Design-partner conversion | 15% | Travel, on-site deployments, paid pilot subsidies, ASIL workshop hosting. |
| AI / cloud cost runway | 10% | Anthropic, AI gateway, embedding storage, on-prem proof-of-concepts. |
| On-prem packaging hardening | 8% | Cross-platform CI matrix (macOS, Linux, Windows), Docker images, SAML/OIDC/LDAP integrations. |
| Legal & compliance | 5% | NDAs, IP filings, insurance, ASIL/ISO compliance prep. |
| Operations & buffer | 7% | Tooling, accounting, contingency. |

Detailed by-month build is in the spreadsheet model. See also the
1-year team plan: `presentations/team-plan/index.html` (3 → 11 headcount,
8 hires in 12 months).

## Funding Scenarios

Three scenarios modeled in the workbook:

| Scenario | Round | Runway | Series A timing | Comments |
|---|---|---|---|---|
| **Conservative** | $1.5M | 16 months | 2027-Q4 | 2 design partners, 1 paid. Tightest. |
| **Base** | $1.75M | 18 months | 2027-Q3 | 3 design partners, 2 paid. Plan-of-record. |
| **Stretch** | $2.0M | 20 months | 2027-Q3 | 4 design partners, 3 paid. Enables earlier sales hire. |

## Unit Economics (forward-looking, modeled)

| Metric | Year 2 (2027) | Year 3 (2028) | Year 5 (2030) |
|---|---|---|---|
| Average ACV | $100K | $150K | $250K |
| CAC (founder-led + sales engineer) | $25K | $40K | $50K |
| LTV (5-yr horizon, 5% logo churn) | ~$420K | ~$700K | ~$1.2M |
| LTV / CAC | 17x | 17x | 24x |
| Payback period | < 4 months | < 4 months | < 3 months |

Caveats: pre-revenue, so these are model outputs not measurements. The
spreadsheet exposes every input cell so investors can flex assumptions
themselves.

## Sensitivity Headlines

The model includes sensitivity bands on the three highest-leverage assumptions:

| Variable | Down (P10) | Base (P50) | Up (P90) |
|---|---|---|---|
| Time to first paid pilot | +6 months | as planned | -3 months |
| Average ACV (Y3) | $100K | $150K | $250K |
| AI infra cost per active user / month | $250 | $80 | $30 |

If all three "Down" cases hit simultaneously, runway shortens to ~12 months
and we'd need a bridge or to re-cut hiring. The base case remains intact
through any single one of them missing.

## Competitive Landscape — Spending Context

For grounding investor expectations on what enterprise modeling companies
look like at scale:

| Company | Revenue (most recent disclosure) | Status |
|---|---|---|
| Dassault (CATIA + Cameo segment) | ~$5.0B (broader CATIA), MBSE estimated ~$400M | Public, incumbent |
| IBM Engineering (Rhapsody, DOORS) | ~$300M est. | Slow growth, brand-protected |
| Eclipse Capella | n/a (open-source) | Adoption indicator only |
| Innoslate | ~$15M est. | Niche player |
| **Luvian (target Y5)** | $50–80M ARR | Plan-of-record |

## Open Items

- [ ] Convert HTML model to a fully formula-driven Excel/Google Sheet — owner Jarred, 2026-06-15.
- [ ] Add bottoms-up TAM build (named accounts × spend bands) — owner Jarred + Stephan, 2026-07-01.
- [ ] Get an outside review of the model from a fractional CFO — 2026-08-01.
- [ ] Lock the post-money cap and the per-investor allocation table — 2026-06-15.

## Versioning

| Version | Date | Notes |
|---|---|---|
| `2026_05` | 2026-05-21 | Initial external version, mirrors live HTML model. |
