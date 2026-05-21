import { defineMiddleware } from 'astro:middleware';
import { AUTH_COOKIE_NAME, verifyAuthToken } from '@/lib/auth';
import { AGREEMENT_COOKIE_NAME, verifyAgreementToken } from '@/lib/agreement';

const PUBLIC_PATHS = new Set<string>([
  '/login',
  '/privacy',
  '/api/auth',
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

  context.locals.investorAuthed = true;

  if (isAuthOnly(pathname)) {
    return next();
  }

  const agreementToken = context.cookies.get(AGREEMENT_COOKIE_NAME)?.value;
  const agreementResult = verifyAgreementToken(agreementToken);

  if (!agreementResult.ok) {
    const next_ = encodeURIComponent(pathname + url.search);
    return context.redirect(`/agreement?next=${next_}`, 302);
  }

  context.locals.investorAuthed = true;
  context.locals.investorProfile = agreementResult.profile;
  return next();
});
