# Docker deployment

## Build behavior

- The image build copies `.env.production` into the builder stage, so `NEXT_PUBLIC_*` values are available during `next build`.
- Dependency installation is isolated in its own Docker layer and keyed by `package.json` and `pnpm-lock.yaml`. If neither changes, Docker reuses the cached install layer and does not reinstall packages.
- `pnpm install --frozen-lockfile` makes the build fail when `package.json` changes without an updated `pnpm-lock.yaml`.

## Files

- `Dockerfile`: multi-stage Next.js production image using `pnpm` on `node:22-bookworm-slim`
- `docker-compose.yml`: app + nginx reverse proxy for blue/green switching
- `deploy/zero-downtime-deploy.ps1`: zero-downtime deployment helper

## First-time setup

1. Generate or update `pnpm-lock.yaml`.
2. Run `docker compose up -d proxy app-blue`.

## Zero-downtime deploy

Run:

```powershell
./deploy/zero-downtime-deploy.ps1
```

The script builds a fresh image, boots the standby color, waits for `/api/health`, reloads `nginx` toward the healthy container, then stops the previous color.
