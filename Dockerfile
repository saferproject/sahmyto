# syntax=docker/dockerfile:1.7
FROM node:22-bookworm-slim AS base

ARG PNPM_VERSION=11.1.3

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN --mount=type=bind,source=.,target=/context,readonly \
    if [ -f /context/.npmrc ]; then cp /context/.npmrc /root/.npmrc; fi \
    && npm install -g pnpm@$PNPM_VERSION

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm config set fetch-retries 5 \
    && pnpm config set fetch-retry-factor 2 \
    && pnpm config set fetch-retry-maxtimeout 120000 \
    && pnpm config set fetch-timeout 120000 \
    && pnpm config set network-concurrency 8 \
    && pnpm config set dangerouslyAllowAllBuilds true \
    && pnpm fetch --frozen-lockfile \
    && pnpm install --frozen-lockfile --offline

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY . .
COPY .env.production .env.production

ENV NODE_ENV=production

RUN pnpm build

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server.js"]
