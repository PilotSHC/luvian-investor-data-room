#!/usr/bin/env node
// Investor-grade polish for the data room source markdown.
// Run: node scripts/polish-investor-content.mjs
//
// What it does, in order, per file:
//   1. Replace markdown links to other source .md files with italicised
//      doc-name references (investors view these as web pages, not files).
//   2. Replace em-dashes (U+2014) with context-sensitive punctuation:
//        " — " followed by capital → ". " (sentence break, capitalisation kept)
//        " — " followed by lower    → ", " (appositive)
//        " —" at end of word        → ","
//        "— "  at start of line     → ""
//        "—"   bare                 → ", "
//      En-dashes (U+2013) inside number ranges like "1.5–2.0M" are kept.
//   3. Strip "[in-work]", "[suggestion]", and "AI suggestion" demo
//      callouts from prose. (Targeted strings only; we are not going
//      to false-positive on legitimate AI-reasoning copy.)
//   4. Drop "Open Items" / "Versioning" trailing sections from files
//      that are investor-facing (defined explicitly below).
//   5. Trim trailing whitespace and collapse 3+ blank lines to 2.
//
// The script is idempotent and safe to re-run after sync.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.resolve(
  __dirname,
  '..',
  '..',
  'my-modding-app-2',
  'investor-data-room'
);

if (!fs.existsSync(sourceRoot)) {
  console.error(`[polish] Source not found: ${sourceRoot}`);
  process.exit(1);
}

// Files we polish. Ordered roughly by section. Anything not in this list
// is left alone (e.g. *_TEMPLATE legal drafts kept as raw counsel input).
const TARGETS = [
  '01_Company_Overview/Fundraising_Memo_2026_05.md',
  '01_Company_Overview/Company_Overview_2026_05.md',
  '01_Company_Overview/Executive_One_Pager_2026_05.md',
  '02_Pitch_Deck/Pitch_Deck_2026_05.md',
  '03_Product_Demo/Demo_Walkthrough_2026_05.md',
  '04_Technical_Architecture/Architecture_Vision_Memo.md',
  '04_Technical_Architecture/Context_Graph_Design.md',
  '04_Technical_Architecture/Ontology_and_Reasoning.md',
  '04_Technical_Architecture/Provenance_and_Trust.md',
  '05_Market_Thesis/Why_Now_Memo.md',
  '05_Market_Thesis/Market_Thesis_2026_05.md',
  '05_Market_Thesis/Competitive_Landscape.md',
  '06_Team/Founder_Bio_Stephan_Claxton.md',
  '06_Team/Hiring_Plan_2026_05.md',
  '07_Traction/Execution_Velocity_2026_05.md',
  '07_Traction/Metrics_Dashboard_2026_05.md',
  '07_Traction/Customer_Pipeline_2026_05.md',
  '07_Traction/User_Growth_Status_2026_05.md',
  '07_Traction/Design_Partner_LOI_TEMPLATE.md',
  '08_Legal/Operating_Agreement.md',
  '08_Legal/Articles_of_Organization.md',
  '08_Legal/IP_Assignment_Agreement.md',
  '08_Legal/Initial_Written_Consent.md',
  '08_Legal/LLC_to_Ccorp_Conversion_Plan.md',
  '08_Legal/Corporate_Documents_INDEX.md',
  '08_Legal/IP_Assignment_INDEX.md',
  '08_Legal/Cap_Table_Summary_2026_05.md',
  '09_Financials/Use_of_Funds_2026_05.md',
  '09_Financials/Financial_Forecast_2026_05.md',
  '09_Financials/Financial_Model_Summary_2026_05.md',
  '09_Financials/Historical_Financials_2026_05.md',
  '10_Appendix/Investor_QA_2026_05.md',
  '10_Appendix/Convertible_Note_TEMPLATE.md',
  '10_Appendix/Mutual_NDA_TEMPLATE.md',
  '10_Appendix/Pro_Rata_Side_Letter_TEMPLATE.md',
  '10_Appendix/Customer_Pilot_MSA_TEMPLATE.md',
  '10_Appendix/Independent_Contractor_Agreement_TEMPLATE.md',
];

const TRAILING_HEADINGS_TO_DROP = [
  'Open Items',
  'Versioning',
  'Version History',
];

