---
section: "07-traction"
slug: "metrics-dashboard"
title: "Metrics Dashboard. Engineering Platform"
---

> **Pre-revenue, pre-launch.** Standard SaaS metrics (MRR, churn, NPS) do not
> yet apply. This dashboard tracks **engineering-platform readiness**, the
> leading indicator of our ability to land design partners.

**Source:** snapshot from the internal data room ()
and the live codebase as of 2026-05-21.

---

## Platform Scale

| Metric | Value |
|---|---|
| Source files | ~780 |
| Major components | 42 |
| Modules | ~98 |
| UI primitives | 54+ |

## Architecture Breakdown

| Subsystem | Components | Modules | Software units |
|---|---:|---:|---:|
| Client application | 12 | ~55 | 466 |
| API server | 9 | ~15 | 107 |
| Landing site | 5 | ~6 | 28 |
| Infrastructure & DevOps | 6 | ~12 | ~60 |
| Test suite | 9 | 9 | 115 |
| Shared contracts | 1 | 1 | 4 |
| **Total** | **42** | **~98** | **~780** |

## Feature Readiness vs. The 5 MBSE Gripes

| Gripe | Capability | Status |
|---|---|---|
| 1. Hostile tools | Browser SPA, real-time collab, progressive disclosure | ✅ Solved |
| 2. Silo effect | Internal traceability engine, MCP tools, SysML v2 import | 🟦 Architecture ready, needs production polish |
| 3. No maturity path | IRR gates, progressive unshelving, readiness checks | 🟦 Internal only, not yet shipped to users |
| 4. SE ↔ developer language gap | SysML v2 text generation, AI agents, terminology bridge | 🟨 Early stage |
| 5. Stakeholders can't see status | KPI / safety / stakeholder pages | 🟪 Built, gated behind flags, shipping is part of the round |

## Key Performance Targets

| Indicator | Current | Target |
|---|---|---|
| Feature flag exposure (% of capability shipped to users) | ~40% | > 80% |
| Built-vs-shipped ratio | ~40% | > 80% |
| Multi-persona support | 1 (systems engineer) | 3+ roles |
| External integrations in production | 0 | 3+ |
| Time to first diagram (new user) | Unmeasured | < 10 min |
| Browser RAM (100-node diagram) | Unmeasured | < 500 MB |
| Design-partner pilots | 0 | 3+ by Series A |

## Technology Stack

| Layer | Stack |
|---|---|
| Frontend | React 19 + Vite, Zustand, Tailwind, shadcn/ui |
| Canvas engine | React Flow v12 (custom nodes/edges, ELK layout) |
| Backend | Express + Node 20 |
| Real-time | Yjs + Hocuspocus (CRDT-based) |
| AI / ML | Anthropic + RAG, ambient ML, domain agents |
| Auth & storage | Auth0 + Supabase (JWT, vector store, pgvector) |

## Test & Quality Gates (live in CI)

| Gate | Status |
|---|---|
| Type-check (`tsc --noEmit`) | Green |
| Unit tests (Vitest) | Green |
| Integration tests | Green |
| Regression / invariants | Green |
| Lint (ESLint) | Green |
| E2E (Playwright) | Green on critical paths |
| Architecture drift checks | Green (legacy store imports = 0; direct position writes = 0) |

## What This Page Will Look Like in 12 Months (Goalposts)

| Metric | Target Q2 2027 |
|---|---|
| Paying design partners | 3 |
| Pilot ARR-equivalent | $300K+ |
| Daily active users (across pilots) | 30+ |
| MAU / WAU collab usage | Tracked |
| Average session length | > 25 min |
| Stickiness (DAU/MAU) | > 0.4 |
| NPS | > 40 |
| First production deployment (on-prem) | Live |
