---
section: "09-financials"
slug: "financial-model-summary"
title: "Financial Model — Executive Summary"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> **Category framing:** Luvian is positioned as the **context layer for engineering intelligence** — the typed, versioned, permission-aware graph that enterprise AI needs in order to reason about engineered systems. The full sourced market evaluation is in *Market Eval v2* (internal-comms `market-eval-v2/`); this summary mirrors its TAM / SAM / SOM, comparable set, and ACV trajectory.

> **What this is and is not.** This is the lean view of the financial story. It is not a five-year line-itemised "enterprise" model — at pre-seed that is theatre. The editable workbook (`Financial_Model_2026_05.csv`) exposes every input cell so investors can flex assumptions themselves; a fractional-CFO review and a bottoms-up TAM build (named accounts × spend bands) are scheduled for 2026-Q3.

---

## Top-Line Assumptions

| Driver | 2026 | 2027 | 2028 | 2029 | 2030 |
|---|---|---|---|---|---|
| Strategic accounts in production (paid) | 0 | 2 | 6 | 16 | 35 |
| Average ACV | n/a | $750K | $1.0M | $1.3M | $1.6M |
| Net revenue retention | n/a | 100% | 110% | 115% | 120% |
| Gross margin | n/a | 50% | 65% | 75% | 80% |
| Headcount EOY | 5 | 11 | 22 | 38 | 60 |

> **All figures are forward-looking and subject to material variance.** Pre-revenue companies are extremely sensitive to first-deal timing and to the depth of each first deal. The round funds the next 18 months precisely so we can convert these assumptions into evidence.

The ACV ladder is calibrated to the Market Eval v2 SOM build: 15–40 strategic accounts in A&D primes, defense tech (Anduril / Shield AI / Saronic peer set), and tier-1 automotive / robotics, each at $1–2M ACV. The trajectory above lands at the mid-band of $20–80M ARR by year three post-pre-seed close, anchored to the Cognite ($100M ARR over ~10 years post-founding) and Applied Intuition (2x YoY at scale, $830M ARR by 2025) growth curves for vertical engineering AI infra.

We do **not** budget revenue from current design partners as runway. Design-partner revenue is bonus runway, not a planned line in the forecast.

---

## TAM / SAM / SOM (under the new category)

| Layer | 2025 size | Method |
|---|---|---|
| **TAM ceiling** | **$58–95B** (mid-case ~$70B) | Sum-of-parts across PLM ($26–37B), ALM / requirements ($3.5–5.6B), MBSE ($1.5–7.4B), industrial AI ($6–25B), enterprise context AI ($6.3–7B), graph DB + enterprise KG ($6.7–8B), A&D digital engineering ($6–7B). Sourced across 8+ analyst reports; honest spread reflected. |
| **SAM (2027)** | **$6–12B** | Spend addressable to a typed, versioned, permission-aware engineering graph: A&D digital engineering MBE 2027 (~$8B at 11.6% CAGR off $6.3B/2025) + engineering-applicable slice of enterprise KG ($1.5–3B) + engineering-applicable slice of industrial AI ($1.5–3B). *Luvian triangulation — flagged.* |
| **SOM (3-yr post-Seed)** | **$20–80M ARR** | Bottom-up: 15–40 strategic accounts × $1–2M ACV. Anchored to Cognite + Applied Intuition growth curves. |

Versus the prior MBSE-only sizing (~$4.5B with 10–17% CAGR), the new framing is meaningfully larger and structurally different — peer set is no longer "which modeling tool do you prefer" but "where does the typed, AI-readable representation of your engineered system live."

---

## Use of Funds (this round, 18-month plan)

| Bucket | % of round | Rationale |
|---|---:|---|
| Engineering hires (5 hires) | 55% | Core hires: senior full-stack, senior platform / context graph, AI/ML engineer, design engineer, founding sales engineer. |
| Design-partner conversion | 15% | Travel, on-site deployments, paid pilot subsidies, ASIL workshop hosting, IL5/IL6 deployment readiness. |
| AI / cloud cost runway | 10% | Foundation-model API spend, embedding storage, on-prem proof-of-concepts. |
| On-prem packaging hardening | 8% | Cross-platform CI matrix (macOS, Linux, Windows), Docker images, SAML / OIDC / LDAP, FedRAMP-prep posture. |
| Legal & compliance | 5% | NDAs, IP filings, insurance, EU AI Act / ISO 42001 readiness, ASIL / ISO 26262 prep. |
| Operations & buffer | 7% | Tooling, accounting, contingency. |

