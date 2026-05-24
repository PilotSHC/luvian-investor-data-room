---
section: "01-company-overview"
slug: "company-overview"
title: "Luvian. Company Overview"
---

**Last updated:** 2026-05-21
**Legal entity:** Luvian Labs LLC (single-member LLC; sole member: Stephan Claxton)
**Stage:** Pre-seed, open for investment via Convertible Promissory Note
**Status:** Confidential, shared under click-through-gated NDA-equivalent

---

## What Luvian Is

Luvian is the context layer for engineering intelligence: a typed, versioned, permission-aware knowledge graph that connects requirements, designs, safety analysis, tests, and telemetry, and gives AI a substrate it can actually reason on. Browser-native, real-time collaborative, SysML v2 conformant, single codebase deployable in cloud or fully air-gapped IL5/IL6 environments.

We are the substrate enterprise AI needs in regulated engineering, not another LLM-wrapper "co-pilot." The wedge is the Engineering Intelligence Layer category. The first surface is a SysML v2 modeler with integrated safety methods. The five-year product is the connected graph that makes every AI reasoning loop in an autonomous-systems program trustworthy.

## The One-Liner

> **The context layer for engineering intelligence.** A typed engineering graph. Beyond-RAG context orchestration. Local-first reasoning. Cloud-or-on-prem from one codebase.

## Why Now

Four forcing functions converge for the first time. See *Why Now Memo* for the full case.

1. **95% of enterprise GenAI pilots return zero ROI** on $30–40B invested (MIT NANDA, *State of AI in Business*, Jul 2025). The substrate is the bottleneck. Models are not.
2. **$13.8B in 2025 robotics funding** vs. $7.8B in 2024. Each marquee round (Figure $39B, Skild $14B, Physical Intelligence $5.6B, Saronic $4B, Shield AI $5.3B, Anduril $61B) is a buyer or partner for an engineering intelligence layer.
3. **DoD MOSA mandate** (Dec 2024 memo) directs MOSA compliance at every SETR, Gate Review, and Program Review for MDAPs. FY2026 weapons portfolio is $384.3B. Open architectures imply a typed, AI-readable model spine.
4. **IL5/IL6 air-gap as architecture, not afterthought.** No NAT, no DNS, no outbound. SaaS context AI is structurally locked out of the highest-value buyers.

## The Problem

Enterprise AI in regulated engineering does not fail because models are bad. It fails because engineering context is fragmented across PLM, ALM, simulation, code, requirements, and tribal knowledge, stale by lunchtime, permission-locked across teams, and structurally invisible to retrieval pipelines built for chunked text. *State of AI in Business* (MIT NANDA, Jul 2025) attributes the 95% failure rate to context, not models. Gartner forecasts 40%+ of agentic AI projects will be cancelled by end of 2027 for the same reason.

Underneath that meta-failure, we observe five concrete pain points in the systems-engineering surface (*Market Research*, 18+ practitioner sources):

| # | Gripe | One-line summary |
|---|---|---|
| 1 | Hostile tools | 9 GB RAM Java desktop apps with 1990s UX. |
| 2 | Silo effect | Disconnected from CAD, test, requirements, simulation, and PM workflows. |
| 3 | No maturity path | Teams cannot tell when their model is "ready" for review. |
| 4 | SE / SW language gap | Systems engineers and software developers cannot read each other's artifacts. |
| 5 | Stakeholders cannot see status | Non-modelers cannot consume the model. |

Quote from the field: *"Organizations buy the best MBSE tool, but after three months no one was using it."*, one-sys.eu

These five gripes are the wedge entry points. The category we ultimately build is the engineering intelligence layer that makes the gripes irrelevant.

## What We're Building

Four pillars of the context layer:

1. **Context Acquisition.** Connectors into PLM, ALM, simulation, code, requirements, tests, and telemetry. Bidirectional where source-of-truth allows; read-only with provenance otherwise.
2. **Semantic Normalization.** Typed engineering ontology with stable IDs, versioning, and permission boundaries. Patent-pending. Replaces the "pile of disconnected strings" that defeats every chunked-RAG pipeline.
3. **Context Orchestration.** Graph traversal, contradiction detection, suspect-link propagation. Beyond-RAG by design, structured reasoning over typed nodes, not vector similarity over text.
4. **AI Reasoning.** Local-first inference. Gap detection, not suggestion generation. AI answers *what's missing, what changed, and what's at risk*, with provenance, not "here's a paragraph that sounds plausible."

