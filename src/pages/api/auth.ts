import type { APIRoute } from 'astro';
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
  issueAuthToken,
  verifyPassword,
} from '@/lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = String(form.get('password') ?? '');
  const next = String(form.get('next') ?? '/');

  if (!verifyPassword(password)) {
    const safeNext = next.startsWith('/') ? next : '/';
    const url = `/login?error=1&next=${encodeURIComponent(safeNext)}`;
    return redirect(url, 303);
  }

  const token = issueAuthToken();
  cookies.set(AUTH_COOKIE_NAME, token.value, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: token.maxAge,
  });

  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';
  return redirect(safeNext, 303);
};

export const prerender = false;
