# WC26 Pool — Claude Code instructions

## Project
World Cup 2026 sweepstakes for ~80 coworkers. Full architecture in `docs/ARCHITECTURE.md` — **read it before making changes**.

## Stack
Next.js App Router + TypeScript, Mantine UI (no Tailwind), Tabler icons, Prisma + Postgres (Supabase), iron-session, deployed on Vercel.

## Response style
- Never use em dashes (—) in prose. Only use hyphens where syntactically required (bullet points, hyphenated compound words).

## Rules
- Always read `docs/ARCHITECTURE.md` before implementing a feature.
- Follow the phased roadmap in Section 17. Don't skip phases.
- Never introduce Tailwind, styled-components, or any other styling system — Mantine only.
- Use `@tabler/icons-react` for all icons.
- Pure functions for scoring logic (`lib/scoring/`); they must be unit-testable.
- Server-side validate `lockAt > now()` on every bet write.
- Use Zod for all API input validation.
- Database mutations from admin actions must write an `AuditLog` entry.
- pnpm, not npm or yarn.

## Conventions
- Route handlers return `{ data }` on success, `{ error: { code, message } }` on failure.
- Prisma client is a singleton in `lib/db.ts`.
- Session helpers live in `lib/auth/`.
- React Query for all server state; no Redux/Zustand.

## Before committing
- `pnpm typecheck` must pass.
- `pnpm lint` must pass.
- If touching `lib/scoring/`, run `pnpm test`.

## What to ask me
- Any deviation from `ARCHITECTURE.md` → ask first.
- Adding a new dependency → ask first.
- Schema changes → ask first, then write a migration.