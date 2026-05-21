import type { APIRoute } from 'astro';

function readEnv(name: string): string | undefined {
  const fromVite = (import.meta.env as Record<string, string | undefined>)[name];
  if (fromVite && fromVite.length > 0) return fromVite;
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name];
  }
  return undefined;
}

export const GET: APIRoute = () => {
  const password = readEnv('INVESTOR_ROOM_PASSWORD');
  const secret = readEnv('INVESTOR_ROOM_COOKIE_SECRET');
  const ttl = readEnv('INVESTOR_ROOM_COOKIE_TTL');

  const body = {
    ok: true,
    deployedAt: new Date().toISOString(),
    runtime: typeof process !== 'undefined' ? process.version : 'unknown',
    env: {
      INVESTOR_ROOM_PASSWORD_present: Boolean(password),
      INVESTOR_ROOM_PASSWORD_length: password?.length ?? 0,
      INVESTOR_ROOM_COOKIE_SECRET_present: Boolean(secret),
      INVESTOR_ROOM_COOKIE_SECRET_length: secret?.length ?? 0,
      INVESTOR_ROOM_COOKIE_TTL_present: Boolean(ttl),
      INVESTOR_ROOM_COOKIE_TTL_value: ttl ?? null,
    },
    expectedKeys: [
      'INVESTOR_ROOM_PASSWORD',
      'INVESTOR_ROOM_COOKIE_SECRET',
      'INVESTOR_ROOM_COOKIE_TTL (optional)',
    ],
    note: 'This endpoint reveals presence and length only — never the values.',
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    },
  });
};

export const prerender = false;
