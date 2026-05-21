---
section: "05-market-thesis"
slug: "market-thesis"
title: "Market Research"
---

**Sources:** `docs/MBSE_USER_RESEARCH.md` (18+ practitioner sources),
`docs/Competitor Analysis Reports/` (Edge + OEM reports),
`docs/buyer-persona/`, `docs/sysml-v2-gap-analysis.md`,
`docs/SOLUTION_ARCHITECTURE_NDA.md` (available on request).

---

## TAM / SAM / SOM

| Market | Size | Definition |
|---|---|---|
| TAM (top-down) | ~$4.2B | Global MBSE tools spend (Cameo + Rhapsody + Capella + adjacencies). |
| TAM (broader, "structured complex design") | ~$18B | MBSE + requirements (DOORS) + safety (Ansys medini) + simulation tooling. |
| SAM (initial wedge) | ~$650M | Automotive ASIL programs + aerospace/defense MBSE in NA + EU. |
| SOM (Year 5) | ~$60M ARR | Bottoms-up build assumes 30 paying customers @ $200K avg ACV. See `../03_Financials/Financial_Model_Summary_2026_05.md`. |

> **Caveat:** These are top-down estimates triangulated from incumbents'
> public revenue (Dassault, IBM Engineering, Ansys segments) and analyst
> reports. A bottoms-up build is on the gap list (target 2026-07-01).

## Practitioner Research — The 5 Gripes

From 18+ interviews and quoted public sources:

| # | Gripe | Representative quote |
|---|---|---|
| 1 | Hostile tools | _"MBSE tools suck. If you compare them to tools in other industries, they would be ridiculed."_ — Pari Singh |
| 2 | Silo effect | _"We have the model in Cameo, the requirements in DOORS, the tests in Polarion, and nothing talks to anything."_ — anonymous defense systems engineer |
| 3 | No maturity path | _"How do I know my model is good enough to ship?"_ — recurring across 7 of 18 interviews |
| 4 | SE ↔ developer language gap | _"My software team won't read the model. They want code."_ — automotive program manager |
| 5 | Stakeholders can't see status | _"The PM looks at the model once and never opens it again."_ — aerospace systems engineer |

**Implication for product:** Each gripe maps to a specific Luvian capability
(see `Company_Overview_2026_05.md`). All five are addressed in our current
codebase, though only Gripes 1 and 2 are at "ship-ready" maturity. Gripes 3–5
are "built, gated behind feature flags" — the upcoming round funds shipping
them.

## Competitive Landscape

Detailed reports per competitor live in
`docs/Competitor Analysis Reports/Edge Product Reports/` and
`OEM Reports/`. Summary:

| Competitor | Type | Strength | Weakness | How we win |
|---|---|---|---|---|
| **Cameo Systems Modeler** (Dassault) | OEM (incumbent) | Market leader, ASIL workflow integrations | 9 GB Java desktop, dated UX, SysML v1 native (v2 migration painful) | Browser-native, AI-authoring, SysML v2-first |
| **IBM Rhapsody** | OEM (incumbent) | Defense/aerospace install base, deep IBM integration | Even older UX, expensive, slow innovation cadence | Same vector as Cameo + faster cadence |
| **Capella** (Eclipse) | Open-source | Free, Arcadia methodology adopted in EU | No SysML v2, no AI, weak collab | We give the same methodology rigor, modern UX, AI |
| **SysModeler** | Edge (modern) | Browser, modern stack | Narrow feature set, no safety methods, weak SysML v2 conformance | Broader product surface, deeper safety methods |
| **Trace-Space** | Edge (modern) | Lightweight, modern UX | Not MBSE — adjacent (requirements only) | We do MBSE _and_ requirements |
| **Systellar Space** | Edge (modern) | Aerospace verticalization | Vertical-only, weaker enterprise IT story | Multi-vertical, on-prem ready (Colin's domain) |
| **RoboFication** | Edge (modern) | Robotics niche | Narrow, no enterprise readiness | Cross-domain breadth + enterprise fit |

Detailed reports:
- `docs/Competitor Analysis Reports/OEM Reports/` — Cameo, Rhapsody, etc.
- `docs/Competitor Analysis Reports/Edge Product Reports/SysModeler_Rev1.0.md`
- `docs/Competitor Analysis Reports/Edge Product Reports/Trace-Space_Rev1.0.md`
- `docs/Competitor Analysis Reports/Edge Product Reports/Systellar-Space_Rev1.0.md`
- `docs/Competitor Analysis Reports/Edge Product Reports/RoboFication_Rev1.0.md`

## Buyer Personas

Detailed dossiers in `docs/buyer-persona/`. Top three:

1. **Economic decision-maker** — VP/Director of Systems Engineering at an
   automotive OEM or Tier-1. Owns the tooling budget, signs the contract.
   Priorities: ASIL compliance, audit trail, replacing Cameo without
   re-training the team. See `docs/buyer-persona/Economic Decision-Maker/`.
2. **Champion** — staff systems engineer who has felt the 5 gripes
   personally. Will run the pilot, evangelize internally.
3. **Gatekeeper** — IT / security architect. Cares about on-prem deployment,
   SSO/SAML/OIDC, data residency. Colin Zhang's domain expertise.

## "Why Now" Catalysts

| Catalyst | Status | Why it matters |
|---|---|---|
| SysML v2 (OMG standard) | Adopted 2024 | Forces every incumbent into a multi-year migration. Window of disruption ~18–36 months. |
| LLMs production-ready for structured authoring | 2024–2026 | The "modeling tax" that limited MBSE adoption to ~5% can finally be collapsed. |
| Regulatory tailwind | 2025+ | UN R155/R156 (cyber), updated ISO 21434, ASIL D requirements in EU CRA — all increase mandatory MBSE. |
| Browser-first migration of engineering tools | Ongoing | CAD (Onshape), EDA (Altium 365), ALM (Codebeamer cloud) — MBSE is the last holdout. |
| Defense AI mandates | 2025+ | DoD Software Modernization Strategy + EU AI Act — increase demand for traceable, auditable model-based development. |

## Open Items

- [ ] Bottoms-up TAM build with named accounts — target 2026-07-01.
- [ ] Updated competitive matrix with Q2 2026 pricing data — target 2026-08-01.
- [ ] Two named Tier-1 OEM design-partner conversations transcribed (NDA) — ongoing.
- [ ] Public-friendly redacted version of `docs/SOLUTION_ARCHITECTURE_NDA.md` — target 2026-09-01.
