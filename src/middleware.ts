import { defineMiddleware } from 'astro:middleware';
import { AUTH_COOKIE_NAME, verifyAuthToken } from '@/lib/auth';
import { AGREEMENT_COOKIE_NAME, verifyAgreementToken } from '@/lib/agreement';
import { findFile, requiredTierForFile } from '@/data/sections';

const PUBLIC_PATHS = new Set<string>([
  '/login',
  '/privacy',
  '/api/auth',
  '/api/access',
  '/api/logout',
  '/api/status',
  '/favicon.ico',
  '/favicon.svg',
  '/robots.txt',
]);

const PUBLIC_PREFIXES = ['/_image/', '/_astro/', '/_vercel/'];

const AUTH_ONLY_PATHS = new Set<string>([
  '/agreement',
  '/api/accept-agreement',
]);

// Tier 2 (diligence) only — Product Demo, Architecture, Traction, Legal,
// Appendix. Financials is mixed access: the pro forma is tier 1, detailed
// model materials are file-level tier 2.
const DILIGENCE_TIER_PREFIXES = [
  '/03-product-demo',
  '/04-technical-architecture',
  '/07-traction',
  '/08-legal',
  '/10-appendix',
];

// Static asset paths that contain diligence-only content. Note that the
// pitch-deck PDF, decks, and tier-1 PDFs (Company_Strategy, Team_Plan,
// 60_Second_Pitch) are intentionally tier 1 — they are the same artefacts
// already linked from sections 01-06.
const TIER2_ASSET_PREFIXES = [
  '/csv/',
  '/pdf/legal/',
];

const TIER2_FILE_SUFFIXES = [
  // Diligence-only PDFs at the top of /pdf/. Match by suffix so future
  // dated variants (e.g. _2026_06.pdf) are caught automatically.
  'Financial_Model_',
  'Cap_Table_',
  'SAFE_Playbook_',
];

const INTRO_COOKIE_NAME = 'lvn_dr_intro_seen';

// Routes the user is allowed to land on without first watching the intro.
// Anything else (e.g. /, /04-..., /05-...) re-routes them through /intro
// the first time so they cannot bypass the intro video on their first
// session. Once they've watched it (or skipped via "Continue") the cookie
// flips and they can navigate freely.
const INTRO_ALLOWED_PATHS = new Set<string>(['/intro', '/api/intro-seen']);
const INTRO_ALLOWED_PREFIXES = ['/api/asset/', '/decks/'];

function isIntroGateEnabled(): boolean {
  // Default OFF until the intro video is uploaded to Vercel Blob and the
  // flag is flipped on in project env. Lets us ship the tier model now
  // without the redirect breaking on a missing blob.
  const fromVite = (import.meta.env as Record<string, string | undefined>).INVESTOR_ROOM_INTRO_ENABLED;
  const fromProcess =
    typeof process !== 'undefined' && typeof process.env?.INVESTOR_ROOM_INTRO_ENABLED === 'string'
      ? process.env.INVESTOR_ROOM_INTRO_ENABLED
      : undefined;
  const raw = (fromVite ?? fromProcess ?? '').toLowerCase().trim();
  return raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on';
}

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  for (const prefix of PUBLIC_PREFIXES) {
    if (pathname.startsWith(prefix)) return true;
  }
  return false;
}

function isAuthOnly(pathname: string): boolean {
  return AUTH_ONLY_PATHS.has(pathname);
}

function pathMatchesAnyPrefix(pathname: string, prefixes: string[]): boolean {
  for (const prefix of prefixes) {
    if (pathname === prefix || pathname.startsWith(prefix + '/') || pathname.startsWith(prefix + '?')) {
      return true;
    }
  }
  return false;
}

function isIntroAllowed(pathname: string): boolean {
  if (INTRO_ALLOWED_PATHS.has(pathname)) return true;
  for (const prefix of INTRO_ALLOWED_PREFIXES) {
    if (pathname.startsWith(prefix)) return true;
  }
  return false;
}

function diligenceFileForPath(pathname: string): ReturnType<typeof findFile> {
  const [sectionId, slug] = pathname.split('/').filter(Boolean);
  if (!sectionId || !slug) return undefined;
  return findFile(sectionId, slug);
}

function requiresDiligenceTier(pathname: string): boolean {
  if (pathMatchesAnyPrefix(pathname, DILIGENCE_TIER_PREFIXES)) return true;
  const found = diligenceFileForPath(pathname);
  if (found && requiredTierForFile(found.section, found.file) > 1) return true;
  for (const prefix of TIER2_ASSET_PREFIXES) {
    if (pathname.startsWith(prefix)) return true;
  }
  // Top-level diligence-only PDFs in /pdf/ (e.g. /pdf/Financial_Model_*.pdf).
  if (pathname.startsWith('/pdf/') && !pathname.startsWith('/pdf/legal/')) {
    const filename = pathname.slice('/pdf/'.length);
    for (const suffix of TIER2_FILE_SUFFIXES) {
      if (filename.startsWith(suffix)) return true;
    }
  }
  return false;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (isPublic(pathname)) {
    return next();
  }

  const authToken = context.cookies.get(AUTH_COOKIE_NAME)?.value;
  const authResult = verifyAuthToken(authToken);

  if (!authResult.ok) {
    const next_ = encodeURIComponent(pathname + url.search);
    return context.redirect(`/login?next=${next_}`, 302);
  }

  const tier = authResult.tier ?? 1;
  context.locals.investorAuthed = true;
  context.locals.investorTier = tier;

  if (isAuthOnly(pathname)) {
    return next();
  }

  const agreementToken = context.cookies.get(AGREEMENT_COOKIE_NAME)?.value;
  const agreementResult = verifyAgreementToken(agreementToken);

  if (!agreementResult.ok) {
    const next_ = encodeURIComponent(pathname + url.search);
    return context.redirect(`/agreement?next=${next_}`, 302);
  }

  context.locals.investorProfile = agreementResult.profile;

  // First-time intro gate: if the visitor has not seen the intro video yet,
  // and they're not already on /intro or watching the blob, redirect them
  // through /intro. Static assets and deck iframes load freely so the page
  // itself can render. Disabled by default until INVESTOR_ROOM_INTRO_ENABLED
  // is flipped on (i.e. after the intro video is uploaded to Blob).
  if (isIntroGateEnabled()) {
    const introSeen = context.cookies.get(INTRO_COOKIE_NAME)?.value === '1';
    if (!introSeen && !isIntroAllowed(pathname)) {
      return context.redirect('/intro', 302);
    }
  }

  // Tier enforcement. Diligence-only sections and files require tier 2;
  // anyone else gets bounced silently to home. Nav hides these from tier-1
  // users so a manual URL is the only way to reach them.
  if (requiresDiligenceTier(pathname) && tier < 2) {
    return context.redirect('/', 302);
  }

  return next();
});
