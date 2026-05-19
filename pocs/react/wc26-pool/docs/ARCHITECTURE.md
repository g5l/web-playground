# World Cup 2026 Sweepstakes — Architecture Document

> **Project codename:** `wc26-pool`
> **Author:** Gabriel
> **Audience:** Self / Claude Code (development agent)
> **Status:** Architecture v1 — ready for implementation

---

## 1. Overview

A private sweepstakes web app for the FIFA World Cup 2026 (June 11 – July 19, 2026), to be used by ~80 colleagues at the same bank. Each participant logs in with a shared invite code plus their first + last name, places score predictions for matches before kickoff, earns points based on accuracy, and competes on a leaderboard. An admin manages fixtures, results, and users via a separate panel.

### Goals

- Simple, frictionless login (no email/password for participants).
- Bets locked 5 minutes before kickoff; no edits after.
- Transparent scoring and leaderboard.
- Visual style of a betting site: dark mode, vibrant accents, polished.
- Single pool, ~80 users, English UI.

### Non-goals

- Multi-pool / multi-tenant.
- Real money or any monetary stakes.
- Push/email notifications.
- Mobile native apps (responsive web only).
- Internationalization beyond English.

---

## 2. Tech Stack

| Layer            | Choice                                       |
| ---------------- | -------------------------------------------- |
| Framework        | Next.js (App Router) + TypeScript            |
| Backend          | Next.js Route Handlers (`app/api/*`)         |
| Database         | PostgreSQL on Supabase                       |
| ORM              | Prisma                                       |
| UI library       | Mantine (`@mantine/core`, `@mantine/hooks`, `@mantine/form`, `@mantine/notifications`, `@mantine/dates`) |
| Icons            | `@tabler/icons-react`                        |
| Validation       | Zod                                          |
| Auth (session)   | `iron-session` (cookie-based, no NextAuth needed for this simplicity) |
| Date/time        | `date-fns` + `date-fns-tz`                   |
| Hosting          | Vercel                                       |
| Cron jobs        | Vercel Cron                                  |
| Package manager  | pnpm                                         |
| Node version     | 20.x LTS                                     |
| Testing          | Vitest (unit), Playwright (e2e — optional, post-MVP) |

**Why no Tailwind:** Mantine ships its own CSS-in-JS / CSS-modules system. Theming is centralized via `MantineProvider` with a custom `createTheme()`.

---

## 3. Domain Model & Business Rules

### 3.1 Match phases & multipliers

| Phase             | Multiplier |
| ----------------- | ---------- |
| Group stage       | ×1         |
| Round of 32       | ×2         |
| Round of 16       | ×2         |
| Quarter-final     | ×3         |
| Semi-final        | ×4         |
| Third-place match | ×5         |
| Final             | ×5         |

### 3.2 Scoring (per match, before multiplier)

| Outcome                                          | Base points |
| ------------------------------------------------ | ----------- |
| Exact score                                      | 10          |
| Correct winner + one score correct               | 7           |
| Correct winner / correct draw (no exact score)   | 5           |
| One score correct only (wrong overall result)    | 2           |
| Wrong, or no bet placed                          | 0           |

**Final points awarded for a match** = `base_points × phase_multiplier`.

#### Examples (regulation-time only)
- Actual `2–1`, bet `2–1` → 10 (×multiplier).
- Actual `2–1`, bet `3–1` → 7 (winner Brazil + one score `1` correct).
- Actual `2–1`, bet `1–0` → 5 (correct winner, neither score matches).
- Actual `2–2`, bet `1–1` → 5 (correct draw, no exact score).
- Actual `2–1`, bet `2–2` → 2 (one score correct, wrong result).
- Actual `2–1`, bet `0–3` → 0.

### 3.3 Knockout-specific rule (ET / penalties)

Bets are placed on the **regulation-time score** for every match. All five scoring rules above apply only to regulation time.

