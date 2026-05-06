#!/bin/sh
set -e

PRISMA="node node_modules/prisma/build/index.js"

# If a real migration directory exists with at least one migration, run migrate deploy.
# Otherwise (fresh schema, dev was using `prisma db push`), apply the schema directly.
if [ -d prisma/migrations ] && [ -n "$(ls -A prisma/migrations 2>/dev/null | grep -v migration_lock.toml || true)" ]; then
  echo "[entrypoint] Running prisma migrate deploy..."
  $PRISMA migrate deploy
else
  echo "[entrypoint] No migrations directory; applying schema with prisma db push..."
  $PRISMA db push --skip-generate --accept-data-loss
fi

echo "[entrypoint] Starting app: $@"
exec "$@"
