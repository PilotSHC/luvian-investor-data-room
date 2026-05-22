import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';

const COOKIE_NAME = 'lvn_dr_auth';

export type AccessTier = 1 | 2;

function readEnv(name: string): string | undefined {
  const fromVite = (import.meta.env as Record<string, string | undefined>)[name];
  if (fromVite && fromVite.length > 0) return fromVite;
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name];
  }
  return undefined;
}

const _envProbe = {
  hasIntroPassword: Boolean(readEnv('INVESTOR_ROOM_PASSWORD')),
  hasDiligencePassword: Boolean(readEnv('INVESTOR_ROOM_PASSWORD_DILIGENCE')),
  hasSecret: Boolean(readEnv('INVESTOR_ROOM_COOKIE_SECRET')),
};
// eslint-disable-next-line no-console
console.log('[lib/auth] env probe:', JSON.stringify(_envProbe));

function getSecret(): string {
  const s = readEnv('INVESTOR_ROOM_COOKIE_SECRET');
  if (!s || s.length < 16) {
    throw new Error(
      'INVESTOR_ROOM_COOKIE_SECRET is missing or too short. Set a 32+ char value in .env or in Vercel project settings.',
    );
  }
  return s;
}

function getIntroPassword(): string {
  const p = readEnv('INVESTOR_ROOM_PASSWORD');
  if (!p || p.length < 6) {
    throw new Error(
      'INVESTOR_ROOM_PASSWORD is missing or too short. Set a long passphrase in .env or in Vercel project settings.',
    );
  }
  return p;
}

function getDiligencePassword(): string | undefined {
  const p = readEnv('INVESTOR_ROOM_PASSWORD_DILIGENCE');
  if (!p || p.length < 6) return undefined;
  return p;
}

function getTtlSeconds(): number {
  const raw = readEnv('INVESTOR_ROOM_COOKIE_TTL');
  const n = Number(raw ?? 60 * 60 * 24 * 7);
  return Number.isFinite(n) && n > 0 ? n : 60 * 60 * 24 * 7;
}

function getMagicLinkTtlSeconds(): number {
  // Magic links default to 30 days so a Lead has plenty of time to dig in.
  const raw = readEnv('INVESTOR_ROOM_MAGIC_LINK_TTL');
  const n = Number(raw ?? 60 * 60 * 24 * 30);
  return Number.isFinite(n) && n > 0 ? n : 60 * 60 * 24 * 30;
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
  tier?: AccessTier;
  reason?: 'missing' | 'malformed' | 'bad-signature' | 'expired';
}

export type PasswordCheck =
  | { ok: true; tier: AccessTier }
  | { ok: false };

export function verifyPassword(submitted: string): PasswordCheck {
  if (!submitted || submitted.length === 0) return { ok: false };
  const intro = getIntroPassword();
  if (
    submitted.length === intro.length &&
    constantTimeEqual(submitted, intro)
  ) {
    return { ok: true, tier: 1 };
  }
  const diligence = getDiligencePassword();
  if (
    diligence &&
    submitted.length === diligence.length &&
    constantTimeEqual(submitted, diligence)
  ) {
    return { ok: true, tier: 2 };
  }
  return { ok: false };
}

export function issueAuthToken(tier: AccessTier): { value: string; maxAge: number } {
  const issuedAt = Math.floor(Date.now() / 1000);
  const nonce = randomBytes(8).toString('hex');
  const ttl = getTtlSeconds();
  const expiresAt = issuedAt + ttl;
  const payload = `${issuedAt}.${expiresAt}.${tier}.${nonce}`;
  const sig = hmac(payload);
  return { value: `${payload}.${sig}`, maxAge: ttl };
}