If a knockout match ends drawn after regulation, the system needs a "who advances" pick from the user to keep the bet complete, but **this pick does not award additional points**. It is collected only when the user's predicted regulation score is a draw, and it is shown post-match purely for record.

UI logic:
- Group stage match form: just `homeScore`, `awayScore`.
- Knockout match form: `homeScore`, `awayScore`; if the user enters a draw, a third required field appears: "If tied, who advances?" with the two teams as radio options.
- A bet without the advancer (when required) is not saveable.

### 3.4 Tiebreakers (leaderboard)

When two or more users have the same total points, rank them by counts in each scoring category, in this order:

1. Most `exact_score` hits (10-pt hits)
2. Most `winner_plus_one_score` hits (7-pt hits)
3. Most `winner_only` hits (5-pt hits)
4. Most `one_score_only` hits (2-pt hits)
5. Fewest zero-point matches (i.e. most non-zero bets)

If users are still tied across all 5 categories → **shared rank** (e.g. both `T-3`).

### 3.5 Bet locking

- Lock time = `match.kickoffAt - 5 minutes`.
- Before lock: user can create / edit / delete their bet freely.
- At lock: bet becomes immutable.
- After lock: every user's bet for that match becomes visible to every other user.

### 3.6 Display name

- Format: `firstName lastName` (both required, trimmed).
- Uniqueness enforced case-insensitively across the pool.
- Optional `displaySuffix` (admin-editable) to disambiguate collisions, e.g. `Gabriel Silva (Frontend)`.

---

## 4. Data Model (Prisma schema sketch)

```prisma
// schema.prisma — illustrative, refine in implementation

generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

enum MatchPhase {
  GROUP
  ROUND_OF_32
  ROUND_OF_16
  QUARTER_FINAL
  SEMI_FINAL
  THIRD_PLACE
  FINAL
}

enum MatchStatus {
  SCHEDULED   // before kickoff
  LOCKED      // T-5min reached, bets closed
  LIVE        // currently being played (optional, manual)
  FINISHED    // result entered
  CANCELLED
}

enum BetCategory {
  EXACT                  // 10
  WINNER_PLUS_ONE_SCORE  // 7
  WINNER_ONLY            // 5
  ONE_SCORE_ONLY         // 2
  ZERO                   // 0
}

model User {
  id            String   @id @default(cuid())
  firstName     String
  lastName      String
  displaySuffix String?  // optional disambiguator
  // Composite uniqueness: lower(firstName)+lower(lastName)+lower(coalesce(suffix,''))
  // Enforced at app layer + a unique index on a generated column or a normalized field.
  normalizedName String  @unique  // e.g. "gabriel silva" or "gabriel silva|frontend"
  isAdmin       Boolean  @default(false)
  passwordHash  String?  // only set for admins (bcrypt)
  createdAt     DateTime @default(now())
  bets          Bet[]
}

model Team {
  id        String  @id            // ISO code, e.g. "BRA"
  name      String                 // "Brazil"
  flagEmoji String?                // "🇧🇷" (or use a flag CDN)
  group     String?                // "C" for group stage; null for placeholder
}

model Match {
  id            String       @id @default(cuid())
  externalRef   String?      @unique  // id from openfootball seed
  phase         MatchPhase
  groupName     String?      // "A".."L" for group stage
  matchNumber   Int          @unique  // 1..104 per FIFA numbering
  homeTeamId    String?
  awayTeamId    String?
  homeTeam      Team?        @relation("HomeTeam", fields: [homeTeamId], references: [id])
  awayTeam      Team?        @relation("AwayTeam", fields: [awayTeamId], references: [id])
  homePlaceholder String?    // e.g. "W49" for knockout TBD
  awayPlaceholder String?
  venue         String?
  kickoffAt     DateTime     // UTC
  lockAt        DateTime     // = kickoffAt - 5m (denormalized for indexing)
  status        MatchStatus  @default(SCHEDULED)
  homeScore     Int?         // regulation-time final
  awayScore     Int?
  advancingTeamId String?    // for knockouts that went to ET/penalties; informational
  pointsComputedAt DateTime? // when scoring was applied
  bets          Bet[]

  @@index([kickoffAt])
  @@index([status])
}

model Bet {
  id              String       @id @default(cuid())
  userId          String
  matchId         String
  homeScore       Int
  awayScore       Int
  advancingTeamId String?      // required only if knockout && homeScore == awayScore
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  // Snapshot fields filled by the scoring job:
  pointsAwarded   Int?         // already multiplied
  basePoints      Int?         // 0/2/5/7/10
  category        BetCategory?

  user            User         @relation(fields: [userId], references: [id])
  match           Match        @relation(fields: [matchId], references: [id])

  @@unique([userId, matchId])
  @@index([matchId])
}

model AuditLog {
  id        String   @id @default(cuid())
  actorId   String?  // admin or system
  action    String   // e.g. "MATCH_RESULT_SET", "USER_RENAMED"
  payload   Json
  createdAt DateTime @default(now())
}
```

