---
section: "07-traction"
slug: "user-growth-status"
title: "User Growth — Status & Definitions"
---

> **Status: pre-launch.** No live external users. This document defines what
> we will measure once design partners go live, so investors can sanity-check
> our future dashboards against today's commitments.

---

## Why This File Exists

YC-style data rooms ask for cohort and engagement data. We don't have any
yet — and we'd rather say so explicitly than fabricate vanity metrics. This
file:

1. States that fact clearly.
2. Locks in the **definitions** we will use for future cohort, retention,
   and engagement metrics.
3. Gives a verifiable timeline for when those metrics will start appearing.

## Metric Definitions (locked-in)

These will go live the moment our first design partner has > 1 user on the
platform:

| Metric | Definition |
|---|---|
| **Active user** | A signed-in user who performs ≥ 1 model edit (block, port, edge, requirement, or validation) in a 24h window. |
| **Daily active users (DAU)** | Distinct active users per day. |
| **Weekly / monthly active (WAU / MAU)** | Same, rolled up. |
| **Stickiness** | DAU / MAU. Target > 0.4 by Q2 2027. |
| **Cohort retention** | % of users from cohort week N still active in week N+k. Tracked at k = 1, 4, 8, 12. |
| **Multiplayer ratio** | % of sessions with ≥ 2 concurrent users on the same project (real-time collab is our core differentiator — we expect this to be high). |
| **Time to first diagram** | Wall-clock minutes from first sign-in to first saved block. Target < 10 min. |
| **AI assist acceptance rate** | % of AI suggestions explicitly accepted by the user. Cost-of-AI vs. value-of-AI sanity check. |
| **Model maturity score (IRR composite)** | Internal product metric — 0–100 score from the Integration Readiness Review engine. Tracks how mature each project's model is. |

## Cohort Plan

| Cohort | First user date | First metrics in this room |
|---|---|---|
| Cohort 0 — internal users (founders, contractors) | already running | not externally reportable |
| Cohort 1 — first paid design partner | target 2026-09-30 | first dashboard 2026-10 |
| Cohort 2 — second paid design partner | target 2026-12-01 | reportable 2027-Q1 |
| Cohort 3 — third paid design partner | target 2027-Q1 | reportable 2027-Q1/Q2 |

## What We Are Tracking Internally Today (Honest Inventory)

| Internal signal | Source | Externally reportable? |
|---|---|---|
| Build success rate | CI (Buildkite + GitHub Actions) | Engineering health, not user health — see `Metrics_Dashboard_2026_05.md`. |
| Test coverage | Vitest + Playwright | Engineering health. |
| Feature flag exposure | `src/config/features.ts` | Roadmap signal — see `Metrics_Dashboard_2026_05.md`. |
| Internal model maturity scores | Built-in IRR engine | Yes, but not yet on real customer data. |
| Founder + design-partner usage | Manual notes | Anecdotal only — promoted to this dashboard once cohorts go live. |

## Open Items

- [ ] Wire product analytics (PostHog or Plausible — owner Jarred — 2026-08-01).
- [ ] First-cohort dashboard with the metrics above — 2026-10-01.
- [ ] Public-friendly anonymized cohort retention chart — 2027-Q1.
