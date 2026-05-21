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

## 1. The four forcing functions

Four independent macro shifts have converged in the 2024–2026 window. Any two of them would produce an interesting investment. All four together produce a category-defining one.

### 1.1 95% of enterprise GenAI pilots are failing

> **MIT NANDA, *State of AI in Business* (Jul 2025): roughly 95% of enterprise GenAI pilots produce zero measurable ROI on $30–40B already invested.** Gartner forecasts 40%+ of agentic AI projects will be cancelled by end of 2027.

The failure mode is upstream of the model. AI suggestions are plausible but the organisation cannot prove they are correct. Outputs are non-traceable to authoritative source artefacts. Suggestions silently violate organisational invariants (safety constraints, regulatory requirements, interface contracts). There is no revocation pathway when an upstream fact changes and invalidates a downstream AI-generated artefact. The pattern is consistent across every regulated-industry deployment: generic RAG + chatbot is not a regulated-industry primitive.

That is the wedge. The next 18 months are when those organisations stop trying to retrofit horizontal tooling and start buying purpose-built substrate. Frontier reasoning capability has commoditised; the durable margin has shifted to the operational substrate the model reasons over, proprietary context, governed retrieval, provenance, permissioning. Customers are no longer asking "which LLM?" They are asking "which substrate?"

### 1.2 $13.8B in robotics funding flowed in 2025 (vs. $7.8B in 2024)

The marquee 2024–2026 robotics rounds. Figure ($39B post), Skild ($14B post), Physical Intelligence ($5.6B post), Saronic ($4B post), Shield AI ($5.3B post), Anduril ($61B post, Mar 2026), are each a buyer or a partner for an engineering intelligence layer. The robotics renaissance is the single largest concentration of new engineering complexity in a generation, and every team in it is running concurrent MBSE + safety + V&V + telemetry workflows on tooling built for the era of single-product OEMs.

Each of those companies has the cost structure ($1B+ programs), the regulatory pressure (FAA, NHTSA, DoD), and the AI-native instinct (founders who came from frontier labs) to be a strategic-ACV customer for a typed, AI-native engineering substrate. None of them is building it themselves at the platform level, they are buying.

### 1.3 DoD MOSA mandate, December 2024

The December 2024 DoD memo directs **MOSA (Modular Open Systems Approach) compliance at every SETR, Gate Review, and Program Review for MDAPs**. The FY2026 weapons portfolio is $384.3B. MOSA is not a documentation requirement; it is a structural one, it requires a typed, AI-readable model spine that connects requirements, designs, safety analysis, verification evidence, and configuration baselines across the program lifecycle.

In parallel: the EU AI Act (in force 2024, enforcement 2026–2027) requires documentation, traceability, human oversight, and audit trails for high-risk AI systems. NIST AI RMF and ISO/IEC 42001 are becoming procurement prerequisites. Every one of these regulatory threads converges on the same set of primitives Luvian is building. Not by accident, the regulators read the same engineering literature.

### 1.4 IL5/IL6 air-gap as architecture, not afterthought

The highest-value buyers in defense, A&D, and government will not deploy any architecture with outbound network calls. **No NAT, no DNS to external, no outbound.** This is not a feature flag. It is how the system is built end-to-end: local-first AI inference, on-prem persistence, customer-managed keys, FIPS-validated cryptography, ITAR-aware packaging.

SaaS context AI (Notion AI, Hebbia, most Glean tenancies) is structurally locked out. Glean closed half of this gap in 2025 with the Dell AI Factory partnership but coverage of IL5/IL6 environments remains incomplete. The architectural commitment to single-codebase cloud-and-air-gap deployment that Luvian made on day one is the structural lane no horizontal context AI player can enter without re-architecting.

### A note on SysML v2

SysML v2 ratification (OMG, 2023) and reference-implementation hardening (2024–2025) are *enabling preconditions* for the wedge surface, they make the typed engineering ontology buildable and the textual notation usable for diff, review, and AI consumption. They are not, on their own, a forcing function. Cameo shipped SysML v2 conformance in December 2025; the "first SysML v2 modeler" race is over. The four forcing functions above are what makes the *engineering intelligence layer* category investable now.

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

Four classes of competitor see this same opportunity. Each has a structural reason it will be slow. The detailed competitive matrix and the named threat list (Flow Engineering, Trace.Space, Aras + InnovatorEdge AI) live in *Competitive Landscape*. The high-level classes:

### 3.1 Horizontal context AI (Glean, Hebbia)

**They see it.** Glean ($7.2B post, Sep 2025) and Hebbia ($130M Series B, Mar 2025) define the horizontal substrate category and command strategic ACVs.

**Why we are not afraid:** no engineering ontology, no safety methodology engines, and no air-gap deployment posture. Glean's Dell AI Factory partnership closes part of the on-prem gap but does not solve IL5/IL6 environments or typed engineering semantics. The lane is structurally open.

### 3.2 Incumbent PLM / ALM vendors

(Siemens / Teamcenter, Dassault / 3DEXPERIENCE, PTC / Windchill, IBM /
ELM, Atlassian / Jira+Polarion, Aras Innovator.)

**They see it.** Every one of them has an internal AI initiative and a
Gen-AI bolt-on shipped in the last 18 months.

**Why we are not afraid:**

- **Architecture lock-in.** Their substrates are 20-year-old
  document-and-workflow systems. AI-native reasoning over them is a
  retrofit, not a redesign, and the retrofit always loses to the
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

### 3.3 Generic AI tooling (LangChain-class, vector-DB-class, "context
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
  ITAR, FIPS, customer-managed-keys, these are not feature flags. They
  are how the entire system is built.
- **Wrong customer.** Their default customer is a SaaS marketing org or
  a customer-success team. The cost of plausible-nonsense in those
  workflows is meeting-shaped, not crash-shaped. They will not pay the
  cost of building for engineering reality.

### 3.4 New entrants in the same wedge (Flow Engineering, Trace.Space)

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
  substrate, the operational context layer, and reasoning forwards
  to the consumption surface. That order matters.
- **Speed.** A small team that knows the domain and has the
  architectural plan converges faster than a larger team that doesn't.

---

## 4. Why this is investable today

A pre-seed bet on Luvian is not a bet on:

- *"Will the founder ship a product?"*. Yes, the alpha is shipping.
- *"Will the model improve enough to make this work?"*. That has
  already happened.
- *"Will customers want this?"*. They are already telling us they do.

It is a bet on:

> *"Will this team be the default substrate that the next decade of
> engineering AI tooling assumes?"*

The window for that bet is the next 18–24 months. The structural
forces are in the founder's favour. The category is not yet decided.

This is what pre-seed conviction looks like.

---

*Stephan Claxton, Founder, Luvian Labs LLC* · 2026-05-21