### Computed phase multiplier (kept in code, not DB)

```ts
// lib/scoring/multipliers.ts
export const PHASE_MULTIPLIER: Record<MatchPhase, number> = {
  GROUP: 1,
  ROUND_OF_32: 2,
  ROUND_OF_16: 2,
  QUARTER_FINAL: 3,
  SEMI_FINAL: 4,
  THIRD_PLACE: 5,
  FINAL: 5,
};
```

---

## 5. Scoring Engine

A pure function in `lib/scoring/score.ts`:

```ts
type ScoreInput = {
  bet: { home: number; away: number } | null;
  actual: { home: number; away: number };
};
type ScoreOutput = { base: number; category: BetCategory };

export function scoreBet({ bet, actual }: ScoreInput): ScoreOutput {
  if (!bet) return { base: 0, category: "ZERO" };

  const exact = bet.home === actual.home && bet.away === actual.away;
  if (exact) return { base: 10, category: "EXACT" };

  const winner = (s: { home: number; away: number }) =>
    s.home > s.away ? "H" : s.home < s.away ? "A" : "D";
  const sameWinner = winner(bet) === winner(actual);

  const oneScoreCorrect =
    bet.home === actual.home || bet.away === actual.away;

  if (sameWinner && oneScoreCorrect)
    return { base: 7, category: "WINNER_PLUS_ONE_SCORE" };
  if (sameWinner)
    return { base: 5, category: "WINNER_ONLY" };
  if (oneScoreCorrect)
    return { base: 2, category: "ONE_SCORE_ONLY" };

  return { base: 0, category: "ZERO" };
}
```

Total awarded = `base × PHASE_MULTIPLIER[match.phase]`.

### When does scoring run?

Triggered manually by the admin **and** by a Vercel Cron sweep:

- **Manual:** when admin enters a final score and clicks "Save & score", the route handler updates `Match`, then iterates all bets for that match and writes `basePoints`, `category`, `pointsAwarded`, and sets `match.pointsComputedAt`.
- **Cron:** `app/api/cron/lock-matches/route.ts` runs every minute, sets `status = LOCKED` for matches where `lockAt <= now() && status = SCHEDULED`. This is what makes bets visible to others.

Scoring is **idempotent** — re-running on the same match overwrites the snapshot. If the admin corrects a result, scores re-compute deterministically.

---

## 6. Leaderboard

Computed on demand (cached for 60s) with one SQL aggregate:

```sql
SELECT
  u.id,
  u.first_name, u.last_name, u.display_suffix,
  COALESCE(SUM(b.points_awarded), 0)                            AS total_points,
  COUNT(*) FILTER (WHERE b.category = 'EXACT')                  AS hits_exact,
  COUNT(*) FILTER (WHERE b.category = 'WINNER_PLUS_ONE_SCORE')  AS hits_winner_plus,
  COUNT(*) FILTER (WHERE b.category = 'WINNER_ONLY')            AS hits_winner,
  COUNT(*) FILTER (WHERE b.category = 'ONE_SCORE_ONLY')         AS hits_one_score,
  COUNT(*) FILTER (WHERE b.category = 'ZERO' AND b.id IS NOT NULL) AS zeros
FROM "User" u
LEFT JOIN "Bet" b ON b.user_id = u.id
WHERE u.is_admin = false
GROUP BY u.id;
```

