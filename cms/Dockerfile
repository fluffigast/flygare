# ── Build stage ──────────────────────────────────────────
FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ── Seed stage ───────────────────────────────────────────
# Run seed at build time so the production image ships a populated DB
FROM node:22-alpine AS seeder

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app /app

ENV PAYLOAD_SECRET=build-time-seed-secret
ARG PAYLOAD_ADMIN_PASSWORD=changeme123
ENV PAYLOAD_ADMIN_PASSWORD=$PAYLOAD_ADMIN_PASSWORD
ENV DATABASE_URL=file:./data/seeded.db

# Use development mode so push:true auto-creates schema
ENV NODE_ENV=development
RUN npx tsx src/seed/index.ts
ENV NODE_ENV=production

# ── Production stage ─────────────────────────────────────
FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat dumb-init \
  && addgroup -g 1001 -S payload \
  && adduser -S payload -u 1001 -G payload \
  && apk --no-cache upgrade

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=384"

COPY --from=builder --chown=payload:payload /app/.next/standalone ./
COPY --from=builder --chown=payload:payload /app/.next/static ./.next/static
COPY --from=builder --chown=payload:payload /app/node_modules ./node_modules
COPY --from=builder --chown=payload:payload /app/package.json ./

RUN mkdir -p /app/data && chown payload:payload /app/data

# Pre-seeded DB from build (stored outside /app/data which may be an Azure Files mount)
COPY --from=seeder --chown=payload:payload /app/data/seeded.db /app/seed.db
COPY --chown=payload:payload start.sh ./
RUN chmod +x start.sh

USER payload

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 \
  CMD wget -qO- http://localhost:3001/api/globals/site-settings || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["./start.sh"]
