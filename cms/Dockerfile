# ── Build stage ──────────────────────────────────────────
FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps \
  && npm install sharp@0.33.5 --platform=linuxmusl --arch=x64

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_URL=file:./build-placeholder.db
ENV PAYLOAD_SECRET=build-time-placeholder

RUN npm run build

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

# Keep seed script and its dependencies for first-boot seeding
COPY --from=builder --chown=payload:payload /app/src ./src
COPY --from=builder --chown=payload:payload /app/tsconfig.json ./

COPY --chown=payload:payload start.sh ./
RUN chmod +x start.sh

USER payload

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 \
  CMD wget -qO- http://localhost:3001/api/globals/site-settings || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["./start.sh"]
