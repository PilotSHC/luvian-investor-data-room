---
section: "04-technical-architecture"
slug: "provenance-and-trust"
title: "Provenance & Trust"
---

**Luvian Labs LLC · Pre-Seed · 2026-05 · Confidential**

> Companion document. Provenance is the load-bearing piece of the
> substrate that converts AI suggestions from "interesting" into
> "defensible." This memo describes how provenance, suspect-link
> propagation, confidence scoring, governed context, and human-in-the-loop
> gates compose into a single trust posture.

---

## 1. The trust posture in one diagram

```
         ┌──────────────────────────────────────────┐
         │  AI suggestion / agent action            │
         └──────────────────┬───────────────────────┘
                            ▼
┌──────────────────────────────────────────────────┐
│  PROVENANCE  →  every claim has source, evidence,│
│                  authority, confidence, timestamp│
└──────────────────┬───────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────┐
│  GOVERNED CONTEXT  →  what the AI was allowed to │
│                  read; what it was allowed to act│
│                  on; under whose authority       │
└──────────────────┬───────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────┐
│  ONTOLOGY VALIDATION  →  reject if the suggestion│
│                  implies relationships the ontology│
│                  forbids                         │
└──────────────────┬───────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────┐
│  CONFIDENCE PROPAGATION  →  decay, consensus,    │
│                  authority-weighting, verification│
│                  status                          │
└──────────────────┬───────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────┐
│  HUMAN-IN-THE-LOOP GATE  (where required)        │
│                  role-based authority, audit log │
└──────────────────┬───────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────┐
│  AUTHORITATIVE STATE CHANGE                      │
│  (with bidirectional revocation pathway)         │
└──────────────────────────────────────────────────┘
```

Every box is enforced at substrate level. The substrate is the trust
boundary, not the prompt.

---

## 2. Provenance — what gets recorded

For every claim the substrate carries, the **provenance subgraph**
records:

| Field | Meaning |
|---|---|
| **Source** | The artefact (or set of artefacts) the claim is derived from. |
| **Author** | Human or agent that produced the claim. |
| **Tool** | If automated, which tool / model / pipeline. |
| **Activity** | The activity (in PROV-O sense) that produced the claim. |
| **Evidence** | What other claims this claim depends on (the lineage). |
| **Authority** | Whose authoritative answer this is (engineering, safety, compliance, etc.). |
| **Confidence** | Numeric, with the per-source contributions. |
| **Timestamp** | When the claim was produced. |
| **Validity window** | When the claim is true (or "currently true"). |
| **Method signature** | Hash of the procedure / prompt / model that produced the claim. |

The provenance subgraph is **first-class** in the substrate — it has its
own meta-types, query language, and audit indexes. It is not a metadata
field bolted onto the side.

---

## 3. Suspect-link propagation

When an upstream artefact changes, the substrate **automatically**:

1. Walks the dependency graph (via `affectsConfidenceOf` and
   `suspectIfChanged` edges).
2. Marks every downstream claim as **suspect** at the appropriate
   propagation depth.
3. Triggers re-evaluation for those claims (either re-running the
   reasoning pipeline, or queueing a human review, depending on the
   risk classification).
4. Logs the suspect-mark and the eventual resolution (re-confirmed,
   updated, or rejected) into the provenance log.

This is the system's answer to *"how do you avoid garbage-in / garbage-out
when the upstream changes silently?"* — the upstream change cannot
silently propagate, because the substrate makes the silence
impossible.

The propagation is **bounded** and **explainable**: the customer can
ask "why was this claim marked suspect?" and the substrate returns the
exact upstream change that triggered the propagation.

---

## 4. Governed context

Before any AI call, the substrate computes **governed context** — the
typed bundle of artefacts the AI is *allowed* to read for this question,
under this user's authority, under this project's permission posture.

Governance variables:

- **Role** — engineering, safety, compliance, observer.
- **Project / configuration** — what the user has access to.
- **Jurisdiction** — ITAR-cleared, EU-only, customer-internal-only.
- **Risk classification** — what level of automated action is permitted
  on this workflow.
