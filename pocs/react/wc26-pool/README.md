# WC26 Pool

A private sweepstakes web app for the FIFA World Cup 2026, built for a group of ~80 coworkers. Participants log in with a shared invite code, place score predictions before kickoff, earn points based on accuracy, and compete on a live leaderboard.

No real money. No sign-up friction. Just football.

---

## The idea

Each participant predicts the **regulation-time score** of every match. Points are awarded based on how close the prediction is, then multiplied by a phase factor that increases the further the tournament goes.

| Outcome | Base points |
|---|---|
| Exact score | 10 |
| Correct winner + one score right | 7 |
| Correct winner or draw (no exact score) | 5 |
| One score correct only | 2 |
| Wrong or no bet placed | 0 |

| Phase | Multiplier |
|---|---|
| Group stage | x1 |
| Round of 32 / Round of 16 | x2 |
| Quarter-final | x3 |
| Semi-final | x4 |
| Third-place / Final | x5 |

Bets lock automatically 5 minutes before kickoff. After that, everyone can see each other's predictions for that match.

Tiebreakers on the leaderboard work down a chain: most exact scores, then most correct winners, then fewest zero-point matches. Only a true dead heat across all five criteria produces a shared rank.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| UI | Mantine 7 (dark mode, custom accent/gold/danger palette) |
| Icons | Tabler Icons |
| Database | PostgreSQL on Supabase |
| ORM | Prisma 6 |
| Auth | iron-session (cookie-based, no NextAuth) |
| Validation | Zod |
| Server state | TanStack React Query |
| Date handling | date-fns + date-fns-tz |
| Testing | Vitest |
| Package manager | pnpm |
| Hosting | Vercel + Vercel Cron |

No Tailwind. Mantine handles all styling via its CSS variables system and a centralized `createTheme()` config.

---

## Rules

### Development conventions
- All styling through Mantine only. No Tailwind, styled-components, or any other system.
- Icons from `@tabler/icons-react` exclusively.
- Scoring logic lives in `lib/scoring/` as pure, unit-testable functions.
- Every bet write re-validates `lockAt > now()` on the server.
- All API input validated with Zod.
- Every admin mutation writes an `AuditLog` row.
- `pnpm` only. No npm or yarn.

### API conventions
- Success: `{ data: ... }`
- Error: `{ error: { code, message } }`
- `PrismaClient` singleton in `lib/db.ts`
- Session helpers in `lib/auth/`
- React Query for all server state, no Redux or Zustand

### Before committing
```bash
pnpm typecheck   # must pass
pnpm lint        # must pass
pnpm test        # required only when touching lib/scoring/
```

---

## Local setup

Copy the env template and fill in your Supabase connection strings:

```bash
cp .env.example .env
# edit .env with your DATABASE_URL, DIRECT_URL, and other secrets
```

Install, migrate, and seed:

```bash
pnpm install
pnpm prisma migrate deploy
pnpm seed          # creates the admin user
pnpm seed:teams    # loads all 48 WC2026 teams
pnpm dev
```

Admin panel is at `/admin/login`. Participant login is at `/login`.

---

## Project structure

```
app/
  (app)/          authenticated participant area
  admin/          admin panel
  api/            route handlers
  login/          participant login page
lib/
  auth/           iron-session config and guards
  scoring/        pure scoring functions and leaderboard logic
  fixtures/       openfootball data fetcher and seeder
  db.ts           PrismaClient singleton
  theme.ts        Mantine theme
prisma/
  schema.prisma
  migrations/
  seed.ts
scripts/
  seed-teams.ts
  seed-fixtures.ts
tests/
  scoring.test.ts
```
