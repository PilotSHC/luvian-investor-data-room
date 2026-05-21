#!/usr/bin/env node
// Sync investor-data-room/*.md from the main repo into src/content/dataroom
// with frontmatter that the Astro content collection expects.
// Run with: node scripts/sync-content.mjs [path/to/source/investor-data-room]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const defaultSource = path.resolve(projectRoot, '..', 'my-modding-app-2', 'investor-data-room');
const sourceRoot = process.argv[2] ? path.resolve(process.argv[2]) : defaultSource;
const targetRoot = path.resolve(projectRoot, 'src', 'content', 'dataroom');

if (!fs.existsSync(sourceRoot)) {
  console.error(`[sync-content] Source not found: ${sourceRoot}`);
  process.exit(1);
}

// Mapping: source file → { section, slug, title? }
const MAP = {
  // 01 — Company Overview
  '01_Company_Overview/Fundraising_Memo_2026_05.md':         { section: '01-company-overview', slug: 'fundraising-memo' },
  '01_Company_Overview/Company_Overview_2026_05.md':         { section: '01-company-overview', slug: 'company-overview' },
  '01_Company_Overview/Executive_One_Pager_2026_05.md':      { section: '01-company-overview', slug: 'executive-one-pager' },

  // 02 — Pitch Deck
  '02_Pitch_Deck/Pitch_Deck_2026_05.md':                     { section: '02-pitch-deck', slug: 'pitch-deck' },

  // 03 — Product Demo
  '03_Product_Demo/Demo_Walkthrough_2026_05.md':             { section: '03-product-demo', slug: 'demo-walkthrough' },

  // 04 — Technical Architecture
  '04_Technical_Architecture/Architecture_Vision_Memo.md':   { section: '04-technical-architecture', slug: 'architecture-vision-memo' },
  '04_Technical_Architecture/Context_Graph_Design.md':       { section: '04-technical-architecture', slug: 'context-graph-design' },
  '04_Technical_Architecture/Ontology_and_Reasoning.md':     { section: '04-technical-architecture', slug: 'ontology-and-reasoning' },
  '04_Technical_Architecture/Provenance_and_Trust.md':       { section: '04-technical-architecture', slug: 'provenance-and-trust' },

  // 05 — Market Thesis
  '05_Market_Thesis/Why_Now_Memo.md':                        { section: '05-market-thesis', slug: 'why-now-memo' },
  '05_Market_Thesis/Market_Thesis_2026_05.md':               { section: '05-market-thesis', slug: 'market-thesis' },
  '05_Market_Thesis/Competitive_Landscape.md':               { section: '05-market-thesis', slug: 'competitive-landscape' },

  // 06 — Team
  '06_Team/Founder_Bio_Stephan_Claxton.md':                  { section: '06-team', slug: 'founder-bio-stephan-claxton' },
  '06_Team/Hiring_Plan_2026_05.md':                          { section: '06-team', slug: 'hiring-plan' },

  // 07 — Traction
  '07_Traction/Execution_Velocity_2026_05.md':               { section: '07-traction', slug: 'execution-velocity' },
  '07_Traction/Metrics_Dashboard_2026_05.md':                { section: '07-traction', slug: 'metrics-dashboard' },
  '07_Traction/Customer_Pipeline_2026_05.md':                { section: '07-traction', slug: 'customer-pipeline' },
  '07_Traction/User_Growth_Status_2026_05.md':               { section: '07-traction', slug: 'user-growth-status' },
  '07_Traction/Design_Partner_LOI_TEMPLATE.md':              { section: '07-traction', slug: 'design-partner-loi-template' },

  // 08 — Legal — executed corporate set + Delaware Flip plan + indexes.
  // Templates and post-flip drafts intentionally not exposed to the
  // investor view at this stage; the source files are retained in the
  // monorepo for counsel to pull at the time of the Reorganization.
  '08_Legal/Operating_Agreement.md':                         { section: '08-legal', slug: 'operating-agreement' },
  '08_Legal/Articles_of_Organization.md':                    { section: '08-legal', slug: 'articles-of-organization' },
  '08_Legal/IP_Assignment_Agreement.md':                     { section: '08-legal', slug: 'ip-assignment-agreement' },
  '08_Legal/Initial_Written_Consent.md':                     { section: '08-legal', slug: 'initial-written-consent' },
  '08_Legal/LLC_to_Ccorp_Conversion_Plan.md':                { section: '08-legal', slug: 'llc-to-ccorp-conversion-plan' },
  '08_Legal/Corporate_Documents_INDEX.md':                   { section: '08-legal', slug: 'corporate-documents-index' },
  '08_Legal/IP_Assignment_INDEX.md':                         { section: '08-legal', slug: 'ip-assignment-index' },
  '08_Legal/Cap_Table_Summary_2026_05.md':                   { section: '08-legal', slug: 'cap-table-summary' },

  // 09 — Financials
  '09_Financials/Use_of_Funds_2026_05.md':                   { section: '09-financials', slug: 'use-of-funds' },
  '09_Financials/Financial_Forecast_2026_05.md':             { section: '09-financials', slug: 'financial-forecast' },
  '09_Financials/Financial_Model_Summary_2026_05.md':        { section: '09-financials', slug: 'financial-model-summary' },
  '09_Financials/Historical_Financials_2026_05.md':          { section: '09-financials', slug: 'historical-financials' },

  // 10 — Appendix — active funding instrument and standard contracts only.
  '10_Appendix/Investor_QA_2026_05.md':                      { section: '10-appendix', slug: 'investor-qa' },
  '10_Appendix/Convertible_Note_TEMPLATE.md':                { section: '10-appendix', slug: 'convertible-note-template' },
  '10_Appendix/Mutual_NDA_TEMPLATE.md':                      { section: '10-appendix', slug: 'mutual-nda-template' },
  '10_Appendix/Pro_Rata_Side_Letter_TEMPLATE.md':            { section: '10-appendix', slug: 'pro-rata-side-letter-template' },
  '10_Appendix/Customer_Pilot_MSA_TEMPLATE.md':              { section: '10-appendix', slug: 'customer-pilot-msa-template' },
  '10_Appendix/Independent_Contractor_Agreement_TEMPLATE.md':{ section: '10-appendix', slug: 'independent-contractor-agreement-template' },
};

