---
section: "04-technical-architecture"
slug: "architecture-vision-memo"
title: "Architecture Vision Memo"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> The thesis in one sentence: **the next decade of enterprise AI value
> accrues not to the model, but to the operational context layer the model
> reasons over.** Luvian is building that layer for engineering
> organisations, where the cost of hallucination is highest and the
> structure of the work is richest.

This memo is the centrepiece of the data room. It is opinionated by design.
It exists to tell you what we believe is true about where enterprise AI is
going and why engineering is the wedge. Everything else in this room — deck,
demo, financials — is downstream of these claims.

---

## 1. The shape of the next layer

**Foundation models have commoditised.** GPT-class capability is now a
commodity input — three frontier labs and a half-dozen credible open-weights
families produce roughly equivalent reasoning at roughly converging prices.
Every meaningful enterprise will run multiple of these models in parallel
within 18 months. Model choice is becoming a routing decision.

**Where, then, does enterprise AI value accrue?**

It accrues to the **proprietary context** that the model reasons over, and
to the **operational substrate** that turns model output into trustworthy
action. Both of those are opaque to the model providers — by design, because
the providers cannot and will not own customer-specific operational state.

The shape of that substrate is:

```
┌────────────────────────────────────────────────────────────────────┐
│ Foundation models (commodity routing layer)                        │
└──────────────┬─────────────────────────────────────────────────────┘
               │  reasoning calls, tool calls, structured output
               ▼
┌────────────────────────────────────────────────────────────────────┐
│ OPERATIONAL CONTEXT LAYER  ← Luvian sits here                      │
│ • Connected artefacts: requirements, models, code, simulation,     │
│   verification evidence, test results, defects, change history     │
│ • Ontology: what kind of thing each artefact is, how it relates    │
│ • Provenance: who/what produced this, when, on what evidence       │
│ • Retrieval: structured + semantic, with confidence scoring        │
│ • Permissioning: role-, project-, jurisdiction-, ITAR-aware        │
│ • Workflow + intent: what is this team trying to do right now?     │
└──────────────┬─────────────────────────────────────────────────────┘
               │  signed, traceable, governed actions
               ▼
┌────────────────────────────────────────────────────────────────────┐
│ Systems of record (PLM, ALM, simulation, requirements DB, code)    │
└────────────────────────────────────────────────────────────────────┘
```

Existing systems of record optimise for **storage and workflow**. They were
designed before AI reasoning was on the table. The new layer optimises for
**semantic operational intelligence** — the runtime substrate that lets an
AI agent (or a human + AI pair) ask a useful question of an engineering
organisation and get a **trustworthy, traceable, defensible** answer.

That is what Luvian is building.

---

## 2. Why engineering is the wedge

We are not building a horizontal "context layer for everything." We are
starting where the unit economics of trust are most extreme:

| Domain | What goes wrong if AI hallucinates? |
|---|---|
| Marketing copy | Bad sentence. Maybe a meeting. |
| Legal review | Re-do the review. Maybe a settlement. |
| Customer support | Refund. Escalation. |
| **Engineering, regulated industry** | **Recall. Lost certification. Crash. Lawsuit. Lives.** |

In automotive, aerospace, defence, medical devices, energy, robotics,
autonomy — the cost of an AI workflow producing an answer that **looks
correct and is not** is so high that the workflow simply cannot be deployed
without provenance, traceability, governed context, and human-in-the-loop
verification gates.

This is the same insight that drove the rise of MBSE (model-based systems
engineering) over twenty years: in domains where the cost of being wrong is
catastrophic, you build a **system of meaning**, not a system of documents.

Engineering organisations have already accepted this premise. They run
SysML v2, AP242, ReqIF, DoDAF, ARP4754A, ISO 26262. They have the most
*structured* operational state of any function in the enterprise — and yet
that structure is currently scattered across PLM, ALM, requirements tools,
simulation tools, model authoring tools, code repositories, and CAD systems
that **cannot reason across each other.**

That fragmentation is the wedge. **Connecting it, with semantic grounding
and provenance, is the product.**

---

## 3. Why this is not RAG

RAG retrieves documents. It is a search index dressed for an LLM. It works
well when the answer lives inside one document and you mostly need to find
the right paragraph.

Engineering questions are not paragraph-shaped. They are graph-shaped:

- *"Which requirements does this component allocation satisfy, and which of
  those requirements have unverified safety implications under ASIL D?"*
- *"If we change this interface from synchronous to asynchronous, which
  downstream simulations are now stale, which test cases need re-running,
  and which requirements need re-tracing?"*
- *"Show me every assumption that was true at the start of this design
  cycle and is no longer true today, ranked by impact on the current
  certification basis."*

No RAG pipeline can answer these. The information is not in any one
document. It lives in the **relationships between artefacts**, in the
**provenance of derived facts**, and in the **constraints encoded by the
ontology** — none of which a vector index can reconstruct.