function prettifyDocName(raw) {
  return raw
    .replace(/\.md$/i, '')
    .replace(/_TEMPLATE\b/gi, '')
    .replace(/_\d{4}_\d{2}\b/g, '')
    .replace(/_/g, ' ')
    .replace(/\s+TEMPLATE\b/gi, '')
    .replace(/\s+\d{4}\s*\d{2}\b/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function replaceMdLinks(text) {
  let out = text;
  // [Display_Name.md](anything.md) → *Display Name*
  out = out.replace(
    /\[([^\]\n]+?\.md)\]\(([^)]+\.md)\)/g,
    (_m, display) => `*${prettifyDocName(display)}*`
  );
  // [Display_Name.pdf](../_pdf_exports/...) — stale source-repo PDF links.
  // The data room serves PDFs from /pdf/ and the section page already
  // exposes them via a download button; the body shouldn't link back to
  // a source-tree path that doesn't exist on the deployed site.
  out = out.replace(
    /\[([^\]\n]+?\.pdf)\]\((\.\.\/_pdf_exports\/[^)]+)\)/g,
    (_m, display) => `*${prettifyDocName(display.replace(/\.pdf$/i, ''))}*`
  );
  // Backtick paths into the monorepo (`internal-comms/...`, `tests/...`,
  // `presentations/...`, `docs/...`) leak engineering-tree references.
  out = out.replace(
    /`(?:internal-comms|presentations|docs|src|server|tests|scripts|shared)\/[^`\n]*`/g,
    ''
  );
  // Tidy any "lives at " / "lives in " / "see " / "in " phrasing left
  // dangling immediately before a now-empty backtick path.
  out = out.replace(/(lives (?:at|in)|see|in)\s+\.?\s*([\.,;])/gi, '$2');
  return out;
}

function replaceEmDashes(text) {
  let out = text;
  // Blockquote attribution: "> — paraphrased from..." → "> "
  out = out.replace(/^(>+\s*)—\s+/gm, '$1');
  // Plain attribution dash at start of line
  out = out.replace(/^—\s+/gm, '');
  // " — Word" with capital: sentence break
  out = out.replace(/ — ([A-Z])/g, '. $1');
  // " — word" with lowercase or digit: appositive comma
  out = out.replace(/ — ([a-z0-9])/g, ', $1');
  // " — " before non-letter (unusual): use comma + space
  out = out.replace(/ — /g, ', ');
  // " —" at end of word/line
  out = out.replace(/ —([\.\,\;\:\)\]\}])/g, '$1');
  out = out.replace(/ —$/gm, '.');
  // Bare em-dashes still surviving
  out = out.replace(/—/g, ', ');
  // Clean up any blockquote lines that became "> ," — drop the punctuation
  // and any leading whitespace. Same for "> ;" and "> :".
  out = out.replace(/^(>+\s*)[,;:]\s*/gm, '$1');
  // Restore a single space between blockquote prefix and content if a
  // greedy whitespace grab earlier collapsed it ("> word" not ">word").
  out = out.replace(/^(>+)([^\s>])/gm, '$1 $2');
  return out;
}

function stripDemoCallouts(text) {
  let out = text;
  out = out.replace(/\[in-work\]\s*/gi, '');
  out = out.replace(/\[suggestion\]\s*/gi, '');
  out = out.replace(/\[in[\s_-]?progress\]\s*/gi, '');
  return out;
}

function dropTrailingSections(text, dropList) {
  // Find the earliest occurrence of any heading in dropList at level >= 2
  // and truncate from there. Only act if the heading is in the bottom
  // half of the file (so we don't accidentally lop off central content).
  const lines = text.split('\n');
  let cutAt = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{2,})\s+(.+?)\s*$/);
    if (!m) continue;
    const heading = m[2].trim();
    if (dropList.some((h) => heading === h || heading.startsWith(h + ' '))) {
      if (i > Math.floor(lines.length / 2)) {
        cutAt = i;
        break;
      }
    }
  }
  if (cutAt < 0) return text;
  // Trim trailing blank lines before cut
  let end = cutAt;
  while (end > 0 && lines[end - 1].trim() === '') end -= 1;
  return lines.slice(0, end).join('\n') + '\n';
}

function tidyItalicDocNames(text) {
  // After link replacement, italic doc-name references can carry leftover
  // "TEMPLATE" suffixes or "YYYY MM" date stamps from earlier polishes.
  // Re-prettify them in place. This is narrow: it only fires when the
  // italic block contains TEMPLATE or a YYYY MM pattern.
  return text.replace(/\*([^*\n]+?)\*/g, (match, inner) => {
    if (!/TEMPLATE|\b\d{4}\s+\d{2}\b/i.test(inner)) return match;
    const cleaned = inner
      .replace(/\s+TEMPLATE\b/gi, '')
      .replace(/\s+\d{4}\s+\d{2}\b/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
    return `*${cleaned}*`;
  });
}

function tidyWhitespace(text) {
  // Strip trailing whitespace per line, collapse 3+ blank lines to 2.
  return text
    .split('\n')
    .map((l) => l.replace(/[ \t]+$/g, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n+$/, '\n');
}

let polished = 0;
let unchanged = 0;
for (const rel of TARGETS) {
  const abs = path.join(sourceRoot, rel);
  if (!fs.existsSync(abs)) {
    console.warn(`[polish] missing target: ${rel}`);
    continue;
  }
  const original = fs.readFileSync(abs, 'utf8');
  let next = original;
  next = replaceMdLinks(next);
  next = replaceEmDashes(next);
  next = stripDemoCallouts(next);
  next = dropTrailingSections(next, TRAILING_HEADINGS_TO_DROP);
  next = tidyItalicDocNames(next);
  next = tidyWhitespace(next);
  if (next !== original) {
    fs.writeFileSync(abs, next, 'utf8');
    polished += 1;
  } else {
    unchanged += 1;
  }
}

console.log(`[polish] polished ${polished} file(s), ${unchanged} unchanged`);
