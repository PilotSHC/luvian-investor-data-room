---
section: "04-legal-and-corporate"
slug: "83b-election-template"
title: "Section 83(b) Election — Template"
---# Section 83(b) Election — Template

> ## ⚠️ POST-FLIP TEMPLATE — DEADLINE-CRITICAL ON FLIP DAY
>
> 83(b) elections apply to **substantially-nonvested property** transferred for services — typically founder common stock at incorporation, or restricted-stock grants subject to vesting. **The 30-day filing window starts from the property-transfer date.** At the Reorganization (LLC → Luvian, Inc.), Stephan's membership interest converts to founder common stock subject to vesting per the RSPA — **the 30-day clock starts on the date of that stock issuance, not on the LLC's formation date.** This is the single most common pre-seed legal disaster. See `LLC_to_Ccorp_Conversion_Plan.md`.

> **DRAFT TEMPLATE.** IRS Section 83(b) election form. **MUST be filed with the IRS within 30 days of the property transfer (Grant Date) — there are NO exceptions. Late filing = forever lost election.** Based on standard guidance from Cooley GO and IRS Rev. Proc. 2012-29. **Review with counsel and tax advisor.** See `_LEGAL_DISCLAIMER.md`.

> **How to file:**
> 1. Complete this form (one per individual, per grant).
> 2. Sign and date.
> 3. Mail by **USPS Certified Mail, Return Receipt Requested** to the IRS office where you file your federal tax return. Keep the certified-mail receipt and the return receipt.
> 4. Provide a copy to the Company for its records (`_private/Legal/83b/`).
> 5. Attach a copy to your federal income tax return for the year of the grant.

---

## ELECTION TO INCLUDE IN GROSS INCOME UNDER SECTION 83(b) OF THE INTERNAL REVENUE CODE

The undersigned taxpayer hereby elects, pursuant to Section 83(b) of the Internal Revenue Code of 1986, as amended (the "Code"), and Treasury Regulations § 1.83-2 promulgated thereunder, to include in gross income for the taxable year the excess (if any) of the fair market value of the property described below over the amount paid for such property.

### 1. Taxpayer Information

- **Name:** [FOUNDER_NAME]
- **Address:** [STREET_ADDRESS]
                [CITY, STATE, ZIP]
- **Social Security Number:** [SSN] *(do NOT commit a real SSN to this file or to git)*
- **Spouse's name (if filing jointly):** [SPOUSE_NAME or N/A]
- **Spouse's SSN (if filing jointly):** [SPOUSE_SSN or N/A]
- **Taxable year for which election is made:** [YEAR]

### 2. Description of Property

The property with respect to which this election is made is described as follows:

- **Number of shares:** [NUMBER]
- **Class:** Common Stock, par value $0.00001 per share
- **Issuer:** Luvian, Inc., a Delaware corporation
- **Issuer EIN:** [COMPANY_EIN]
- **Issuer address:** [COMPANY_ADDRESS]

### 3. Date of Transfer

The property was transferred to the undersigned on **[GRANT_DATE: YYYY-MM-DD]**.

### 4. Restrictions

The property is subject to the following restrictions:

- The property is subject to a vesting schedule and the Company's right of repurchase upon termination of the undersigned's continuous service relationship with the Company, as set forth in a Restricted Stock Purchase Agreement dated [GRANT_DATE] between the undersigned and the Company.
- The property is subject to transfer restrictions, a right of first refusal, and a lock-up obligation as set forth in such Restricted Stock Purchase Agreement.

### 5. Fair Market Value

The fair market value of the property at the time of transfer (determined without regard to any restriction other than a restriction which by its terms will never lapse) is:

**$[FMV_PER_SHARE] per share × [NUMBER] shares = $[TOTAL_FMV]**

### 6. Amount Paid

The amount paid by the undersigned for the property is:

**$[PRICE_PER_SHARE] per share × [NUMBER] shares = $[TOTAL_PAID]**

### 7. Amount to Be Included in Gross Income

The amount to be included in gross income as a result of this election is:

**$[TOTAL_FMV minus TOTAL_PAID]**

*(For founder grants at incorporation, FMV per share typically equals the price paid per share — par value or de minimis — and the amount included is $0.00. This is the entire reason for filing the 83(b): start the long-term capital gains holding period and lock in $0 (or near-zero) ordinary-income tax now.)*

### 8. Furnishing of Copy

A copy of this election is being furnished to the person for whom the services were performed (Luvian, Inc.) as required by Treasury Regulations § 1.83-2(d).

---

## Signature

The undersigned understands that this election may not be revoked except with the consent of the Internal Revenue Service.

_______________________________________
**[FOUNDER_NAME]** (Taxpayer)

Date: ____________________

---

## Cover Letter — Mail to the IRS

```
[FOUNDER_NAME]
[STREET_ADDRESS]
[CITY, STATE, ZIP]

[YYYY-MM-DD]

Internal Revenue Service
[IRS_SERVICE_CENTER_ADDRESS — the address where the taxpayer files
 their federal tax return; verify at irs.gov/filing/where-to-file]

Re: Section 83(b) Election — [FOUNDER_NAME], SSN [last 4 digits only]

Dear Sir or Madam:

Enclosed please find the original of an election under Section 83(b) of
the Internal Revenue Code of 1986, as amended, which the undersigned is
filing pursuant to Treasury Regulations § 1.83-2.

Please file this election in connection with my federal income tax
records.

Sincerely,

_______________________________________
[FOUNDER_NAME]

Enclosure: Section 83(b) Election
```

---

## Drafting Notes (delete before mailing)

- **The 30-day window is jurisdictional. There is no extension and no remedy for missed filing. File immediately upon grant.** Use USPS Certified Mail with Return Receipt and keep both receipts forever.
- The IRS no longer requires an 83(b) election to be attached to the tax return as of 2020 — but most attorneys still recommend it. Confirm with tax advisor.
- Each founder files their own 83(b) — three for Luvian (Jarred, Colin, Stephan).
- Verify SSN, address, and IRS service center address before mailing.
- **Never commit a real SSN to git.** This template uses `[SSN]` placeholders. Filled-in copies live in `_private/Legal/83b/` (gitignored).
- After mailing: scan the executed form + USPS receipt + return receipt and store in `_private/Legal/83b/83b_<FounderName>_<YYYY_MM_DD>_filed.pdf`.
- Update `Corporate_Documents_INDEX.md`: row "83(b) elections (× 3) → ✅ filed (date)".
