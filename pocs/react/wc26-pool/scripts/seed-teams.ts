import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const TEAMS = [
  // UEFA (16)
  { id: "AUT", name: "Austria", flagEmoji: "🇦🇹" },
  { id: "BEL", name: "Belgium", flagEmoji: "🇧🇪" },
  { id: "CRO", name: "Croatia", flagEmoji: "🇭🇷" },
  { id: "DEN", name: "Denmark", flagEmoji: "🇩🇰" },
  { id: "ENG", name: "England", flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "ESP", name: "Spain", flagEmoji: "🇪🇸" },
  { id: "FRA", name: "France", flagEmoji: "🇫🇷" },
  { id: "GER", name: "Germany", flagEmoji: "🇩🇪" },
  { id: "HUN", name: "Hungary", flagEmoji: "🇭🇺" },
  { id: "ITA", name: "Italy", flagEmoji: "🇮🇹" },
  { id: "NED", name: "Netherlands", flagEmoji: "🇳🇱" },
  { id: "POL", name: "Poland", flagEmoji: "🇵🇱" },
  { id: "POR", name: "Portugal", flagEmoji: "🇵🇹" },
  { id: "SCO", name: "Scotland", flagEmoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { id: "SRB", name: "Serbia", flagEmoji: "🇷🇸" },
  { id: "SUI", name: "Switzerland", flagEmoji: "🇨🇭" },
  // CONMEBOL (6)
  { id: "ARG", name: "Argentina", flagEmoji: "🇦🇷" },
  { id: "BRA", name: "Brazil", flagEmoji: "🇧🇷" },
  { id: "COL", name: "Colombia", flagEmoji: "🇨🇴" },
  { id: "ECU", name: "Ecuador", flagEmoji: "🇪🇨" },
  { id: "URU", name: "Uruguay", flagEmoji: "🇺🇾" },
  { id: "VEN", name: "Venezuela", flagEmoji: "🇻🇪" },
  // CONCACAF (hosts + 3 qualifiers)
  { id: "USA", name: "United States", flagEmoji: "🇺🇸" },
  { id: "CAN", name: "Canada", flagEmoji: "🇨🇦" },
  { id: "MEX", name: "Mexico", flagEmoji: "🇲🇽" },
  { id: "CRC", name: "Costa Rica", flagEmoji: "🇨🇷" },
  { id: "HON", name: "Honduras", flagEmoji: "🇭🇳" },
  { id: "PAN", name: "Panama", flagEmoji: "🇵🇦" },
  // CAF (9)
  { id: "CMR", name: "Cameroon", flagEmoji: "🇨🇲" },
  { id: "CIV", name: "Côte d'Ivoire", flagEmoji: "🇨🇮" },
  { id: "EGY", name: "Egypt", flagEmoji: "🇪🇬" },
  { id: "GHA", name: "Ghana", flagEmoji: "🇬🇭" },
  { id: "MAR", name: "Morocco", flagEmoji: "🇲🇦" },
  { id: "MLI", name: "Mali", flagEmoji: "🇲🇱" },
  { id: "NGA", name: "Nigeria", flagEmoji: "🇳🇬" },
  { id: "SEN", name: "Senegal", flagEmoji: "🇸🇳" },
  { id: "TUN", name: "Tunisia", flagEmoji: "🇹🇳" },
  // AFC (8)
  { id: "AUS", name: "Australia", flagEmoji: "🇦🇺" },
  { id: "IRN", name: "Iran", flagEmoji: "🇮🇷" },
  { id: "IRQ", name: "Iraq", flagEmoji: "🇮🇶" },
  { id: "JOR", name: "Jordan", flagEmoji: "🇯🇴" },
  { id: "JPN", name: "Japan", flagEmoji: "🇯🇵" },
  { id: "KOR", name: "South Korea", flagEmoji: "🇰🇷" },
  { id: "KSA", name: "Saudi Arabia", flagEmoji: "🇸🇦" },
  { id: "UZB", name: "Uzbekistan", flagEmoji: "🇺🇿" },
  // OFC (1)
  { id: "NZL", name: "New Zealand", flagEmoji: "🇳🇿" },
  // Intercontinental playoff (2)
  { id: "PAR", name: "Paraguay", flagEmoji: "🇵🇾" },
  { id: "TRI", name: "Trinidad & Tobago", flagEmoji: "🇹🇹" },
];

async function main() {
  console.log(`Seeding ${TEAMS.length} teams...`);

  for (const team of TEAMS) {
    await db.team.upsert({
      where: { id: team.id },
      update: { name: team.name, flagEmoji: team.flagEmoji },
      create: team,
    });
  }

  console.log("Teams seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
