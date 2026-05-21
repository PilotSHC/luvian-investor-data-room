---
section: "05-market-thesis"
slug: "why-now-memo"
title: "Why Now"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> The macro question every pre-seed investor asks: *what changed in the
> last 18 months that makes this category buildable now and not three
> years ago, and what closes the window in the next 24 months?*

This memo answers that question.

---

## 1. The five forcing functions

Five independent macro shifts have converged in the 2024–2026 window. Any
two of them would produce an interesting investment. All five together
produce a category-defining one.

### 1.1 Foundation models commoditised

Frontier reasoning capability is now a commodity input. Three labs and a
half-dozen open-weights families produce roughly equivalent reasoning at
roughly converging price points, and the convergence is accelerating.

**Implication:** model choice is becoming a routing decision. The
durable enterprise margin shifts to the **operational substrate** the
model reasons over — proprietary context, governed retrieval, provenance,
permissioning. Customers have already internalised this; they are no
longer asking "which LLM?" They are asking "which substrate?"

### 1.2 Enterprise AI is hitting the trust ceiling

Every Fortune-500 with a regulated-industry exposure has spent 2024–2025
building **horizontal** AI assistants on top of generic RAG. Most of them
are now hitting the same wall:

- AI suggestions are **plausible** but the organisation cannot prove they
  are **correct**.
- Outputs are **non-traceable** to authoritative source artefacts.
- Suggestions **silently violate** organisational invariants (safety
  constraints, regulatory requirements, interface contracts).
- There is no **revocation pathway** when an upstream fact changes and
  invalidates a downstream AI-generated artefact.

The pattern is consistent: deployments that work for marketing copy do
not survive contact with engineering, safety, or compliance review. The
organisations have run the experiment, and the conclusion is converging:
**generic RAG + chatbot is not a regulated-industry primitive.**

That is the wedge. The next 18 months are when those organisations stop
trying to retrofit horizontal tooling and start buying purpose-built
substrate.

### 1.3 SysML v2 / KerML stabilised

SysML 1.x — a UML profile from 2007 — was not a foundation a startup
could reasonably bet on. Its semantics were under-specified, its tool
ecosystem was vendor-locked, and the metamodel was too loose to ground
machine reasoning.

**SysML v2** (and its underlying KerML metamodel) is the first version
with a clean, executable metamodel, a real reference implementation, an
adoption commitment from every serious incumbent (Cameo / CATIA Magic,
Capella, Polarion, IBM ELM, JetBrains MPS communities), and a textual
notation that is finally *usable for diff, review, and AI consumption.*

OMG ratified KerML and SysML v2 in late 2023; reference implementations
hardened through 2024–2025; the first wave of serious enterprise
adoption is the 2026–2028 window. That is **exactly** the window where the
operational context layer is buildable and the customers are receptive.

### 1.4 The graph + retrieval primitives are production-grade

The supporting infrastructure — vector indexes, property graphs,
constraint solvers, embedding pipelines, hybrid retrieval — are now
boring. None of them require research. All of them have at least two
credible open-source implementations and one or two managed-service
vendors. The startup cost of composing them is finally tractable.

This was not true in 2020. Anyone who tried to build this category before
2023 had to build the substrate primitives themselves.

### 1.5 Regulation is forcing the architecture

Concurrently with the technology shifts, the regulatory environment is
hardening **toward** the architecture we are describing:

- **EU AI Act** (in force 2024, enforcement 2026–2027): high-risk AI
  systems must have documentation, traceability, human oversight, and
  audit trails.
- **NIST AI Risk Management Framework** + **executive orders on safe AI**
  in defence/aerospace contexts.
- **ISO/IEC 42001** (AI management systems) becoming a procurement
  prerequisite.
- **Sector regulators** in autonomy, medical, energy, defence
  increasingly explicit that AI in safety-relevant workflows must be
  **traceable, revocable, and auditable.**

Every one of these regulatory threads converges on the same set of
primitives Luvian is building. Not by accident — the regulators have
read the same engineering literature.

---

## 2. The window

