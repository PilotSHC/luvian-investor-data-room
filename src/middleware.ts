import { defineMiddleware } from 'astro:middleware';
import { AUTH_COOKIE_NAME, verifyAuthToken } from '@/lib/auth';

const PUBLIC_PATHS = new Set<string>([
  '/login',
  '/api/auth',
  '/api/logout',
  '/favicon.ico',
  '/robots.txt',
]);

const PUBLIC_PREFIXES = ['/_image/', '/_astro/', '/_vercel/'];

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  for (const prefix of PUBLIC_PREFIXES) {
    if (pathname.startsWith(prefix)) return true;
  }
  return false;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (isPublic(pathname)) {
    return next();
  }

  const token = context.cookies.get(AUTH_COOKIE_NAME)?.value;
  const result = verifyAuthToken(token);

  if (!result.ok) {
    const next_ = encodeURIComponent(pathname + url.search);
    return context.redirect(`/login?next=${next_}`, 302);
  }

  context.locals.investorAuthed = true;
  return next();
});
