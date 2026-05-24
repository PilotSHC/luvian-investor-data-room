---
section: "10-appendix"
slug: "investor-qa"
title: "Investor Q&A"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> Pre-read for sophisticated investors. The questions below are the ones
> we have heard most often (or expect, given the category). Each answer
> aims to be defensible in a 60-second answer in a partner meeting.

---

## Architecture & technical

### Q1. Why won't existing PLM/ALM vendors or horizontal context AI do this?

Three reasons each, on each side.

**PLM / ALM incumbents** (Siemens, Dassault, IBM, PTC, Aras, Eclipse, Vitech):

* **Architecture lock-in.** Their substrates are 20-year-old document-and-workflow systems with data models predating AI reasoning. Retrofitting AI-native reasoning onto them is not a feature, it is a re-architecture. Their existing customers depend on the current data model.
* **Cross-tool blindness.** Engineering organisations run 4–8 of these tools simultaneously (PLM + ALM + requirements + simulation + code + test). No single vendor can be the neutral substrate across the others' data without commercial conflict.
* **Cultural mismatch.** Their go-to-market is multi-year RFPs negotiated with procurement. The teams that actually feel the AI-trust pain do not buy that way.

**Horizontal context AI** (Glean, Hebbia, generic context platforms):

* **No engineering ontology.** Their substrate is ontology-agnostic by design. Cannot encode SysML v2 semantics, ASIL derivation, suspect-link propagation.
* **No safety methodology engines.** HARA / TARA / STPA / SOTIF / FMEA require typed inputs and standards-conformant derivation tables. Out of scope for horizontal context AI.
* **No IL5/IL6 air-gap deployment.** Glean closed half the gap with the Dell AI Factory partnership in 2025; coverage of IL5/IL6 environments remains incomplete. SaaS-first architectures cannot reach the highest-value buyers.

**Caveat:** none of these players is stupid. The incumbents will ship Gen-AI bolt-ons; the horizontal context AI players will keep filing partner relationships into regulated industries. Those moves will produce plausible nonsense in safety-relevant workflows because the substrate underneath wasn't designed for AI reasoning. That failure is the oxygen for a purpose-built engineering intelligence layer.

---

### Q2. Why is this not just RAG?

RAG retrieves documents. Engineering questions are graph-shaped, not
paragraph-shaped. Examples:

- *"Which requirements does this allocation satisfy, and which of those
  have unverified safety implications under ASIL D?"*
- *"If we change this interface from sync to async, which simulations are
  stale, which test cases need re-running, and which requirements need
  re-tracing?"*

No RAG pipeline can answer these. The information lives in the
**relationships between artefacts**, in **provenance of derived facts**,
and in **constraints encoded by the ontology**, none of which a vector
index reconstructs.

Luvian uses vectors as **one signal** in a hybrid retrieval pipeline,
alongside structured graph queries, lineage walks, constraint solving,
and confidence-weighted aggregation. Vectors are not the substrate.

> Crisp version: *"RAG retrieves documents. Luvian models operational
> meaning, relationships, provenance, constraints, interfaces, and
> intent."*

---

### Q3. Why is ontology important?

Without an explicit ontology, the substrate is **untyped**: pure text +
vectors. Untyped substrates feel cheaper and faster to demo. They produce
**plausible nonsense**, outputs that look correct, pass casual review,
and silently violate the relationships the output implies.

Typed substrates (with an explicit ontology over `Requirement`,
`Verification`, `Allocation`, `SafetyConcern`, etc., and the legal
relationships between them) make a different class of guarantee
available: when an AI suggestion violates the ontology, the *substrate*
rejects it, not the prompt, not the LLM, not hope.

In a regulated workflow, that distinction is the difference between an AI
that *suggests* and an AI you can let *act*.

> Crisp version: *"Ontology creates consistent semantic grounding between
> humans, systems, workflows, and AI reasoning."*

---

### Q4. How do you avoid garbage-in / garbage-out?

Six concrete defences, all built into the substrate, not bolted on:

