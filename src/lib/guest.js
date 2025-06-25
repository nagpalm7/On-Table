import "server-only";
import { cookies, headers } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
import Session from '@/model/session';

export async function getOrCreateSession() {
    const now = new Date();
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('sessionId')?.value;

    if (sessionId) {
        const session = await Session.findOneAndUpdate(
            { sessionId },
            { lastSeen: now }
        );

        if (session) return sessionId;
    }

    // create new session
    sessionId = await createSessionWithEmail();

    return sessionId;
}

export async function createSessionWithEmail(email = null) {
    const headerStore = await headers();
    const cookieStore = await cookies();
    const sessionId = uuidv4();
    const userAgent = headerStore.get('user-agent') || '';
    const ip = headerStore.get('x-forwarded-for') || '';
    await Session.create({ sessionId, email, userAgent, ip });
    cookieStore.set('sessionId', sessionId, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        sameSite: "lax",
    });
    return sessionId;
}