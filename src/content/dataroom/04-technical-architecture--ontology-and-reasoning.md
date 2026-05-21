---
section: "04-technical-architecture"
slug: "ontology-and-reasoning"
title: "Ontology & AI Reasoning"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> Companion document to the **Architecture Vision Memo** and the
> **Context Graph Design**. This memo describes the ontology choice
> (SysML v2 / KerML core + domain bundles), the AI reasoning pipeline
> on top, and how confidence and grounding work end-to-end.

---

## 1. Why ontology — restated briefly

(Full argument in the Architecture Vision Memo, §4.)

Untyped substrates (pure text + vectors) produce **plausible
nonsense**. Typed substrates with an explicit ontology can *reject*
nonsense at substrate level — at the place a regulated-industry
deployment can defend it.

The ontology is therefore not a decoration. It is the load-bearing
element of the substrate that makes the difference between an AI that
*suggests* and an AI you can let *act*.

---

## 2. Why SysML v2 / KerML as the core

The choice of **KerML + SysML v2** as the foundation is deliberate:

- **It's a standard.** OMG-ratified (2023), with open-source reference
  implementations and a published metamodel. No vendor lock-in at the
  ontology layer.
- **It already encodes the relationships engineering organisations
  care about.** Allocations, satisfactions, refinements, derivations,
  conformances, dependencies — these are first-class in SysML v2. A
  generic knowledge-graph foundation would have to re-invent all of
  them.
- **It's the direction of travel.** Cameo, Capella, Polarion, IBM ELM
  are all on the SysML v2 path. Building on the standard means we are
  *upstream-compatible* with where every serious incumbent's substrate
  is going.
- **Textual notation is AI-consumable.** SysML v2 has a clean textual
  syntax that diffs, reviews, and feeds into an LLM context far more
  cleanly than the graphical-only previous generation.

We extend KerML's metamodel — we do not replace it. Our extensions
are additive bundles, not metamodel rewrites.

---

## 3. Domain ontology bundles

Engineering doesn't end at SysML. The substrate ships with extension
bundles for the domain semantics that systems-engineering organisations
actually run:

| Bundle | Domain | Standard alignment |
|---|---|---|
| **Requirements** | Engineering requirements | ReqIF, ARP4754A, INCOSE GtWR |
| **FuSa** (functional safety) | Hazards, ASIL, mitigation, FMEA | ISO 26262, IEC 61508, ARP4761 |
| **Cyber** | Threats, risk, mitigation | ISO 21434, NIST SP 800-30 |
| **Verification** | Test cases, runs, coverage, defects | DO-178C, GAMP-5 |
| **Provenance** | Source, evidence, derivation | PROV-O (W3C) |
| **Configuration management** | Baselines, branches, change | EIA-649, ISO 10007 |
| **Deployment / on-prem** | Site, environment, customer-managed-keys | (internal — regulated-industry deployment posture) |

These bundles are **versioned**, can be installed independently, and
can be authored by customers (with governance). The bundle interface is
the **only stable API** the substrate exposes for ontology extension —
it is intentionally narrow.

---

## 4. AI reasoning pipeline

(See the Context Graph Design memo, §4, for the retrieval-pipeline
diagram. This section focuses specifically on the AI-reasoning steps
within that pipeline.)

The reasoning pipeline runs in five stages:

### Stage A — Question grounding

The user (or upstream agent) submits a question. Before any LLM call,
the substrate:

- Classifies the **intent** (structural / semantic / provenance /
  temporal).
- Identifies the **scope** (which project / configuration / baseline /
  branch the question pertains to).
- Identifies the **authority** (who is asking; what they have
  permission to read; what they have permission to act on).

A question that fails authority checks is rejected here, **before
retrieval**, and never reaches the LLM.

### Stage B — Hybrid retrieval

Multiple retrieval strategies fire in parallel against the substrate:

- **Graph traversal** (typed, constrained walks).
- **Semantic search** (vector similarity, type-filtered, scope-filtered).
- **Lineage walks** (provenance subgraph).
- **Constraint solving** (ontology-level invariants, multi-hop
  dependencies).
- **Temporal projection** (validity windows, baseline membership).

Results are tagged with their retrieval source. Nothing is collapsed
into a single relevance score until the next stage.

### Stage C — Fusion & re-ranking

A fusion step merges the parallel retrievals with a **confidence-weighted
combiner**, deduplicates by lineage-coherent grouping, and produces a
ranked **context bundle** — typed nodes, edges, and provenance records
relevant to the question.

The fusion is *explainable*: at any point we can produce the per-source
contribution to a ranked item's score.