Ranking applied in TypeScript (so we can express the multi-key tiebreaker cleanly):

```ts
rows.sort((a, b) =>
  b.totalPoints       - a.totalPoints       ||
  b.hitsExact         - a.hitsExact         ||
  b.hitsWinnerPlus    - a.hitsWinnerPlus    ||
  b.hitsWinner        - a.hitsWinner        ||
  b.hitsOneScore      - a.hitsOneScore      ||
  a.zeros             - b.zeros              // fewer zeros wins
);
// Then assign dense rank with `T-` prefix for groups still tied across all keys.
```

---

## 7. Authentication

### Participants (regular users)

Two-field login form:
1. **Invite code** (single shared string, stored in env: `INVITE_CODE`).
2. **First name** + **Last name** (must match an existing user *or* create one on first login if `ALLOW_SELF_SIGNUP=true`).

For a closed 80-person pool I recommend **admin-provisioned users** (admin creates the list once; user just types name + invite code to claim their identity). This avoids duplicate-name spam.

Flow:
- POST `/api/auth/login` with `{ inviteCode, firstName, lastName }`.
- Server validates code (constant-time compare), looks up user by `normalizedName`, sets an `iron-session` cookie (`{ userId, isAdmin: false }`), responds 200.
- All `/api/*` routes (except `/api/auth/*` and `/api/public/*`) require a session via a `requireUser()` helper.

### Admins

Separate `/admin/login` page:
- Email/username + password.
- bcrypt `passwordHash` stored on `User` (admin row only).
- Same `iron-session` cookie, with `isAdmin: true`.
- `requireAdmin()` helper on all `/api/admin/*` routes and `/admin/*` pages (middleware).

Seed: on first deploy, a Prisma seed script creates admin from env `ADMIN_EMAIL`, `ADMIN_PASSWORD`.

### Sessions

- Cookie name: `wc26_session`.
- `httpOnly`, `secure`, `sameSite=lax`, 30-day rolling TTL.
- `IRON_SESSION_PASSWORD` (≥32 chars) in env.

---

## 8. API Surface

All under `app/api/`. Validated with Zod. Return JSON. Errors → `{ error: { code, message } }`.

### Public / auth

| Method | Path                  | Description                              |
| ------ | --------------------- | ---------------------------------------- |
| POST   | `/api/auth/login`     | Participant login (code + name)          |
| POST   | `/api/auth/admin-login` | Admin login (email + password)          |
| POST   | `/api/auth/logout`    | Clear session                            |
| GET    | `/api/auth/me`        | Current user info                        |

### Participant

| Method | Path                          | Description                                          |
| ------ | ----------------------------- | ---------------------------------------------------- |
| GET    | `/api/matches`                | List all matches with status + your bet (if any)     |
| GET    | `/api/matches/:id`            | Match detail + all bets (only if `status != SCHEDULED`) |
| PUT    | `/api/matches/:id/bet`        | Create/update your bet (rejected if locked)          |
| DELETE | `/api/matches/:id/bet`        | Delete your bet (rejected if locked)                 |
| GET    | `/api/leaderboard`            | Ranked list with tiebreaker breakdown                |
| GET    | `/api/users/:id/bets`         | Another participant's bets (only matches `status != SCHEDULED`) |

### Admin

