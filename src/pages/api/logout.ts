import type { APIRoute } from 'astro';
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from '@/lib/auth';

export const POST: APIRoute = ({ cookies, redirect }) => {
  cookies.delete(AUTH_COOKIE_NAME, { ...AUTH_COOKIE_OPTIONS });
  return redirect('/login', 303);
};

export const GET: APIRoute = ({ cookies, redirect }) => {
  cookies.delete(AUTH_COOKIE_NAME, { ...AUTH_COOKIE_OPTIONS });
  return redirect('/login', 303);
};

export const prerender = false;
