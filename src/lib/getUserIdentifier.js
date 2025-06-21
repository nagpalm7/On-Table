import "server-only";

import { cookies } from 'next/headers';
import { getDatabaseConnection } from "./db";
import Session from "@/model/session";

export async function getUserIdentifier() {
  await getDatabaseConnection();
  const cookieStore = cookies();
  const sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) return null;

  const session = await Session.findOne({ sessionId });
  if (!session) return null;

  return session.phone ?? session.sessionId;
}