| Method | Path                                  | Description                              |
| ------ | ------------------------------------- | ---------------------------------------- |
| GET    | `/api/admin/users`                    | List users                               |
| POST   | `/api/admin/users`                    | Create user (firstName, lastName, suffix?) |
| PATCH  | `/api/admin/users/:id`                | Rename / set suffix / delete             |
| GET    | `/api/admin/matches`                  | All matches with admin fields            |
| PATCH  | `/api/admin/matches/:id`              | Edit fixture (kickoff, teams, venue)     |
| POST   | `/api/admin/matches/:id/result`       | Set final score + (optional) advancer; triggers scoring |
| POST   | `/api/admin/seed-fixtures`            | (Re)load fixtures from openfootball JSON; non-destructive merge |

### Cron (Vercel Cron)

| Method | Path                       | Schedule       | Description                                       |
| ------ | -------------------------- | -------------- | ------------------------------------------------- |
| GET    | `/api/cron/lock-matches`   | `* * * * *`    | Flip `SCHEDULED → LOCKED` once `lockAt` is past   |

Protected via `Authorization: Bearer $CRON_SECRET`.

---

## 9. Fixture Data Strategy

### Primary source

**`openfootball/worldcup.json`** (public domain, no API key) — raw file:
`https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json`

This contains all 104 matches with date, time (with TZ offset), team names, group, venue, and knockout placeholders like `W49` for "winner of match 49".

### Seed flow

1. `pnpm prisma db push` to create schema.
2. `pnpm seed:teams` — hardcoded list of 48 teams with ISO codes + flag emojis.
3. `pnpm seed:fixtures` — fetches the openfootball JSON, normalizes:
   - Maps team names → `Team.id`.
   - Parses date+time+offset → UTC `kickoffAt`.
   - Sets `lockAt = kickoffAt - 5m`.
   - Derives `phase` from round string ("Matchday 1" → `GROUP`; "Round of 32" → `ROUND_OF_32`; etc.).
   - Stores `homePlaceholder`/`awayPlaceholder` for knockout TBDs.
4. Admin reviews fixtures in `/admin/matches`, edits any discrepancies, and later fills in knockout team IDs as the bracket resolves.

### Re-seeding

`/api/admin/seed-fixtures` re-runs the import in non-destructive mode:
- Match exists (by `externalRef`) → update kickoff, venue if changed.
- Never overwrites `homeScore`/`awayScore`/`status` if already set.

---

## 10. Frontend Architecture

### Routing (App Router)

```
app/
├── layout.tsx                  # MantineProvider, ColorScheme=dark, fonts
├── page.tsx                    # Landing → redirect to /login or /matches
├── login/page.tsx              # Participant login
├── (app)/                      # Authenticated participant area
│   ├── layout.tsx              # AppShell with sidebar + top bar
│   ├── matches/
│   │   ├── page.tsx            # Matches list grouped by day, with bet status
│   │   └── [id]/page.tsx       # Match detail + bet form + all bets (post-lock)
│   ├── leaderboard/page.tsx    # Ranked table with tiebreaker columns
│   ├── users/[id]/page.tsx     # Public profile + their bets
│   └── me/page.tsx             # My bets, my stats
└── admin/
    ├── login/page.tsx
    ├── layout.tsx              # AdminShell, requires isAdmin
    ├── matches/page.tsx        # Fixture management + result entry
    ├── matches/[id]/page.tsx   # Edit one match
    ├── users/page.tsx          # User CRUD
    └── settings/page.tsx       # Re-seed fixtures, view audit log
```

### Components (key ones)

- `MatchCard` — used in lists. Shows teams, flags, kickoff, lock countdown, your bet (if any), status badge.
- `BetForm` — controlled inputs for home/away score; conditional advancer radio for knockout draws; disabled when locked.
- `LeaderboardTable` — Mantine `Table`; columns: rank, name, total, hits per category. Sticky header.
- `MatchBetsList` — visible only when `status != SCHEDULED`; shows everyone's bets, sorted by points awarded desc.
- `PhaseBadge` — colored chip (group=gray, R32=blue, R16=cyan, QF=teal, SF=violet, 3rd=pink, Final=gold) with the multiplier.
- `CountdownToLock` — live ticker using `useInterval`.
- `FlagAvatar` — round flag (emoji or PNG fallback).

