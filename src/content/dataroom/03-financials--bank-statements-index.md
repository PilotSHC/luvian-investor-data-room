---
section: "03-financials"
slug: "bank-statements-index"
title: "Bank Statements — Index"
---# Bank Statements — Index

> **Pointer file only.** The actual PDF statements are confidential and
> live in `../_private/Bank_Statements/` (gitignored). Share originals 1-on-1
> with serious investors via Drive with view-only + watermark.

---

## Inventory

| Account | Bank | Statement period | Filename | Status |
|---|---|---|---|---|
| Operating | Mercury | 2026-03 | `Mercury_Operating_2026_03.pdf` | _TBD_ |
| Operating | Mercury | 2026-04 | `Mercury_Operating_2026_04.pdf` | _TBD_ |
| Operating | Mercury | 2026-05 | `Mercury_Operating_2026_05.pdf` | _TBD_ |
| Treasury (if active) | Mercury | 2026-03 | `Mercury_Treasury_2026_03.pdf` | _TBD_ |
| Treasury (if active) | Mercury | 2026-04 | `Mercury_Treasury_2026_04.pdf` | _TBD_ |
| Treasury (if active) | Mercury | 2026-05 | `Mercury_Treasury_2026_05.pdf` | _TBD_ |

## How to Add Statements

1. Log into Mercury → Statements → download last 3 months as PDF.
2. Rename to `Mercury_<account>_<YYYY>_<MM>.pdf` (e.g. `Mercury_Operating_2026_05.pdf`).
3. Drop in `../_private/Bank_Statements/`.
4. Update the table above with `Status: ✅ filed (2026-MM-DD)`.

## Sharing Protocol

- **Never** commit statements to git. The `.gitignore` should already block
  `_private/` and `*Bank_Statement*` patterns — verify before pushing.
- Share via Google Drive **view-only** to the investor's _named_ email,
  not via "anyone with link". Watermark with the recipient's name and date
  using `../scripts/export-to-pdf.sh watermark <file> <name>` (TBD).
- Track every share in `../_private/Access_Log_2026_05.md` (gitignored).

## Open Items

- [ ] Mercury Operating × 3 months — owner Jarred, 2026-06-01.
- [ ] Mercury Treasury × 3 months (if active) — owner Jarred, 2026-06-01.
- [ ] Verify `.gitignore` blocks any new `*Bank_Statement*` filename pattern — done as of 2026-05-21.