1. **Provenance.** Every claim carries source, evidence, confidence,
   authority, timestamp, and validity window.
2. **Traceability.** Every derived fact has a lineage walkback to
   authoritative source artefacts.
3. **Governed context.** What an AI agent can read at inference time is
   explicit, scoped, and auditable.
4. **Verification pathways.** Every AI suggestion can be paired with a
   verification gate (test, simulation, human review) before it
   modifies authoritative state.
5. **Confidence scoring.** Confidence is propagated, not invented, and
   it decays over time and over upstream changes.
6. **Human-in-the-loop on safety-relevant changes.** Suggestions that
   touch verified, certified, or regulated artefacts require an
   explicit human acknowledgment with role-based authority.

> Crisp version: *"You can't avoid garbage-in by trying harder at the
> prompt. You avoid it with provenance, traceability, governed context,
> verification, confidence, and HITL, built into the substrate."*

---

### Q5. What's the moat?

Five reinforcing architectural layers, mapped onto the structural advantages from the deck. Detail in [`04_Technical_Architecture/Architecture_Vision_Memo.md`](../04_Technical_Architecture/Architecture_Vision_Memo.md), section 5b.

1. **Typed engineering ontology** (SysML v2 / KerML grounded; patent-pending). Untyped substrates produce plausible nonsense; retyping after ship is a re-architecture, not a feature.
2. **Provenance + suspect-link propagation.** Every claim carries source, evidence, confidence, authority, validity window. Provenance must be enforced at the substrate level, bolt-on metadata fields cannot do this.
3. **Integrated safety methodology engines** (HARA, TARA, STPA, SOTIF, FMEA). Standards-conformant derivation from typed inputs; out of scope for both horizontal context AI and the legacy MBSE incumbents' AI bolt-ons.
4. **Cross-artifact unification.** Requirements, models, simulation, tests, telemetry on one graph; traceability verified in CI, not hand-curated. Incumbents are vendor-conflicted; horizontal context AI is ontology-agnostic.
5. **On-prem + IL5/IL6 air-gap from one codebase.** Air-gap is engineered in, not retrofitted. SaaS-first competitors face years of work to reach customer-managed-keys, FIPS, and ITAR posture.

These layers compound. Every ingestion connector and every domain ontology extension is a one-time cost that competitors pay later. Provenance graph density rises non-linearly per customer; the graph *is* the customer's operational memory. Founder and early-team domain depth in autonomy + MBSE + defense delivery is a 5–10-year skill that a generic AI team cannot compress.

We do not claim a moat from algorithms. The moat is architecture, integrations, accumulated provenance, and domain depth.

---

### Q6. What's the build vs. buy decision for incumbents?

For Siemens / Dassault / PTC / IBM / Atlassian: **build is structurally
hard** (architecture lock-in, cross-tool conflicts, cultural mismatch).
**Buy becomes obvious** as soon as a credible substrate has 2–4 lighthouse
references in autonomy / aerospace / defence.

We design every architectural decision so that "buy" is the
incumbent's most rational option in the 2027–2028 window. That is the
default exit pathway for a category-defining infrastructure play.

That said, an exit is not the goal. The goal is to be the default
substrate. Acquisition optionality is a side-effect of being right about
the architecture.

---

## Market & timing

### Q7. Why now?

See [`05_Market_Thesis/Why_Now_Memo.md`](../05_Market_Thesis/Why_Now_Memo.md) for the full memo. Four canonical forcing functions converging in 2024–2026:

1. **95% of enterprise GenAI pilots produce zero ROI** on $30–40B invested (MIT NANDA, *State of AI in Business*, Jul 2025). The substrate is the bottleneck, not the model.
2. **$13.8B in 2025 robotics funding** (vs. $7.8B in 2024). Every marquee round (Figure $39B, Skild $14B, Physical Intelligence $5.6B, Saronic $4B, Shield AI $5.3B, Anduril $61B) is a buyer or partner.
3. **DoD MOSA mandate** (Dec 2024) directs MOSA compliance at every SETR / Gate Review / Program Review for MDAPs. FY2026 weapons portfolio: $384.3B.
4. **IL5/IL6 air-gap as architecture, not afterthought.** No NAT, no DNS, no outbound. SaaS context AI is structurally locked out of the highest-value buyers.

