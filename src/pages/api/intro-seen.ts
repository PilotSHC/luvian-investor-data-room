import type { APIRoute } from 'astro';

const COOKIE_NAME = 'lvn_dr_intro_seen';
const COOKIE_TTL_SECONDS = 60 * 60 * 24 * 365; // 1 year

function buildSetCookie(): string {
  const parts = [
    `${COOKIE_NAME}=1`,
    `Max-Age=${COOKIE_TTL_SECONDS}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
  ];
  if (import.meta.env.PROD === true) parts.push('Secure');
  return parts.join('; ');
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (!locals.investorAuthed) {
    return new Response('Unauthorized', { status: 401 });
  }

  let next = '/';
  try {
    const form = await request.formData();
    const submitted = String(form.get('next') ?? '/');
    if (submitted.startsWith('/') && !submitted.startsWith('//')) {
      next = submitted;
    }
  } catch {
    // not a form body — fall through with default next
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: next,
      'Set-Cookie': buildSetCookie(),
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    },
  });
};

export const prerender = false;
