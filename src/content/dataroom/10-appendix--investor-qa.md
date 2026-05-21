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

### Q1. Why won't existing PLM/ALM vendors do this?

Three reasons.

**Architecture lock-in.** Their substrates are 20-year-old
document-and-workflow systems with data models predating AI reasoning.
Retrofitting AI-native reasoning onto them is not a feature — it is a
re-architecture. They will not do that re-architecture quickly because
their existing customers depend on the current data model.

**Cross-tool blindness.** Engineering organisations run 4–8 of these
tools simultaneously (PLM + ALM + requirements + simulation + code +
test). No single vendor can be the neutral substrate across the others'
data without commercial conflict. The substrate has to be **vendor-neutral
by construction.**

**Cultural mismatch.** Their go-to-market is multi-year RFPs negotiated
with procurement. The teams that actually feel the AI-trust pain do not
buy that way. They buy the way modern infra customers buy — design
partner first, hands-on, then expand.

**Caveat:** the incumbents are not stupid. They will ship Gen-AI
bolt-ons. Those bolt-ons will produce plausible nonsense in
safety-relevant workflows because the substrate underneath wasn't
designed for AI reasoning. That failure is the oxygen for a
purpose-built substrate.

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
and in **constraints encoded by the ontology** — none of which a vector
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
**plausible nonsense** — outputs that look correct, pass casual review,
and silently violate the relationships the output implies.

Typed substrates (with an explicit ontology over `Requirement`,
`Verification`, `Allocation`, `SafetyConcern`, etc., and the legal
relationships between them) make a different class of guarantee
available: when an AI suggestion violates the ontology, the *substrate*
rejects it — not the prompt, not the LLM, not hope.

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
> verification, confidence, and HITL — built into the substrate."*

---

### Q5. What's the moat?

Three reinforcing layers:

1. **Ontology + integrations as compound debt.** Every ingestion
   connector + every domain ontology extension is a one-time cost we
   pay that competitors will have to pay later. Network effect within
   the customer's tool stack.
2. **Provenance graph density.** As a customer's substrate accumulates
   provenance edges, switching cost rises non-linearly. The graph
   *is* the customer's operational memory.
3. **Founder + early-team domain depth.** The bottleneck for this
   category is engineering-organisation literacy, not engineering
   talent in the abstract. We are 5+ years ahead of a generic AI team
   that has to learn the domain.

We do not claim a moat that comes from algorithms. The moat is
architecture, integrations, accumulated provenance, and domain depth.

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

See `05_Market_Thesis/Why_Now_Memo.md` for the full memo. Five
forcing functions converging in 2024–2026: foundation-model commoditisation,
enterprise AI hitting the trust ceiling, SysML v2 stabilisation, graph +
retrieval primitives reaching production-grade, and regulatory pressure
(EU AI Act, ISO 42001) hardening *toward* the architecture we're building.

Window: 18–24 months before category-default is decided.

---

### Q8. Isn't this a small market? "Engineering tools" feels niche.

The wedge looks small because the framing is wrong. We are **not**
selling another engineering tool into the existing $20B PLM/ALM market.
We are building the **operational context layer** that the next
generation of engineering AI tooling will assume — every AI-native tool
in autonomy, aerospace, automotive, defence, medical, energy, robotics
becomes a downstream consumer.

Adjacencies (manufacturing operations, regulated software development,
compliance/assurance) extend the same architectural primitives without
re-architecture. The TAM expands mechanically, not strategically.

The bottom-up TAM math is in `05_Market_Thesis/Market_Thesis_2026_05.md`.
The high-confidence number for the wedge alone is **$8–12B annually by
2030**, with the substrate adjacencies plausibly 3–5× that.

---

### Q9. What's the wedge customer profile?

In priority order:

1. **Autonomy** — AV stacks, robotics, drones — already AI-saturated,
   already pain-aware, already buying purpose-built infra.
2. **Aerospace prime contractors and tier-1 suppliers** — DO-178C,
   ARP4754A, certification-driven, deep MBSE adoption already.
3. **Defence primes and integrators** — ITAR-aware, on-prem-first,
   acutely sensitive to AI hallucination in safety-of-flight workflows.
4. **Medical-device manufacturers** — IEC 62304, FDA Pre-Cert, growing
   AI exposure under regulatory scrutiny.
5. **Energy / utilities** (nuclear, grid) and **automotive Tier 1** —
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

Stephan's career covers all three of Luvian's wedge domains:

- **MBSE practice for space and defense at Lockheed Martin** — the
  foundational layer. SysML modeling, requirements architecture, MBSE
  practice as it is *actually* practised inside large engineering
  organisations.
- **Sr. Principal Systems Engineer / TPM at Strategic Technology
  Consulting (Arcfield)** — defense-program reality. Regulatory and
  security posture, on-prem / air-gapped deployment expectations,
  multi-stakeholder TPM dynamics.
- **Systems Engineer at Applied Intuition** — the contemporary AV
  verification frontier. Connected artefacts, simulation + validation
  + verification workflows, the prototype for the operational context
  layer Luvian is now building.

