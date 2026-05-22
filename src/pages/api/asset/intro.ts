import type { APIRoute } from 'astro';
import { head } from '@vercel/blob';

export const prerender = false;

// Pathname inside the private Vercel Blob store. Rotate by uploading a
// new blob with a different pathname and changing this constant.
// Auth + agreement are already enforced by Astro middleware before this
// route runs, so reaching this code means the request is authorised.
const BLOB_PATHNAME = 'intro/luvian-intro-2026-05.mp4';

const FORWARDED_REQUEST_HEADERS = ['range', 'if-range', 'if-none-match', 'if-modified-since'] as const;

const FORWARDED_RESPONSE_HEADERS = [
  'content-type',
  'content-length',
  'content-range',
  'accept-ranges',
  'etag',
  'last-modified',
] as const;

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
    console.error('[asset/intro] BLOB_READ_WRITE_TOKEN missing in runtime env');
    return new Response(method === 'GET' ? 'Asset temporarily unavailable' : null, {
      status: 503,
    });
  }

  let blobUrl: string;
  try {
    blobUrl = await resolveBlobUrl(token);
  } catch (err) {
    console.error('[asset/intro] head() failed', err);
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
    console.error('[asset/intro] upstream fetch failed', err);
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
  responseHeaders.set('cache-control', 'private, no-store, max-age=0');

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
