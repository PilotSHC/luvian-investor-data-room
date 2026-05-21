import type { APIRoute } from 'astro';
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from '@/lib/auth';

function clearedCookie(): string {
  const parts = [
    `${AUTH_COOKIE_NAME}=`,
    'Max-Age=0',
    `Path=${AUTH_COOKIE_OPTIONS.path}`,
  ];
  if (AUTH_COOKIE_OPTIONS.httpOnly) parts.push('HttpOnly');
  if (AUTH_COOKIE_OPTIONS.secure) parts.push('Secure');
  if (AUTH_COOKIE_OPTIONS.sameSite) {
    const s = AUTH_COOKIE_OPTIONS.sameSite;
    parts.push(`SameSite=${s[0].toUpperCase()}${s.slice(1)}`);
  }
  return parts.join('; ');
}

function logoutResponse(): Response {
  const headers = new Headers({
    Location: '/login',
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  });
  headers.append('Set-Cookie', clearedCookie());
  return new Response(null, { status: 303, headers });
}

export const POST: APIRoute = () => logoutResponse();
export const GET: APIRoute = () => logoutResponse();

export const prerender = false;