### State management

- No Redux / Zustand. Use **React Query (`@tanstack/react-query`)** for server state with sensible cache keys.
- Local component state via `useState`. Forms via `@mantine/form`.

### Real-time-ish behavior

- Leaderboard auto-refreshes every 30s via React Query `refetchInterval`.
- Match list auto-refreshes every 60s.
- Lock countdown is purely client-side; once it hits zero the page refetches the match.

(No WebSockets needed at this scale.)

---

## 11. UI / Visual Design

### Theme philosophy

Dark mode, betting-site energy: deep neutrals as base, vibrant accent for primary actions (CTAs, "place bet"), warm gold for high-value emphasis (top of leaderboard, finals), red for "locked" / urgency, green for "your bet placed".

### Custom Mantine theme

`lib/theme.ts`:

```ts
import { createTheme, MantineColorsTuple } from "@mantine/core";

// Vibrant lime-green primary (typical betting-site accent)
const accent: MantineColorsTuple = [
  "#eafbe7", "#c9f4c0", "#a4ec97", "#7be46b", "#5bdd49",
  "#46d932", "#37c422", "#26ab14", "#1a960a", "#0a8000",
];

// Gold for top ranks / final
const gold: MantineColorsTuple = [
  "#fff8e1", "#ffecb3", "#ffe082", "#ffd54f", "#ffca28",
  "#ffc107", "#ffb300", "#ffa000", "#ff8f00", "#ff6f00",
];

// Hot red for urgent / locked
const danger: MantineColorsTuple = [
  "#ffe9e9", "#ffc9c9", "#ffa3a3", "#ff7676", "#ff4d4d",
  "#ff2d2d", "#f51919", "#dc0d0d", "#c10000", "#a10000",
];

export const theme = createTheme({
  primaryColor: "accent",
  colors: { accent, gold, danger },
  primaryShade: { light: 6, dark: 5 },
  defaultRadius: "md",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  headings: { fontFamily: "'Inter', system-ui, sans-serif", fontWeight: "700" },
  cursorType: "pointer",
  components: {
    Button: { defaultProps: { radius: "md" } },
    Card:   { defaultProps: { radius: "lg", shadow: "md", withBorder: true } },
    Paper:  { defaultProps: { radius: "lg", shadow: "sm" } },
  },
});
```

### Color tokens (semantic)

| Token            | Mantine ref           | Use                                |
| ---------------- | --------------------- | ---------------------------------- |
| Background base  | `dark.8` / `dark.9`   | App background                     |
| Surface 1        | `dark.7`              | Cards, sidebars                    |
| Surface 2        | `dark.6`              | Hover, elevated cards              |
| Border           | `dark.4`              | Card borders                       |
| Text primary     | `gray.0`              | Body text                          |
| Text secondary   | `gray.5`              | Captions                           |
| Accent           | `accent.5`            | Primary CTAs, links                |
| Success          | `accent.6`            | Bet placed, correct prediction     |
| Gold             | `gold.5`              | #1 rank, final phase badge         |
| Danger           | `danger.6`            | Locked, time-out warnings          |

### Shadows / depth

Use Mantine's `shadow="md"` and `shadow="lg"` liberally on cards; add a subtle inset border (`1px solid var(--mantine-color-dark-4)`) for the embossed betting-site feel. Hover states elevate `shadow` from `md` → `lg`.

### Typography

- **Inter** loaded via `next/font/google`.
- Match scores: `font-variant-numeric: tabular-nums` for clean digit alignment.
- Headings tight (`letter-spacing: -0.02em`), body relaxed.

### Iconography

`@tabler/icons-react`. Conventions:

