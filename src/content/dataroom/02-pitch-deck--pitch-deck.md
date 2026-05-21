---
section: "02-pitch-deck"
slug: "pitch-deck"
title: "Pitch Deck — Slide-by-Slide Summary"
---

**Source:** `presentations/pitch-deck/index.html` (15 slides, 3 charts).
**PDF export:** `../_pdf_exports/Pitch_Deck_2026_05.pdf` — generate with
`bash ../scripts/export-to-pdf.sh pitch-deck`.

This markdown file is a faithful summary of the live deck — use it for
investor pre-reads, async review, and as the source of the watermarked PDFs
sent to investors.

---

## Slide Outline

| # | Title | One-line takeaway |
|---|---|---|
| 1 | Title | Luvian — the MBSE tool engineers actually use |
| 2 | The Problem | MBSE adoption stalls at ~5% because the tools are hostile |
| 3 | Why Now | SysML v2 + AI + browser-first ⇒ a 30-year window opens |
| 4 | The 5 Gripes | Hostile tools, silos, no maturity path, language gap, no stakeholder visibility |
| 5 | What We're Building | Browser-native + collaborative + AI-native + SysML v2 |
| 6 | Product Demo | Live diagram, real-time collab, SysML v2 import, AI suggestions |
| 7 | Architecture | 3-layer rendering pipeline, ~780 files, 42 components |
| 8 | Market | TAM $4.2B (MBSE) → $18B (structured complex design) |
| 9 | Competition | Cameo, Rhapsody, Capella vs. Luvian — 7 Powers framing |
| 10 | Go-to-Market | Automotive ASIL → aerospace/defense → industrial |
| 11 | Traction | Internal architecture, design-partner pipeline, no production customers yet (pre-seed honest) |
| 12 | Team | Stephan Claxton (Founder, ex-Applied Intuition) — solo today; round funds founding-team hires |
| 13 | Financials | 5-yr P&L, $1.5–2M raise, 3 → 11 headcount in 12 months |
| 14 | The Ask | $1.5–2M SAFE, lead investor + 2–3 strategic angels |
| 15 | Contact / Q&A | jarred@luvian.app, NDA-gated data room link |

---

## Speaker Notes (selected)

### Slide 2 — The Problem

> _"MBSE tools suck. If you compare them to tools in other industries, they
> would be ridiculed."_ — Pari Singh

Cameo Systems Modeler is the market leader. It is a 9 GB Java desktop app
with a UX that predates Slack. Adoption rates across surveyed engineering
teams hover around 5%. The market is not "underserved" — it is _hostile_ to
the people it serves.

### Slide 3 — Why Now

Three converging forces:

1. **SysML v2** breaks every incumbent's data model. Their migration costs
   are higher than ours from-scratch costs.
2. **LLMs** are now good enough to author, validate, and refactor structured
   engineering models — the "modeling tax" is finally collapsing.
3. **Browser-first** — every adjacent engineering tool category (CAD, EDA,
   ALM) has migrated. MBSE is the last holdout.

### Slide 9 — Competition (7 Powers)

| Power | How Luvian wins |
|---|---|
| Counter-positioning | Browser-native + real-time = strictly worse for incumbent's existing customer base, can't be copied without cannibalizing |
| Switching costs | SysML v2 lock-in is _their_ problem, not ours; we are the migration target |
| Process power | AI-native authoring + maturity gates that incumbents cannot retrofit |
| Cornered resource | Founding team's domain credibility (VMware enterprise, Applied Intuition autonomy) |
| Network economies | Real-time collab → multi-user → team adoption → org adoption |

### Slide 14 — The Ask

- **$1.5M – $2.0M Convertible Note** (LLC stage; pre-Delaware-Flip).
- Valuation cap **TBD** — see `../05_Agreements_and_Contracts/Convertible_Note_TEMPLATE.md`.
- 5% simple interest. 24-month maturity. Auto-converts on Qualified Financing or on LLC→Inc reorganization.
- Use of funds explicitly includes the **Delaware Flip** and the recruitment of two engineering co-founders + one founding GTM hire.
- 18-month runway to a Series A milestone bundle:
  - **Delaware Flip complete** (LLC reorganized as Luvian, Inc.)
  - **Founding team in place** (3+ hires beyond Stephan)
  - 3 paying design-partner pilots (≥ $100K ARR-equivalent each)
  - 1 ASIL-rated reference deployment
  - On-prem packaging proven across macOS, Linux, Windows
  - Multi-persona surface area shipped (SE, software dev, safety analyst, PM)

---

## Versioning

| Version | Date | Notes |
|---|---|---|
| `2026_05` | 2026-05-21 | Initial external data-room version. Mirrors current internal deck. |

When the deck materially changes, copy this file to a new dated version
(`Pitch_Deck_2026_06.md`, etc.) and add a row above. Do not edit prior
versions in place.