The detailed by-month build is in the spreadsheet model. The narrative companion is `Use_of_Funds_2026_05.md` (round shape) and `Financial_Forecast_2026_05.md` (runway shape).

---

## Funding Scenarios

Three scenarios modeled in the workbook:

| Scenario | Round | Runway | Series A timing | Comments |
|---|---|---|---|---|
| **Conservative** | $1.5M | 16 months | 2027-Q4 | 2 strategic accounts in production, 1 paid. Tightest. |
| **Base** | $1.75M | 18 months | 2027-Q3 | 3 strategic accounts in production, 2 paid. Plan-of-record. |
| **Stretch** | $2.0M | 20 months | 2027-Q3 | 4 strategic accounts in production, 3 paid. Enables earlier sales-engineering hire. |

---

## Unit Economics (forward-looking, modeled)

Pre-seed unit economics are model outputs, not measurements. The strategic-account framing produces fewer, larger deals than the MBSE-tool framing, with longer cycles and higher CAC absorbed by deeper landed-and-expanded ACVs.

| Metric | Year 2 (2027) | Year 3 (2028) | Year 5 (2030) |
|---|---|---|---|
| Average ACV | $750K | $1.0M | $1.6M |
| CAC (founder-led + sales engineer) | $80K | $130K | $180K |
| LTV (5-yr horizon, 5% logo churn) | ~$3.1M | ~$4.6M | ~$7.5M |
| LTV / CAC | ~39× | ~35× | ~42× |
| Payback period | < 5 months | < 5 months | < 4 months |

Caveats: pre-revenue, no production CAC measured, no production churn observed. Anchored to Glean's 2025 enterprise CAC profile and Cognite's industrial-AI deal economics. The spreadsheet exposes every input.

---

## Sensitivity Headlines

The model includes sensitivity bands on the three highest-leverage assumptions:

| Variable | Down (P10) | Base (P50) | Up (P90) |
|---|---|---|---|
| Time to first paid pilot | +6 months | as planned | -3 months |
| Average ACV (Y3) | $600K | $1.0M | $1.5M |
| AI infra cost per active deployment / month | $2,500 | $800 | $300 |

If all three "Down" cases hit simultaneously, runway shortens to ~12 months and we re-cut hiring or bridge. The base case remains intact through any single one of them missing.

The largest sensitivity is **time to first paid pilot**, which under the new category framing is a longer cycle (regulated-industry security review, on-prem deployment, IL5/IL6 prep) but a deeper landed deal. The lead investor's introductions into A&D primes and defense-tech leadership directly de-risk this variable.

---

## Comparable Valuations (engineering intelligence layer cohort)

The comparable set under the new category is not legacy MBSE incumbents — it is the cohort that anchors investor expectations for typed, AI-native infrastructure that serves engineered-systems buyers.

| Company | Most-recent ARR / Revenue | Valuation | Source / Date |
|---|---|---|---|
| **Glean** (horizontal context AI) | $100M+ ARR (Feb 2025) | $7.2B (June 2025) | Glean Series F press release, 2025-06-10. |
| **Hebbia** (document context AI) | $13M ARR (mid-2024)* | $700M (July 2024)* | TechCrunch, 2024-07-09. *Stale; flagged. |
| **Cognite** (industrial DataOps) | $170M+ revenue FY2025; ~$100M ARR SaaS FY2024 | $1.6B (May 2021, last disclosed) | Cognite newsroom, 2025; TCV release, 2021. |
| **Applied Intuition** (vertical sim / AI for AVs → physical AI) | $830M ARR (2025) — doubled YoY | $15B (June 2025) | Sacra; Applied Intuition Series F, 2025-06. |
| **Anduril** (defense Lattice OS) | $2.2B revenue (2025) | $61B (May 2026) | Sacra, 2025–2026. Plus 10-yr, up-to-$20B U.S. Army enterprise contract. |
| **Aras** (PLM, graph-based) | ~$148M est. (3rd-party) | Not public | Compworth profile; GI Partners majority growth investment Apr 2021. |
| **Shield AI** (autonomy stack) | Not disclosed | $5.3B (March 2025) | Nasdaq, 2025-03. |
| **Saronic** (autonomous warships) | Not disclosed | $4B (Feb 2025) | TechCrunch, 2025-02-19. |
| **Luvian (target Y3 post-Seed)** | $20–80M ARR (SOM band) | Series A premise | Plan-of-record. |