| Concept            | Icon                       |
| ------------------ | -------------------------- |
| Trophy / winner    | `IconTrophy`               |
| Leaderboard        | `IconChartBar`             |
| Match / ball       | `IconBallFootball`         |
| Bet / target       | `IconTarget`               |
| Locked             | `IconLock`                 |
| Live               | `IconCircleFilled` (red)   |
| Time / kickoff     | `IconClock`                |
| User profile       | `IconUserCircle`           |
| Admin              | `IconShieldLock`           |
| Settings           | `IconSettings`             |
| Group stage        | `IconUsersGroup`           |
| Knockout           | `IconTournament`           |

Default size 18, color inherited.

### Responsive breakpoints

- `xs` < 576 — single column, stacked match cards, bottom nav.
- `sm` ≥ 576 — two columns on lists.
- `md` ≥ 768 — sidebar appears, three columns.
- `lg` ≥ 992 — leaderboard side-by-side with featured match.

Use Mantine's `useMediaQuery` and `SimpleGrid`/`Grid` to adapt.

---

## 12. Project Structure

```
wc26-pool/
├── app/                          # Next.js App Router
│   ├── (app)/                    # Authenticated routes
│   ├── admin/
│   ├── api/
│   ├── login/
│   ├── layout.tsx
│   └── globals.css
├── components/                   # Reusable UI
│   ├── matches/
│   ├── leaderboard/
│   ├── bets/
│   └── ui/                       # Generic wrappers
├── lib/
│   ├── auth/                     # iron-session helpers, guards
│   ├── db.ts                     # PrismaClient singleton
│   ├── scoring/
│   │   ├── score.ts              # pure scoring fn
│   │   ├── multipliers.ts
│   │   └── leaderboard.ts        # ranking + tiebreakers
│   ├── fixtures/
│   │   ├── openfootball.ts       # fetch + parse
│   │   └── seed.ts
│   ├── time.ts                   # tz helpers
│   ├── theme.ts                  # Mantine theme
│   └── validators.ts             # Zod schemas
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   └── flags/                    # optional flag PNGs
├── scripts/
│   ├── seed-teams.ts
│   └── seed-fixtures.ts
├── tests/
│   └── scoring.test.ts           # cover all 5 categories + multipliers
├── .env.example
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## 13. Environment Variables

```bash
# .env.example
DATABASE_URL="postgresql://..."             # Supabase pooled connection
DIRECT_URL="postgresql://..."               # Supabase direct (for migrations)

IRON_SESSION_PASSWORD="min-32-char-random"  # session cookie encryption

INVITE_CODE="wc26-go-brasil"                # shared participant code
ALLOW_SELF_SIGNUP="false"                   # if true, unknown name auto-creates a user

ADMIN_EMAIL="gabriel@..."                   # seeded as initial admin
ADMIN_PASSWORD="change-me-on-first-login"   # bcrypt'd by seed script

CRON_SECRET="random-bearer-for-vercel-cron"

