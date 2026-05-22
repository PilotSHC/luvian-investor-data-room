---
section: "03-product-demo"
slug: "demo-walkthrough"
title: "Demo Walkthrough. Luvian Alpha"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential. Watermarked**

> *"If you have 10 minutes, watch the video. If you have 30, watch it
> twice and then read the Architecture Vision Memo. The demo is the
> single most-important asset in this room."*

---

## Confidential, please read before playing

The video below is **confidential** and watermarked with this data room's
identifier. By playing or downloading it you continue to be bound by the
confidentiality and privacy acknowledgment you accepted at sign-in.

- Do not screen-share the video on a recorded call.
- Do not redistribute the embed or underlying video URL; it is shared
  with you on the assumption you will not forward it.
- Do not extract clips for use in your firm's internal materials
  without written permission.

If you'd prefer a private live walkthrough instead of the recorded
asset, email [luvsupport@luvian.io](mailto:luvsupport@luvian.io) and we
will schedule a 30-minute Zoom.

---

## Watch the demo

<div style="position:relative;width:100%;max-width:960px;margin:1rem 0;border-radius:0.5rem;overflow:hidden;background:#000;aspect-ratio:16/9;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/2Vfzh1WIDQA?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
    title="Luvian alpha, confidential investor demo"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
    referrerpolicy="no-referrer"
    allowfullscreen
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
  ></iframe>
</div>

> **Trouble playing?** Some restrictive corporate networks block
> embedded video players. Try a personal device, or email
> [luvsupport@luvian.io](mailto:luvsupport@luvian.io) for a private live
> walkthrough.

---

## What to look for while you watch

When you watch the video, four specific architectural claims should be
visible. None of them is uniquely visible in the competition.

### 1. Connected artefacts in a single semantic graph

Requirements, models, code, verifications appear as **typed nodes in
one substrate**, not as a federation of separate tools. Watch for:

- Hovering or clicking any artefact reveals its **type** (`Requirement`,
  `Allocation`, `Verification`, `SafetyConcern`, etc.), not just a
  document title.
- Cross-tool relationships (a Polarion-shaped requirement connected to a
  SysML allocation connected to a Capella functional chain) are first-class
  graph edges, not blue-text links between tabs.

### 2. AI reasoning that walks the graph

When the system suggests something, say, that a particular requirement
is satisfied by a specific subsystem allocation, you should see:

- The **path** of evidence the suggestion walked, not just the
  suggestion text.
- The **confidence** attached to the claim, with the upstream factors
  that drove the confidence value visible if you ask for them.
- The ability to **reject** the suggestion, which produces a
  graph-level rebuttal, not just dismissing a notification.

### 3. Provenance visible at every claim

Every AI-derived statement carries provenance. Watch for:

- A "where did this come from?" affordance on every AI-generated card.
- Source artefacts named, with the version and timestamp at which they
  were authoritative.
- The **suspect-link** indicator, when an upstream artefact changes,
  downstream AI-generated claims are marked stale automatically.

### 4. Workflow orchestration that respects engineering constraints

The system refuses suggestions that violate the ontology. Watch for:

- An attempted suggestion that links the wrong types together being
  rejected at substrate level (not by the LLM, not by the prompt).
- A **verification gate** that prevents a suggested change from
  modifying authoritative state until a human reviewer with the right
  authority approves it.

---

## What you will *not* see

We are honest about the alpha's gaps. The video shows:

- **Single-tenant** deployment (multi-tenant is post-pre-seed).
- **A subset of connectors** (full PLM/ALM/simulation connector set is
  pre-seed scope).
- **Hand-curated** ontology extensions (governance UI for ontology
  editing is pre-seed scope).
- **Limited eval coverage** (broader regression suite is pre-seed
  scope).

The architecture is sound at the points the demo shows. The pre-seed
round funds completing the rest. The map is in
`09_Financials/Use_of_Funds_2026_05.md`.

---

## After the demo

1. Read `04_Technical_Architecture/Architecture_Vision_Memo.md`, the
   centrepiece thesis document.
2. Read `05_Market_Thesis/Why_Now_Memo.md`, the macro narrative.
3. Read `10_Appendix/Investor_QA_2026_05.md`, answers to the questions
   you're already drafting.
4. Email [luvsupport@luvian.io](mailto:luvsupport@luvian.io) for the
   technical deep-dive.

---

*Stephan Claxton, Founder, Luvian Labs LLC* · 2026-05-21
