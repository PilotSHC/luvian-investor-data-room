import type { APIRoute } from 'astro';
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from '@/lib/auth';
import { AGREEMENT_COOKIE_NAME, AGREEMENT_COOKIE_OPTIONS } from '@/lib/agreement';

function clearedCookie(
  name: string,
  options: { httpOnly: boolean; secure: boolean; sameSite: 'lax' | 'strict' | 'none'; path: string },
): string {
  const parts = [`${name}=`, 'Max-Age=0', `Path=${options.path}`];
  if (options.httpOnly) parts.push('HttpOnly');
  if (options.secure) parts.push('Secure');
  parts.push(`SameSite=${options.sameSite[0].toUpperCase()}${options.sameSite.slice(1)}`);
  return parts.join('; ');
}

function logoutResponse(): Response {
  const headers = new Headers({
    Location: '/login',
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  });
  headers.append('Set-Cookie', clearedCookie(AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS));
  headers.append('Set-Cookie', clearedCookie(AGREEMENT_COOKIE_NAME, AGREEMENT_COOKIE_OPTIONS));
  return new Response(null, { status: 303, headers });
}

export const POST: APIRoute = () => logoutResponse();
export const GET: APIRoute = () => logoutResponse();

export const prerender = false;
