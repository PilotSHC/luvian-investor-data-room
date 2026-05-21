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
  '01_Pitch_and_Product/Company_Overview_2026_05.md':       { section: '01-pitch-and-product', slug: 'company-overview' },
  '01_Pitch_and_Product/Executive_One_Pager_2026_05.md':    { section: '01-pitch-and-product', slug: 'executive-one-pager' },
  '01_Pitch_and_Product/Pitch_Deck_2026_05.md':             { section: '01-pitch-and-product', slug: 'pitch-deck' },
  '01_Pitch_and_Product/Product_Demo_Links_2026_05.md':     { section: '01-pitch-and-product', slug: 'product-demo-links' },
  '01_Pitch_and_Product/Market_Research_2026_05.md':        { section: '01-pitch-and-product', slug: 'market-research' },

  '02_Traction_and_Customers/Metrics_Dashboard_2026_05.md':         { section: '02-traction-and-customers', slug: 'metrics-dashboard' },
  '02_Traction_and_Customers/Customer_Pipeline_2026_05.md':         { section: '02-traction-and-customers', slug: 'customer-pipeline' },
  '02_Traction_and_Customers/User_Growth_Status_2026_05.md':        { section: '02-traction-and-customers', slug: 'user-growth-status' },
  '02_Traction_and_Customers/Design_Partner_LOI_TEMPLATE.md':       { section: '02-traction-and-customers', slug: 'design-partner-loi-template' },

  '03_Financials/Financial_Model_Summary_2026_05.md':       { section: '03-financials', slug: 'financial-model-summary' },
  '03_Financials/Historical_Financials_2026_05.md':         { section: '03-financials', slug: 'historical-financials' },
  '03_Financials/Bank_Statements_INDEX.md':                 { section: '03-financials', slug: 'bank-statements-index' },
  '03_Financials/Tax_Returns_INDEX.md':                     { section: '03-financials', slug: 'tax-returns-index' },

  '04_Legal_and_Corporate/_LEGAL_DISCLAIMER.md':                  { section: '04-legal-and-corporate', slug: 'legal-disclaimer' },
  '04_Legal_and_Corporate/Operating_Agreement_TEMPLATE.md':       { section: '04-legal-and-corporate', slug: 'operating-agreement-template' },
  '04_Legal_and_Corporate/LLC_to_Ccorp_Conversion_Plan.md':       { section: '04-legal-and-corporate', slug: 'llc-to-ccorp-conversion-plan' },
  '04_Legal_and_Corporate/Corporate_Documents_INDEX.md':          { section: '04-legal-and-corporate', slug: 'corporate-documents-index' },
  '04_Legal_and_Corporate/Cap_Table_Summary_2026_05.md':          { section: '04-legal-and-corporate', slug: 'cap-table-summary' },
  '04_Legal_and_Corporate/Employment_Agreements_INDEX.md':        { section: '04-legal-and-corporate', slug: 'employment-agreements-index' },
  '04_Legal_and_Corporate/IP_Assignment_INDEX.md':                { section: '04-legal-and-corporate', slug: 'ip-assignment-index' },
  '04_Legal_and_Corporate/CIIA_TEMPLATE.md':                      { section: '04-legal-and-corporate', slug: 'ciia-template' },
  '04_Legal_and_Corporate/Certificate_of_Incorporation_TEMPLATE.md': { section: '04-legal-and-corporate', slug: 'certificate-of-incorporation-template' },
  '04_Legal_and_Corporate/Bylaws_TEMPLATE.md':                    { section: '04-legal-and-corporate', slug: 'bylaws-template' },
  '04_Legal_and_Corporate/Initial_Board_Consent_TEMPLATE.md':     { section: '04-legal-and-corporate', slug: 'initial-board-consent-template' },
  '04_Legal_and_Corporate/Founder_RSPA_TEMPLATE.md':              { section: '04-legal-and-corporate', slug: 'founder-rspa-template' },
  '04_Legal_and_Corporate/83b_Election_TEMPLATE.md':              { section: '04-legal-and-corporate', slug: '83b-election-template' },
  '04_Legal_and_Corporate/Equity_Incentive_Plan_TEMPLATE.md':     { section: '04-legal-and-corporate', slug: 'equity-incentive-plan-template' },
  '04_Legal_and_Corporate/Founder_Offer_Letter_TEMPLATE.md':      { section: '04-legal-and-corporate', slug: 'founder-offer-letter-template' },

  '05_Agreements_and_Contracts/Funding_Documents_INDEX.md':                  { section: '05-agreements-and-contracts', slug: 'funding-documents-index' },
  '05_Agreements_and_Contracts/Material_Contracts_INDEX.md':                 { section: '05-agreements-and-contracts', slug: 'material-contracts-index' },
  '05_Agreements_and_Contracts/Insurance_INDEX.md':                          { section: '05-agreements-and-contracts', slug: 'insurance-index' },
  '05_Agreements_and_Contracts/Convertible_Note_TEMPLATE.md':                { section: '05-agreements-and-contracts', slug: 'convertible-note-template' },
  '05_Agreements_and_Contracts/Pro_Rata_Side_Letter_TEMPLATE.md':            { section: '05-agreements-and-contracts', slug: 'pro-rata-side-letter-template' },
  '05_Agreements_and_Contracts/Mutual_NDA_TEMPLATE.md':                      { section: '05-agreements-and-contracts', slug: 'mutual-nda-template' },
  '05_Agreements_and_Contracts/Customer_Pilot_MSA_TEMPLATE.md':              { section: '05-agreements-and-contracts', slug: 'customer-pilot-msa-template' },
  '05_Agreements_and_Contracts/Independent_Contractor_Agreement_TEMPLATE.md':{ section: '05-agreements-and-contracts', slug: 'independent-contractor-agreement-template' },
  '05_Agreements_and_Contracts/SAFE_Post_Money_Cap_TEMPLATE.md':             { section: '05-agreements-and-contracts', slug: 'safe-post-money-cap-template' },
};

fs.mkdirSync(targetRoot, { recursive: true });

let written = 0;
for (const [rel, meta] of Object.entries(MAP)) {
  const src = path.join(sourceRoot, rel);
  if (!fs.existsSync(src)) {
    console.warn(`[sync-content] missing: ${rel}`);
    continue;
  }
  const raw = fs.readFileSync(src, 'utf8');
  // Pull title from first line if it's a heading; otherwise leave undefined.
  const m = raw.match(/^#\s+(.+?)\s*$/m);
  const title = m ? m[1].replace(/\s+\(.*?\)\s*$/, '').trim() : undefined;
  const fm = [
    '---',
    `section: "${meta.section}"`,
    `slug: "${meta.slug}"`,
    title ? `title: ${JSON.stringify(title)}` : null,
    '---',
    '',
  ].filter(Boolean).join('\n');
  const out = path.join(targetRoot, `${meta.section}--${meta.slug}.md`);
  fs.writeFileSync(out, fm + raw, 'utf8');
  written += 1;
}

console.log(`[sync-content] wrote ${written} files into ${path.relative(projectRoot, targetRoot)}/`);
