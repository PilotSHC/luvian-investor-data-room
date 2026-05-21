---
section: "05-market-thesis"
slug: "market-thesis"
title: "Market Thesis"
---

**Sources:** [internal-comms/market-eval-v2/_research/](https://github.com/PilotSHC/internal-comms/tree/main/market-eval-v2) (TAM build + comparable companies), [internal-comms/gripe-gap-analysis/](https://github.com/PilotSHC/internal-comms/tree/main/gripe-gap-analysis) (practitioner research), , .

---

## The Category

Luvian is building the **Engineering Intelligence Layer**: a typed, versioned, permission-aware engineering knowledge graph plus beyond-RAG context orchestration plus local-first AI reasoning. The category is the substrate enterprise AI needs in regulated engineering. It is not "a better MBSE tool." MBSE, and the SysML v2 conformant modeler we ship today, is the wedge surface, not the category.

The category is defined by the integration of five capabilities no one else combines: (1) typed engineering ontology, (2) cross-artifact unification, (3) integrated safety methodologies, (4) provenance and suspect-link propagation, (5) air-gap deployment from a single codebase. Adjacent categories, horizontal context AI (Glean, Hebbia), vertical industrial AI (Cognite, Applied Intuition), MBSE / ALM incumbents (Cameo, DOORS, Aras), each cover one or two. None covers all five.

## TAM / SAM / SOM

| Market | Size | Definition |
|---|---|---|
| **TAM (engineering intelligence layer)** | **$58–95B**, mid-case ~$70B | Composite: PLM ($26–37B), Industrial AI ($6–25B), A&D Digital Engineering ($6.3B), ALM ($3.5–5.6B), Knowledge-Graph platforms ($2.9B), MBSE-tools spend ($4.2B). Triangulated against incumbent public revenue (Dassault, IBM Engineering, Ansys segments, Glean, Cognite). |
| **SAM (2027)** | **$6–12B** | Defense-tech, A&D primes, tier-1 automotive, robotics platforms running concurrent MBSE + safety + V&V workflows with active AI procurement. |
| **SOM (3 years post-Seed)** | **$20–80M ARR** | 15–40 strategic accounts at $1–2M ACV. The Glean / Cognite / Applied Intuition strategic-deal cohort, not the per-seat MBSE incumbents. |

Bottoms-up SOM build is in [internal-comms/market-eval-v2/_research/01-market-sizing.md](https://github.com/PilotSHC/internal-comms/tree/main/market-eval-v2/_research). Sensitivity ranges flow into the financial model at [09_Financials/Financial_Model_2026_05.csv](../09_Financials/Financial_Model_2026_05.csv).

## Comparable Companies. Strategic-Deal Cohort

The peer set under the new framing.

| Company | Recent round / status | Why this is the right comp | Implication for Luvian |
|---|---|---|---|
| **Glean** | $7.2B post (Sept 2025) | Horizontal context layer for the enterprise. Validates buyer demand and strategic ACV. | Vertical engineering depth + IL5/IL6 air-gap is Luvian's structural lane Glean cannot enter. |
| **Hebbia** | $130M Series B (Mar 2025) | Beyond-RAG context for high-stakes verticals. Strong narrative anchor. | Similar reasoning architecture goal; engineering ontology and safety methods are not in Hebbia's roadmap. |
| **Cognite** | $1.6B post (2022) | Industrial knowledge graph, OT data context. | Adjacent vertical (industrial process). Engineering-design context and safety methods sit upstream. |
| **Applied Intuition** | $15B post (Mar 2025) | Vertical AI for autonomous systems. Founder-market-fit anchor (Stephan ex-AI). | Test/sim execution sits downstream of design intent. We unify the design-side context layer Applied does not. |
| **Anduril** | $61B post (Mar 2026) | Defense autonomy, IL5/IL6 customer profile. | Buyer + partner archetype, not category competitor. Lattice is a tasking bus, not a context graph. |
| **Foretellix** | $85M Series C (Jul 2024) | Scenario-based verification for AV. | Sim-side execution. Engineering intent + cross-artifact unification is open lane. |

These are the comps an investor underwrites against, the cohort that anchors strategic ACVs of $1–2M, NRR > 120%, and category-defining outcomes. Pricing Luvian against per-seat MBSE incumbents underprices the category by an order of magnitude.

## The Threat List

Three contestants meaningfully affect the SOM build. Each is named and tracked.

| Threat | Stage | Why it matters | Differentiation |
|---|---|---|---|
| **Flow Engineering** | $23M Series A (Sequoia, Oct 2025) | Same buyer persona, same wedge entry (requirements + traceability), funded sales motion. | Luvian unifies modeling + safety + V&V on top. Flow is requirements-only and cloud-only; cannot reach IL5/IL6. |
| **Trace.Space** | $11.5M Seed | Verbatim positioning match: agentic requirements + central knowledge graph. | Differentiation collapses to depth of typed ontology + air-gap deployment + safety methodology coverage. |
| **Aras + InnovatorEdge AI** | $250M strategic (2024) | Graph-based PLM with enterprise distribution and an AI overlay. Could buy a SysML v2 modeler. | Missing SysML v2 native + integrated safety methods. Displacement target rather than head-to-head. |

The legacy MBSE incumbents (Cameo, Rhapsody, Capella, Modelio) are wedge displacement targets, not category competitors. Cameo shipped SysML v2 in December 2025, the "first SysML v2 modeler" moat is gone, but cross-artifact unification + AI-native architecture + air-gap is not. See *Competitive Landscape* for the full matrix.

## Practitioner Research. The 5 Gripes (Wedge Evidence)

The five concrete pain points that lead practitioners to abandon their existing MBSE tools. They are the wedge entry points; the category we ultimately build is the engineering intelligence layer that makes the gripes irrelevant. Sourced from 18+ interviews in [internal-comms/gripe-gap-analysis/](https://github.com/PilotSHC/internal-comms/tree/main/gripe-gap-analysis).

| # | Gripe | Representative quote | Luvian status |
|---|---|---|---|
| 1 | Hostile tools | *"MBSE tools suck. If you compare them to tools in other industries, they would be ridiculed."*. Pari Singh | Solved. Browser SPA, React Flow canvas, real-time collaboration. |
| 2 | Silo effect | *"We have the model in Cameo, the requirements in DOORS, the tests in Polarion, and nothing talks to anything."*, anonymous defense systems engineer | Architecturally ready, integration-points wired, production connectors are the round's work. |
| 3 | No maturity path | *"How do I know my model is good enough to ship?"*, recurring across 7 of 18 interviews | IRR gates and conformance scoring exist internally; not yet customer-facing. |
| 4 | SE / SW language gap | *"My software team won't read the model. They want code."*, automotive program manager | Bidirectional code-to-model agent exists server-side; UI surface is the round's work. |
| 5 | Stakeholders cannot see status | *"The PM looks at the model once and never opens it again."*, aerospace systems engineer | Multi-persona stakeholder views are built; behind feature flags awaiting design-partner feedback. |

Implication for product: each gripe maps to a specific Luvian capability. All five are addressed in the current codebase. Gripes 1 and 2 are at ship-ready maturity. Gripes 3, 4, 5 are built and feature-flagged, the upcoming round funds shipping them.

## Buyer Personas

Detailed dossiers . Top three:

1. **Economic decision-maker.** VP / Director of Systems Engineering at a defense prime, A&D OEM, or tier-1 automotive supplier. Owns the tooling budget, signs the contract, has fielded both an MBSE migration and an enterprise AI pilot in the last 24 months and watched both fail to integrate. Priorities: cross-artifact unification, audit trail, IL5/IL6 deployment posture.
2. **Champion.** Staff systems engineer or chief architect who has felt the 5 gripes personally. Will run the pilot, evangelise internally, draft the procurement justification.
3. **Gatekeeper.** IT / security architect. Cares about on-prem deployment, SSO (SAML / OIDC / LDAP), FIPS validation, data residency, and the absence of outbound network calls from any AI inference path. Colin Zhang's domain.

## "Why Now" Catalysts

The full case is in *Why Now Memo*. The four canonical drivers:

| Catalyst | Status | Why it matters |
|---|---|---|
| 95% GenAI failure | MIT NANDA, *State of AI in Business*, Jul 2025 | $30–40B invested in enterprise GenAI; near-zero ROI. Failure mode is upstream of the model: context. |
| Robotics funding surge | $13.8B in 2025 vs. $7.8B in 2024 | Every marquee round (Figure $39B, Skild $14B, Physical Intelligence $5.6B, Saronic $4B, Shield AI $5.3B, Anduril $61B) is a buyer or partner. |
| DoD MOSA mandate | Dec 2024 memo | MOSA compliance at every SETR, Gate Review, Program Review for MDAPs. FY2026 weapons portfolio: $384.3B. Open architectures imply typed, AI-readable model spines. |
| IL5/IL6 air-gap as architecture | 2024–2026, accelerating | No NAT, no DNS, no outbound. SaaS context AI (Notion AI, Hebbia, most Glean tenancies) is structurally locked out of the highest-value buyers. |
