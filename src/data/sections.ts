export interface DataRoomFile {
  slug: string;
  title: string;
  blurb?: string;
  download?: { label: string; href: string }[];
}

export interface DataRoomSection {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  href: string;
  files: DataRoomFile[];
}

export const SECTIONS: DataRoomSection[] = [
  {
    id: '01-pitch-and-product',
    number: '01',
    title: 'Pitch & Product',
    short: 'Pitch',
    description:
      'Company overview, executive one-pager, deck, demos, and market research.',
    href: '/01-pitch-and-product',
    files: [
      {
        slug: 'company-overview',
        title: 'Company Overview',
        blurb: '1–2 page exec summary: thesis, market, founder, status, ask.',
      },
      {
        slug: 'executive-one-pager',
        title: 'Executive One-Pager',
        blurb: 'Forwardable single-page brief for the partner meeting.',
      },
      {
        slug: 'pitch-deck',
        title: 'Pitch Deck (15-slide outline)',
        blurb: 'Slide-by-slide narrative with speaker notes.',
        download: [{ label: 'Download PDF (15 slides, 124 KB)', href: '/pdf/Pitch_Deck_2026_05.pdf' }],
      },
      {
        slug: 'product-demo-links',
        title: 'Product Demos',
        blurb: 'Recorded walkthroughs and live-demo guidance.',
      },
      {
        slug: 'market-research',
        title: 'Market Research',
        blurb: 'TAM/SAM/SOM, the "5 Gripes," competitive landscape, ICPs.',
      },
    ],
  },
  {
    id: '02-traction-and-customers',
    number: '02',
    title: 'Traction & Customers',
    short: 'Traction',
    description:
      'Engineering platform metrics, customer pipeline (sanitized), user-growth status, design-partner template.',
    href: '/02-traction-and-customers',
    files: [
      {
        slug: 'metrics-dashboard',
        title: 'Metrics Dashboard',
        blurb: 'Engineering metrics, feature readiness vs. MBSE gripes, performance targets.',
      },
      {
        slug: 'customer-pipeline',
        title: 'Customer Pipeline (sanitized)',
        blurb: 'Pipeline by stage, target-account profiles. Names redacted.',
      },
      {
        slug: 'user-growth-status',
        title: 'User-Growth Status',
        blurb: 'Honest pre-launch position; metric definitions for Series A.',
      },
      {
        slug: 'design-partner-loi-template',
        title: 'Design-Partner LOI (template)',
        blurb: 'Non-binding LOI template for paid pilot scoping.',
      },
    ],
  },
  {
    id: '03-financials',
    number: '03',
    title: 'Financials',
    short: 'Financials',
    description:
      '5-year financial model, model summary, historical financials placeholder, and pointers to bank statements / tax returns.',
    href: '/03-financials',
    files: [
      {
        slug: 'financial-model-summary',
        title: 'Financial Model — Summary',
        blurb: 'P&L, unit economics, funding scenarios, use of funds (markdown).',
        download: [
          { label: 'Download editable model (CSV)', href: '/csv/Financial_Model_2026_05.csv' },
          { label: 'Download model PDF (18 pages, 1.7 MB)', href: '/pdf/Financial_Model_2026_05.pdf' },
        ],
      },
      {
        slug: 'historical-financials',
        title: 'Historical Financials',
        blurb: 'Pre-revenue placeholder; YTD expenses, runway calc.',
      },
      {
        slug: 'bank-statements-index',
        title: 'Bank Statements (index)',
        blurb: 'Pointer + sharing protocol. Originals in private storage.',
      },
      {
        slug: 'tax-returns-index',
        title: 'Tax Returns (index)',
        blurb: 'Pointer + filings inventory. Originals in private storage.',
      },
    ],
  },
  {
    id: '04-legal-and-corporate',
    number: '04',
    title: 'Legal & Corporate Structure',
    short: 'Legal',
    description:
      'Single-member LLC governance (now), C-corp templates (post-flip), cap table, IP assignment, employment templates.',
    href: '/04-legal-and-corporate',
    files: [
      {
        slug: 'legal-disclaimer',
        title: '⚠️ Legal Disclaimer — Read First',
      },
      {
        slug: 'operating-agreement-template',
        title: 'LLC Operating Agreement (active)',
        blurb: 'Single-member operating agreement for Luvian Labs LLC.',
      },
      {
        slug: 'llc-to-ccorp-conversion-plan',
        title: 'LLC → Delaware C-Corp Conversion Plan',
        blurb: 'Step-by-step playbook for the planned Delaware Flip.',
      },
      {
        slug: 'corporate-documents-index',
        title: 'Corporate Documents (index)',
      },
      {
        slug: 'cap-table-summary',
        title: 'Cap Table — Summary',
        blurb: 'Pre-flip 100% Stephan; post-flip pro-forma after notes convert.',
        download: [
          { label: 'Download cap table (CSV)', href: '/csv/Capitalization_Table_2026_05.csv' },
        ],
      },
      {
        slug: 'employment-agreements-index',
        title: 'Employment Agreements (index)',
      },
      {
        slug: 'ip-assignment-index',
        title: 'IP Assignment (index)',
      },
      {
        slug: 'ciia-template',
        title: 'CIIA — Confidential Information & Invention Assignment',
      },
      {
        slug: 'certificate-of-incorporation-template',
        title: '⏳ Certificate of Incorporation (post-flip)',
      },
      {
        slug: 'bylaws-template',
        title: '⏳ Bylaws (post-flip)',
      },
      {
        slug: 'initial-board-consent-template',
        title: '⏳ Initial Board Consent (post-flip)',
      },
      {
        slug: 'founder-rspa-template',
        title: '⏳ Founder RSPA (post-flip)',
      },
      {
        slug: '83b-election-template',
        title: '⏳ 83(b) Election (post-flip; deadline-critical)',
      },
      {
        slug: 'equity-incentive-plan-template',
        title: '⏳ Equity Incentive Plan (post-flip)',
      },
      {
        slug: 'founder-offer-letter-template',
        title: '⏳ Founder Offer Letter (post-flip)',
      },
    ],
  },
  {
    id: '05-agreements-and-contracts',
    number: '05',
    title: 'Agreements & Contracts',
    short: 'Contracts',
    description:
      'Funding instruments (Convertible Note now, SAFE post-flip), customer pilot MSA, NDA, contractor agreements, insurance index.',
    href: '/05-agreements-and-contracts',
    files: [
      {
        slug: 'funding-documents-index',
        title: 'Funding Documents (index)',
      },
      {
        slug: 'material-contracts-index',
        title: 'Material Contracts (index)',
      },
      {
        slug: 'insurance-index',
        title: 'Insurance (index)',
      },
      {
        slug: 'convertible-note-template',
        title: 'Convertible Promissory Note (active — LLC stage)',
        blurb: 'Pre-flip fundraising instrument. Auto-converts on Qualified Financing or Delaware Flip.',
      },
      {
        slug: 'pro-rata-side-letter-template',
        title: 'Pro-Rata Side Letter',
      },
      {
        slug: 'mutual-nda-template',
        title: 'Mutual NDA',
      },
      {
        slug: 'customer-pilot-msa-template',
        title: 'Customer Pilot MSA',
      },
      {
        slug: 'independent-contractor-agreement-template',
        title: 'Independent Contractor Agreement',
      },
      {
        slug: 'safe-post-money-cap-template',
        title: '⏳ YC SAFE — Post-Money Cap (post-flip)',
      },
    ],
  },
];

export function findSection(id: string): DataRoomSection | undefined {
  return SECTIONS.find((s) => s.id === id);
}

export function findFile(sectionId: string, slug: string): { section: DataRoomSection; file: DataRoomFile } | undefined {
  const section = findSection(sectionId);
  if (!section) return undefined;
  const file = section.files.find((f) => f.slug === slug);
  if (!file) return undefined;
  return { section, file };
}