// Wipe stale content from a previous schema before writing — prevents
// orphaned `02-traction-and-customers--*.md` etc. lingering in the
// content collection from a prior sync.
fs.mkdirSync(targetRoot, { recursive: true });
for (const file of fs.readdirSync(targetRoot)) {
  if (file.endsWith('.md')) fs.rmSync(path.join(targetRoot, file));
}

let written = 0;
let missing = 0;
for (const [rel, meta] of Object.entries(MAP)) {
  const src = path.join(sourceRoot, rel);
  if (!fs.existsSync(src)) {
    console.warn(`[sync-content] missing: ${rel}`);
    missing += 1;
    continue;
  }
  const raw = fs.readFileSync(src, 'utf8');
  // Pull title from first line if it's a heading; otherwise leave undefined.
  const m = raw.match(/^#\s+(.+?)\s*$/m);
  const title = m ? m[1].replace(/\s+\(.*?\)\s*$/, '').trim() : undefined;
  const fmLines = [
    '---',
    `section: "${meta.section}"`,
    `slug: "${meta.slug}"`,
  ];
  if (title) fmLines.push(`title: ${JSON.stringify(title)}`);
  fmLines.push('---');
  // CRITICAL: terminate frontmatter with a literal blank line. Building
  // this with `[...,'']` plus `.filter(Boolean)` drops the empty string
  // and glues `---` directly onto the body's first heading, which makes
  // Astro's parser treat the whole file as raw markdown with no
  // frontmatter — and silently exclude it from the collection.
  const fm = fmLines.join('\n') + '\n\n';
  // Strip a leading H1 if it duplicates the title we just emitted in
  // the frontmatter — keeps the rendered article visually clean.
  const body = title
    ? raw.replace(/^\s*#\s+.+?\s*$\n+/m, '')
    : raw;
  const out = path.join(targetRoot, `${meta.section}--${meta.slug}.md`);
  fs.writeFileSync(out, fm + body, 'utf8');
  written += 1;
}

console.log(`[sync-content] wrote ${written} files, ${missing} missing into ${path.relative(projectRoot, targetRoot)}/`);

// Static-asset mirror: keep public/csv/ and public/pdf/ in lockstep with
// the source data room so download links never serve stale numbers.
const STATIC_MIRROR = [
  { src: '09_Financials/Financial_Model_2026_05.csv', dst: 'public/csv/Financial_Model_2026_05.csv' },
  { src: '08_Legal/Capitalization_Table_2026_05.csv', dst: 'public/csv/Capitalization_Table_2026_05.csv' },
];

let mirrored = 0;
for (const { src, dst } of STATIC_MIRROR) {
  const from = path.join(sourceRoot, src);
  const to = path.resolve(projectRoot, dst);
  if (!fs.existsSync(from)) {
    console.warn(`[sync-content] static mirror missing source: ${src}`);
    continue;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  mirrored += 1;
}
if (mirrored > 0) {
  console.log(`[sync-content] mirrored ${mirrored} static asset(s) into public/`);
}

// PDF mirror: every PDF that the export-to-pdf.sh script regenerates in
// _pdf_exports/ should land in public/pdf/. Without this, a regen in the
// source repo never reaches data-room.luvian.info; investors download
// the previous version of the deck while the markdown summary already
// reflects the new one. The directory mirror is folder-level so adding a
// new deck to the export script auto-surfaces it on the next sync.
function mirrorPdfDir(srcDir, dstDir, label) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`[sync-content] no source directory at ${srcDir}; skipping ${label}`);
    return;
  }
  fs.mkdirSync(dstDir, { recursive: true });
  let mirroredLocal = 0;
  let skippedLocal = 0;
  for (const file of fs.readdirSync(srcDir)) {
    if (!file.toLowerCase().endsWith('.pdf')) continue;
    const from = path.join(srcDir, file);
    const to = path.join(dstDir, file);
    if (fs.existsSync(to) && fs.statSync(from).size === fs.statSync(to).size) {
      const a = fs.readFileSync(from);
      const b = fs.readFileSync(to);
      if (a.equals(b)) {
        skippedLocal += 1;
        continue;
      }
    }
    fs.copyFileSync(from, to);
    mirroredLocal += 1;
  }
  if (mirroredLocal > 0 || skippedLocal > 0) {
    console.log(`[sync-content] mirrored ${mirroredLocal} PDF(s) into ${label} (${skippedLocal} unchanged)`);
  }
}

