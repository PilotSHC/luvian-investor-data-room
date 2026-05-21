---
section: "04-technical-architecture"
slug: "context-graph-design"
title: "Context Graph Design"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> Companion document to the **Architecture Vision Memo**. Where the
> Vision Memo argues *why* a typed substrate matters, this document
> describes *what the substrate looks like* — the graph model, the
> primary node and edge types, the persistence layer, and the
> retrieval pipeline.

This is not a final reference architecture. It is the architectural
**commitment** at pre-seed — the shape of the substrate the team is
building. It is documented to the level where a Series-A-stage technical
investor can pressure-test it without an NDA.

---

## 1. Substrate model — types first

The substrate is a **typed property graph** with a small, fixed set of
node and edge meta-types and a much larger, extensible set of
domain-specific types layered on top.

### Node meta-types

| Meta-type | Examples | Why it matters |
|---|---|---|
| **Artefact** | `Requirement`, `Allocation`, `Block`, `Function`, `Interface`, `TestCase`, `Verification`, `SafetyConcern`, `Hazard`, `MitigationControl` | The first-class engineering objects |
| **Container** | `Project`, `Configuration`, `Baseline`, `Branch`, `WorkPackage` | Authoritative scoping of who-owns-what-when |
| **Provenance** | `Source`, `Author`, `Tool`, `Evidence`, `Claim` | First-class records of how facts came to be |
| **Workflow** | `Activity`, `Gate`, `Approval`, `Suggestion`, `Rejection` | First-class records of the engineering motion |
| **Reference** | `Standard`, `Regulation`, `Citation` | Out-of-substrate authority anchors |

### Edge meta-types

| Meta-type | Examples | Why it matters |
|---|---|---|
| **Structural** | `containedIn`, `partOf`, `derivedFrom` | The static topology |
| **Semantic** | `satisfies`, `verifies`, `allocates`, `refines`, `mitigates` | The engineering meaning |
| **Provenance** | `producedBy`, `evidencedBy`, `reviewedBy` | The "how do we know" graph |
| **Temporal** | `supersedes`, `precedes`, `validAt` | Time-aware reasoning |
| **Dependency** | `dependsOn`, `affectsConfidenceOf`, `suspectIfChanged` | Suspect-link propagation |

Every node and edge carries metadata: type, version, valid-from /
valid-to timestamp, confidence, authority, and a pointer back into the
provenance subgraph.

This is **deliberately not** a free-form graph. The constraint
solver runs over node and edge type signatures the same way a
type-checker runs over function signatures — that is what allows the
substrate to *reject* nonsense at substrate level instead of at
prompt level.

---

## 2. Domain-specific layers

The meta-types above are intentionally generic. The domain-specific
types are layered on top, packaged as **ontology bundles**:

| Bundle | Owns | Status (alpha) |
|---|---|---|
| **Core** | The meta-types above | Shipped |
| **SysML v2 / KerML** | Block, Part, Item, Action, Function, Interface, Allocation | Shipped (browser parser) |
| **Requirements** (ReqIF / ARP4754A-shaped) | Requirement, Refinement, Verification, Justification | Shipped |
| **Safety / FuSa** (ISO 26262-shaped) | Hazard, SafetyConcern, ASIL, MitigationControl, FunctionalSafetyRequirement | Designed; partial alpha |
| **Cyber** (ISO 21434-shaped) | ThreatScenario, RiskAssessment, CybersecurityClaim | Designed; pre-seed scope |
| **Verification** | TestCase, TestRun, Coverage, Defect | Designed; partial alpha |
| **Provenance** (PROV-O-shaped) | Activity, Agent, Entity, Derivation | Shipped |

Customers can extend with their own ontology bundles. Bundle versioning
is first-class: a substrate can host multiple versions concurrently with
clean upgrade paths.

---

## 3. Storage substrate

The substrate runs on a **graph + vector + relational** persistence
layer. None of the three pieces is novel. The opinion is in how they
compose.

| Layer | Responsibility | Implementation choice (alpha → pre-seed) |
|---|---|---|
| **Graph** | Typed nodes, edges, constraint validation, lineage walks | Embedded property-graph (alpha) → managed graph DB (pre-seed) |
| **Vector** | Semantic similarity over artefact text + names + descriptions | Embedded (alpha) → managed vector DB (pre-seed) |
| **Relational / KV** | Operational metadata, audit log, workflow state | SQLite (alpha) → Postgres (pre-seed) |
| **Object** | Authoritative file blobs (CAD, simulation outputs, large attachments) | Filesystem (alpha) → S3-class object store with customer-managed keys (pre-seed) |

