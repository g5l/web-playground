# AGENTS.md

This file provides lightweight guidance for agents and contributors working inside this POC folder.

## Scope
- Applies to this directory (`pocs/react/server-component/redis`) and all subdirectories.

## Goals
- Keep the proof-of-concept small, readable, and focused on demonstrating React Server Components with a Redis backing service.
- Avoid unnecessary dependencies and configuration unless they directly support the demo.

## Project Structure
- `client/` — client-side UI code and assets.
- `server/` — server-side entry points, routes, and Redis integration.
- Keep secrets/config in environment variables loaded from `.env` (never commit actual secrets). When introducing new variables, add them to a `.env.example` with safe placeholder values.

## Conventions
- JavaScript is fine for small POCs; use TypeScript only if it adds clear value.
- Prefer ESM (`type: module`) if starting fresh; match existing style if a `package.json` already exists.
- Formatting/linting: if Prettier/ESLint are added later, follow their defaults; otherwise keep code simple and consistent.
- Keep changes minimal and scoped to the task. Avoid broad refactors unless requested.

## Tooling
- Use a single package manager consistently (npm, yarn, or pnpm). If none is chosen yet, default to `npm` for simplicity.
- Add scripts to `package.json` as they become relevant (e.g., `dev`, `build`, `start`).

## Testing
- Add small, focused tests only when they clarify behavior or protect critical logic. Do not introduce heavy test frameworks unless needed.

## Git Hygiene
- Commit small, logically grouped changes with clear messages.
- Do not commit generated artifacts, logs, or secrets (see `.gitignore`).

## Notes for Future Work
- When wiring Redis, prefer environment-driven configuration (host, port, password, TLS). Provide sane defaults for local development.
- Keep documentation in `README.md` (or update this file) as the POC evolves.