Window: 18–24 months before category-default is decided.

---

### Q8. Isn't this a small market? "Engineering tools" feels niche.

The wedge looks small because the framing is wrong. We are **not** selling another engineering tool into the existing $4.2B MBSE-tools market. We are building the **engineering intelligence layer**, the typed, AI-native context substrate that the next decade of regulated-industry AI tooling will assume.

The bottom-up TAM math is in [`05_Market_Thesis/Market_Thesis_2026_05.md`](../05_Market_Thesis/Market_Thesis_2026_05.md).

* **TAM** $58–95B, mid-case **~$70B**. Composite of PLM ($26–37B), Industrial AI ($6–25B), A&D Digital Engineering ($6.3B), ALM ($3.5–5.6B), Knowledge-Graph platforms ($2.9B), MBSE-tools spend ($4.2B).
* **SAM (2027)** $6–12B. Defense-tech, A&D primes, tier-1 automotive, robotics platforms running concurrent MBSE + safety + V&V workflows.
* **SOM (3 years post-Seed)** $20–80M ARR via 15–40 strategic accounts at $1–2M ACV, the Glean / Cognite / Applied Intuition strategic-deal cohort, not the per-seat MBSE incumbents.

Adjacencies (manufacturing operations, regulated software development, compliance and assurance) extend the same architectural primitives without re-architecture. The TAM expands mechanically, not strategically.

---

### Q9. What's the wedge customer profile?

In priority order:

1. **Autonomy**. AV stacks, robotics, drones, already AI-saturated,
   already pain-aware, already buying purpose-built infra.
2. **Aerospace prime contractors and tier-1 suppliers**. DO-178C,
   ARP4754A, certification-driven, deep MBSE adoption already.
3. **Defence primes and integrators**. ITAR-aware, on-prem-first,
   acutely sensitive to AI hallucination in safety-of-flight workflows.
4. **Medical-device manufacturers**. IEC 62304, FDA Pre-Cert, growing
   AI exposure under regulatory scrutiny.
5. **Energy / utilities** (nuclear, grid) and **automotive Tier 1**.
   slower adopters but large TAM once the lighthouse references land.

We focus on (1)–(3) for design partners.

---

## Founder & team

### Q10. Why is this founder right for this category?

The bottleneck for this category is not engineering ability. It is
**engineering-organisation literacy** across multiple regulated-industry
domains: how a SysML model relates to a Polarion requirement to a Cameo
allocation to a DOORS trace to a certification artefact. That is a 5–10
year skill, *and* the depth has to span more than one domain or the
substrate ends up over-fitted to a single customer profile.

Stephan's career covers the three regulated-industry domains Luvian targets, autonomy, aerospace, and defense, and the contemporary AV verification frontier. Most recently at Applied Intuition on advanced autonomy and engineering infrastructure: connected artefacts, simulation + validation + verification workflows, the prototype for the engineering intelligence layer Luvian is now building. The full bio is in *06 Team/Founder Bio Stephan Claxton*. Public posture and writing at [stephanclaxton.com](https://www.stephanclaxton.com/).

The team is not solo. Jarred Gou (Head of Product) owns the product surface, multi-persona UI, AI integration plan, SysML v2 conformance, and brings the conviction that the next generation of engineering tooling must be AI-native, browser-first, and collaborative by default. Colin Zhang (Software Architect, ex-VMware) owns the cross-platform foundation, on-prem / air-gap deployment posture, and the enterprise authentication architecture (OIDC, SAML, LDAP) the regulated-industry buyer profile demands.

The combination of MBSE depth (Stephan), the AI-native product instinct (Jarred), and enterprise infrastructure credibility (Colin) maps cleanly onto the three domains Luvian sells into and the technical risks Luvian carries.