The Luvian architecture explicitly models:

- **Operational meaning** (what does this artefact represent?),
- **Relationships** (what does it depend on, satisfy, derive from,
  conflict with?),
- **Provenance** (who produced this, on what evidence, when, with what
  confidence?),
- **Constraints** (which invariants must hold over which projections?),
- **Interfaces** (what is the public surface of this subsystem?),
- **Intent** (what is the team trying to accomplish, as opposed to what
  did they last commit?).

These are graph and ontology problems, not retrieval problems. Vectors are
*one signal* in the retrieval pipeline — alongside structured graph queries,
constraint solving, lineage walks, and confidence-weighted aggregation —
not the substrate.

---

## 4. Why ontology is non-optional

The single most under-appreciated decision in enterprise AI is whether the
substrate is **untyped** (pure text + vectors) or **typed** (an explicit
ontology that says *"a `Requirement` and a `Verification` are different
kinds of thing, and only certain relationships are valid between them"*).

Untyped substrates feel cheaper to build and faster to demo. They produce a
class of failure that we call **plausible nonsense**: outputs that look
correct, that pass casual human review, and that are silently meaningless
because the system never enforced the relationships the output implies.

Typed substrates are slower to build, but they make a different class of
guarantee available: when the ontology says *"a `SafetyConcern` can only
be `mitigated_by` a `RequirementOrControl` that is itself
`verified_by` a `Verification` whose status is `passed`,"* an AI
suggestion that violates that constraint is rejected at the substrate
level, not by the LLM, not by the prompt, not by hope.

Luvian's ontology is grounded in **SysML v2 / KerML** primitives extended
with engineering-specific axioms (allocation, verification, satisfaction,
refinement, derivation, conformance), with a clear extension surface for
domain-specific safety, security, and reliability ontologies (ISO 26262,
ISO 21434, DO-178C, ARP4754A, IEC 62304).

The choice of SysML v2 / KerML as the foundational layer is deliberate:

- It is an **open, vendor-neutral standard** with a published metamodel
  and open-source reference implementations.
- It already encodes the relationships engineering organisations care
  about — far more than what a generic knowledge graph would have to
  reinvent.
- It is the **direction of travel** for every serious incumbent (Cameo /
  CATIA Magic, Capella, Polarion, IBM ELM) — they will all have to land on
  v2 within this decade. We start there.

> **Position:** Ontology is not academic overhead. It is the difference
> between an AI that *suggests* and an AI that you can let *act*.

---

## 5. Why provenance is non-optional

Every claim Luvian's substrate carries has a **provenance record**:

- **Source** — which artefact, which version, which author, which tool.
- **Evidence** — what derived facts depend on what source facts.
- **Confidence** — explicit, propagated, decayed over time.
- **Authority** — whose authoritative answer is this? Engineering? Safety?
  Compliance? An automated agent?
- **Timestamp & validity window** — when was this true? Is it still?

Provenance is what makes the substrate **defensible** when an auditor,
regulator, or customer asks *"how did you arrive at this conclusion?"* It
is what makes AI suggestions **revertible** when a downstream change
invalidates an upstream assumption (suspect-link propagation). It is what
lets a human reviewer **calibrate trust** instead of treating every AI
output as either fully reliable or fully suspect.

Untyped substrates can simulate provenance with metadata fields. They
cannot enforce it. Typed, governed substrates can.

---

## 6. Why this is hard, and why timing matters

The architecture we are describing — connected engineering artefacts,
ontology-grounded, provenance-tracked, AI-reasoning-ready, multi-tenant,
on-prem-capable, regulated-industry-acceptable — has been technically
plausible since roughly 2018. It has not been **economically rational** to
build until roughly 2024–2025, for three reasons:

1. **Foundation-model reasoning crossed a threshold.** Pre-2023 LLMs could
   not be trusted with engineering reasoning even with perfect context.
   Today's frontier models can — *if* the context is correctly
   constrained and provenance is enforced.

2. **SysML v2 / KerML stabilised.** The previous generation (SysML 1.x +
   UML profile) was not a foundation a startup could reasonably bet on.
   v2 is the first version with a clean metamodel, a real reference
   implementation, and a credible adoption path among incumbents.

3. **The ontology + graph + retrieval primitives have matured.** Vector
   indexes, property graphs, constraint solvers, embeddings, and the
   tooling around them are now production-grade. We do not have to invent
   any of them — we have to compose them with engineering meaning.

This is the timing window. It will close as enterprise AI matures and
incumbents move. **We expect the category to be effectively decided by
end of 2027** — not in product completeness, but in *who is the default
substrate* the next generation of engineering AI tools assume.

---

## 7. What investors should see in the demo

When you watch the demo (`03_Product_Demo/`), you should see four things
that are not present in any competing system:

1. **Connected artefacts in a single semantic graph** — requirements,
   models, code, verifications — not as a federation of separate tools,
   but as a single typed substrate.
2. **AI reasoning that uses the graph** — not just retrieves text. When
   the system suggests a requirement satisfies a stakeholder need, you
   should be able to walk the satisfaction relationship to its
   contributing evidence.
3. **Provenance visible at every claim** — every AI suggestion has a
   source, a confidence, and a path back to authoritative artefacts.
4. **Workflow orchestration that respects engineering constraints** —
   suspect links propagate, verification gates are real, and the system
   refuses suggestions that violate the ontology.

If you do not see those, the rest of this memo is rhetoric.

---

## 8. What we are *not* building

The clearest way to understand what Luvian is is to be precise about what
it is not:

- **Luvian is not a PLM.** PLM owns master data and authority over CAD,
  BOMs, change orders, manufacturing. We integrate with PLM. We do not
  replace it.
- **Luvian is not an MBSE modeling tool.** Cameo, Capella, and the SysML
  v2 reference implementations own the authoring surface for SysML
  models. We integrate with them. We do not replace them.
- **Luvian is not a requirements management tool.** DOORS, Polarion,
  Jama, ReqView own that. We integrate with them.
- **Luvian is not "Cursor for engineers."** Code-completion is a feature,
  not a category, and it is owned by the IDE.
- **Luvian is not a chatbot UI.** Chat is one consumption surface. Most
  Luvian value is consumed by other agents, by tools, and by the
  engineering organisation's own workflows.

**Luvian is the substrate underneath all of those that gives an AI agent
— or a human + AI pair — a trustworthy, traceable, governed view of the
engineering organisation's operational state.**

That is a defensible position because the systems of record are not in a
position to fill it (vendor lock-in, no cross-tool reasoning, no AI-native
architecture), and the model providers are not in a position to fill it
(no customer-specific operational state, no permission model, no
provenance).

---

## 9. The expansion path

Engineering is the wedge. The substrate generalises. Once the operational
context layer is established for engineering organisations, the same
architecture extends — in roughly this order, weighted by trust intensity
× operational structure:

1. **Engineering** — autonomy, aerospace, automotive, defence, medical,
   robotics, energy. *(today)*
2. **Manufacturing operations** — process plans, work instructions,
   quality records, deviations. *(year 2)*
3. **Regulated software development** — IEC 62304, FDA Pre-Cert, FedRAMP,
   ISO 27001 evidence chains. *(year 2–3)*
4. **Compliance & assurance organisations** — SOC2, ISO, regulatory
   submissions where the value is provenance + traceability. *(year 3+)*

Each step is a wider TAM with the same architectural primitives. We do
not prematurely productise that expansion — but we design the substrate so
the expansion is mechanical, not architectural.

---

## 10. The hardest things from here

The honest list of what will be technically hardest:

- **Ingestion at fidelity.** Reading PLM and ALM artefacts well enough to
  ground them in the ontology, without losing the semantics the source
  tools encoded.
- **Suspect-link propagation at scale.** Knowing which downstream claims
  are now stale when an upstream artefact changes — across millions of
  edges — without combinatorial blow-up.
- **Multi-tenant provenance + permission.** A single tenant's substrate
  can be vast; serving thousands of tenants with isolation and audit is a
  real systems problem.
- **Regulated-industry deployment posture.** On-prem, air-gapped,
  ITAR-acceptable, FIPS-validated cryptography, customer-managed keys.
  This is the difference between *interesting demo* and *deployable in
  the customers we want.*
- **Founder + small-team velocity through this list.** The architecture
  is sound. The execution has to be ruthless.

We are clear-eyed about all of these. The use of funds in `09_Financials/`
maps directly to closing them.

---

## 11. What success looks like

By end of the pre-seed runway:

- **2–3 design partners** in the wedge domains (autonomy / aerospace /
  defence / medical) running Luvian against their actual engineering
  artefacts, with provenance + suspect-link propagation in production.
- **Public reference architecture** documented to the level where
  engineering leaders can independently evaluate it without an NDA.
- **A team of 4–5** including the two co-founders and three engineers
  with depth in graphs, ontology, regulated-industry deployment, and AI
  reasoning systems.
- **Series-A-credible architecture story** — i.e., a partner who has
  spent two hours with this memo and the reference architecture should
  walk away thinking *"this team is the default substrate for the next
  generation of engineering AI tools."*

That is the bet. The rest of this room is evidence.

---

## Appendix · Reading order

If you have 30 minutes:

1. This memo (10 min).
2. `Why_Now_Memo.md` — macro narrative (5 min).
3. `03_Product_Demo/Demo_Walkthrough_2026_05.md` — watch the video (10 min).
4. `10_Appendix/Investor_QA_2026_05.md` — answers to the questions you're
   about to ask (5 min).

— *Stephan Claxton, Founder, Luvian Labs LLC*
*stephan@luvian.info · 2026-05-21*
