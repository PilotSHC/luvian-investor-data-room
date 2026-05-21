---
section: "05-market-thesis"
slug: "competitive-landscape"
title: "Competitive Landscape"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> Where Luvian sits relative to horizontal context AI, vertical industrial AI, MBSE / ALM incumbents, engineering copilots, and generic AI context platforms — and why none of them is structurally able to do what we are doing.

---

## 1. The 30-second positioning

> *Luvian is the **context layer for engineering intelligence**: the typed, versioned, permission-aware engineering graph plus beyond-RAG context orchestration plus local-first AI reasoning that the AI agents increasingly consuming engineering organisations need to actually be trustworthy.*

That positioning is deliberately **horizontal across tools, vertical within domain.** We are not a tool category Luvian fights for. We are the substrate that makes the existing tool categories AI-native, and the engineering intelligence layer beneath every workflow that depends on cross-artifact reasoning.

---

## 2. The competitive map

```
                       AI-NATIVE
                          ▲
                          │
   horizontal context AI  │      LUVIAN
   (Glean, Hebbia,        │      Engineering Intelligence Layer
   "context platforms")   │      Vertical-deep + AI-native +
   ───────────────────────┼─►   air-gap + safety methods
                          │      = empty corner today.
   ←──────────────────────┼──────────────────────→
   GENERIC                                    DOMAIN-DEEP
                          │
   engineering copilots   │
   (Cursor, Codeium,      │     vertical industrial AI
   GitHub Copilot)        │     (Cognite, Applied Intuition,
   + incumbent PLM/ALM    │      Anduril, Foretellix)
   AI bolt-ons (Cameo,    │     + MBSE / ALM incumbents
   DOORS, Aras)           │       (Cameo, Rhapsody, DOORS, Aras)
                          ▼
                       NOT AI-NATIVE
```

The upper-right quadrant — **AI-native + domain-deep + air-gap deployable** — is the empty corner. Each adjacent quadrant has a structural reason it cannot move into ours.

---

## 3. Comparables (the cohort that anchors strategic ACVs)

These are the comps an investor underwrites against. They validate the strategic-ACV ($1–2M) and the category outcome.

| Company | Recent round | Why it's the comp | Implication for Luvian |
|---|---|---|---|
| **Glean** | $7.2B post (Sep 2025) | Horizontal context layer for the enterprise. | Validates buyer demand and strategic ACV. Vertical engineering depth + IL5/IL6 air-gap is the lane Glean cannot enter. |
| **Hebbia** | $130M Series B (Mar 2025) | Beyond-RAG context for high-stakes verticals. | Similar reasoning architecture goal; engineering ontology + safety methods are not on Hebbia's roadmap. |
| **Cognite** | $1.6B post (2022) | Industrial knowledge graph, OT data context. | Adjacent vertical (industrial process). Engineering-design context + safety methods sit upstream of Cognite. |
| **Applied Intuition** | $15B post (Mar 2025) | Vertical AI for autonomous systems. | Test/sim execution sits downstream of design intent. We unify the design-side context layer Applied does not. |
| **Anduril** | $61B post (Mar 2026) | Defense autonomy, IL5/IL6 customer profile. | Buyer + partner archetype, not category competitor. Lattice is a tasking bus, not a context graph. |
| **Foretellix** | $85M Series C (Jul 2024) | Scenario-based verification for AV. | Sim-side execution. Engineering intent + cross-artifact unification is open lane. |

Pricing Luvian against per-seat MBSE incumbents ($300–$5K per seat) underprices the category by an order of magnitude. The right peer set commands seven-figure strategic ACVs.

---

## 4. The threat list (real contestants for the SOM build)

Three teams meaningfully affect the SOM build. Each is named and tracked.

| Threat | Stage | Why it matters | Differentiation |
|---|---|---|---|
| **Flow Engineering** | $23M Series A (Sequoia, Oct 2025) | Same buyer persona, same wedge entry (requirements + traceability), funded sales motion. | Luvian unifies modeling + safety + V&V on top. Flow is requirements-only and cloud-only; cannot reach IL5/IL6. |
| **Trace.Space** | $11.5M Seed | Verbatim positioning match: agentic requirements + central knowledge graph. | Differentiation collapses to depth of typed ontology + air-gap deployment + safety methodology coverage. |
| **Aras + InnovatorEdge AI** | $250M strategic (2024) | Graph-based PLM with enterprise distribution and an AI overlay. Could buy a SysML v2 modeler. | Missing SysML v2 native + integrated safety methods. Displacement target rather than head-to-head. |

Outcome math: in a market where 15–40 strategic accounts at $1–2M ACV define category winners, two of these three need to be either acquired, niched, or out-executed. The pre-seed round funds reaching the reference architecture position before either Flow scales the GTM motion or Aras buys a modeler.

---

## 5. The four competitive classes (incumbents and adjacents)

### 5.1 Horizontal context AI (Glean, Hebbia, generic context platforms)

**Players:** Glean, Hebbia, "context platform" startups.

**Move:** they own the horizontal substrate for unstructured enterprise content. Strong UX, fast retrieval, demonstrated buyer willingness.

**Structural disadvantages:**