---

### Q11. What's the founding-team composition?

Two co-founders plus our first software engineer.

* **Stephan Claxton**. Founder & CEO. Systems engineer and autonomy architect. Previously at Applied Intuition on advanced autonomy and engineering infrastructure.
* **Jarred Gou**. Head of Product. Product strategy, roadmap, AI integration surface, SysML v2 conformance plan. Owns the multi-persona product surface for systems engineers, software developers, safety analysts, and program managers.
* **Colin Zhang**. Software Architect. Cross-platform foundation, on-premises and air-gapped deployment, enterprise authentication. Previously at VMware on virtualization and cloud-native platform technology.

Full bios in *06 Team/Founder Bio Stephan Claxton*. The architecture is documented to a level where it does not live in any one head ([`Architecture_Vision_Memo.md`](../04_Technical_Architecture/Architecture_Vision_Memo.md), [`Context_Graph_Design.md`](../04_Technical_Architecture/Context_Graph_Design.md), [`Ontology_and_Reasoning.md`](../04_Technical_Architecture/Ontology_and_Reasoning.md)), deliberately, as a pre-seed deliverable, not a nice-to-have.

---

### Q12. What does the team look like at end of pre-seed?

Three additional full-time hires, funded by this round, sequenced to remove specific blockers in priority order.

| Role | Hire by | Profile | Unblocks |
|---|---|---|---|
| GTM lead | Month 1–3 | Sold infra into autonomy / aerospace / defense before. Comfortable with multi-quarter sales cycles and IL5/IL6-grade procurement. | Design-partner conversion. Founder out of full-time selling. |
| Founding ML/AI engineer | Month 2–5 | Retrieval, ranking, evaluation discipline; local-first inference (ONNX, WASM); strong typed-graph instincts. | Beyond-RAG context orchestration. Local-first reasoning shipping in production. |
| Second software engineer | Month 4–8 | Context graph, ontology, provenance primitives. Pairs with Colin on platform foundation. | Suspect-link propagation at scale, multi-tenant isolation, ontology extension surface. |

Total: 6 people end of pre-seed (3 founders + 3 hires). Architecture is documented and distributed across the team, not concentrated. Detail on scope, comp, and equity is in [`06_Team/Hiring_Plan_2026_05.md`](../06_Team/Hiring_Plan_2026_05.md).

---

## Round mechanics

### Q13. Why a Convertible Note instead of a SAFE?

The issuer is currently **Luvian Labs LLC** (single-member Delaware LLC).
SAFEs convert into preferred stock, which an LLC does not have.
Convertible Notes do not require preferred stock and convert cleanly on
the planned LLC → Delaware C-corp conversion ("Delaware Flip"), at
which point all subsequent investors will use the standard YC SAFE.

The Note is in `10_Appendix/Convertible_Note_TEMPLATE.md`. The flip plan
is in `08_Legal/LLC_to_Ccorp_Conversion_Plan.md`.

---

### Q14. What's the round size and structure?

**Target: $1.5M to $2.0M** on a Convertible Promissory Note. Valuation
cap negotiated with the Lead. **No interest, no discount, cap-only
conversion.** Term: 24 months. Auto-converts on a Qualified Financing
of $2M or more, or on the Delaware Flip, whichever first.

We are open to a priced round if the right lead prefers it.

---

### Q15. What's the lead-investor profile?

Pre-seed infrastructure-fund or operator-led pre-seed lead with one of:

- **Domain depth** in AI infra, developer tools, regulated-industry SaaS.
- **Founder support**, willing to be the *active* lead through next 12
  months (intros, recruiting, board-equivalent role pre-flip).
- **Follow-on capital**, capacity to participate at the next round on
  pro-rata or super-pro-rata terms.

We are not chasing a name. We are looking for a lead who actually
believes the architecture thesis and is willing to underwrite that bet.

---

### Q16. What happens in the next 18 months that you want investors to underwrite?

