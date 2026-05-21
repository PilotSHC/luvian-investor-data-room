---
section: "09-financials"
slug: "use-of-funds"
title: "Use of Funds. Pre-Seed Round"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> Lean by design. At pre-seed, what investors evaluate is not the
> precision of the numbers, it is whether the founder is **capital-aware,
> milestone-driven, and clear-eyed about where the dollars convert into
> de-risk.** This memo answers exactly that.

---

## TL;DR

| Field | Value |
|---|---|
| Round target | $1.5M – $2.0M |
| Runway | **18 months** at planned spend; **~22 months** at lean spend |
| Spend rate at planned (peak team) | ~$110K/month |
| Spend rate at lean (current solo) | ~$15K/month |
| Largest line item | Co-founder + early-team cash + equity (~55% of raise) |
| Smallest line item | Compute / model spend (~5% of raise) |

We will close on $1.5M minimum; we will accept up to $2.0M if the right
lead wants more allocation. We will not raise more than $2.0M at this
stage, that is a deliberate ceiling to keep the next round's valuation
math clean.

---

## How we think about pre-seed capital

Three principles drove the line-item decisions below:

1. **Capital converts into de-risk, not into headcount.** Each dollar is
   evaluated on which architectural or commercial risk it removes.
2. **Milestones drive spend.** Spend ramps as milestones land, not as
   the calendar progresses.
3. **Optionality is preserved.** We deliberately under-budget GTM
   buildout (founder-led + co-founder-led GTM in the wedge is enough at
   this stage) to preserve runway for a longer architecture cycle if
   needed.

---

## Use of funds, by bucket

Total raise: **$1.5M – $2.0M.** Below is the planned allocation at the
midpoint (**$1.75M**); the percentages hold across the range.

| Bucket | % | $ at $1.75M | What it buys |
|---|---:|---:|---|
| **1. Team, co-founders + early hires** | 55% | $963K | 2 co-founders (eng + GTM) + 2–3 senior engineers + founding designer over 18 months. Mix of cash + equity, weighted to cash for senior engineers and to equity for co-founders. |
| **2. Ingestion + ontology infrastructure** | 20% | $350K | Connector engineering (PLM, ALM, simulation, code, requirements), ontology authoring + governance tooling, hybrid retrieval pipeline, eval infrastructure. Includes both internal engineering time *and* paid external dependencies (graph DB, vector DB, ontology authoring). |
| **3. Design-partner deployment + on-prem packaging** | 15% | $263K | Customer-success engineering, regulated-industry deployment posture (FIPS, ITAR, customer-managed-keys, FedRAMP-prep), reference architecture documentation, deployment-tooling, SOC 2 Type 1 lite. |
| **4. Compute, infra, model spend** | 5% | $88K | Foundation-model API spend (multi-provider via Vercel AI Gateway or equivalent), vector + graph infrastructure hosting, eval pipeline compute. |
| **5. Legal, compliance, ops** | 5% | $88K | LLC → Delaware C-corp Flip + post-flip Series-A-ready clean-up, IP assignment, contracts, accounting, EU AI Act / ISO 42001 readiness, Vercel + cloud spend. |

| **Total** | **100%** | **$1,750,000** |  |

---

## Spend ramp, quarterly

Spend ramps with milestones. The first quarter is intentionally low
(close + co-founder hire negotiations); peak burn is months 9–18 once
the team is fully assembled.

| Quarter | Burn | Triggers |
|---|---:|---|
| Q1 (months 1–3) | ~$60K/mo | Round close, co-founder hire #1 (eng), legal flip kickoff |
| Q2 (months 4–6) | ~$95K/mo | Co-founder hire #2 (GTM), 2 senior engineers, ingestion ramp |
| Q3 (months 7–9) | ~$115K/mo | First design partner in production; founding designer; on-prem packaging |
| Q4 (months 10–12) | ~$120K/mo | Second design partner; Delaware Flip complete |
| Q5 (months 13–15) | ~$120K/mo | Third design partner; Series-A-credible architecture story |
| Q6 (months 16–18) | ~$110K/mo | Series A prep + close |

Average: **~$104K/month** over 18 months → **$1.87M total** at peak
plan (within the $1.5–$2.0M range).

---

## Salary policy

Honest pre-seed answer:

- **Founder (Stephan)**: minimal cash salary while the substrate is
  pre-revenue, ramping to a market-floor founder salary (~`[FILL IN]`)
  once the round closes.
- **Co-founders**: market-floor cash + meaningful founder-equivalent
  equity grants (subject to standard 4-year vesting with 1-year cliff,
  set up properly post-flip to allow 83(b) elections).
- **Senior engineers**: market-rate cash + early-stage equity grants
  (target: ~0.5–1.0% per senior hire, vesting 4-year / 1-year cliff,
  pre-Series-A).
- **Founding designer**: similar to senior engineer grant.

Total cash compensation across the team is sized so that 18 months of
runway is realistic at the **midpoint** of the raise, not the upper
bound.

---

## What this round is *not* funding

To keep the principles concrete, here is what we are explicitly *not*
spending pre-seed capital on:

- **A traditional sales team.** No SDRs, no AEs, no enterprise sales
  director. The wedge customers are sold founder-to-founder and
  co-founder-to-engineering-leader at this stage.
- **Heavy marketing spend.** No paid acquisition. Demand-generation in
  this category is reputation-led + thought-leadership-led, both of
  which the architecture memo + technical writing produce.
- **A finished GA product.** The pre-seed milestone is "design partners
  in production," not "GA launch." We do not over-engineer for users we
  do not yet have.
- **Speculative R&D outside the architecture.** No "what if we extended
  to compliance ops in pre-seed", we know the substrate generalises;
  we do not productise that until post-seed.

These are the budget temptations that fail pre-seed companies. Saying
*no* to them is the discipline.

---

## Bridge / runway scenarios

If the round closes at the lower bound ($1.5M), the team is one senior
engineer lighter and the design-partner deployment timeline slips by
~2 months. We model that as the **lean** scenario; runway is still
~18 months because spend ramps slower.

If the round closes at the upper bound ($2.0M), the additional capital
extends runway to ~22 months without changing the team composition,
giving an extra quarter of buffer before the Series A.

We do **not** model a "raise more than $2.0M" scenario. A $3M+ pre-seed
constrains the next round's valuation math more than it helps.

---

## Series A premise (for the lead's planning)

The pre-seed round is sized to deliver **Series-A-credible** evidence:

- 2–3 design partners in production
- Reference architecture publicly documented and battle-tested
- 5–6 person team with depth in graphs, ontology, regulated-industry
  deployment, and AI reasoning
- Delaware Flip complete; clean cap table; ready for preferred stock

Series A target: **$8–15M priced round** in the post-Flip C-corp,
12–18 months from pre-seed close. Lead's pro-rata participation is
contemplated and capital-planned.

---

## Detail / model

The full editable model is at
`Financial_Model_2026_05.csv` (pre-existing) and the line-item burn
breakdown is in `Financial_Model_Summary_2026_05.md`.

We deliberately do **not** ship a 5-year, line-itemised, fake-precision
financial model. At pre-seed it is theatre. We will ship one when there
is signed revenue to project from.

---

*Stephan Claxton, Founder, Luvian Labs LLC* · 2026-05-21