mirrorPdfDir(
  path.join(sourceRoot, '_pdf_exports'),
  path.resolve(projectRoot, 'public', 'pdf'),
  'public/pdf/'
);

// Mirror the executed legal PDFs sourced from the founder's secure
// archive. EXPLICIT WHITELIST ONLY: the source folder also contains
// contributor NDAs, internal app screenshots, and other items that
// must NOT be exposed to investors. Adding a new investor-facing legal
// PDF requires adding a row to this list AND wiring it into sections.ts.
const oneDriveLegalRoot =
  '/Users/annalieseparker/Library/CloudStorage/OneDrive-Personal/AMP and SHC Documents/Luvian/Luvian Labs LLC';
const LEGAL_PDF_WHITELIST = [
  { src: 'Luvian_Operating_Agreement.pdf',     dst: 'Luvian_Operating_Agreement.pdf' },
  { src: 'Luvian_IP_Assignment_Agreement.pdf', dst: 'Luvian_IP_Assignment_Agreement.pdf' },
  { src: 'INITIAL WRITTEN CONSENT.pdf',        dst: 'Initial_Written_Consent.pdf' },
  { src: 'ARTICLES OF ORGANIZATION.pdf',       dst: 'Articles_of_Organization.pdf' },
  { src: 'Luvian EIN.pdf',                     dst: 'Luvian_EIN.pdf' },
];
const legalDstRoot = path.resolve(projectRoot, 'public', 'pdf', 'legal');
fs.mkdirSync(legalDstRoot, { recursive: true });
let legalMirrored = 0;
let legalSkipped = 0;
const wantedDst = new Set(LEGAL_PDF_WHITELIST.map((m) => m.dst));
for (const { src, dst } of LEGAL_PDF_WHITELIST) {
  const from = path.join(oneDriveLegalRoot, src);
  const to = path.join(legalDstRoot, dst);
  if (!fs.existsSync(from)) {
    console.warn(`[sync-content] missing legal PDF in OneDrive: ${src}`);
    continue;
  }
  if (fs.existsSync(to) && fs.statSync(from).size === fs.statSync(to).size) {
    const a = fs.readFileSync(from);
    const b = fs.readFileSync(to);
    if (a.equals(b)) {
      legalSkipped += 1;
      continue;
    }
  }
  fs.copyFileSync(from, to);
  legalMirrored += 1;
}
// Remove any non-whitelisted PDFs from the destination so an earlier
// over-broad mirror cannot leak into the live deploy.
for (const file of fs.readdirSync(legalDstRoot)) {
  if (!file.toLowerCase().endsWith('.pdf')) continue;
  if (!wantedDst.has(file)) {
    fs.rmSync(path.join(legalDstRoot, file));
    console.log(`[sync-content] removed non-whitelisted legal PDF: ${file}`);
  }
}
if (legalMirrored > 0 || legalSkipped > 0) {
  console.log(`[sync-content] mirrored ${legalMirrored} legal PDF(s) into public/pdf/legal/ (${legalSkipped} unchanged)`);
}

// Deck embed mirror: copy whitelisted presentations/<name>/ trees into
// public/decks/<name>/ so the data room can iframe them inline. This is
// what makes the pitch deck render as a live deck in the data room
// rather than only a PDF download. The whitelist intentionally excludes
// internal-only material (worktree-workflow, blog drafts, etc.).
const DECK_WHITELIST = new Set([
  'pitch-deck',
  '60-second-pitch',
  'company-strategy',
  'team-plan',
  'fundraising',
  'financial-model',
  'cap-table',
]);
const presentationsRoot = path.resolve(sourceRoot, '..', 'presentations');
const decksDstRoot = path.resolve(projectRoot, 'public', 'decks');
let decksMirrored = 0;
if (fs.existsSync(presentationsRoot)) {
  fs.mkdirSync(decksDstRoot, { recursive: true });
  for (const name of fs.readdirSync(presentationsRoot)) {
    if (!DECK_WHITELIST.has(name)) continue;
    const src = path.join(presentationsRoot, name);
    if (!fs.statSync(src).isDirectory()) continue;
    const dst = path.join(decksDstRoot, name);
    fs.rmSync(dst, { recursive: true, force: true });
    fs.cpSync(src, dst, { recursive: true });
    decksMirrored += 1;
  }
  if (decksMirrored > 0) {
    console.log(`[sync-content] mirrored ${decksMirrored} deck(s) into public/decks/`);
  }
} else {
  console.warn(`[sync-content] no presentations/ directory at ${presentationsRoot}; skipping deck mirror`);
}
