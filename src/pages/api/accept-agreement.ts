import type { APIRoute } from 'astro';
import {
  AGREEMENT_COOKIE_NAME,
  AGREEMENT_COOKIE_OPTIONS,
  issueAgreementToken,
  validateAgreementFields,
} from '@/lib/agreement';
import { AUTH_COOKIE_NAME, verifyAuthToken } from '@/lib/auth';

function buildSetCookie(name: string, value: string, maxAge: number): string {
  const parts = [
    `${name}=${value}`,
    `Max-Age=${maxAge}`,
    `Path=${AGREEMENT_COOKIE_OPTIONS.path}`,
  ];
  if (AGREEMENT_COOKIE_OPTIONS.httpOnly) parts.push('HttpOnly');
  if (AGREEMENT_COOKIE_OPTIONS.secure) parts.push('Secure');
  const ss = AGREEMENT_COOKIE_OPTIONS.sameSite;
  parts.push(`SameSite=${ss[0].toUpperCase()}${ss.slice(1)}`);
  return parts.join('; ');
}

function buildHeaders(extra: Record<string, string>, setCookies: string[]): Headers {
  const headers = new Headers(extra);
  for (const sc of setCookies) headers.append('Set-Cookie', sc);
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  return headers;
}

function safeNextOrRoot(raw: string | null | undefined): string {
  if (typeof raw !== 'string') return '/';
  return raw.startsWith('/') && !raw.startsWith('//') ? raw : '/';
}

function introLocationFor(next: string): string {
  if (next === '/intro' || next.startsWith('/intro?')) return next;
  return `/intro?next=${encodeURIComponent(next)}`;
}

function readAuthCookie(request: Request): string | undefined {
  const header = request.headers.get('cookie');
  if (!header) return undefined;
  for (const part of header.split(/;\s*/)) {
    const [k, ...rest] = part.split('=');
    if (k === AUTH_COOKIE_NAME) return rest.join('=');
  }
  return undefined;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

type AgreementAuditEvent = {
  event: 'AGREEMENT_ACCEPTED';
  name: string;
  firm: string | null;
  email: string;
  acceptedAt: string;
  tier: 1 | 2;
  ip: string;
  userAgent: string;
  referer: string | null;
  nextPath: string;
};

function readEnv(name: string): string | undefined {
  const fromVite = (import.meta.env as Record<string, string | undefined>)[name];
  if (fromVite && fromVite.length > 0) return fromVite;
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name];
  }
  return undefined;
}

async function recordAgreementAcceptance(auditEvent: AgreementAuditEvent): Promise<void> {
  const webhookUrl = readEnv('INVESTOR_ROOM_GOOGLE_SHEET_WEBHOOK_URL');
  if (!webhookUrl) {
    console.warn('[api/accept-agreement] Google Sheet webhook skipped: missing INVESTOR_ROOM_GOOGLE_SHEET_WEBHOOK_URL');
    return;
  }

  if (!webhookUrl.startsWith('https://script.google.com/macros/s/')) {
    console.error('[api/accept-agreement] Google Sheet webhook skipped: URL is not a Google Apps Script Web App URL');
    return;
  }

  const secret = readEnv('INVESTOR_ROOM_GOOGLE_SHEET_WEBHOOK_SECRET');
  const body = secret ? { ...auditEvent, secret } : auditEvent;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
    });

    const responseText = (await response.text()).trim();

    if (!response.ok) {
      console.error('[api/accept-agreement] Google Sheet webhook failed', {
        status: response.status,
        statusText: response.statusText,
        body: responseText.slice(0, 200),
      });
      return;
    }

    if (responseText !== 'ok') {
      console.error('[api/accept-agreement] Google Sheet webhook returned unexpected body', {
        status: response.status,
        body: responseText.slice(0, 200),
      });
      return;
    }

    console.log('[api/accept-agreement] Google Sheet webhook appended row');
  } catch (err) {
    console.error('[api/accept-agreement] Google Sheet webhook threw', err);
  }
}

export const POST: APIRoute = async ({ request }) => {
  const authCookie = readAuthCookie(request);
  const authResult = verifyAuthToken(authCookie);
  if (!authResult.ok) {
    return new Response(null, {
      status: 303,
      headers: buildHeaders({ Location: '/login?next=%2Fagreement' }, []),
    });
  }

  let raw: { name: string; firm: string; email: string; consent: boolean; next: string };
  try {
    const form = await request.formData();
    raw = {
      name: String(form.get('name') ?? ''),
      firm: String(form.get('firm') ?? ''),
      email: String(form.get('email') ?? ''),
      consent: String(form.get('consent') ?? '') === 'yes',
      next: String(form.get('next') ?? '/'),
    };
  } catch {
    return new Response('Invalid form submission.', {
      status: 400,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }

  const validation = validateAgreementFields(raw);
  const next = safeNextOrRoot(raw.next);

  if (!validation.ok) {
    const params = new URLSearchParams();
    params.set('next', next);
    params.set('error', '1');
    params.set('name', raw.name.slice(0, 120));
    params.set('firm', raw.firm.slice(0, 120));
    params.set('email', raw.email.slice(0, 200));
    if (validation.errors.name) params.set('e_name', validation.errors.name);
    if (validation.errors.firm) params.set('e_firm', validation.errors.firm);
    if (validation.errors.email) params.set('e_email', validation.errors.email);
    if (validation.errors.consent) params.set('e_consent', validation.errors.consent);
    return new Response(null, {
      status: 303,
      headers: buildHeaders({ Location: `/agreement?${params.toString()}` }, []),
    });
  }

  let token: { value: string; maxAge: number; payload: { name: string; firm: string; email: string; acceptedAt: number } };
  try {
    token = issueAgreementToken(validation.clean);
  } catch (err) {
    console.error(
      '[api/accept-agreement] issueAgreementToken threw — INVESTOR_ROOM_COOKIE_SECRET missing:',
      err,
    );
    return new Response(
      'Server is missing cookie-signing configuration. Contact luvsupport@luvian.io.',
      {
        status: 500,
        headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
      },
    );
  }

  const auditEvent: AgreementAuditEvent = {
    event: 'AGREEMENT_ACCEPTED',
    name: token.payload.name,
    firm: token.payload.firm || null,
    email: token.payload.email,
    acceptedAt: new Date(token.payload.acceptedAt * 1000).toISOString(),
    tier: authResult.tier ?? 1,
    ip: clientIp(request),
    userAgent: request.headers.get('user-agent') ?? 'unknown',
    referer: request.headers.get('referer') ?? null,
    nextPath: next,
  };
  console.log('[AGREEMENT-ACCEPTED]', JSON.stringify(auditEvent));
  await recordAgreementAcceptance(auditEvent);

  return new Response(null, {
    status: 303,
    headers: buildHeaders(
      { Location: introLocationFor(next) },
      [buildSetCookie(AGREEMENT_COOKIE_NAME, token.value, token.maxAge)],
    ),
  });
};

export const prerender = false;