He is not an "AI tourist." He has lived the operational pain on every
side of the wedge — autonomy + space + defense — and from each domain
saw the same architectural gap. The full bio with reference paths is
in `06_Team/Founder_Bio_Stephan_Claxton.md`. Public posture and writing
at [stephanclaxton.com](https://www.stephanclaxton.com/).

---

### Q11. Solo founder. Risk?

Yes. Solo-founder risk is real and we name it. Two mitigations:

1. **The first $1M of the round is allocated to two co-founder hires**
   — engineering and GTM — explicitly named in `09_Financials/Use_of_Funds_2026_05.md`.
   The pipeline is active; LOIs are in late-stage discussions with two
   identified candidates.
2. **The architecture is documented to the level where it does not
   live in one head** (`Architecture_Vision_Memo.md`,
   `Context_Graph_Design.md`, `Ontology_and_Reasoning.md`). That is
   *deliberately* part of the pre-seed deliverable, not a
   nice-to-have.

We do not pretend solo-founder risk is zero. We do claim it is
**addressable** in the first 90 days of the round.

---

### Q12. What does the team look like at end of pre-seed?

| Role | Hire by | Profile |
|---|---|---|
| Co-founder, engineering | Month 1–3 | Graphs / ontology / regulated-industry deployment depth |
| Co-founder, GTM | Month 2–4 | Sold infra into autonomy / aerospace / defence before |
| Senior engineer, ingestion | Month 3–6 | PLM / ALM / SysML v2 connector experience |
| Senior engineer, AI reasoning | Month 4–8 | Hybrid retrieval, constraint solving, eval discipline |
| Founding designer | Month 6–9 | Information-dense, technical-user UX |

Total: 5–6 people end of pre-seed. Architecture is documented and
distributed across the team, not concentrated.

---

## Round mechanics

### Q13. Why a Convertible Note instead of a SAFE?

The issuer is currently **Luvian Labs LLC** (single-member Delaware LLC).
SAFEs convert into preferred stock, which an LLC does not have.
Convertible Notes do not require preferred stock and convert cleanly on
the planned LLC → Delaware C-corp conversion ("Delaware Flip") — at
which point all subsequent investors will use the standard YC SAFE.

The Note is in `10_Appendix/Convertible_Note_TEMPLATE.md`. The flip plan
is in `08_Legal/LLC_to_Ccorp_Conversion_Plan.md`.

---

### Q14. What's the round size and structure?

**Target: $1.5M – $2.0M** on a Convertible Promissory Note. Valuation cap
to be confirmed with the lead. Discount: standard 20%. Term: 24 months.
Auto-converts on Qualified Financing (≥ $4M priced round) or on the
Delaware Flip.

We are open to a priced round if the right lead prefers it.

---

### Q15. What's the lead-investor profile?

Pre-seed infrastructure-fund or operator-led pre-seed lead with one of:

- **Domain depth** in AI infra, developer tools, regulated-industry SaaS.
- **Founder support** — willing to be the *active* lead through next 12
  months (intros, recruiting, board-equivalent role pre-flip).
- **Follow-on capital** — capacity to participate at the next round on
  pro-rata or super-pro-rata terms.

We are not chasing a name. We are looking for a lead who actually
believes the architecture thesis and is willing to underwrite that bet.

---

### Q16. What happens in the next 18 months that you want investors to underwrite?

Concrete deliverables, all measurable:

1. **Co-founder team complete** by month 4.
2. **Reference architecture publicly documented** by month 6 — sufficient
   that engineering leaders can independently evaluate without an NDA.
3. **First design partner in production** — running Luvian against actual
   engineering artefacts with provenance + suspect-link propagation —
   by month 9.
4. **Second + third design partners** by month 14.
5. **Delaware Flip complete** before any Series A negotiations begin.
6. **Series-A-credible architecture and reference story** end of month
   18 — i.e., a partner who has spent two hours with the architecture
   memo and one design partner walks away thinking *"this is the
   default substrate."*

That is the bet. Each milestone is a binary fail/no-fail outcome that
is verifiable from the outside.

---

## Risks (we name them)

### Q17. What could kill this?

In rough order of probability:

1. **Slow design-partner conversion.** Regulated industries move
   slowly. *Mitigation:* AV / robotics design partners as the speed
   path; aerospace / defence as the depth path.
2. **Incumbent moves faster than expected.** Particularly Siemens or
   Dassault shipping a credible AI-native architecture. *Mitigation:*
   architectural moat (cross-tool neutrality), founder-market fit
   asymmetry, design-partner lock-in via accumulated provenance.
3. **Regulatory or geopolitical shift in defence/aerospace.** ITAR
   tightening, export-control changes, FedRAMP timeline shifts.
   *Mitigation:* on-prem-capable from day one; AV / robotics gives an
   alternative wedge.
4. **Co-founder hiring takes longer than 90 days.** *Mitigation:* active
   pipeline with 2 named candidates already in late-stage discussions;
   contractor + advisor coverage during the gap.
5. **Solo-founder operational risk.** Burnout, illness, etc.
   *Mitigation:* architecture documented and shared, not concentrated.
6. **AI commoditisation moves faster than expected** — i.e., model
   providers (OpenAI, Anthropic, Google) offer their own
   "context substrate." *Mitigation:* they cannot offer a
   *customer-specific* substrate that crosses their boundary;
   integration with their models is the assumption, not a threat.

We do not believe any of these is fatal at pre-seed. We believe each is
**addressable** with capital, focus, and the right team.

---

## Process

### Q18. What's the diligence process from here?

1. **First call (this room + a 30-min Zoom).** Architecture thesis +
   demo. Stephan walks the deck.
2. **Technical deep-dive (60–90 min Zoom or in-person).** Whichever
   architecture subsystem you want to pressure-test —
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

— *Stephan Claxton, Founder, Luvian Labs LLC* ·
[luvsupport@luvian.io](mailto:luvsupport@luvian.io) · 2026-05-21
