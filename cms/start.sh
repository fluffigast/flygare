#!/bin/sh
set -e

DB_FILE="./data/flygare.db"

# If no DB exists yet, copy the seed DB with empty tables
if [ ! -f "$DB_FILE" ]; then
  echo "No database found, initializing from seed..."
  cp ./data/seed.db "$DB_FILE"
fi

exec node server.js
