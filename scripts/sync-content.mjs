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
  '03_Product_Demo/Product_Demo_Links_2026_05.md':           { section: '03-product-demo', slug: 'product-demo-links' },

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

  // 08 — Legal
  '08_Legal/_LEGAL_DISCLAIMER.md':                           { section: '08-legal', slug: 'legal-disclaimer' },
  '08_Legal/Operating_Agreement_TEMPLATE.md':                { section: '08-legal', slug: 'operating-agreement-template' },
  '08_Legal/Cap_Table_Summary_2026_05.md':                   { section: '08-legal', slug: 'cap-table-summary' },
  '08_Legal/LLC_to_Ccorp_Conversion_Plan.md':                { section: '08-legal', slug: 'llc-to-ccorp-conversion-plan' },
  '08_Legal/Corporate_Documents_INDEX.md':                   { section: '08-legal', slug: 'corporate-documents-index' },
  '08_Legal/Employment_Agreements_INDEX.md':                 { section: '08-legal', slug: 'employment-agreements-index' },
  '08_Legal/IP_Assignment_INDEX.md':                         { section: '08-legal', slug: 'ip-assignment-index' },
  '08_Legal/CIIA_TEMPLATE.md':                               { section: '08-legal', slug: 'ciia-template' },
  '08_Legal/Certificate_of_Incorporation_TEMPLATE.md':       { section: '08-legal', slug: 'certificate-of-incorporation-template' },
  '08_Legal/Bylaws_TEMPLATE.md':                             { section: '08-legal', slug: 'bylaws-template' },
  '08_Legal/Initial_Board_Consent_TEMPLATE.md':              { section: '08-legal', slug: 'initial-board-consent-template' },
  '08_Legal/Founder_RSPA_TEMPLATE.md':                       { section: '08-legal', slug: 'founder-rspa-template' },
  '08_Legal/83b_Election_TEMPLATE.md':                       { section: '08-legal', slug: '83b-election-template' },
  '08_Legal/Equity_Incentive_Plan_TEMPLATE.md':              { section: '08-legal', slug: 'equity-incentive-plan-template' },
  '08_Legal/Founder_Offer_Letter_TEMPLATE.md':               { section: '08-legal', slug: 'founder-offer-letter-template' },

  // 09 — Financials
  '09_Financials/Use_of_Funds_2026_05.md':                   { section: '09-financials', slug: 'use-of-funds' },
  '09_Financials/Financial_Forecast_2026_05.md':             { section: '09-financials', slug: 'financial-forecast' },
  '09_Financials/Financial_Model_Summary_2026_05.md':        { section: '09-financials', slug: 'financial-model-summary' },
  '09_Financials/Historical_Financials_2026_05.md':          { section: '09-financials', slug: 'historical-financials' },

  // 10 — Appendix
  '10_Appendix/Investor_QA_2026_05.md':                      { section: '10-appendix', slug: 'investor-qa' },
  '10_Appendix/Convertible_Note_TEMPLATE.md':                { section: '10-appendix', slug: 'convertible-note-template' },
  '10_Appendix/SAFE_Post_Money_Cap_TEMPLATE.md':             { section: '10-appendix', slug: 'safe-post-money-cap-template' },
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
