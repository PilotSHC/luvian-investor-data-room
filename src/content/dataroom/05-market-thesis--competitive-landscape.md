---
section: "05-market-thesis"
slug: "competitive-landscape"
title: "Competitive Landscape"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> The category-positioning memo. Where Luvian sits relative to PLM,
> MBSE tooling, requirements management, copilots, and generic context
> platforms — and why none of them is structurally able to do what we
> are doing.

---

## 1. The 30-second positioning

> *Luvian is the **operational context layer** between an engineering
> organisation's existing systems of record and the AI agents that
> increasingly want to reason over those systems. It is not a tool you
> swap into for one workflow. It is the substrate that makes every
> other AI workflow trustworthy.*

That positioning is deliberately **horizontal across tools, vertical
within domain.** We are not a tool category Luvian fights for. We are
the layer that makes the existing tool categories AI-native.

---

## 2. The competitive map

```
                       AI-NATIVE
                          ▲
                          │
                          │
            generic       │
            context       │      LUVIAN
            platforms     │      (this corner is empty
            (LangChain,   │       except for us, and the
             vector DBs,  │       defensibility is in
             RAG SaaS)    │       being engineering-domain
                          │       opinionated)
                          │
   ←──────────────────────┼──────────────────────→
   GENERIC                                    DOMAIN-DEEP
                          │
            engineering   │
            copilots      │
            (Cursor,      │     incumbent PLM/ALM
             Codeium,     │     (Siemens, Dassault,
             GitHub       │      PTC, IBM, Atlassian
             Copilot)     │      + their AI bolt-ons)
                          │
                          ▼
                       NOT AI-NATIVE
```

The upper-right quadrant — **AI-native + domain-deep** — is the empty
corner. Each of the three other quadrants has a structural reason it
can't move into ours.

---

## 3. The four competitive classes

### 3.1 Incumbent PLM / ALM vendors

**Players:** Siemens (Teamcenter, Polarion), Dassault Systèmes
(3DEXPERIENCE, ENOVIA, MagicDraw / Cameo), PTC (Windchill, Codebeamer),
IBM (Engineering Lifecycle Management — DOORS, Rhapsody), Atlassian
(Jira + acquisitions), Aras (Innovator).

**Move:** every one of them has shipped a Gen-AI bolt-on in 2024–2025.

**Structural disadvantages:**

| Disadvantage | Why it's structural |
|---|---|
| **Architecture lock-in** | 20-year-old document-and-workflow systems. AI-native is a re-architecture, not a feature. |
| **Cross-tool blindness** | None of them can be the neutral substrate across the others' data — commercial conflict. The customer runs 4-8 of these tools simultaneously. |
| **Data-model mismatch** | Their substrates were designed for storage, not for AI reasoning. Retrofitting produces plausible nonsense. |
| **Cultural mismatch** | Multi-year RFPs with procurement; the pain-aware engineering teams don't buy that way. |
| **Vendor-conflict** | A Siemens substrate cannot reason over Dassault data without a commercial fight; ditto IBM ELM ↔ Polarion. |

**How we win against them:** be the *neutral substrate* underneath
all of them, the one their AI bolt-ons end up *consuming* rather than
competing with.

### 3.2 MBSE modeling tools

**Players:** Cameo / CATIA Magic, Capella (Eclipse Foundation), Genesys
(Vitech), JetBrains MPS, the SysML v2 reference implementations.

**Move:** they own the **authoring surface** for SysML models.

**Why they are not competitors:** they are **integration partners**.
The substrate ingests their authored content; the substrate is not in
the model-authoring business. This is one of the cleanest "we
integrate, we do not replace" relationships in the architecture.

**Risk:** any of them could try to extend into the substrate space.
Capella is the most likely (Eclipse Foundation, open-governance, has
a research arm). Cameo is structurally captive to Dassault. Genesys is
a smaller player. Reference implementations are too research-oriented
to ship a substrate.

