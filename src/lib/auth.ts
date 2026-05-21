import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';

const COOKIE_NAME = 'lvn_dr_auth';

function readEnv(name: string): string | undefined {
  // Astro/Vite exposes .env via import.meta.env at build/dev time;
  // Vercel runtime exposes via process.env. Try both.
  const fromVite = (import.meta.env as Record<string, string | undefined>)[name];
  if (fromVite && fromVite.length > 0) return fromVite;
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name];
  }
  return undefined;
}

function getSecret(): string {
  const s = readEnv('INVESTOR_ROOM_COOKIE_SECRET');
  if (!s || s.length < 16) {
    throw new Error(
      'INVESTOR_ROOM_COOKIE_SECRET is missing or too short. Set a 32+ char value in .env or in Vercel project settings.',
    );
  }
  return s;
}

function getPassword(): string {
  const p = readEnv('INVESTOR_ROOM_PASSWORD');
  if (!p || p.length < 6) {
    throw new Error(
      'INVESTOR_ROOM_PASSWORD is missing or too short. Set a long passphrase in .env or in Vercel project settings.',
    );
  }
  return p;
}

function getTtlSeconds(): number {
  const raw = readEnv('INVESTOR_ROOM_COOKIE_TTL');
  const n = Number(raw ?? 60 * 60 * 24 * 7);
  return Number.isFinite(n) && n > 0 ? n : 60 * 60 * 24 * 7;
}

function hmac(input: string): string {
  return createHmac('sha256', getSecret()).update(input).digest('hex');
}

function constantTimeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export interface AuthCheck {
  ok: boolean;
  reason?: 'missing' | 'malformed' | 'bad-signature' | 'expired';
}

export function verifyPassword(submitted: string): boolean {
  const expected = getPassword();
  if (!submitted || submitted.length === 0) return false;
  if (submitted.length !== expected.length) return false;
  return constantTimeEqual(submitted, expected);
}

export function issueAuthToken(): { value: string; maxAge: number } {
  const issuedAt = Math.floor(Date.now() / 1000);
  const nonce = randomBytes(8).toString('hex');
  const ttl = getTtlSeconds();
  const expiresAt = issuedAt + ttl;
  const payload = `${issuedAt}.${expiresAt}.${nonce}`;
  const sig = hmac(payload);
  return { value: `${payload}.${sig}`, maxAge: ttl };
}

export function verifyAuthToken(token: string | undefined | null): AuthCheck {
  if (!token) return { ok: false, reason: 'missing' };
  const parts = token.split('.');
  if (parts.length !== 4) return { ok: false, reason: 'malformed' };
  const [issuedAt, expiresAt, nonce, sig] = parts;
  const payload = `${issuedAt}.${expiresAt}.${nonce}`;
  const expectedSig = hmac(payload);
  if (!constantTimeEqual(sig, expectedSig)) return { ok: false, reason: 'bad-signature' };
  const exp = Number(expiresAt);
  if (!Number.isFinite(exp) || exp <= Math.floor(Date.now() / 1000)) {
    return { ok: false, reason: 'expired' };
  }
  return { ok: true };
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  // Secure cookies require HTTPS — drop in dev so localhost works.
  secure: import.meta.env.PROD === true,
  sameSite: 'lax' as const,
  path: '/',
};
