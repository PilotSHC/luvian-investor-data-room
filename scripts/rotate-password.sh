#!/usr/bin/env bash
# Rotate the investor data room access code.
#
# Usage:
#   ./scripts/rotate-password.sh                 # soft rotation (new password only)
#   ./scripts/rotate-password.sh --hard          # hard rotation (also new cookie
#                                                # secret -> kicks all live sessions)
#   ./scripts/rotate-password.sh --print-only    # generate + print, do NOT update Vercel
#
# Requires: vercel CLI installed and authenticated (`npm i -g vercel && vercel login`).
# Run from the data-room repo root.

set -o errexit
set -o pipefail

MODE="soft"
DRY_RUN=0

for arg in "$@"; do
  case "$arg" in
    --hard) MODE="hard" ;;
    --print-only) DRY_RUN=1 ;;
    -h|--help)
      sed -n '2,15p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown flag: $arg" >&2
      exit 2
      ;;
  esac
done

# --- Sanity checks ---------------------------------------------------------

if ! command -v vercel >/dev/null 2>&1; then
  echo "✗ vercel CLI not found. Install with: npm i -g vercel" >&2
  exit 1
fi

if ! command -v openssl >/dev/null 2>&1; then
  echo "✗ openssl not found." >&2
  exit 1
fi

if [ ! -f "package.json" ] || ! grep -q '"luvian-investor-data-room"' package.json; then
  echo "✗ Run this from the data-room repo root (where package.json lives)." >&2
  exit 1
fi

# --- Helpers ---------------------------------------------------------------

new_password() {
  # 24 chars, URL-safe (no shell-special chars). Drop =+/ then truncate.
  openssl rand -base64 36 | tr -d '=+/' | tr -d '\n' | head -c 24
}

new_secret() {
  # 64 hex chars (32 random bytes) -> 256-bit secret.
  openssl rand -hex 32
}

set_var() {
  local name="$1"
  local value="$2"
  local target="production"
  echo "  → removing existing ${name} (production)..."
  vercel env rm "${name}" "${target}" --yes >/dev/null 2>&1 || true
  echo "  → adding new ${name} (production)..."
  printf '%s' "${value}" | vercel env add "${name}" "${target}" >/dev/null
}

# --- Generate ---------------------------------------------------------------

NEW_PASSWORD="$(new_password)"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  LUVIAN DATA ROOM — PASSWORD ROTATION (${MODE})"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Generated new INVESTOR_ROOM_PASSWORD (${#NEW_PASSWORD} chars)."

if [ "${MODE}" = "hard" ]; then
  NEW_SECRET="$(new_secret)"
  echo "Generated new INVESTOR_ROOM_COOKIE_SECRET (${#NEW_SECRET} chars)."
  echo "(Hard rotation: every active session will be invalidated.)"
fi

if [ "${DRY_RUN}" -eq 1 ]; then
  echo ""
  echo "── DRY-RUN: not touching Vercel ──"
  echo "INVESTOR_ROOM_PASSWORD=${NEW_PASSWORD}"
  if [ "${MODE}" = "hard" ]; then
    echo "INVESTOR_ROOM_COOKIE_SECRET=${NEW_SECRET}"
  fi
  exit 0
fi

# --- Apply to Vercel --------------------------------------------------------

echo ""
echo "── Updating Vercel project env vars ──"
set_var "INVESTOR_ROOM_PASSWORD" "${NEW_PASSWORD}"
if [ "${MODE}" = "hard" ]; then
  set_var "INVESTOR_ROOM_COOKIE_SECRET" "${NEW_SECRET}"
fi

# --- Redeploy --------------------------------------------------------------

echo ""
echo "── Triggering production redeploy ──"
vercel --prod --yes 2>&1 | tail -5

# --- Verify ----------------------------------------------------------------

echo ""
echo "── Waiting 30s for deploy to settle, then probing /api/status ──"
sleep 30
PROD_URL="https://luvian-investor-data-room.vercel.app"
HTTP_STATUS="$(curl -s -o /tmp/_status.json -w '%{http_code}' "${PROD_URL}/api/status" || true)"
if [ "${HTTP_STATUS}" = "200" ]; then
  PWD_LEN=$(grep -oE '"INVESTOR_ROOM_PASSWORD_length": *[0-9]+' /tmp/_status.json | awk -F: '{print $2}' | tr -d ' ')
  echo "  ✓ /api/status reports password length: ${PWD_LEN} (expected ${#NEW_PASSWORD})"
else
  echo "  ⚠ /api/status returned ${HTTP_STATUS} — give it another minute."
fi

# --- Print credentials -----------------------------------------------------

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  NEW CREDENTIALS — copy these and DO NOT commit them"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "  URL:      ${PROD_URL}"
echo "            https://data-room.luvian.info  (once DNS is ready)"
echo "  Password: ${NEW_PASSWORD}"
echo ""
if [ "${MODE}" = "hard" ]; then
  echo "  Cookie secret rotated — all active investor sessions are now logged out."
  echo ""
fi
echo "  Send to investors via Signal, 1Password share link, or your"
echo "  password manager — never plain email or Slack DM."
echo "════════════════════════════════════════════════════════════════"