The legacy MBSE comp set (Cameo / Rhapsody / DOORS / Capella) is preserved in the pitch-deck wedge narrative as the *displacement story* — those vendors anchor the bottom-right of the positioning matrix in Market Eval v2 (high vertical depth, fragmented horizontal reach via federation). They are not the right comparables for sizing the SOM Luvian is building toward.

---

## Threat Landscape (financial implications)

Three contestants meaningfully affect the SOM build under the new category:

| Threat | What it means for the model |
|---|---|
| **Flow Engineering** ($23M Sequoia Series A, Oct 2025) | Same buyer persona; will compress sales cycles for the wedge if it scales. Plan-of-record assumes Flow takes 1–2 of the 30+ tier-1 auto / robotics accounts in our SOM. |
| **Trace.Space** (verbatim positioning match — agentic requirements + "central knowledge graph") | Closest verbatim positioning match. Differentiation collapses to depth of typed ontology + air-gap deployment + safety-method coverage. |
| **Aras Innovator + InnovatorEdge AI** | Graph-based PLM with enterprise distribution and AI overlay; missing SysML v2 + safety methods. Potential displacement target rather than head-to-head competitor at our deal size. |

Two structural shifts in 2025–2026 also bear on the model:

- **Cameo shipped SysML v2 in Dec 2025** (2026x release). The "first SysML v2 modeler" moat is gone. Moat shifts to cross-artifact unification + AI-native context graph — exactly the new category framing.
- **Glean closed half the on-prem moat** via Dell AI Factory (May 2025) + Customer-Hosted GA. True offline IL5/IL6 + a typed engineering ontology remains an open lane and is the Luvian right-to-win.

---

## Why-Now Drivers (financial significance)

Four converging 2025–2026 forces underpin the new TAM and the buying motion:

1. **95% of enterprise GenAI pilots produce zero ROI** despite $30–40B invested (MIT NANDA, July 2025). Failure mode = data fragmentation + semantic weakness = Luvian's exact thesis. Gartner separately forecasts 40%+ of agentic AI projects cancelled by end of 2027.
2. **Robotics / autonomy raised $13.8B in 2025**, up from $7.8B in 2024 — exceeds the 2021 peak. Each marquee round (Figure $39B, Skild $14B, Physical Intelligence $5.6B, Saronic $4B, Shield AI $5.3B) is a buyer or partner for an engineering intelligence layer.
3. **DoD MOSA mandate (Dec 2024)** directs MOSA compliance at all SETRs, Gate Reviews, and Program Reviews for MDAPs. FY2026 weapons portfolio: $384.3B (RDT&E $179.1B + Procurement $205.2B). The buying motion for typed, traceable, air-gap-ready engineering knowledge did not exist in 2022.
4. **Air-gap is now an architectural requirement, not a deployment option** for DoD IL5/IL6, FedRAMP High, CMMC L2–3. SaaS context AI (Notion AI, Hebbia, most Glean tenancies) is structurally locked out.

Each driver expands the SAM beyond the legacy MBSE footprint and shortens the qualifying cycle for the buyer set in our SOM.

---

## Open Items

- [ ] Convert CSV model to a fully formula-driven Excel / Google Sheet — owner Jarred, 2026-06-15.
- [ ] Bottoms-up TAM build (named accounts × spend bands × buyer-persona) — owner Jarred + Stephan, 2026-07-01.
- [ ] Outside review of the model from a fractional CFO — 2026-08-01.
- [ ] Lock the post-money cap and the per-investor allocation table — 2026-06-15.
- [ ] Cross-reference Market Eval v2 footnote citations into the workbook — owner Stephan, 2026-06-30.

---

## Versioning

| Version | Date | Notes |
|---|---|---|
| `2026_05` v1 | 2026-05-21 | Initial external version (legacy MBSE-tool category framing). |
| `2026_05` v2 | 2026-05-21 | **Pivoted to Engineering Intelligence Layer framing per Market Eval v2.** Replaced TAM / ACV ladder / comparable set; added threat landscape and why-now drivers. |
