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

# ── Production stage ─────────────────────────────────────
FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat dumb-init \
  && addgroup -g 1001 -S payload \
  && adduser -S payload -u 1001 -G payload

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=payload:payload /app/.next/standalone ./
COPY --from=builder --chown=payload:payload /app/.next/static ./.next/static
COPY --from=builder --chown=payload:payload /app/node_modules ./node_modules
COPY --from=builder --chown=payload:payload /app/package.json ./

RUN mkdir -p /app/data && chown payload:payload /app/data

USER payload

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/globals/site-settings || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
