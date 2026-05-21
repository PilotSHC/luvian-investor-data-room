---
section: "07-traction"
slug: "execution-velocity"
title: "Execution Velocity"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> *"At pre-seed, traction is not revenue. Traction is velocity, insight,
> and market pull. This is what we have."*

This document is the honest pre-seed traction picture: where we are, what
we have shipped, who is talking to us, and what is in flight. Numbers
are precise where we have them and explicitly named where we do not.

---

## What "traction" means at this stage

We are a single-founder company with no outside capital, no signed
revenue, and no design partners in production. By the YC / a16z
late-stage-template definition of traction, we have **none**.

By the pre-seed-infrastructure-thesis definition of traction, *velocity,
insight, sophistication, and market pull*, we have a coherent answer in
each dimension. This document presents that answer.

---

## 1. Build velocity

**`[FILL IN: Stephan to confirm specifics; placeholders intentional.]`**

| Metric | Value | Notes |
|---|---|---|
| Founder-led full-time work begin | `[FILL IN: month/year]` | First full-time week of Luvian work |
| Architecture skeleton (substrate, projection, store) | **Shipped** | See current alpha. Single-tenant, browser-runnable. |
| Operational context graph (typed nodes/edges) | **Shipped** | Working in alpha. |
| SysML v2 ingestion (browser parser → typed graph) | **Shipped** | Real SysML v2 / KerML files import end-to-end. |
| Provenance graph + suspect-link propagation | **In flight** | Architectural design done; partial implementation in alpha. |
| Confidence-scored AI suggestions | **In flight** | Pattern shipped for requirements; expanding to allocations + verifications. |
| Hybrid retrieval pipeline (vector + graph + constraint) | **In flight** | Vector + graph implemented; constraint solver integration next. |
| On-prem deployment posture | **Designed** | Shipping path documented; not yet packaged. |
| Multi-tenant architecture | **Designed** | Single-tenant alpha is intentional; multi-tenant is post-pre-seed. |

**Lines of typed TypeScript / engineering-domain code shipped solo in
the past `[FILL IN: N months]`:** ~`[FILL IN: K lines]` (excluding
generated, vendored, and test code).

The point is not the line count. The point is that the **architecture
exists, runs, and ingests real engineering artefacts.** That is rare at
pre-seed.

---

## 2. Architectural velocity

The most credible signal of an infrastructure-stage founder's velocity is
how much of the **architecture** is *committed* (not just thought about):

- **Architecture Vision Memo**, opinionated, in this room.
- **Context graph design**, `04_Technical_Architecture/Context_Graph_Design.md`.
- **Ontology + reasoning approach**.
  `04_Technical_Architecture/Ontology_and_Reasoning.md`.
- **Provenance + trust model**.
  `04_Technical_Architecture/Provenance_and_Trust.md`.
- **Working alpha**, see demo video in `03_Product_Demo/`.

By the time of the first investor call, the architecture is committed
in writing and demonstrable in product. The founder is not asking
investors to fund discovery work. We are asking them to fund execution
of a clearly-articulated plan.

---

## 3. Conversations with engineering leaders

> **Note on confidentiality:** Names and firms below are redacted to
> protect the privacy of the people who have spoken to us. Names are
> available on request after first call, with the conversation
> participants' consent.

**`[FILL IN: Stephan, please confirm and fill in. Below is the
template; placeholders are intentional. Replace `Lvl-N` with the actual
seniority signal you want to surface.]`**

| Conversation | Domain | Stage | Disposition |
|---|---|---|---|
| `[Engineering leader, Lvl-N, AV company A]` | Autonomy | 2nd convo | Active interest in design partnership; awaiting Q3 budget cycle |
| `[Systems chief, aerospace prime B]` | Aerospace | 1st convo | Architecturally interested; gating on regulated-industry deployment posture |
| `[Director of safety, defence integrator C]` | Defence | 1st convo | Active interest; ITAR posture clarification in flight |
| `[VP eng, robotics scaleup D]` | Robotics | 3rd convo | LOI conversation in late-stage discussion |
| `[CTO, medical-device company E]` | Medical | 1st convo | Exploratory; longer-cycle |

We deliberately **do not** count: cold outreach with no reply, vendor
calls with PLM incumbents, or "AI for engineering" generic conversations
that did not get architecture-specific.

---

## 4. Investor conversations

**`[FILL IN: counts only; no specific names]`**

- Pre-seed funds engaged in serious conversations: `[FILL IN: N]`
- Operator-led pre-seed angels engaged: `[FILL IN: N]`
- Pre-seed funds passed: `[FILL IN: N]` (most common reason: "team.
  needs co-founder before we underwrite")
- Pre-seed funds in active diligence (this room): you are reading the
  output of that

The counts are honest. The pass-rate is what we expect for an
architecture-thesis pre-seed pitch with a solo founder; converting it is
why we exist as a company.

---

## 5. Advisor & community signals

**`[FILL IN]`**

- Advisors actively engaged on architecture: `[FILL IN: N, profile]`
- MBSE / SysML v2 community engagement: `[FILL IN: contributions, talks,
  RFPs commented on]`
- AI / engineering tooling community signals: `[FILL IN: open-source,
  conference, podcast]`

---

## 6. Demo reactions (qualitative)

> Anonymised quotes from engineering leaders who have seen the
> confidential demo. `[FILL IN: real quotes Stephan has captured.
> Placeholders below are illustrative only of the *kind* of quote we
> would surface here, not made-up.]`

- *`[FILL IN: e.g., "This is what I was hoping someone would build
  three years ago.". VP Eng, AV company]`*
- *`[FILL IN: e.g., "The provenance model is the part nobody else has
  right yet.". Director, aerospace]`*
- *`[FILL IN: e.g., "I want my team to see this.". Engineering lead,
  defence integrator]`*

If we have not collected enough genuine quotes for this section yet,
the section will say so; we will not fabricate them.

---

## 7. What we are *not* showing (and why)

We deliberately do not surface here:

- **Logo waterfalls** of companies whose engineers happened to take a
  call.
- **MRR / revenue charts** that don't exist yet.
- **Cohort growth curves** for a product that isn't generally
  available.
- **Magic-quadrant-style pseudo-rankings** vs. competitors.
- **Customer testimonials** from people who are not real customers.

That is the kind of fake traction that infra-stage investors learn to
discount. We don't pretend to it.

---

## 8. The honest summary

The single sentence we want a sophisticated pre-seed investor to take
away from this section:

> *"This founder has been moving at infra-startup velocity for `[FILL
> IN: N months]`, has the architecture in writing, has a working alpha
> that ingests real engineering artefacts, has named conversations with
> engineering leaders in the wedge domains, and is honest about which of
> those are LOIs vs. early conversations. That is what pre-seed traction
> looks like for an infrastructure thesis."*

The next 18 months convert that into in-production design partners. The
plan for that is in `01_Company_Overview/Fundraising_Memo_2026_05.md` and
`09_Financials/Use_of_Funds_2026_05.md`.

---

*Stephan Claxton, Founder, Luvian Labs LLC* · 2026-05-21
