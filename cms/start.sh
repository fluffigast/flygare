#!/bin/sh
set -e

# Use persistent mount if available, otherwise fall back to local
if [ -d "/mnt/data" ]; then
  DB_DIR="/mnt/data"
  echo "Using persistent storage at /mnt/data"
else
  DB_DIR="./data"
  echo "Using ephemeral storage at ./data"
fi

DB_FILE="$DB_DIR/flygare.db"
SEED_DB="/app/seed.db"

mkdir -p "$DB_DIR"

# Copy pre-seeded DB on first boot only
if [ ! -f "$DB_FILE" ]; then
  echo "No database found, copying pre-seeded database..."
  cp "$SEED_DB" "$DB_FILE"
  echo "Database initialized."
else
  echo "Existing database found, using it."
fi

# Point Payload to the correct DB
export DATABASE_URL="file:$DB_FILE"

exec node server.js
