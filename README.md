# Sahmito

Sahmito is a Persian, right-to-left financial management application for shared transportation businesses. It manages karbooms, partners, drivers, incomes, expenses, payments, insurance, monthly settlement, and driver salaries.

The frontend uses Next.js 16 with the App Router, React 19, TypeScript, Material UI, Tailwind CSS, TanStack Query, Zustand, React Hook Form, and Zod.

## Requirements

- Node.js 22
- pnpm 11.1.3, as pinned by `packageManager` in `package.json`
- Access to a compatible Sahmito API

Enable Corepack if pnpm is not already installed:

```bash
corepack enable
corepack prepare pnpm@11.1.3 --activate
```

## Local setup

1. Install the locked dependencies:

   ```bash
   pnpm install --frozen-lockfile
   ```

2. Copy `.env.example` to `.env.local` and replace the example URLs.

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/login`.

## Environment variables

| Variable                         | Required              | Purpose                                                                                                                                        |
| -------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`            | Yes                   | Absolute base URL used by the browser API client. A trailing slash is added automatically.                                                     |
| `NEXT_PUBLIC_IMAGE_ASSETS_URL`   | Yes for remote images | Absolute backend origin allowed by `next/image` for `/assets/images/**` and `/storage/images/**`.                                              |
| `NEXT_PUBLIC_TELEMETRY_ENDPOINT` | No                    | HTTP endpoint receiving structured application errors and Web Vitals as JSON. When omitted, events are written as structured console messages. |
| `NEXT_PUBLIC_APP_VERSION`        | No                    | Release identifier attached to telemetry events, such as a Git SHA or image tag.                                                               |

All `NEXT_PUBLIC_*` values are embedded into the browser bundle at build time. Do not put secrets in these variables. Local and production environment files are ignored by Git; `.env.example` documents only safe placeholders.

## API contract

Browser requests go through `app/proxy.ts`. The client:

- reads the bearer token from the application-owned `token` local-storage key;
- resolves relative endpoints against `NEXT_PUBLIC_API_URL`;
- uses a 15-second timeout and forwards TanStack Query cancellation signals;
- normalizes successful responses to `{ data, message, errors }`;
- throws `ApiError` with `status`, `message`, and optional field errors;
- removes only the `token` and `user` keys and redirects to `/login` after an unauthorized response.

The expected JSON response shape is:

```json
{
  "data": {},
  "message": "Optional message",
  "errors": {
    "field": ["Optional validation message"]
  }
}
```

Responses with no body and non-JSON responses are also handled. API services live in `_services` directories and TanStack Query hooks live in `_hooks` directories. Hook filenames begin with `use-`; endpoint hooks end in `-endpoint`.

## Project structure

```text
app/
  _components/   shared UI
  _errors/       normalized application errors
  _hooks/        shared React and endpoint hooks
  _providers/    React context providers
  _services/     API services
  _stores/       Zustand vanilla stores
  _types/        shared TypeScript types
  _utilities/    pure helpers and infrastructure
  dashboard/     authenticated dashboard routes and features
  login/         authentication routes
deploy/          nginx and blue/green deployment scripts
public/          static browser assets
```

Feature-specific folders follow the same underscore-prefixed convention beside their route. Imports from the repository root use the `@/*` alias.

## Validation commands

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm audit:prod
```

CI runs all four checks for pull requests and pushes to `development` or `main`. The production audit fails on high or critical findings.

No automated test framework is currently configured. Manually exercise affected authenticated routes, form sequences, drawer transitions, and responsive states before release.

## Error reporting and performance monitoring

`app/error.tsx` and `app/global-error.tsx` provide recovery UI and report structured rendering errors. `app/loading.tsx` and `app/not-found.tsx` provide route-level loading and missing-page states. Web Vitals are collected with Next.js `useReportWebVitals`.

When `NEXT_PUBLIC_TELEMETRY_ENDPOINT` is configured, the browser sends JSON `application-error` and `web-vital` events using `fetch` with `keepalive`. The receiver should accept `POST` requests with `Content-Type: application/json` and configure CORS when hosted on another origin. Telemetry does not intentionally include authentication tokens or application form data.

## Production deployment

The application builds as a standalone Next.js image. The Docker setup uses Node.js 22, pnpm's frozen lockfile, nginx, health checks, and blue/green application containers.

Initial deployment:

```bash
docker compose up -d proxy app-blue
```

Zero-downtime deployment from PowerShell:

```powershell
./deploy/zero-downtime-deploy.ps1
```

Production `NEXT_PUBLIC_*` variables must be present during `pnpm build`; changing them requires rebuilding the image. See `deploy/README.md` for the container switching process.
