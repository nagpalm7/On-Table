import "server-only";

import { cookies } from 'next/headers';
import { getDatabaseConnection } from "./db";
import Session from "@/model/session";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function getUserIdentifier() {
  await getDatabaseConnection();
  const oauthSession = await getServerSession(authOptions);
  if (oauthSession?.user?.email) return { type: 'email', value: oauthSession.user.email };

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) return null;

  const session = await Session.findOne({ sessionId });
  if (!session) return null;

  if (session.email) {
    return { type: 'email', value: session.email };
  }

  return { type: 'session', value: session.sessionId }
}
