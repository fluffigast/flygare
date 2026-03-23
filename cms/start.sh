#!/bin/sh
set -e

DB_DIR="./data"
DB_FILE="$DB_DIR/flygare.db"
SEED_DB="/app/seed.db"

# Ensure data directory exists
mkdir -p "$DB_DIR"

# Copy pre-seeded DB on first boot (ephemeral — resets on restart)
if [ ! -f "$DB_FILE" ]; then
  echo "No database found, copying pre-seeded database..."
  cp "$SEED_DB" "$DB_FILE"
  echo "Database initialized."
fi

exec node server.js
