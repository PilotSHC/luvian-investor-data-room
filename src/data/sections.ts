export interface DataRoomFile {
  slug: string;
  title: string;
  blurb?: string;
  download?: { label: string; href: string }[];
  emphasis?: 'primary' | 'secondary';
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
    id: '01-company-overview',
    number: '01',
    title: 'Company Overview',
    short: 'Overview',
    description:
      'Quick-share artefacts. The forwardable docs for partner meetings, plus the pre-seed fundraising memo.',
    href: '/01-company-overview',
    files: [
      {
        slug: 'fundraising-memo',
        title: 'Fundraising Memo',
        blurb: 'The pre-seed memo: round size, instrument, milestones, what we want from the lead.',
        emphasis: 'primary',
      },
      {
        slug: 'company-overview',
        title: 'Company Overview',
        blurb: 'Long-form description, structured Q&A, status, ask.',
      },
      {
        slug: 'executive-one-pager',
        title: 'Executive One-Pager',
        blurb: 'Forwardable single-page brief for the partner meeting.',
      },
    ],
  },
  {
    id: '02-pitch-deck',
    number: '02',
    title: 'Pitch Deck',
    short: 'Deck',
    description: 'The 15-slide narrative arc with speaker notes.',
    href: '/02-pitch-deck',
    files: [
      {
        slug: 'pitch-deck',
        title: 'Pitch Deck (15-slide outline)',
        blurb: 'Slide-by-slide narrative with speaker notes.',
        download: [{ label: 'Download PDF (15 slides, 124 KB)', href: '/pdf/Pitch_Deck_2026_05.pdf' }],
      },
    ],
  },
  {
    id: '03-product-demo',
    number: '03',
    title: 'Product Demo',
    short: 'Demo',
    description:
      'The most important asset in this room. Confidential walkthrough video plus a "what to look for" annotation.',
    href: '/03-product-demo',
    files: [
      {
        slug: 'demo-walkthrough',
        title: 'Demo Walkthrough — Watch the Confidential Video',
        blurb:
          'Embedded watermarked walkthrough of the Luvian alpha. The single most important asset in this room.',
        emphasis: 'primary',
      },
      {
        slug: 'product-demo-links',
        title: 'Product Demo — Supplementary Links',
        blurb: 'Screenshots, sandbox access, scheduling a private live walkthrough.',
      },
    ],
  },
  {
    id: '04-technical-architecture',
    number: '04',
    title: 'Technical Architecture',
    short: 'Architecture',
    description:
      'The depth-of-systems-thinking section. The Architecture Vision Memo is the centrepiece of the room.',
    href: '/04-technical-architecture',
    files: [
      {
        slug: 'architecture-vision-memo',
        title: 'Architecture Vision Memo — The Centrepiece',
        blurb:
          'The thesis: operational context layer, why-not-RAG, why-ontology, why-provenance, expansion path.',
        emphasis: 'primary',
      },
      {
        slug: 'context-graph-design',
        title: 'Context Graph Design',
        blurb: 'Typed substrate, node and edge meta-types, storage layer, retrieval pipeline.',
      },
      {
        slug: 'ontology-and-reasoning',
        title: 'Ontology & AI Reasoning',
        blurb: 'SysML v2 / KerML grounding, domain bundles, AI reasoning pipeline, eval discipline.',
      },
      {
        slug: 'provenance-and-trust',
        title: 'Provenance & Trust',
        blurb: 'Provenance, suspect-link propagation, confidence, governed context, HITL gates, audit.',
      },
    ],
  },
  {
    id: '05-market-thesis',
    number: '05',
    title: 'Market Thesis',
    short: 'Market',
    description:
      'Why now, the 18-24 month window, and how Luvian sits relative to PLM, MBSE tools, copilots, and generic context platforms.',
    href: '/05-market-thesis',
    files: [
      {
        slug: 'why-now-memo',
        title: 'Why Now — Macro Narrative',
        blurb: 'Five forcing functions converging in 2024–2026. The window, who else sees it, why we are not afraid.',
        emphasis: 'primary',
      },
      {
        slug: 'market-thesis',
        title: 'Market Thesis',
        blurb: 'TAM / SAM math, category framing, ICP profiles.',
      },
      {
        slug: 'competitive-landscape',
        title: 'Competitive Landscape',
        blurb: 'Position vs. PLM, MBSE tools, requirements managers, copilots, generic context platforms.',
      },
    ],
  },
  {
    id: '06-team',
    number: '06',
    title: 'Team',
    short: 'Team',
    description:
      'Founder bio, hiring plan, references. At pre-seed the founder is roughly half the investment decision.',
    href: '/06-team',
    files: [
      {
        slug: 'founder-bio-stephan-claxton',
        title: 'Team',
        blurb: 'Stephan Claxton (CEO), Jarred Gou (CPO), Colin Zhang (Software Engineer).',
        emphasis: 'primary',
      },
      {
        slug: 'hiring-plan',
        title: 'Hiring Plan — 18-Month Pre-Seed Cycle',
        blurb: 'Five hires over 18 months. Each justified against a specific de-risk.',
      },
    ],
  },
  {
    id: '07-traction',
    number: '07',
    title: 'Traction',
    short: 'Traction',
    description:
      'Pre-seed traction = velocity, insight, sophistication, market pull — not revenue. The honest picture.',
    href: '/07-traction',
    files: [
      {
        slug: 'execution-velocity',
        title: 'Execution Velocity',
        blurb: 'What has been shipped solo, conversations with engineering leaders, investor pipeline counts.',
        emphasis: 'primary',
      },
      {
        slug: 'metrics-dashboard',
        title: 'Metrics Dashboard',
        blurb: 'Engineering-velocity-style metrics. Pre-seed-shaped, not SaaS-shaped.',
      },
      {
        slug: 'customer-pipeline',
        title: 'Customer Pipeline (sanitised)',
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
    id: '08-legal',
    number: '08',
    title: 'Legal',
    short: 'Legal',
    description:
      'Lightweight by design. Single-member LLC governance now, C-corp templates ready for the planned Delaware Flip.',
    href: '/08-legal',
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
        slug: 'cap-table-summary',
        title: 'Cap Table — Summary',
        blurb: 'Pre-flip 100% Stephan; post-flip pro-forma after notes convert.',
        download: [
          { label: 'Download cap table (CSV)', href: '/csv/Capitalization_Table_2026_05.csv' },
        ],
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
        slug: 'employment-agreements-index',
        title: 'Employment Agreements (index)',
      },
      {
        slug: 'ip-assignment-index',
        title: 'IP Assignment (index)',
      },
      {
        slug: 'ciia-template',
        title: '⏳ CIIA — Confidential Information & Invention Assignment',
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
    id: '09-financials',
    number: '09',
    title: 'Financials',
    short: 'Financials',
    description:
      'Lean by design. Burn-driven, milestone-anchored, pre-revenue. No fake five-year projections.',
    href: '/09-financials',
    files: [
      {
        slug: 'use-of-funds',
        title: 'Use of Funds — Pre-Seed Round',
        blurb: 'Bucket allocation, quarterly spend ramp, salary policy, what we are *not* funding.',
        emphasis: 'primary',
      },
      {
        slug: 'financial-forecast',
        title: 'Financial Forecast — 24-Month Lean View',
        blurb: 'Burn shape by quarter, sensitivity, Series A bridge planning.',
      },
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
    ],
  },
  {
    id: '10-appendix',
    number: '10',
    title: 'Appendix',
    short: 'Appendix',
    description:
      'Investor Q&A, funding-instrument templates, NDA, post-flip materials. Reference layer.',
    href: '/10-appendix',
    files: [
      {
        slug: 'investor-qa',
        title: 'Investor Q&A — Sophisticated Probe Answers',
        blurb:
          '18 questions sophisticated investors ask, with crisp 60-second answers. Read before the first call.',
        emphasis: 'primary',
      },
      {
        slug: 'convertible-note-template',
        title: 'Convertible Promissory Note (active — LLC stage)',
        blurb: 'Pre-flip fundraising instrument. Auto-converts on Qualified Financing or the Delaware Flip.',
      },
      {
        slug: 'safe-post-money-cap-template',
        title: '⏳ YC SAFE — Post-Money Cap (post-flip)',
      },
      {
        slug: 'mutual-nda-template',
        title: 'Mutual NDA',
      },
      {
        slug: 'pro-rata-side-letter-template',
        title: 'Pro-Rata Side Letter',
      },
      {
        slug: 'customer-pilot-msa-template',
        title: 'Customer Pilot MSA',
      },
      {
        slug: 'independent-contractor-agreement-template',
        title: 'Independent Contractor Agreement',
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
