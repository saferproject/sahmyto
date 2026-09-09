# Repository Guidelines

## Project Structure & Module Organization

This repository is a TypeScript/React application built with Next.js 16 and the App Router. Routes, layouts, and feature code live under `app/`. Shared concerns use underscore-prefixed folders such as `app/_components`, `_hooks`, `_services`, `_stores`, `_types`, and `_utilities`; feature-specific equivalents stay beside their route, for example `app/login/_components` and `app/dashboard/karbooms/_schemas`. Static browser assets belong in `public/`, while assets imported by components may live in a feature’s `_assets` directory. Deployment configuration is in `Dockerfile`, `docker-compose.yml`, and `deploy/`.

## Build, Test, and Development Commands

Use Bun 1.4.1 exclusively for dependency management and script execution (the version is pinned in `package.json` and the Docker image). Commit `bun.lock` whenever dependencies change. Keep package manager configuration in `package.json` and `bunfig.toml`, and use only the Bun lockfile.

Bun runs the development server, production build, and production server. Next.js 16 uses its built-in Turbopack bundler; Bun's native bundler cannot replace it for this App Router application. Use `bun run build` to invoke the framework build.

- `bun install --frozen-lockfile` installs the exact locked dependencies; use `bun add <package>` or `bun add --dev <package>` to add dependencies.
- `bun run dev` starts the local development server at `http://localhost:3000`.
- `bun run lint` runs the Next.js Core Web Vitals and TypeScript ESLint rules.
- `bun run build` creates a production build and catches framework/type integration errors.
- `bun run start` serves an existing production build.
- `docker compose up -d proxy app-blue` starts the initial containerized deployment.

## Coding Style & Naming Conventions

Use strict TypeScript and the `@/*` path alias for repository-root imports. Follow existing formatting: two-space indentation, semicolons, double quotes, and trailing commas where supported. Run `bun run prettier --write <files>` for formatting; the Tailwind plugin normalizes utility-class order.

Name React components and types in PascalCase, hooks with `use-`, and other files in descriptive kebab-case, such as `profile-form-component.tsx` or `use-login-form.ts`. Keep route entry files named according to Next.js conventions (`page.tsx`, `layout.tsx`, `middleware.ts`).

## Testing Guidelines

Unit tests run with Vitest via `bun run test` (config in `vitest.config.mts`). Always include `run` so Bun invokes the configured Vitest script instead of its native test runner. Colocate tests with the code they cover using `*.test.ts` or `*.test.tsx`, and prefer covering pure utilities and hooks. Before submitting changes, run `bun run lint`, `bun run test`, and `bun run build`, then manually exercise affected routes and responsive states.

## Commit & Pull Request Guidelines

Recent history uses short, imperative summaries such as `improved UI` and `changed logo color`. Keep commits focused and use a more specific form when possible, for example `fix profile image sizing`.

Pull requests should explain the user-visible change, identify affected routes, link related issues, and list verification performed. Include before/after screenshots for UI work and call out environment, API-contract, dependency, or deployment changes. Never commit secrets; treat `.env*` values as environment-specific configuration.
