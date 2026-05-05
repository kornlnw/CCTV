#!/bin/sh
set -e

echo "[entrypoint] Running prisma migrate deploy..."
node node_modules/prisma/build/index.js migrate deploy || {
  echo "[entrypoint] migrate deploy failed; falling back to db push (first-run only)..."
  node node_modules/prisma/build/index.js db push --skip-generate
}

echo "[entrypoint] Starting app: $@"
exec "$@"
