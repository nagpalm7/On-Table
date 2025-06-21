import 'server-only';
import { cookies, headers } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
import Session from '@/model/session';

export async function getOrCreateSession() {
    const now = new Date();
    const cookieStore = await cookies();
    const headerStore = await headers();
    let sessionId = cookieStore.get('sessionId')?.value;

    if (sessionId) {
        const session = await Session.findOneAndUpdate(
            { sessionId },
            { lastSeen: now }
        );

        if (session) return sessionId;
    }


    // create new session
    sessionId = uuidv4();
    const userAgent = headerStore.get('user-agent') || '';
    const ip = headerStore.get('x-forwarded-for') || '';

    await Session.create({ sessionId, userAgent, ip });

    cookieStore.set('sessionId', sessionId, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        sameSite: "lax",
    });

    return sessionId;
}