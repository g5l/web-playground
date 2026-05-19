import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guards";

export async function GET() {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Not logged in." } },
      { status: 401 },
    );
  }

  return NextResponse.json({
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      displaySuffix: user.displaySuffix,
      isAdmin: user.isAdmin,
    },
  });
}
