import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("ADMIN_EMAIL or ADMIN_PASSWORD not set, skipping admin seed.");
    return;
  }

  const normalizedName = email.toLowerCase();
  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await db.user.upsert({
    where: { normalizedName },
    update: { passwordHash },
    create: {
      firstName: "Admin",
      lastName: "",
      normalizedName,
      isAdmin: true,
      passwordHash,
    },
  });

  console.log(`Admin seeded: ${email} (id: ${admin.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
