import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.message } },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;

  const user = await db.user.findFirst({
    where: { normalizedName: email.toLowerCase(), isAdmin: true },
  });

  if (!user?.passwordHash) {
    return NextResponse.json(
      { error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials." } },
      { status: 401 },
    );
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials." } },
      { status: 401 },
    );
  }

  const session = await getSession();
  session.userId = user.id;
  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ data: { userId: user.id } });
}
