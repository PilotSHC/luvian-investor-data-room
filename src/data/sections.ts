export interface DataRoomFile {
  slug: string;
  title: string;
  blurb?: string;
  download?: { label: string; href: string }[];
  embedHtml?: string;
  emphasis?: 'primary' | 'secondary';
}

export type AccessTier = 1 | 2;

export interface DataRoomSection {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  href: string;
  /**
   * Minimum access tier required to see this section. Tier 1 (intro) is
   * the first-contact view; tier 2 (diligence) unlocks 07-10. Sections
   * default to tier 1 if omitted.
   */
  tier?: AccessTier;
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
        blurb: 'Long-form description, structured Q and A, status, ask.',
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
    description: 'The 15-slide narrative arc, embedded inline with speaker notes.',
    href: '/02-pitch-deck',
    files: [
      {
        slug: 'pitch-deck',
        title: 'Pitch Deck',
        blurb: 'Live 15-slide deck with speaker notes. PDF download below as a fallback.',
        embedHtml: '/decks/pitch-deck/',
        emphasis: 'primary',
        download: [{ label: 'Download PDF (15 slides)', href: '/pdf/Pitch_Deck_2026_05.pdf' }],
      },
    ],
  },
  {
    id: '03-product-demo',
    number: '03',
    title: 'Product Demo',
    short: 'Demo',
    description:
      'The most important asset in this room. Confidential watermarked walkthrough video.',
    href: '/03-product-demo',
    files: [
      {
        slug: 'demo-walkthrough',
        title: 'Demo Walkthrough',
        blurb: 'Embedded confidential walkthrough of the Luvian alpha.',
        emphasis: 'primary',
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
        title: 'Architecture Vision Memo',
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
        title: 'Ontology and AI Reasoning',
        blurb: 'SysML v2 and KerML grounding, domain bundles, AI reasoning pipeline, eval discipline.',
      },
      {
        slug: 'provenance-and-trust',
        title: 'Provenance and Trust',
        blurb: 'Provenance, suspect-link propagation, confidence, governed context, audit.',
      },
    ],
  },
  {
    id: '05-market-thesis',
    number: '05',
    title: 'Market Thesis',
    short: 'Market',
    description:
      'Why now, the 18 to 24 month window, and how Luvian sits relative to incumbents and adjacent context platforms.',
    href: '/05-market-thesis',
    files: [
      {
        slug: 'why-now-memo',
        title: 'Why Now',
        blurb: 'The four canonical drivers converging in 2024 to 2026.',
        emphasis: 'primary',
      },
      {
        slug: 'market-thesis',
        title: 'Market Thesis',
        blurb: 'TAM, SAM, SOM math, category framing, ICP profiles.',
      },
      {
        slug: 'competitive-landscape',
        title: 'Competitive Landscape',
        blurb: 'Position vs. AI-native context platforms, deep-domain incumbents, and named threats.',
      },
    ],
  },
  {
    id: '06-team',
    number: '06',
    title: 'Team',
    short: 'Team',
    description:
      'Founding team and hiring plan. At pre-seed the founding team is roughly half the investment decision.',
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
        title: 'Hiring Plan',
        blurb: 'Three priority hires over the 18-month pre-seed cycle, each justified against a specific de-risk.',
      },
    ],
  },
  {
    id: '07-traction',
    number: '07',
    title: 'Traction',
    short: 'Traction',
    description:
      'Pre-seed traction means velocity, insight, sophistication, and market pull, not revenue. The honest picture.',
    href: '/07-traction',
    tier: 2,
    files: [
      {
        slug: 'execution-velocity',
        title: 'Execution Velocity',
        blurb: 'What has been shipped, conversations with engineering leaders, investor pipeline counts.',
        emphasis: 'primary',
      },
      {
        slug: 'metrics-dashboard',
        title: 'Metrics Dashboard',
        blurb: 'Engineering-velocity-style metrics, sized to the pre-seed stage.',
      },
      {
        slug: 'customer-pipeline',
        title: 'Customer Pipeline',
        blurb: 'Pipeline by stage, target-account profiles. Names redacted.',
      },
      {
        slug: 'user-growth-status',
        title: 'User Growth Status',
        blurb: 'Honest pre-launch position; metric definitions for Series A.',
      },
      {
        slug: 'design-partner-loi-template',
        title: 'Design Partner LOI',
        blurb: 'Non-binding letter of intent template for paid pilot scoping.',
      },
    ],
  },
  {
    id: '08-legal',
    number: '08',
    title: 'Legal',
    short: 'Legal',
    description:
      'Executed corporate documents for Luvian Labs LLC, plus the Delaware Flip Plan that takes us to a Delaware C-corp ahead of Series A.',
    href: '/08-legal',
    tier: 2,
    files: [
      {
        slug: 'operating-agreement',
        title: 'LLC Operating Agreement',
        blurb: 'Executed single-member operating agreement of Luvian Labs LLC.',
        download: [{ label: 'Download PDF', href: '/pdf/legal/Luvian_Operating_Agreement.pdf' }],
        emphasis: 'primary',
      },
      {
        slug: 'articles-of-organization',
        title: 'Articles of Organization',
        blurb: 'State-filed articles for Luvian Labs LLC (CA Secretary of State, B20260127642).',
        download: [{ label: 'Download PDF', href: '/pdf/legal/Articles_of_Organization.pdf' }],
      },
      {
        slug: 'ip-assignment-agreement',
        title: 'IP Assignment Agreement',
        blurb: 'Executed IP assignment from founder to the company.',
        download: [{ label: 'Download PDF', href: '/pdf/legal/Luvian_IP_Assignment_Agreement.pdf' }],
      },
      {
        slug: 'initial-written-consent',
        title: 'Initial Written Consent',
        blurb: 'Founder action authorising formation, banking, IP assignment, and Convertible Notes.',
        download: [{ label: 'Download PDF', href: '/pdf/legal/Initial_Written_Consent.pdf' }],
      },
      {
        slug: 'llc-to-ccorp-conversion-plan',
        title: 'Delaware Flip Plan',
        blurb: 'LLC to Delaware C-corp conversion playbook, triggered on lead investor commitment.',
      },
      {
        slug: 'corporate-documents-index',
        title: 'Corporate Documents Index',
        blurb: 'Inventory of executed corporate documents. EIN PDF available for download.',
        download: [{ label: 'Download EIN PDF', href: '/pdf/legal/Luvian_EIN.pdf' }],
      },
      {
        slug: 'ip-assignment-index',
        title: 'IP Assignment Index',
        blurb: 'Status of all founder and contributor IP assignments to the company.',
      },
      {
        slug: 'cap-table-summary',
        title: 'Cap Table Summary',
        blurb: 'Pre-flip 100% Stephan; post-flip pro-forma after Notes convert.',
        download: [
          { label: 'Download cap table CSV', href: '/csv/Capitalization_Table_2026_05.csv' },
        ],
      },
    ],
  },
  {
    id: '09-financials',
    number: '09',
    title: 'Financials',
    short: 'Financials',
    description:
      'Lean by design. Burn-driven, milestone-anchored, pre-revenue.',
    href: '/09-financials',
    tier: 2,
    files: [
      {
        slug: 'use-of-funds',
        title: 'Use of Funds',
        blurb: 'Bucket allocation, quarterly spend ramp, salary policy.',
        emphasis: 'primary',
      },
      {
        slug: 'financial-forecast',
        title: 'Financial Forecast',
        blurb: '24-month lean view: burn shape by quarter, sensitivity, Series A bridge.',
      },
      {
        slug: 'financial-model-summary',
        title: 'Financial Model Summary',
        blurb: 'P and L, unit economics, funding scenarios, use of funds.',
        download: [
          { label: 'Download editable model (CSV)', href: '/csv/Financial_Model_2026_05.csv' },
          { label: 'Download model PDF', href: '/pdf/Financial_Model_2026_05.pdf' },
        ],
      },
      {
        slug: 'historical-financials',
        title: 'Historical Financials',
        blurb: 'Pre-revenue position, expense run-rate, runway calculation.',
      },
    ],
  },
  {
    id: '10-appendix',
    number: '10',
    title: 'Appendix',
    short: 'Appendix',
    description:
      'Investor Q and A, the active funding instrument, NDA, and the standard contracts library.',
    href: '/10-appendix',
    tier: 2,
    files: [
      {
        slug: 'investor-qa',
        title: 'Investor Q and A',
        blurb:
          '18 questions sophisticated investors ask, with crisp 60-second answers. Read before the first call.',
        emphasis: 'primary',
      },
      {
        slug: 'convertible-note-template',
        title: 'Convertible Promissory Note',
        blurb: 'Active pre-flip funding instrument. Auto-converts on Qualified Financing or the Delaware Flip.',
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

export function visibleSections(tier: AccessTier): DataRoomSection[] {
  return SECTIONS.filter((s) => (s.tier ?? 1) <= tier);
}

export function isSectionVisibleToTier(
  section: DataRoomSection,
  tier: AccessTier,
): boolean {
  return (section.tier ?? 1) <= tier;
}