NEXT_PUBLIC_APP_NAME="WC26 Pool"
```

---

## 14. Deployment

- **Hosting:** Vercel, connected to GitHub repo, auto-deploy on `main`.
- **Database:** Supabase (free tier is sufficient for 80 users / ~104 matches / ≤10k bets).
- **Migrations:** `prisma migrate deploy` in Vercel build step (`postinstall` or build command).
- **Cron:** `vercel.json` defines the cron entry:
  ```json
  { "crons": [{ "path": "/api/cron/lock-matches", "schedule": "* * * * *" }] }
  ```
- **Environments:** `preview` for PRs (own Supabase DB optional), `production` for `main`.

---

## 15. Security & Integrity

- Constant-time compare on `INVITE_CODE` (`crypto.timingSafeEqual`).
- Bcrypt (cost 12) for admin passwords.
- Server-side validation on every bet write: re-check `lockAt > now()`.
- Database-level unique constraint on `(userId, matchId)` for `Bet`.
- Database-level unique constraint on `User.normalizedName`.
- Audit log for all admin mutations (`AuditLog` table).
- Rate-limit `/api/auth/login` (e.g. `@upstash/ratelimit` if you add Upstash, else simple in-memory per-IP for MVP).
- CSRF: same-origin only; SameSite=Lax cookie. No third-party form posts.
- No PII beyond first + last name. No emails for participants. Acceptable for an internal sweepstakes.

---

## 16. Edge Cases & Decisions Log

| Case | Decision |
| --- | --- |
| User predicts knockout draw but doesn't enter advancer | Bet not saveable. UI blocks; API returns 422. |
| Knockout actually ends in regulation draw → ET/penalties | Regulation scores still decide points. `advancingTeamId` on the match is informational, no extra bet points. |
| Admin enters wrong score, fixes it later | Scoring is idempotent; all affected bets recompute on save. |
| Knockout team TBD at fixture creation | Match stored with placeholders; bets disabled until both teams resolved. UI shows "TBD" + a disabled bet form. |
| User registered with typo in name | Admin edits via `/admin/users`; `normalizedName` regenerated; uniqueness re-checked. |
| Two `Gabriel Silva`s | First one registers normally; second one needs admin to set `displaySuffix` before they can claim. |
| Cron fires while match already locked manually | Lock job is `WHERE status='SCHEDULED'`; no-op. |
| Time-zone confusion | Always store UTC. Display in `Intl.DateTimeFormat` with browser TZ. Admin form accepts local TZ input but converts. |
| Tie across all 5 tiebreaker keys | Shared rank, displayed as `T-3` etc. |
| Match cancelled (rare) | Admin sets `status=CANCELLED`; bets for that match award 0 to everyone and are excluded from tiebreaker zero-counts. |

---

## 17. Implementation Roadmap (for Claude Code)

Suggested incremental phases. Each phase is independently runnable and testable.

### Phase 0 — Project scaffold
- `pnpm create next-app`, TypeScript, App Router, no Tailwind.
- Add Mantine, Tabler icons, Prisma, Zod, iron-session, date-fns, React Query.
- Configure ESLint, Prettier.
- Set up `MantineProvider` with the custom theme in `app/layout.tsx`.
- Verify dark mode + sample component renders.

### Phase 1 — Database & auth
- Define Prisma schema (Section 4).
- Run first migration against Supabase.
- Seed scripts: teams (hardcoded) + admin user.
- Build participant login (`/login`) and admin login (`/admin/login`).
- `requireUser` / `requireAdmin` middleware helpers.
- `/api/auth/me`.

### Phase 2 — Fixtures
- Implement openfootball seeder.
- Admin matches list (`/admin/matches`) with read view.
- Admin can edit kickoff, teams, venue.
- Match list page for participants (`/(app)/matches`) — read only, no bets yet.

### Phase 3 — Betting
- Bet form on match detail page.
- API `PUT /api/matches/:id/bet` with lock validation.
- Locking cron `/api/cron/lock-matches`.
- Show "locked" UI and reveal-all-bets view post-lock.

### Phase 4 — Scoring & leaderboard
- Pure scoring fn + unit tests for every category.
- Admin "Save & score" flow on match result entry.
- Leaderboard page with tiebreaker columns.
- User profile page showing their bets + breakdown.

### Phase 5 — Polish
- Lock countdown component.
- Phase badges, flag avatars, multiplier highlights.
- Empty / error / loading states.
- Responsive pass on mobile.
- Audit log viewer in admin.

### Phase 6 — Optional / post-MVP
- Vitest coverage report.
- Playwright e2e on critical paths (login, place bet, lock, score).
- Export leaderboard to CSV.
- "Stats" page (most accurate phase, most-bet team, etc.).

---

## 18. Open Items / Future Considerations

- **Avatars:** could allow each user to upload one. Out of scope for v1.
- **Comments / banter:** chat per match would be fun but adds moderation cost. Skip for v1.
- **Achievements / badges:** "Predicted the upset", "Perfect group stage" — fun and cheap to add later.
- **Email recap:** end-of-tournament summary email. Nice-to-have, out of scope.
- **Backup snapshots:** weekly DB dump from Supabase to S3. Worth adding closer to kickoff.

---

*End of document.*