Concrete deliverables, all measurable.

1. **Founding team complete** by month 4, three named full-time hires onboarded (GTM lead, founding ML/AI engineer, second software engineer).
2. **Reference architecture publicly documented** by month 6, sufficient that engineering leaders can independently evaluate without an NDA.
3. **First design partner in production** by month 9, running Luvian against actual engineering artefacts with provenance + suspect-link propagation visible end-to-end.
4. **Second + third design partners** by month 14, across the wedge phases (Evidence Layer, Requirements, Modeling).
5. **Cross-artifact unification demonstrated** at one partner, requirements + models + simulation + test on the same typed graph.
6. **IL5/IL6-adjacent customer environment battle-tested**, single-codebase deployment proved out in a regulated-industry context.
7. **Delaware Flip complete** before any Series A negotiations begin; clean post-Flip cap table.
8. **Series-A-credible architecture and reference story** by month 18, a partner who spends two hours with the architecture memo and one design partner walks away thinking *"this is the default substrate for engineering intelligence."*

That is the bet. Each milestone is a binary fail/no-fail outcome verifiable from the outside.

---

## Risks (we name them)

### Q17. What could kill this?

In rough order of probability.

1. **Slow design-partner conversion.** Regulated industries move slowly. *Mitigation:* robotics and defense-tech design partners as the speed path; aerospace and automotive ASIL programs as the depth path. The four-phase wedge (Evidence Layer → Requirements → Modeling → Safety + V&V) lands light, expands deep, partners can engage on Phase 1 in days, not quarters.
2. **A funded contestant scales the GTM motion first.** Specifically Flow Engineering ($23M Sequoia A, Oct 2025) or Trace.Space ($11.5M Seed, verbatim positioning match). *Mitigation:* depth of typed engineering ontology + integrated safety methods + IL5/IL6 air-gap. Flow is requirements-only and cloud-only; Trace.Space differentiation collapses to ontology depth and air-gap deployment.
3. **Aras + InnovatorEdge AI buys a SysML v2 modeler** to close the missing wedge. *Mitigation:* by the time a buy-build decision lands, two design partners running in production beats a 12-month integration timeline.
4. **Regulatory or geopolitical shift in defense / aerospace.** ITAR tightening, export-control changes, FedRAMP timeline shifts. *Mitigation:* on-prem-capable from day one, AV and robotics give an alternative wedge.
5. **Hiring takes longer than 90 days for the GTM lead.** *Mitigation:* active pipeline with named candidates; contractor and advisor coverage during the gap.
6. **AI commoditisation moves faster than expected**, model providers (OpenAI, Anthropic, Google) offer their own "context substrate." *Mitigation:* they cannot offer a *customer-specific* substrate that crosses their boundary; integration with their models is the assumption, not a threat. Glean's Dell AI Factory partnership is the playbook to watch but does not solve typed engineering ontology or safety methodology coverage.

We do not believe any of these is fatal at pre-seed. Each is **addressable** with capital, focus, and the right team.

---

## Process

### Q18. What's the diligence process from here?

1. **First call (this room + a 30-min Zoom).** Architecture thesis +
   demo. Stephan walks the deck.
2. **Technical deep-dive (60–90 min Zoom or in-person).** Whichever
   architecture subsystem you want to pressure-test.
   ingestion, ontology, provenance, AI reasoning pipeline, deployment
   posture.
3. **Reference call.** Two-three people we trust who can speak to
   founder-market fit and architectural seriousness. Names on request.
4. **Design-partner reference call.** Once a design partner is in
   production (month 9+), the strongest reference becomes the design
   partner's engineering leader.
5. **Term sheet.** Convertible Note template in `10_Appendix/`.

We are deliberately not running a fast-cycle process. We are looking
for the *right* lead, not the *first* lead.

---

*Stephan Claxton, Founder, Luvian Labs LLC* ·
[luvsupport@luvian.io](mailto:luvsupport@luvian.io) · 2026-05-21
