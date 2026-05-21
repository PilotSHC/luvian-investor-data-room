#!/usr/bin/env node
/**
 * One-shot upload of the confidential demo video to Vercel Blob (private).
 *
 * Prerequisites:
 *   1. A private Blob store exists in the Vercel project. Create with:
 *        vercel blob create-store luvian-data-room-private --access private
 *      (CLI logs you in if you're not, then asks which project to attach.)
 *   2. The store's BLOB_READ_WRITE_TOKEN is in your local environment.
 *      Pull it with:
 *        vercel env pull .env.local
 *      Then either source .env.local or pass the token via --token.
 *
 * Usage:
 *   node scripts/upload-demo-to-blob.mjs <local-file-path>
 *   node scripts/upload-demo-to-blob.mjs --token=blob_rw_xxx <local-file-path>
 *
 * The remote pathname must match BLOB_PATHNAME in src/pages/api/asset/demo.ts
 * (currently "demo/luvian-alpha-2026-05.mp4"). Change both together if you
 * rotate.
 */
import fs from 'node:fs';
import path from 'node:path';
import { put, head, del } from '@vercel/blob';

const TARGET_PATHNAME = 'demo/luvian-alpha-2026-05.mp4';

function parseArgs(argv) {
  const args = { token: undefined, file: undefined };
  for (const arg of argv) {
    if (arg.startsWith('--token=')) args.token = arg.slice('--token='.length);
    else if (arg.startsWith('--')) continue;
    else if (!args.file) args.file = arg;
  }
  return args;
}

async function loadEnvFromFile(envPath) {
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    let [, key, value] = m;
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await loadEnvFromFile(path.resolve(process.cwd(), '.env.local'));
  await loadEnvFromFile(path.resolve(process.cwd(), '.env'));

  const token = args.token || process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('[upload-demo] Missing BLOB_READ_WRITE_TOKEN.');
    console.error('  Run: vercel env pull .env.local   (after creating the Blob store)');
    console.error('  Or:  node scripts/upload-demo-to-blob.mjs --token=blob_rw_... <file>');
    process.exit(2);
  }

  const localPath = args.file;
  if (!localPath) {
    console.error('[upload-demo] Missing local file path argument.');
    console.error('  Usage: node scripts/upload-demo-to-blob.mjs <local-file-path>');
    process.exit(2);
  }
  if (!fs.existsSync(localPath)) {
    console.error(`[upload-demo] File not found: ${localPath}`);
    process.exit(2);
  }

  const stat = fs.statSync(localPath);
  console.log(`[upload-demo] source: ${localPath}`);
  console.log(`[upload-demo] size:   ${(stat.size / 1024 / 1024).toFixed(1)} MB`);
  console.log(`[upload-demo] target: ${TARGET_PATHNAME} (private)`);

  // If a previous version exists at the same pathname, replace it
  // explicitly so we don't accumulate orphans. allowOverwrite handles
  // this on put().
  try {
    const existing = await head(TARGET_PATHNAME, { access: 'private', token });
    if (existing) {
      console.log(`[upload-demo] existing blob found (${(existing.size / 1024 / 1024).toFixed(1)} MB) — will overwrite`);
    }
  } catch (err) {
    if (err && typeof err === 'object' && 'name' in err && err.name === 'BlobNotFoundError') {
      console.log('[upload-demo] no prior blob at target pathname (fresh upload)');
    } else {
      console.warn(`[upload-demo] head() check failed (continuing): ${err?.message ?? err}`);
    }
  }

  const stream = fs.createReadStream(localPath);
  const result = await put(TARGET_PATHNAME, stream, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'video/mp4',
    token,
    multipart: true,
    onUploadProgress: ({ loaded, total, percentage }) => {
      const mb = (loaded / 1024 / 1024).toFixed(1);
      const totalMb = (total / 1024 / 1024).toFixed(1);
      process.stderr.write(`\r[upload-demo]   ${mb} / ${totalMb} MB (${percentage.toFixed(1)}%)   `);
    },
  });
  process.stderr.write('\n');

  console.log('[upload-demo] success');
  console.log(`  pathname: ${result.pathname}`);
  console.log(`  url:      ${result.url}`);
  console.log(`  etag:     ${result.etag}`);
  console.log('  (URL above is private — direct GET requires the BLOB_READ_WRITE_TOKEN)');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Confirm BLOB_READ_WRITE_TOKEN is also set in the Vercel project');
  console.log('     (it is auto-set when you create the store via `vercel blob create-store`).');
  console.log('  2. Push your code; visit /03-product-demo/demo-walkthrough on production.');
}

main().catch((err) => {
  console.error('[upload-demo] FAILED', err);
  process.exit(1);
});
