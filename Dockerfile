# syntax=docker/dockerfile:1.7
FROM oven/bun:1.4.2 AS base

FROM base AS deps

WORKDIR /app

COPY package.json bun.lock bunfig.toml ./

RUN bun install --frozen-lockfile

FROM base AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_IMAGE_ASSETS_URL
ARG NEXT_PUBLIC_TELEMETRY_ENDPOINT=""
ARG NEXT_PUBLIC_APP_VERSION=""

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_IMAGE_ASSETS_URL=$NEXT_PUBLIC_IMAGE_ASSETS_URL
ENV NEXT_PUBLIC_TELEMETRY_ENDPOINT=$NEXT_PUBLIC_TELEMETRY_ENDPOINT
ENV NEXT_PUBLIC_APP_VERSION=$NEXT_PUBLIC_APP_VERSION

COPY --from=deps /app/node_modules ./node_modules
COPY package.json bun.lock bunfig.toml ./
COPY . .

RUN bun run build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --chown=bun:bun --from=builder /app/public ./public
COPY --chown=bun:bun --from=builder /app/.next/standalone ./
COPY --chown=bun:bun --from=builder /app/.next/static ./.next/static

USER bun

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=5 \
  CMD bun -e "fetch('http://127.0.0.1:3000/api/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["bun", "server.js"]
