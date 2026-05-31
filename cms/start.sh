#!/bin/sh
set -e

echo "Starting Flygare CMS..."
echo "DATABASE_URL: ${DATABASE_URL:-(not set)}"

# Push schema and seed on first boot.
# NODE_ENV=development required for push:true to auto-create/update schema.
# The seed script is idempotent (exits immediately if data exists).
if [ "${SKIP_SEED}" != "true" ]; then
  echo "Pushing schema and running seed..."
  NODE_ENV=development node --import tsx/esm src/seed/index.ts || echo "Seed: skipped or already populated"
fi

exec node server.js
