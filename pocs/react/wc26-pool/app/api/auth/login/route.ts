import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

const schema = z.object({
  inviteCode: z.string().min(1),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
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

  const { inviteCode, firstName, lastName } = parsed.data;

  const expected = Buffer.from(process.env.INVITE_CODE ?? "");
  const provided = Buffer.from(inviteCode);
  const validCode =
    expected.length > 0 &&
    expected.length === provided.length &&
    timingSafeEqual(expected, provided);

  if (!validCode) {
    return NextResponse.json(
      { error: { code: "INVALID_INVITE_CODE", message: "Invalid invite code." } },
      { status: 401 },
    );
  }

  const normalizedName = `${firstName.toLowerCase()} ${lastName.toLowerCase()}`;
  let user = await db.user.findUnique({ where: { normalizedName } });

  if (!user) {
    if (process.env.ALLOW_SELF_SIGNUP !== "true") {
      return NextResponse.json(
        { error: { code: "USER_NOT_FOUND", message: "Name not found. Contact the admin." } },
        { status: 404 },
      );
    }
    user = await db.user.create({
      data: { firstName, lastName, normalizedName },
    });
  }

  const session = await getSession();
  session.userId = user.id;
  session.isAdmin = false;
  await session.save();

  return NextResponse.json({ data: { userId: user.id } });
}