| Disadvantage | Why it's structural |
|---|---|
| **No engineering ontology** | Their substrate is ontology-agnostic by design. Cannot encode SysML v2 semantics, ASIL derivation, suspect-link propagation. |
| **No safety methodology engines** | HARA / TARA / STPA / SOTIF / FMEA require typed inputs and standards-conformant derivation tables. Out of scope for horizontal context AI. |
| **No air-gap deployment** | SaaS-first architectures. Glean partially closed this with the Dell AI Factory partnership; coverage of IL5/IL6 environments remains incomplete. |
| **Wrong cost-of-being-wrong model** | Their default customer's cost of a wrong answer is a meeting. Our default customer's cost is a recall, a missed launch, or a fielded fault in a safety-critical system. |

**How we win:** vertical engineering depth + integrated safety methods + true IL5/IL6 deployment from a single codebase. The horizontal players cannot retrofit our depth without re-architecting their ontology layer.

### 5.2 Vertical industrial / autonomous AI (Cognite, Applied Intuition, Anduril)

**Players:** Cognite (industrial process), Applied Intuition (AV simulation and validation), Anduril (defense autonomy stack), Foretellix (scenario-based verification).

**Why they are partners or buyers, not competitors:** each owns an adjacent slice — operational data, simulation execution, lethal autonomy, scenario coverage. None owns the design-intent context graph that connects requirements, models, safety analysis, and verification on the upstream side. Applied Intuition's test execution sits downstream of design; Anduril's Lattice is a tasking bus, not a context graph; Cognite is OT-data; Foretellix is sim-side.

**How we win:** be the upstream design-intent layer their downstream products consume. The integration relationship is more compelling than the competitive one — and it's the path to Series A enterprise pilots.

### 5.3 MBSE / ALM incumbents (Cameo, Rhapsody, DOORS, Capella, Aras)

**Players:** Dassault (MagicDraw / Cameo, 3DEXPERIENCE), IBM (Engineering Lifecycle Management — DOORS, Rhapsody), Siemens (Teamcenter, Polarion), PTC (Windchill, Codebeamer), Aras (Innovator + InnovatorEdge AI), Eclipse (Capella), Vitech (Genesys).

**Move:** every one has shipped a Gen-AI bolt-on in 2024–2025. Cameo shipped SysML v2 in December 2025 — closing the "first SysML v2 modeler" gap that defined the prior wedge.

**Structural disadvantages:**

| Disadvantage | Why it's structural |
|---|---|
| **Architecture lock-in** | 20-year-old document-and-workflow systems. AI-native + cross-artifact unification is a re-architecture, not a feature. |
| **Cross-tool blindness** | None can be the neutral substrate across the others' data. Customers run 4–8 of these tools simultaneously. |
| **Data-model mismatch** | Substrates designed for storage, not AI reasoning. Retrofitting produces plausible nonsense. |
| **Cultural mismatch** | Multi-year RFPs with procurement; pain-aware engineering teams do not buy that way. |
| **Vendor conflict** | A Siemens substrate cannot reason over Dassault data without commercial fight. |

**How we win:** be the neutral substrate underneath all of them, the layer their AI bolt-ons end up consuming rather than competing with. Wedge displacement happens phase-by-phase: requirements (replace DOORS), modeling (replace Cameo), safety + V&V (replace spreadsheets and Visio).

### 5.4 Engineering copilots and code AI (Cursor, Codeium, GitHub Copilot)

**Players:** Cursor, Codeium, GitHub Copilot, Tabnine, Aider, Augment, Continue.

**Why they are not competitors:** they own code completion, a feature, not a category. They are concentrated in the IDE consumption surface and have neither the engineering-organisation data model nor the regulated-industry deployment posture.

**Adjacency:** any copilot that wants to reason about a *system*, not just a function — *"this requirement is satisfied by which subsystem and what is the verification status of that allocation?"* — needs a substrate underneath. That substrate is Luvian.

**How we win:** by being a layer the copilots can call into via MCP and structured APIs, not by fighting them in the IDE.

---

## 6. Adjacent categories we are *not*

Worth being explicit.

- **Not Datadog / Honeycomb for engineering.** That is observability. Different product, different buyer, different runtime.
- **Not Notion / Confluence for engineering.** That is documentation. Different product, different buyer.
- **Not an AI Project Manager.** That is a workflow tool. We are the substrate underneath it.
- **Not "ChatGPT for engineers."** Chat is a consumption surface. Most of the substrate's value is consumed by other agents and other tools, not by chat.
- **Not Flow Engineering.** Flow is a requirements management product. We unify requirements + modeling + safety + V&V; Flow does only requirements.

---

## 7. Why timing makes the moat compounding

The category is defined by whoever has 2–4 production references in the wedge domains by end of 2027. Once those references exist:

- Horizontal context AI cannot replicate IL5/IL6 air-gap deployment + safety methodology coverage without years of work.
- MBSE / ALM incumbents cannot retrofit AI-native architecture without breaking their existing customers.
- Vertical industrial AI is not in the design-intent business and would have to acquire to enter.
- New entrants cannot compress a 5–10 year domain-literacy gap (autonomy, MBSE, safety, defense delivery).

The pre-seed round funds reaching that reference position before the window closes. The 18-month milestone bundle in [01_Company_Overview/Fundraising_Memo_2026_05.md](../01_Company_Overview/Fundraising_Memo_2026_05.md) is the schedule against which this competitive timing is measured.

---

— *Stephan Claxton, Founder, Luvian Labs LLC* · 2026-05-21
