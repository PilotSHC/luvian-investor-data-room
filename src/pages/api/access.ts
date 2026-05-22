import type { APIRoute } from 'astro';
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
  issueAuthToken,
  verifyMagicLink,
} from '@/lib/auth';

// `/api/access?token=<magic-link-token>` upgrades the visitor to tier 2,
// then redirects to /agreement so the NDA acknowledgment still captures
// the investor's name/firm/email. The link is generated out-of-band by
// `scripts/grant-diligence.mjs` and shared 1:1 with each Lead investor.

function buildSetCookie(name: string, value: string, maxAge: number): string {
  const parts = [`${name}=${value}`, `Max-Age=${maxAge}`, `Path=${AUTH_COOKIE_OPTIONS.path}`];
  if (AUTH_COOKIE_OPTIONS.httpOnly) parts.push('HttpOnly');
  if (AUTH_COOKIE_OPTIONS.secure) parts.push('Secure');
  if (AUTH_COOKIE_OPTIONS.sameSite) {
    parts.push(`SameSite=${AUTH_COOKIE_OPTIONS.sameSite[0].toUpperCase()}${AUTH_COOKIE_OPTIONS.sameSite.slice(1)}`);
  }
  return parts.join('; ');
}

function redirectWithCookie(location: string, setCookie?: string): Response {
  const headers = new Headers({
    Location: location,
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  });
  if (setCookie) headers.append('Set-Cookie', setCookie);
  return new Response(null, { status: 303, headers });
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token') ?? '';
  const next = url.searchParams.get('next') ?? '/';

  const verification = verifyMagicLink(token);
  if (!verification.ok) {
    return redirectWithCookie(
      `/login?magic_error=${encodeURIComponent(verification.reason)}`,
    );
  }

  let authToken: { value: string; maxAge: number };
  try {
    authToken = issueAuthToken(2);
  } catch (err) {
    console.error('[api/access] issueAuthToken threw — env vars likely missing:', err);
    return new Response('Server is missing cookie-signing configuration. Contact luvsupport@luvian.io.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }

  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';
  const agreementUrl = `/agreement?next=${encodeURIComponent(safeNext)}&prefill_email=${encodeURIComponent(verification.payload.email)}`;
  return redirectWithCookie(
    agreementUrl,
    buildSetCookie(AUTH_COOKIE_NAME, authToken.value, authToken.maxAge),
  );
};

export const prerender = false;
