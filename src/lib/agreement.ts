import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';

const COOKIE_NAME = 'lvn_dr_agreed';

function readEnv(name: string): string | undefined {
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
      'INVESTOR_ROOM_COOKIE_SECRET is missing or too short. Set a 32+ char value in Vercel project settings.',
    );
  }
  return s;
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

export interface AgreementProfile {
  name: string;
  firm: string;
  email: string;
  acceptedAt: number;
}

export interface AgreementCheck {
  ok: boolean;
  profile?: AgreementProfile;
  reason?: 'missing' | 'malformed' | 'bad-signature' | 'expired';
}

export function issueAgreementToken(
  profile: Omit<AgreementProfile, 'acceptedAt'> & { acceptedAt?: number },
): { value: string; maxAge: number; payload: AgreementProfile } {
  const acceptedAt = profile.acceptedAt ?? Math.floor(Date.now() / 1000);
  const ttl = getTtlSeconds();
  const expiresAt = acceptedAt + ttl;
  const nonce = randomBytes(6).toString('hex');

  const payloadObj: AgreementProfile & { exp: number; nonce: string } = {
    name: profile.name,
    firm: profile.firm,
    email: profile.email,
    acceptedAt,
    exp: expiresAt,
    nonce,
  };
  const payloadJson = JSON.stringify(payloadObj);
  const payloadB64 = base64UrlEncode(payloadJson);
  const sig = hmac(payloadB64);
  return {
    value: `${payloadB64}.${sig}`,
    maxAge: ttl,
    payload: { name: profile.name, firm: profile.firm, email: profile.email, acceptedAt },
  };
}

export function verifyAgreementToken(token: string | undefined | null): AgreementCheck {
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
  let parsed: AgreementProfile & { exp: number; nonce: string };
  try {
    parsed = JSON.parse(base64UrlDecode(payloadB64));
  } catch {
    return { ok: false, reason: 'malformed' };
  }
  if (
    typeof parsed.name !== 'string' ||
    typeof parsed.firm !== 'string' ||
    typeof parsed.email !== 'string' ||
    typeof parsed.acceptedAt !== 'number' ||
    typeof parsed.exp !== 'number'
  ) {
    return { ok: false, reason: 'malformed' };
  }
  if (parsed.exp <= Math.floor(Date.now() / 1000)) return { ok: false, reason: 'expired' };
  return {
    ok: true,
    profile: {
      name: parsed.name,
      firm: parsed.firm,
      email: parsed.email,
      acceptedAt: parsed.acceptedAt,
    },
  };
}

export const AGREEMENT_COOKIE_NAME = COOKIE_NAME;

export const AGREEMENT_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: import.meta.env.PROD === true,
  sameSite: 'lax' as const,
  path: '/',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface FieldErrors {
  name?: string;
  firm?: string;
  email?: string;
  consent?: string;
}

export function validateAgreementFields(input: {
  name: string;
  firm: string;
  email: string;
  consent: boolean;
}): { ok: true; clean: { name: string; firm: string; email: string } } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const firm = input.firm.trim();
  const email = input.email.trim();

  if (name.length < 2) errors.name = 'Please enter your full legal name.';
  if (name.length > 120) errors.name = 'Name is too long.';
  if (firm.length > 120) errors.firm = 'Firm name is too long.';
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = 'Please enter a valid email address.';
  if (!input.consent) errors.consent = 'You must check the box to continue.';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, clean: { name, firm, email } };
}
