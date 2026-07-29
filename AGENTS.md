# Repository Guidelines

## Project Structure & Module Organization

This repository is a TypeScript/React application built with Next.js 16 and the App Router. Routes, layouts, and feature code live under `app/`. Shared concerns use underscore-prefixed folders such as `app/_components`, `_hooks`, `_services`, `_stores`, `_types`, and `_utilities`; feature-specific equivalents stay beside their route, for example `app/login/_components` and `app/dashboard/karbooms/_schemas`. Static browser assets belong in `public/`, while assets imported by components may live in a feature’s `_assets` directory. Deployment configuration is in `Dockerfile`, `docker-compose.yml`, and `deploy/`.

## Build, Test, and Development Commands

Use pnpm 11 (the version is pinned in `package.json`).

- `pnpm install --frozen-lockfile` installs the exact locked dependencies.
- `pnpm dev` starts the local development server at `http://localhost:3000`.
- `pnpm lint` runs the Next.js Core Web Vitals and TypeScript ESLint rules.
- `pnpm build` creates a production build and catches framework/type integration errors.
- `pnpm start` serves an existing production build.
- `docker compose up -d proxy app-blue` starts the initial containerized deployment.

## Coding Style & Naming Conventions

Use strict TypeScript and the `@/*` path alias for repository-root imports. Follow existing formatting: two-space indentation, semicolons, double quotes, and trailing commas where supported. Run `pnpm exec prettier --write <files>` for formatting; the Tailwind plugin normalizes utility-class order.

Name React components and types in PascalCase, hooks with `use-`, and other files in descriptive kebab-case, such as `profile-form-component.tsx` or `use-login-form.ts`. Keep route entry files named according to Next.js conventions (`page.tsx`, `layout.tsx`, `middleware.ts`).

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. Before submitting changes, run `pnpm lint` and `pnpm build`, then manually exercise affected routes and responsive states. If adding tests, colocate them with the feature using `*.test.ts` or `*.test.tsx`, and add the corresponding `test` script and framework configuration to `package.json`.

## Commit & Pull Request Guidelines

Recent history uses short, imperative summaries such as `improved UI` and `changed logo color`. Keep commits focused and use a more specific form when possible, for example `fix profile image sizing`.

Pull requests should explain the user-visible change, identify affected routes, link related issues, and list verification performed. Include before/after screenshots for UI work and call out environment, API-contract, dependency, or deployment changes. Never commit secrets; treat `.env*` values as environment-specific configuration.
