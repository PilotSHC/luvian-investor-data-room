import type { APIRoute } from 'astro';
import { head } from '@vercel/blob';

export const prerender = false;

// Pathname inside the private Vercel Blob store. Rotate by uploading a
// new blob with a different pathname and changing this constant.
// Auth + agreement are already enforced by Astro middleware before this
// route runs, so reaching this code means the request is authorised.
const BLOB_PATHNAME = 'demo/luvian-alpha-2026-05.mp4';

// Headers the browser needs to seek inside the video. We forward only
// these — passing cookies / host / user-agent confuses the upstream CDN
// and produces 400s.
const FORWARDED_REQUEST_HEADERS = ['range', 'if-range', 'if-none-match', 'if-modified-since'] as const;

// Headers the upstream returns that the browser actually needs.
const FORWARDED_RESPONSE_HEADERS = [
  'content-type',
  'content-length',
  'content-range',
  'accept-ranges',
  'etag',
  'last-modified',
] as const;

// Resolve the blob token in a way that works in both Astro dev (Vite
// loads .env* into import.meta.env) and Vercel production (the Blob
// store integration auto-injects process.env.BLOB_READ_WRITE_TOKEN).
function getBlobToken(): string | undefined {
  const fromVite =
    typeof import.meta.env !== 'undefined' &&
    typeof import.meta.env.BLOB_READ_WRITE_TOKEN === 'string'
      ? (import.meta.env.BLOB_READ_WRITE_TOKEN as string)
      : undefined;
  const fromProcess =
    typeof process !== 'undefined' && typeof process.env?.BLOB_READ_WRITE_TOKEN === 'string'
      ? process.env.BLOB_READ_WRITE_TOKEN
      : undefined;
  return fromVite ?? fromProcess;
}

// `head()` on a private blob returns the canonical CDN URL. Cached for
// the lifetime of the function instance because the URL is stable per
// pathname and the call costs ~150ms cold.
let cachedBlobUrl: string | null = null;
async function resolveBlobUrl(token: string): Promise<string> {
  if (cachedBlobUrl) return cachedBlobUrl;
  const meta = await head(BLOB_PATHNAME, { token });
  cachedBlobUrl = meta.url;
  return meta.url;
}

async function proxyBlob(request: Request, method: 'GET' | 'HEAD'): Promise<Response> {
  const token = getBlobToken();
  if (!token) {
    console.error('[asset/demo] BLOB_READ_WRITE_TOKEN missing in runtime env');
    return new Response(method === 'GET' ? 'Asset temporarily unavailable' : null, {
      status: 503,
    });
  }

  let blobUrl: string;
  try {
    blobUrl = await resolveBlobUrl(token);
  } catch (err) {
    console.error('[asset/demo] head() failed', err);
    return new Response(method === 'GET' ? 'Asset temporarily unavailable' : null, {
      status: 503,
    });
  }

  const upstreamHeaders = new Headers();
  upstreamHeaders.set('authorization', `Bearer ${token}`);
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) upstreamHeaders.set(name, value);
  }

  let upstream: Response;
  try {
    upstream = await fetch(blobUrl, { method, headers: upstreamHeaders });
  } catch (err) {
    console.error('[asset/demo] upstream fetch failed', err);
    return new Response(method === 'GET' ? 'Asset temporarily unavailable' : null, {
      status: 503,
    });
  }

  const responseHeaders = new Headers();
  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  if (!responseHeaders.has('accept-ranges')) {
    responseHeaders.set('accept-ranges', 'bytes');
  }
  responseHeaders.set('x-content-type-options', 'nosniff');
  responseHeaders.set('content-disposition', 'inline');
  // Confidential asset — no shared cache may keep a copy.
  responseHeaders.set('cache-control', 'private, no-store, max-age=0');

  // For HEAD we must not return a body, but we DO need the upstream's
  // metadata headers (content-length etc.) to pass through. fetch()
  // already gives us a HEAD-shaped response when method='HEAD'.
  return new Response(method === 'HEAD' ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export const GET: APIRoute = async ({ request, locals }) => {
  if (!locals.investorAuthed || !locals.investorProfile) {
    return new Response('Unauthorized', { status: 401 });
  }
  return proxyBlob(request, 'GET');
};

export const HEAD: APIRoute = async ({ request, locals }) => {
  if (!locals.investorAuthed || !locals.investorProfile) {
    return new Response(null, { status: 401 });
  }
  return proxyBlob(request, 'HEAD');
};
