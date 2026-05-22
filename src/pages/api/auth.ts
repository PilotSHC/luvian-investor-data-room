import type { APIRoute } from 'astro';
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
  issueAuthToken,
  verifyPassword,
} from '@/lib/auth';

function buildSetCookie(name: string, value: string, maxAge: number): string {
  const parts = [`${name}=${value}`, `Max-Age=${maxAge}`, `Path=${AUTH_COOKIE_OPTIONS.path}`];
  if (AUTH_COOKIE_OPTIONS.httpOnly) parts.push('HttpOnly');
  if (AUTH_COOKIE_OPTIONS.secure) parts.push('Secure');
  if (AUTH_COOKIE_OPTIONS.sameSite) parts.push(`SameSite=${AUTH_COOKIE_OPTIONS.sameSite[0].toUpperCase()}${AUTH_COOKIE_OPTIONS.sameSite.slice(1)}`);
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

export const POST: APIRoute = async ({ request }) => {
  let password = '';
  let next = '/';
  try {
    const form = await request.formData();
    password = String(form.get('password') ?? '');
    next = String(form.get('next') ?? '/');
  } catch {
    // not a form body — fall through with empty password (will fail check)
  }

  let check: ReturnType<typeof verifyPassword>;
  try {
    check = verifyPassword(password);
  } catch (err) {
    console.error('[api/auth] verifyPassword threw — env vars likely missing:', err);
    return new Response('Server is missing authentication configuration. Contact luvsupport@luvian.io.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }

  if (!check.ok) {
    const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';
    return redirectWithCookie(`/login?error=1&next=${encodeURIComponent(safeNext)}`);
  }

  let token: { value: string; maxAge: number };
  try {
    token = issueAuthToken(check.tier);
  } catch (err) {
    console.error('[api/auth] issueAuthToken threw — INVESTOR_ROOM_COOKIE_SECRET missing:', err);
    return new Response('Server is missing cookie-signing configuration. Contact luvsupport@luvian.io.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }

  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';
  const agreementUrl = `/agreement?next=${encodeURIComponent(safeNext)}`;
  return redirectWithCookie(agreementUrl, buildSetCookie(AUTH_COOKIE_NAME, token.value, token.maxAge));
};

export const prerender = false;
