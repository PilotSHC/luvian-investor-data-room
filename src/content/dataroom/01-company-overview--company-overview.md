---
section: "01-company-overview"
slug: "company-overview"
title: "Luvian — Company Overview"
---

**Last updated:** 2026-05-21
**Legal entity:** Luvian Labs LLC (single-member LLC; sole member: Stephan Claxton)
**Stage:** Pre-seed — open for investment via Convertible Promissory Note
**Status:** Confidential — shared under NDA

---

## What Luvian Is

Luvian is a browser-native, AI-powered systems engineering platform for
structured complex design. We replace 1990s-era MBSE tools (Cameo Systems
Modeler, IBM Rhapsody, Capella) with a modern, collaborative, SysML v2-native
environment that engineers will actually use.

## The One-Liner

> **The MBSE tool that systems engineers and software developers can finally
> agree on** — SysML v2 in the browser, AI-native, real-time collaborative.

## Why Now

Three forces have converged for the first time in 30 years:

1. **SysML v2** (OMG, adopted 2024) is a new modeling standard that breaks
   backwards compatibility — every incumbent has to retool. The window to
   leapfrog them is roughly 18–36 months.
2. **AI-native authoring** — LLMs can now generate, validate, and refactor
   structured engineering models. This collapses the "modeling tax" that has
   limited MBSE adoption to ~5% of engineering teams.
3. **Browser-first collaboration** — the entire engineering tools market
   (CAD, EDA, ALM) is migrating off thick clients. Modeling tools are the
   last holdout. Cameo still ships a 9 GB Java desktop app.

## The Problem

From primary research (`Market_Research_2026_05.md`, 18+ practitioner
sources), MBSE today suffers from five reproducible pain points:

| # | Gripe | One-line summary |
|---|---|---|
| 1 | Hostile tools | 9 GB RAM Java desktop apps with 1990s UX |
| 2 | Silo effect | Disconnected from CAD, test, requirements, and PM workflows |
| 3 | No maturity path | Teams can't tell when their model is "ready" for review |
| 4 | SE ↔ developer language gap | Systems engineers and software engineers cannot read each other's artifacts |
| 5 | Stakeholders can't see status | Non-modelers cannot consume the model |

Quote from the field: _"Organizations buy the best MBSE tool, but after three
months no one was using it."_ — one-sys.eu

## What We're Building

A unified platform that addresses all five gripes in one product:

- **Browser-native, real-time collaborative canvas** for SysML v2 (Gripe 1, 2).
- **Progressive maturity gates** (Integration Readiness Reviews, conformance
  scoring) that tell teams when a model is ready (Gripe 3).
- **Bidirectional code ↔ model translation** so software developers consume
  the same model as systems engineers (Gripe 4).
- **Stakeholder views**: KPIs, safety dashboards, validation reports for
  non-modelers (Gripe 5).
- **AI-native authoring** layered across the stack: ambient suggestions,
  domain agents, RAG-grounded validation.

## Who It's For (in order of go-to-market priority)

1. **Automotive ASIL-rated programs** (ISO 26262) — Stephan's domain from
   Applied Intuition. Strong tooling pain, mandatory MBSE, willing to pay.
2. **Aerospace / Defense** (DO-178C, MIL-STD-882E) — large incumbent
   contracts, but slower procurement.
3. **Industrial automation & robotics** — long tail, lighter compliance,
   faster adoption. Wedge for product-led growth later.

## Founder

**Stephan Claxton — Founder & Sole Member, Luvian Labs LLC.**
Previously at Applied Intuition, where he worked on simulation and validation
platforms for autonomous vehicles. Has first-hand experience with the
complexity of model-based development in safety-critical systems — exactly
the problem space Luvian targets. Brings domain credibility in the automotive
and autonomous-systems market: ASIL-rated development workflows, simulation-
driven V&V, and the toolchain fragmentation that plagues autonomous-vehicle
programs. That experience directly informs Luvian's safety analysis features
(HARA, TARA, STPA, SOTIF, FMEA) and verification architecture.

Stephan owns and operates Luvian Labs LLC as a single-member LLC; the
company is solo-founded today. The use-of-funds plan in this round
specifically includes converting the company to a Delaware C-corp and
recruiting two co-founders / first hires (engineering + GTM) onto the team
as W-2 employees with founder-equivalent equity grants.

## Product Status (as of 2026-05)

- ~780 source files across 6 subsystems (client, API server, landing, infra,
  tests, shared contracts).
- 42 components, ~98 modules, 54+ UI primitives.
- Browser-native SPA, real-time collab via Yjs/Hocuspocus, SysML v2 importer,
  AI agents, safety analysis methods, requirements engineering with INCOSE
  quality scoring.
- ~40% of feature surface gated behind flags (built, not yet shipped). Core
  thesis is now to *ship* the existing capabilities to design partners.

See `Product_Demo_Links_2026_05.md` for live walkthroughs, and the internal
`presentations/data-room/` for engineering metrics.

## The Round

- **Stage:** Pre-seed.
- **Instrument:** **Convertible Promissory Note** (LLC-stage; auto-converts on
  Qualified Financing or on conversion of Luvian Labs LLC → Delaware C-corp,
  whichever first; valuation cap TBD; no discount or 20%; 5% interest, 24-month
  maturity).
- **Target:** $1.5M – $2.0M.
- **Use of funds:**
  - **Conversion to Delaware C-corp** ("Delaware Flip") — counsel, filings,
    re-papering of equity. ~$5K all-in.
  - **First two engineering hires + first GTM hire** as W-2 founding
    employees with founder-grade equity.
  - 3+ design-partner pilots, on-prem packaging hardening, AI cost runway.
- **Milestones gating Series A:** Delaware Flip complete, 3 paying design
  partners, $300K+ ARR-equivalent pilot commitments, ASIL-rated reference
  deployment, full executive team in place.

Detailed financial model: `../03_Financials/Financial_Model_Summary_2026_05.md`.
Cap table and dilution: `../04_Legal_and_Corporate/Cap_Table_Summary_2026_05.md`.
Convertible Note template: `../05_Agreements_and_Contracts/Convertible_Note_TEMPLATE.md`.
LLC → C-corp conversion plan: `../04_Legal_and_Corporate/LLC_to_Ccorp_Conversion_Plan.md`.
