---
section: "05-agreements-and-contracts"
slug: "material-contracts-index"
title: "Material Contracts — Index"
---# Material Contracts — Index

> Pointer file. Original signed contracts in `../_private/Contracts/`
> (gitignored).

A "material contract" at pre-seed is anything that:

- Creates ongoing financial obligation > $5K/yr,
- Grants exclusive rights or restrictions,
- Involves customer revenue or commitments,
- Creates IP rights, data-sharing, or auth obligations.

---

## Vendor Contracts (cloud + AI + auth + tooling)

| Vendor | Service | Tier | Annual cost (est.) | DPA on file? | Notes |
|---|---|---|---|---|---|
| Anthropic | LLM API | Build / scale | _TBD_ | _TBD_ | Confirm DPA in `_private/` |
| Anthropic via Vercel AI Gateway | Routed LLM access | Build | _TBD_ | _TBD_ | Or direct — confirm |
| Vercel | Hosting (frontend, functions) | Pro | _TBD_ | _TBD_ | DPA standard |
| Supabase | Postgres + pgvector + storage | Pro | _TBD_ | _TBD_ | DPA standard |
| Auth0 (or Clerk) | Auth / IDP | Startup | _TBD_ | _TBD_ | Confirm vendor of record |
| Mercury | Banking | n/a | n/a | n/a | |
| Brex | Corporate cards | n/a | n/a | n/a | |
| QuickBooks (or Bench) | Bookkeeping | n/a | _TBD_ | n/a | |
| GitHub | Source control + Copilot | Team | _TBD_ | _TBD_ | DPA on file |
| Linear / Notion / Slack | Tooling | Team | _TBD_ | _TBD_ | DPAs available on request |
| Buildkite | CI | Pro | _TBD_ | _TBD_ | |
| Cursor | IDE / agent | Team | _TBD_ | _TBD_ | |

## Customer Contracts / LOIs

| Customer | Type | Stage | Amount | Date signed | Filename |
|---|---|---|---|---|---|
| _None signed yet_ | — | — | — | — | — |

Target state Q3 2026: **3 signed Letters of Intent (LOIs)** from design
partners. Each LOI:
- Captures the prospect's commitment to a paid pilot (typically $25K–$50K
  for 90 days).
- Defines pilot success criteria.
- Includes a roll-forward to annual contract upon successful pilot.
- Filed in `_private/Contracts/Customers/` as `LOI_<customer>_<YYYY_MM_DD>.pdf`.

## Partnership / Channel MOUs

| Partner | Type | Status | Notes |
|---|---|---|---|
| _TBD_ | — | _TBD_ | None executed yet. |

Candidate partnerships under exploration (not yet signed):

- A SysML v2 tool / parser ecosystem partner.
- A safety-analysis tool integration (Ansys medini analyze, IBM RELY, etc. — defensive, not direct competitor).
- A simulation tool integration (Modelica, Simulink) — long-term.

## Open Items

- [ ] Inventory all vendor DPAs in `_private/` — owner Colin, 2026-06-15.
- [ ] Capture annual run-rate for each vendor (for the financial model) — 2026-06-01.
- [ ] First 3 LOIs signed — owner Stephan, 2026-07-01.
- [ ] Decide on Auth0 vs Clerk and execute — owner Colin, 2026-06-30.