export function verifyAuthToken(token: string | undefined | null): AuthCheck {
  if (!token) return { ok: false, reason: 'missing' };
  const parts = token.split('.');
  // 5 parts: tiered token (current). 4 parts: legacy token, treat as tier 1.
  if (parts.length !== 4 && parts.length !== 5) {
    return { ok: false, reason: 'malformed' };
  }

  let issuedAt: string;
  let expiresAt: string;
  let tierStr: string;
  let nonce: string;
  let sig: string;
  let payload: string;
  let tier: AccessTier;

  if (parts.length === 5) {
    [issuedAt, expiresAt, tierStr, nonce, sig] = parts;
    payload = `${issuedAt}.${expiresAt}.${tierStr}.${nonce}`;
    if (tierStr !== '1' && tierStr !== '2') return { ok: false, reason: 'malformed' };
    tier = Number(tierStr) as AccessTier;
  } else {
    [issuedAt, expiresAt, nonce, sig] = parts;
    payload = `${issuedAt}.${expiresAt}.${nonce}`;
    tier = 1;
  }

  const expectedSig = hmac(payload);
  if (!constantTimeEqual(sig, expectedSig)) return { ok: false, reason: 'bad-signature' };
  const exp = Number(expiresAt);
  if (!Number.isFinite(exp) || exp <= Math.floor(Date.now() / 1000)) {
    return { ok: false, reason: 'expired' };
  }
  return { ok: true, tier };
}

// ---------------------------------------------------------------------------
// Magic links — per-investor diligence-tier access
// ---------------------------------------------------------------------------
//
// A magic link is a signed payload `{email, exp, nonce}` that, when visited,
// upgrades the holder to tier 2 for the lifetime of the auth cookie. The
// link itself is single-use-per-cookie: visiting it sets a tier-2 auth
// cookie and then redirects to /agreement so the NDA acknowledgment still
// captures the investor's name/firm/email. Re-using the link after the
// cookie expires re-authenticates them at tier 2 without needing a new link
// (until the link's own `exp` passes).
//
// Generated out-of-band via `scripts/grant-diligence.mjs`.

export interface MagicLinkPayload {
  email: string;
  exp: number;
  nonce: string;
}

export type MagicLinkVerification =
  | { ok: true; payload: MagicLinkPayload }
  | { ok: false; reason: 'missing' | 'malformed' | 'bad-signature' | 'expired' };

function base64UrlEncode(input: string): string {
  return Buffer.from(input, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(input: string): string {
  const pad = input.length % 4 === 2 ? '==' : input.length % 4 === 3 ? '=' : '';
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/') + pad;
  return Buffer.from(b64, 'base64').toString('utf8');
}

export function issueMagicLink(
  email: string,
  ttlSeconds?: number,
): { token: string; expiresAt: number } {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || cleanEmail.length > 200 || !cleanEmail.includes('@')) {
    throw new Error(`Invalid email for magic link: ${email}`);
  }
  const ttl = ttlSeconds && ttlSeconds > 0 ? ttlSeconds : getMagicLinkTtlSeconds();
  const exp = Math.floor(Date.now() / 1000) + ttl;
  const nonce = randomBytes(8).toString('hex');
  const payload: MagicLinkPayload = { email: cleanEmail, exp, nonce };
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const sig = hmac(payloadB64);
  return { token: `${payloadB64}.${sig}`, expiresAt: exp };
}

export function verifyMagicLink(token: string | undefined | null): MagicLinkVerification {
  if (!token) return { ok: false, reason: 'missing' };
  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false, reason: 'malformed' };
  const [payloadB64, sig] = parts;
  let expectedSig: string;
  try {
    expectedSig = hmac(payloadB64);
  } catch {
    return { ok: false, reason: 'bad-signature' };
  }
  if (!constantTimeEqual(sig, expectedSig)) return { ok: false, reason: 'bad-signature' };
  let parsed: MagicLinkPayload;
  try {
    parsed = JSON.parse(base64UrlDecode(payloadB64)) as MagicLinkPayload;
  } catch {
    return { ok: false, reason: 'malformed' };
  }
  if (
    typeof parsed.email !== 'string' ||
    typeof parsed.exp !== 'number' ||
    typeof parsed.nonce !== 'string'
  ) {
    return { ok: false, reason: 'malformed' };
  }
  if (parsed.exp <= Math.floor(Date.now() / 1000)) return { ok: false, reason: 'expired' };
  return { ok: true, payload: parsed };
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: import.meta.env.PROD === true,
  sameSite: 'lax' as const,
  path: '/',
};
