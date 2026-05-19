import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  userId?: string;
  isAdmin?: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD!,
  cookieName: "wc26_session",
  ttl: 60 * 60 * 24 * 30,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
