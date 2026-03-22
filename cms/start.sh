#!/bin/sh
set -e

DB_DIR="./data"
DB_FILE="$DB_DIR/flygare.db"
SEED_DB="/app/seed.db"

# Ensure data directory exists (may be an Azure Files mount)
mkdir -p "$DB_DIR"

# If no DB exists yet, copy schema-only seed and populate with data
if [ ! -f "$DB_FILE" ]; then
  echo "No database found, initializing from seed..."
  cp "$SEED_DB" "$DB_FILE"
  echo "Running seed script..."
  npx tsx src/seed/index.ts
  echo "Seeding complete."
fi

exec node server.js
