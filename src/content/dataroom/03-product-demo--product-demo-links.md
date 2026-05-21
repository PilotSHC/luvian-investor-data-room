---
section: "03-product-demo"
slug: "product-demo-links"
title: "Product Demo Links"
---

Live walkthroughs and recorded demos of Luvian.

| Demo | Length | Link | Notes |
|---|---|---|---|
| 60-second elevator pitch (auto-advance) | 1:00 | `presentations/60-second-pitch/index.html` (internal); Loom — _TBD_ | Polished, time-boxed, embeddable. |
| Full product walkthrough (recorded) | TBD | _TBD — target 2026-06-15_ | Owner: Jarred. Cover: import → diagram → collab → AI → validation. |
| Avionics demo script | TBD | `docs/AVIONICS_DEMO_SCRIPT.md` (internal) | Aerospace vertical, talk-track only. |
| Live SysML v2 import demo | n/a | Run locally: `npm run dev` then load `tests/fixtures/sysml/avionics.sysml` | For technical evaluators. |
| Real-time collaboration demo | n/a | Open the same project in two browser windows — uses Yjs/Hocuspocus | Highlights browser-native, multi-user thesis. |

## Sample Diagrams (anonymized)

Currently none externally publishable. Two are in production for design
partner conversations under NDA:

- **Automotive ADAS scenario model.** Source: `tests/fixtures/sysml/adas.sysml`.
  Anonymization for external sharing **TBD — target 2026-08-01**.
- **Avionics flight-control IBD.** Source: `tests/fixtures/sysml/avionics.sysml`.
  Anonymization **TBD — target 2026-08-01**.

## How to Demo Live to an Investor

1. Pull latest: `git pull` on `main`.
2. Start dev: `npm run dev` (frontend) and `npm --prefix server run dev`
   (collab server).
3. Load demo file: drag `tests/fixtures/sysml/avionics.sysml` onto the
   canvas.
4. Open a second browser window, paste the same project URL. Show
   real-time cursors and edits.
5. Trigger an AI suggestion via the ambient ML panel — show a SysML v2
   conformance fix.
6. Open the validation panel — show INCOSE quality grading on requirements.

Total walkthrough: 8–10 minutes including Q&A breath room.

## Open Items

- [ ] Record 5-minute screencast walkthrough — owner Jarred — 2026-06-15.
- [ ] Anonymize ADAS and avionics fixtures for external sharing — owner Stephan — 2026-08-01.
- [ ] Public Loom or YouTube channel for unlisted demo videos — TBD.