Key opinion: **the substrate does not own master data for the
authoritative file blobs**. The authoritative copy of a Cameo model
file lives in Cameo's repository; the authoritative copy of a Polarion
requirement lives in Polarion. The substrate is the *operational
context layer* — it ingests, projects, and reasons over those artefacts,
but it does not become the system of record. That decision is what
makes the substrate **buyable** by enterprises that already have systems
of record they cannot replace.

---

## 4. Retrieval pipeline

When an AI agent (or human + AI pair) asks a question of the substrate,
the question goes through a **hybrid retrieval pipeline**:

```
Question
   │
   ▼
┌──────────────────────────────────────────────────────┐
│ 1. Intent classification (what kind of question?)    │
│    - structural / semantic / provenance / temporal   │
└──────────────────┬───────────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────────┐
│ 2. Plan synthesis                                    │
│    - which retrieval strategies fire, in what order  │
│    - graph traversal? semantic search? constraint?   │
└──────────────────┬───────────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────────┐
│ 3. Parallel retrieval                                │
│    - graph traversal (typed, constrained)            │
│    - semantic search (vector, with type filter)      │
│    - lineage walk (provenance subgraph)              │
│    - constraint solving (ontology-level invariants)  │
│    - permission filter (role / project / jurisdiction)│
└──────────────────┬───────────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────────┐
│ 4. Fusion + re-ranking                               │
│    - confidence-weighted merge                       │
│    - dedup, lineage-coherent grouping                │
│    - explainable scoring                             │
└──────────────────┬───────────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────────┐
│ 5. Grounded LLM call                                 │
│    - prompt is constrained to retrieved context      │
│    - schema-constrained output (structured response) │
│    - provenance attached to every claim              │
└──────────────────┬───────────────────────────────────┘
                   ▼
                 Answer (with citations + confidence)
```

The fundamental design opinion: **the LLM is the last step, not the
first**. Most of the work is done by retrieval + constraint, not by
the model. That is what keeps the substrate trustworthy as the model
underneath swaps from GPT-class to Claude-class to a future
open-weights frontier.

---

## 5. Constraint solving

The substrate enforces a small set of **first-class invariants** that
no AI suggestion can violate:

- **Type compatibility** — an edge of type `verifies` requires a
  `Verification`-typed node on one end and a `Requirement`-typed (or
  satisfaction-chain) node on the other.
- **Authority constraints** — a suggestion to modify a node owned by a
  configuration-frozen baseline requires explicit baseline-unfreeze
  authority.
- **Provenance integrity** — every derived claim must point back to at
  least one authoritative source; orphan claims are rejected at
  substrate level.
- **Suspect-link propagation** — when an upstream artefact changes,
  downstream AI-generated claims are *automatically* marked stale and
  re-evaluated.
- **Permission boundaries** — role-, project-, and jurisdiction-level
  permissions are enforced at the substrate level, not at the
  application layer.

Some of these are enforced by graph schema. Some by datalog-class
rule evaluation. Some by integrated constraint solvers for the harder
relationships (multi-hop dependencies, time-windowed validity).

---

## 6. What's working in alpha vs. pre-seed scope

| Capability | Alpha (today) | Pre-seed scope | Series-A scope |
|---|---|---|---|
| Typed substrate (core meta-types) | ✅ | ✅ | ✅ |
| SysML v2 ingestion (browser parser) | ✅ | ✅ | ✅ |
| Provenance graph | partial | ✅ | ✅ |
| Suspect-link propagation | partial | ✅ | ✅ |
| Hybrid retrieval (vec + graph) | ✅ | ✅ | ✅ |
| Constraint solving (full) | partial | ✅ | ✅ |
| Multi-tenant deployment | — | designed | ✅ |
| On-prem / air-gap deployment | — | ✅ (packaging) | ✅ (FedRAMP) |
| Ingestion connectors (PLM, ALM, etc.) | partial | first 3–4 | full set |
| Ontology authoring UI (governance) | — | ✅ | ✅ |
| Eval pipeline | partial | ✅ | regression-tier |

Pre-seed dollars convert primarily into the rows above currently marked
*partial* or *designed*.

---

## 7. What this is *not*

To stay precise:

- **Not a general-purpose knowledge graph.** Engineering is opinionated.
- **Not a vector database with extras.** Vectors are one signal of
  many.
- **Not an LLM wrapper.** The LLM is the last step in a pipeline that
  does most of its work without one.
- **Not a chat UI with an agent.** Chat is a consumption surface; most
  consumption is by other tools and other agents.
- **Not a system of record.** It is the operational context *layer*
  over the systems of record.

---

— *Stephan Claxton, Founder, Luvian Labs LLC* · 2026-05-21
