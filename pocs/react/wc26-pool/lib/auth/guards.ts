import { db } from "@/lib/db";
import { getSession } from "./session";

export async function requireUser() {
  const session = await getSession();
  if (!session.userId) return null;
  return db.user.findUnique({ where: { id: session.userId } });
}

export async function requireAdmin() {
  const user = await requireUser();
  if (!user?.isAdmin) return null;
  return user;
}
