import 'server-only';
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export default async function getAuthUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (session) {
    const user = await decrypt(session);
    return user;
  }
}