**How we win:** ship the substrate before any of them does, integrate
*upstream* of them as the AI-consumption layer, and make our integration
the obvious default for SysML v2 model-authored content.

### 3.3 Engineering copilots & code AI

**Players:** Cursor, Codeium, GitHub Copilot, Tabnine, Aider,
Augment, Continue.

**Why they are not competitors:** they own **code completion**, which
is a feature, not a category. They are concentrated in the IDE
consumption surface and have neither the engineering-organisation data
model nor the regulated-industry deployment posture.

**Adjacency:** an engineering copilot that wants to reason about a
**system**, not just a function — *"this requirement is satisfied by
which subsystem and what's the verification status of that
allocation?"* — needs a substrate underneath. That substrate is
Luvian.

**How we win:** by being a layer the copilots can call into, not by
fighting them in the IDE.

### 3.4 Generic AI context platforms

**Players:** LangChain (commercial), LlamaIndex, Pinecone, Weaviate,
Chroma, "context platform" startups (broad and undifferentiated).

**Why they are not competitors at the wedge:**

| Disadvantage | Why it's structural |
|---|---|
| **No domain ontology** | They are ontology-agnostic by design. Cannot encode engineering-meaning. |
| **No regulated-industry deployment posture** | On-prem, air-gapped, ITAR, FIPS — these are not feature flags. |
| **Wrong customer ICP** | Their default customer is a SaaS marketing or customer-success org; the cost-of-being-wrong is meeting-shaped, not crash-shaped. |
| **Vector-first architecture** | Vectors are one signal in our pipeline; for them they are the substrate. |

**Adjacency:** they may consume Luvian as a domain-specialist context
substrate the same way they consume Pinecone as a vector store today.
That is fine — and is one of the GTM channels open to us at Series A.

**How we win:** be domain-deep enough that the wedge customers (autonomy,
aerospace, defence, medical) cannot use a generic context platform for
the workflows that matter to them.

---

## 4. The new entrants

A handful of pre-seed and seed teams are articulating versions of this
category. They are **not** named here for confidentiality. The
structural points:

- The bottleneck for the category is **engineering-organisation
  literacy** — a 5–10 year skill, not a 10-month skill. Most of the
  visible new entrants are AI-first teams who will need to recruit or
  acquire that literacy. We have it built in.
- The visible new entrants are mostly **starting from the chatbot UI
  and reasoning backwards**. We are starting from the substrate and
  reasoning forwards. The order matters; the architecture *commits* in
  the first six months.
- A small, domain-fluent team converges faster on this architecture
  than a larger team that doesn't have the domain. The pre-seed
  hiring plan reflects this — see `06_Team/Hiring_Plan_2026_05.md`.

We respect the new entrants. We do not believe any of them has the
structural advantages that make us non-displaceable.

---

## 5. Adjacent categories we are *not*

Worth being explicit:

- **Not Datadog/Honeycomb for engineering.** That is observability.
  Different product, different buyer, different runtime.
- **Not Notion/Confluence for engineering.** That is documentation.
  Different product, different buyer.
- **Not "AI Project Manager."** That is a workflow tool. We are the
  substrate underneath it.
- **Not "ChatGPT for engineers."** Chat is a consumption surface.
  Most of the substrate's value is consumed by other agents and other
  tools, not by chat.

---

## 6. Why timing makes the moat compounding

The category will be defined by **whoever has 2–4 production
references in the wedge domains by end of 2027.** Once those
references exist:

- Generic context platforms cannot replicate the regulated-industry
  deployment posture without years of work.
- Incumbents cannot retrofit AI-native architecture without breaking
  their existing customers.
- New entrants cannot compress a 5–10 year domain-literacy gap.

The pre-seed round funds reaching that reference position before the
window closes.

---

— *Stephan Claxton, Founder, Luvian Labs LLC* · 2026-05-21