The first surface that ships today addresses all five practitioner gripes in one product:

* Browser-native, real-time collaborative canvas for SysML v2 (gripes 1, 2).
* Progressive maturity gates (Integration Readiness Reviews, conformance scoring) that tell teams when a model is ready (gripe 3).
* Bidirectional code-to-model translation so software developers consume the same model as systems engineers (gripe 4).
* Multi-persona stakeholder views: KPIs, safety dashboards (HARA, TARA, STPA, SOTIF, FMEA), validation reports (gripe 5).
* AI-native authoring layered across the stack: ambient suggestions, domain agents, RAG-grounded validation, gap detection over the typed graph.

## Who It's For (in order of go-to-market priority)

1. **Defense tech and A&D primes.** DO-178C / DO-254, MIL-STD-882E, MOSA. IL5/IL6 air-gap is a structural unlock no SaaS context-AI competitor can match.
2. **Automotive ASIL-rated programs** (ISO 26262, ISO 21434). Stephan's domain from Applied Intuition. Strong tooling pain, mandatory MBSE, willing to pay strategic ACVs.
3. **Robotics platforms and tier-1 mechatronics.** Lighter compliance posture, faster adoption velocity, the Phase-1 *evidence layer* lands quickly here.
4. **Aerospace civil and space.** Long sales cycles, high contract value, strong narrative pull from the autonomy renaissance.

## Team

Two co-founders plus our first software engineer. Full bios in *06 Team/Founder Bio Stephan Claxton*.

* **Stephan Claxton**. Founder & CEO. Systems engineer and autonomy architect; previously at Applied Intuition.
* **Jarred Gou**. Head of Product. Product strategy, roadmap, AI integration surface, SysML v2 conformance plan.
* **Colin Zhang**. Software Architect. Cross-platform foundation, on-premises and air-gapped deployment, enterprise authentication; previously at VMware.

This round funds the Delaware Flip and three additional hires: GTM lead, founding ML/AI engineer, and a second software engineer.

## Product Status (as of 2026-05)

* Roughly 780 source files across 6 subsystems (client, API server, landing, infra, tests, shared contracts).
* 42 components, roughly 98 modules, 54+ UI primitives.
* Browser-native SPA, real-time collaboration via Yjs / Hocuspocus, SysML v2 importer + Langium parser, AI agents, safety-analysis methods, requirements engineering with INCOSE quality scoring.
* Roughly 40% of feature surface gated behind flags (built, not yet shipped). Core thesis is now to *ship* the existing capabilities to design partners.
* Single-codebase, dual-profile deployment: cloud (Vercel + Supabase) and on-prem (`docker compose up` on macOS, Linux, Windows; air-gap-ready).

See *Product Demo Links* for live walkthroughs and [04_Technical_Architecture/](../04_Technical_Architecture/) for the architecture corpus.

## The Round

* **Stage:** Pre-seed.
* **Instrument:** Convertible Promissory Note (LLC stage; auto-converts on a Qualified Financing or on conversion of Luvian Labs LLC to Delaware C-corp, whichever is first; valuation cap negotiated with the Lead; **no interest, no discount**; 24-month maturity).
* **Target:** $1.5M – $2.0M.
* **Use of funds:**
  * **Delaware Flip**, counsel, filings, re-papering of equity. Roughly $5K all-in.
  * **First three full-time hires:** GTM lead, founding ML/AI engineer, second software engineer. W-2 founding employees with founder-grade equity.
  * 3+ design-partner pilots, on-prem packaging hardening, AI cost runway.
* **Series A milestones:** Delaware Flip complete, 2–3 strategic accounts in production, reference architecture publicly documented, cross-artifact unification demonstrated at one partner, IL5/IL6-adjacent customer environment battle-tested, 6-person team operating without the founder as a bottleneck.

Detailed financial model: *09 Financials/Financial Model Summary*. Cap table: *08 Legal/Capitalization Table*. Convertible Note template: *10 Appendix/Convertible Note*. LLC-to-C-corp conversion plan: *08 Legal/LLC to Ccorp Conversion Plan*.
