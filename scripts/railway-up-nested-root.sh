#!/usr/bin/env bash
# Upload this repo to Railway when the service "Root directory" is set to `rails-docs`
# (monorepo-style). The standalone rails-docs git repo is flat (Dockerfile at repo root);
# we copy into a temp tree `rails-docs/<files>` so the archive matches that setting.
#
# If you clear Root directory in Railway (build from repo root), set RAILWAY_UP_FLAT=1
# in the workflow env to call `railway up` from the checkout root without nesting.
set -euo pipefail

SERVICE="${1:?Usage: $0 <railway-service-name> [extra args passed to railway up]}"

if [[ -z "${RAILWAY_TOKEN:-}" ]]; then
  echo "error: RAILWAY_TOKEN is not set" >&2
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

if [[ "${RAILWAY_UP_FLAT:-0}" = "1" ]]; then
  echo "RAILWAY_UP_FLAT=1: deploying from repo root (no rails-docs/ wrapper)."
  shift || true
  exec railway up --service "$SERVICE" --detach "$@"
fi

if [[ ! -f Dockerfile ]]; then
  echo "error: Dockerfile not found at $REPO_ROOT/Dockerfile" >&2
  exit 1
fi

TMP=$(mktemp -d)
cleanup() { rm -rf "$TMP"; return 0; }
trap cleanup EXIT

mkdir -p "$TMP/rails-docs"
# Ship a minimal build context; align with .dockerignore intent.
rsync -a \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '.astro' \
  --exclude '.pnpm-store' \
  --exclude '.turbo' \
  "$REPO_ROOT/" "$TMP/rails-docs/"

cd "$TMP"
echo "Deploying from nested path: $TMP/rails-docs/ (service root directory should be 'rails-docs')."
exec railway up --service "$SERVICE" --detach