### Stage D — Grounded LLM call

Only now does the LLM see anything. The prompt is:

- **Schema-constrained output** — the substrate tells the LLM what
  shape its answer must take (structured JSON conforming to a domain
  schema).
- **Type-aware context** — the context bundle is presented with
  type-tags and provenance pointers, not as flat text.
- **Refusal-friendly** — if the LLM cannot satisfy the schema with
  high confidence, the schema admits a *"insufficient evidence"*
  branch, and the substrate uses it.

The LLM is **the last step**, not the first. Most of the work is done
by retrieval and constraint. The model is interchangeable; the
substrate is not.

### Stage E — Post-validation & provenance attachment

The LLM's response is run through:

- **Schema validation** (rejected if structurally invalid).
- **Ontology validation** (rejected if it implies relationships the
  ontology forbids — e.g., a `Verification` claiming to verify a
  `SafetyConcern` directly without going through a `Requirement`).
- **Provenance attachment** — every claim in the response is bound to
  the substrate evidence that supports it, with confidence scores.

The user (or upstream agent) sees the final response *with* the
provenance and the confidence — not as a flat answer string.

---

## 5. Confidence — propagated, not invented

A central design opinion: **confidence is not invented at the LLM
boundary**. It is propagated through the substrate, and the LLM stage
combines it but does not bypass it.

Sources of confidence in the system:

- **Source authority.** Authoritative artefacts (e.g., a baselined
  requirement) start at high confidence; speculative artefacts (e.g.,
  a draft) start lower.
- **Lineage integrity.** A derived claim with a clean provenance chain
  back to authoritative sources keeps confidence; a derived claim
  with a broken chain decays.
- **Temporal decay.** Claims about engineering state decay in
  confidence as time passes, configurable per-artefact-type.
- **Consensus signal.** Multiple independent derivations of the same
  claim raise confidence; conflicting derivations lower it.
- **Verification status.** Claims linked to passed verifications have
  higher confidence than those linked to pending ones.

Confidence is **explicit at the substrate level**, surfaced at the
consumption surface, and downstream consumers can act on it.

---

## 6. Model swappability

Because the LLM is the last step and is schema-constrained, the
substrate is **model-agnostic by design**. The same context bundle
can be sent to:

- A frontier closed-source model (GPT-class, Claude-class, Gemini-class).
- An open-weights model deployed on customer infrastructure (for
  air-gapped / regulated deployments).
- A smaller specialist model fine-tuned for a specific reasoning task
  (e.g., classification, schema extraction).
- A deterministic non-LLM "reasoner" (e.g., for the most safety-relevant
  steps, where stochastic generation is unacceptable).

**Multi-provider routing** is mediated through Vercel AI Gateway (or an
equivalent). Customers can pin a deployment to a specific provider, an
open-weights model, or to deterministic reasoning depending on the
risk classification of the workflow.

This is the architectural commitment that protects the substrate
against the **model commoditisation** trend — see the Why Now memo,
§1.1.

---

## 7. Evaluation discipline

A reasoning pipeline that cannot be evaluated cannot be trusted. The
substrate ships with a first-class **eval harness**:

- **Curated regression suites** per ontology bundle (correctness on
  ARP4754A-shaped traceability questions, ISO 26262-shaped
  hazard-derivation questions, etc.).
- **Plausible-nonsense red-team set** — questions designed to elicit
  the failure mode the substrate exists to prevent.
- **Provenance-integrity tests** — every regression run validates that
  every derived claim has a complete provenance chain.
- **Confidence calibration tests** — claims marked high-confidence
  must be correct at a rate consistent with the confidence; claims
  marked low-confidence must be flagged for review.

The eval is run on every change to the reasoning pipeline. Pre-seed
dollars include investment in expanding the regression suite.

---

## 8. What's the alpha vs. pre-seed scope

| Capability | Alpha (today) | Pre-seed scope |
|---|---|---|
| KerML / SysML v2 core ontology | ✅ | ✅ |
| Requirements bundle | ✅ | ✅ |
| Provenance bundle | ✅ | ✅ |
| FuSa (ISO 26262) bundle | partial | ✅ |
| Cyber (ISO 21434) bundle | designed | ✅ |
| Hybrid retrieval | ✅ | ✅ (production) |
| Constraint solving (multi-hop) | partial | ✅ |
| Multi-provider routing | designed | ✅ (via AI Gateway) |
| On-prem / open-weights deployment | designed | ✅ |
| Eval harness | partial | ✅ (regression-tier) |

---

— *Stephan Claxton, Founder, Luvian Labs LLC* · 2026-05-21