| Year | Window state |
|---|---|
| 2020–2022 | Too early. SysML v2 not stable. LLM reasoning insufficient. Enterprise demand unclear. |
| 2023 | Pre-window. SysML v2 ratified. GPT-4 ships. Demand begins to articulate. |
| **2024** | **Window opens.** Foundation models cross the trust threshold (with proper grounding). KerML / SysML v2 reference implementations hit usable. EU AI Act passes. |
| **2025** | **Wedge customers articulate the problem.** Horizontal AI fails in regulated workflows. Procurement starts asking purpose-built questions. |
| **2026** | **First buyers move.** Pre-seed and seed plays form. Incumbents wake up. Category begins to take shape. *(Today.)* |
| **2027** | **Default substrate is decided.** Whoever has 2–4 lighthouse references in autonomy / aerospace / defence becomes the assumption for the next decade of engineering AI tooling. |
| **2028+** | **Window closed.** Incumbents have either built or acquired. Greenfield substrate plays no longer competitive. |

We are entering the third row of that table. The window is roughly
**18–24 months** before the category-default question is settled.

---

## 3. Who else sees this and why we are not afraid of them

Three classes of competitor see this same opportunity. Each has a
structural reason it will be slow.

### 3.1 Incumbent PLM / ALM vendors

(Siemens / Teamcenter, Dassault / 3DEXPERIENCE, PTC / Windchill, IBM /
ELM, Atlassian / Jira+Polarion, Aras Innovator.)

**They see it.** Every one of them has an internal AI initiative and a
Gen-AI bolt-on shipped in the last 18 months.

**Why we are not afraid:**

- **Architecture lock-in.** Their substrates are 20-year-old
  document-and-workflow systems. AI-native reasoning over them is a
  retrofit, not a redesign — and the retrofit always loses to the
  greenfield.
- **Cross-tool blindness.** They cannot reason across each other's
  systems by definition. The customer's engineering organisation runs
  4–8 of these tools simultaneously. The substrate has to be the
  *neutral* layer.
- **Cultural mismatch.** Their go-to-market is multi-year RFPs with
  procurement. Ours can move at startup speed with the team that
  *actually* feels the pain.
- **AI-native is a re-org, not a feature.** Adding "ask our AI a
  question" to a tool whose data model wasn't designed for AI reasoning
  produces plausible nonsense. The incumbents will publish glossy demos
  and ship hallucinations into safety-relevant workflows. That is the
  oxygen for a purpose-built substrate.

### 3.2 Generic AI tooling (LangChain-class, vector-DB-class, "context
platforms")

**They see it horizontally.** Every "context platform" deck has a
sentence about engineering.

**Why we are not afraid:**

- **No domain ontology.** A generic context platform cannot encode that
  *"a `SafetyConcern` can only be `mitigated_by` a `RequirementOrControl`
  that is `verified_by` a `Verification` whose status is `passed`."* It
  has no opinion about engineering meaning. Without that opinion the
  substrate cannot enforce correctness.
- **No regulated-industry deployment posture.** On-prem, air-gapped,
  ITAR, FIPS, customer-managed-keys — these are not feature flags. They
  are how the entire system is built.
- **Wrong customer.** Their default customer is a SaaS marketing org or
  a customer-success team. The cost of plausible-nonsense in those
  workflows is meeting-shaped, not crash-shaped. They will not pay the
  cost of building for engineering reality.

### 3.3 New entrants in the same wedge

**They see it.** A handful of pre-seed and seed-stage teams are
articulating versions of this category.

**Why we are not afraid:**

- **Founder–market fit asymmetry.** The bottleneck for this category is
  not "can you write code." It is "do you understand what an
  engineering organisation in autonomy / aerospace / defence actually
  does and how a SysML model relates to a Polarion requirement to a
  certification artefact." That is a 10-year skill, not a 10-month
  skill. (See `06_Team/Founder_Bio_Stephan_Claxton.md`.)
- **Architecture seriousness.** Most of the new entrants are starting
  from a chatbot UI and reasoning backwards. We are starting from the
  substrate — the operational context layer — and reasoning forwards
  to the consumption surface. That order matters.
- **Speed.** A small team that knows the domain and has the
  architectural plan converges faster than a larger team that doesn't.

---

## 4. Why this is investable today

A pre-seed bet on Luvian is not a bet on:

- *"Will the founder ship a product?"* — Yes, the alpha is shipping.
- *"Will the model improve enough to make this work?"* — That has
  already happened.
- *"Will customers want this?"* — They are already telling us they do.

It is a bet on:

> *"Will this team be the default substrate that the next decade of
> engineering AI tooling assumes?"*

The window for that bet is the next 18–24 months. The structural
forces are in the founder's favour. The category is not yet decided.

This is what pre-seed conviction looks like.

---

— *Stephan Claxton, Founder, Luvian Labs LLC* · 2026-05-21
