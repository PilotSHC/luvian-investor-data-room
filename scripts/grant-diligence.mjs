#!/usr/bin/env node
/**
 * Generate a per-investor diligence magic link.
 *
 * Each link is a signed token tied to a specific investor email. When the
 * investor visits the link, the data room issues a tier-2 auth cookie and
 * redirects them through the NDA agreement (with their email pre-filled).
 * The link is reusable until its `exp` passes — handy if the investor's
 * cookie expires mid-diligence and they need to re-authenticate.
 *
 * Usage:
 *   node scripts/grant-diligence.mjs --email=name@firm.com [--days=30] [--base=https://luvian.info]
 *
 * Reads INVESTOR_ROOM_COOKIE_SECRET from .env.local / .env or the current
 * environment. The secret MUST match the one in the deployed Vercel
 * environment, otherwise the link will fail signature verification.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHmac, randomBytes } from 'node:crypto';

const DEFAULT_DAYS = 30;
const DEFAULT_BASE = 'https://luvian.info';

function parseArgs(argv) {
  const args = { email: undefined, days: DEFAULT_DAYS, base: DEFAULT_BASE };
  for (const arg of argv) {
    if (arg.startsWith('--email=')) args.email = arg.slice('--email='.length);
    else if (arg.startsWith('--days=')) args.days = Number(arg.slice('--days='.length));
    else if (arg.startsWith('--base=')) args.base = arg.slice('--base='.length).replace(/\/$/, '');
  }
  return args;
}

function loadEnvFromFile(envPath) {
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    let [, key, value] = m;
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function base64UrlEncode(input) {
  return Buffer.from(input, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function hmac(secret, input) {
  return createHmac('sha256', secret).update(input).digest('hex');
}

function main() {
  loadEnvFromFile(path.resolve(process.cwd(), '.env.local'));
  loadEnvFromFile(path.resolve(process.cwd(), '.env'));

  const args = parseArgs(process.argv.slice(2));

  if (!args.email || !args.email.includes('@')) {
    console.error('[grant-diligence] Missing or invalid --email argument.');
    console.error('  Usage: node scripts/grant-diligence.mjs --email=name@firm.com [--days=30]');
    process.exit(2);
  }

  if (!Number.isFinite(args.days) || args.days <= 0) {
    console.error('[grant-diligence] --days must be a positive number.');
    process.exit(2);
  }

  const secret = process.env.INVESTOR_ROOM_COOKIE_SECRET;
  if (!secret || secret.length < 16) {
    console.error('[grant-diligence] INVESTOR_ROOM_COOKIE_SECRET missing or too short.');
    console.error('  Run: vercel env pull .env.local');
    console.error('  Or set it manually in your shell before running this script.');
    process.exit(2);
  }

  const cleanEmail = args.email.trim().toLowerCase();
  const ttlSeconds = args.days * 24 * 60 * 60;
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const nonce = randomBytes(8).toString('hex');
  const payload = { email: cleanEmail, exp, nonce };
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const sig = hmac(secret, payloadB64);
  const token = `${payloadB64}.${sig}`;
  const link = `${args.base}/api/access?token=${encodeURIComponent(token)}`;
  const expDate = new Date(exp * 1000).toISOString().slice(0, 10);

  console.log('');
  console.log('================ DILIGENCE-TIER MAGIC LINK ================');
  console.log(`Investor email:  ${cleanEmail}`);
  console.log(`Valid through:   ${expDate} (${args.days} days)`);
  console.log(`Tier:            2 (full diligence)`);
  console.log('');
  console.log('Share this exact URL with the investor:');
  console.log('');
  console.log(link);
  console.log('');
  console.log('On first visit:');
  console.log('  1. Investor lands on /api/access?token=...');
  console.log('  2. Server verifies the signature, sets a tier-2 cookie');
  console.log('  3. Investor is redirected to /agreement (NDA), email pre-filled');
  console.log('  4. After NDA, they land at /intro (first time) or / (returning)');
  console.log('===========================================================');
}

try {
  main();
} catch (err) {
  console.error('[grant-diligence] FAILED', err);
  process.exit(1);
}