- **Time** — what was authoritative at the moment in question.

The governed-context bundle is **logged** before every AI call.
Reproducing the same call later is mechanical.

---

## 5. Confidence scoring

Confidence is **explicit, propagated, and decayed.**

Sources (ordered by impact in the alpha):

1. **Source authority.** Baselined > approved > draft > inferred.
2. **Lineage integrity.** A claim with a complete, unbroken provenance
   walk to authoritative sources keeps its confidence; broken chains
   decay.
3. **Verification status.** Claims linked to a passed verification have
   higher confidence than those without.
4. **Consensus.** Multiple independent derivations raise confidence;
   conflicts lower it.
5. **Temporal decay.** Configurable per artefact type — a requirement
   without re-confirmation decays slowly; a simulation result decays
   faster as upstream code changes.
6. **Model self-reported confidence.** *Used as a signal, not as
   authority.* The substrate does not trust an LLM's self-reported
   confidence at face value; it is one input into the propagation.

Confidence is **calibrated**: in the eval harness we measure whether
high-confidence claims are correct at the rate the confidence implies,
and the calibration is part of the regression suite.

---

## 6. Human-in-the-loop gates

For **safety-relevant** workflows, the substrate enforces explicit
HITL gates. The taxonomy:

| Risk class | AI action allowed? | HITL required? | Audit |
|---|---|---|---|
| **Read-only reasoning** | Yes | No | Audit log |
| **Suggestion for human review** | Yes | Yes (acceptance) | Audit log + provenance record |
| **Modification of draft / unbaselined artefact** | Yes | Acknowledgment | Audit log + provenance |
| **Modification of baselined artefact** | No (without explicit policy + role) | Two-person review | Full audit + signed-off provenance |
| **Cross-jurisdictional or cross-classification action** | No (without role + policy + log) | Compliance review | Full audit + escalation |

The classifications are **per-customer-policy-configurable**. The
substrate ships sensible defaults aligned to ISO 26262 / IEC 62304 /
FedRAMP-shaped governance.

---

## 7. Auditability and revocation

Every state change in the substrate produces:

- An **append-only audit record** (signed, indexed, queryable).
- A **revocation pathway** — every AI-produced state change can be
  rolled back, with the upstream provenance pointing the way.
- A **regulator-friendly export** — the audit log is exportable in
  forms that regulators (EU AI Act, FDA, ISO 42001) recognise.

The audit log is never the *first* line of defence (the substrate
prevents bad changes upstream). It is the *last* line — the artefact
the customer hands to the auditor.

---

## 8. Privacy & data residency

Provenance and audit records can include personal data (engineer
identities, reviewer comments). The substrate enforces:

- **Pseudonymous identity** for AI-driven workflows where the customer
  prefers it.
- **Data residency** — provenance and audit records can be pinned to a
  specific region or to on-prem.
- **Right-to-be-forgotten** — for jurisdictions that require it,
  identity records can be redacted while preserving the action's
  provenance.
- **Customer-managed keys** for the audit log, where required.

This is part of the regulated-industry deployment posture, not a
nice-to-have.

---

## 9. What's the alpha vs. pre-seed scope

| Capability | Alpha (today) | Pre-seed scope |
|---|---|---|
| Provenance subgraph | ✅ | ✅ |
| Suspect-link propagation (1-hop) | ✅ | ✅ |
| Suspect-link propagation (multi-hop) | partial | ✅ |
| Governed context computation | partial | ✅ |
| Confidence propagation | ✅ | ✅ |
| Confidence calibration | designed | ✅ |
| HITL gates | partial | ✅ |
| Audit log (append-only, signed) | designed | ✅ |
| Customer-managed keys | designed | ✅ (on-prem packaging) |
| EU AI Act / ISO 42001 audit export | designed | ✅ |

---

— *Stephan Claxton, Founder, Luvian Labs LLC* · 2026-05-21
