"use server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
import Session from '@/model/session';

export async function getOrCreateSession() {
    const expiresIn = 60 * 60 * 24 * 7 * 1000 // 7 days
    const now = new Date();
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
        sessionId = uuidv4();
        // optionally set cookie here if using in API route
        cookieStore.set('sessionId', sessionId, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
    }
    let session = await Session.findOne({ sessionId });
    if (!session) {
        session = await Session.create({ sessionId, expiresAt: new Date(now.getTime() + expiresIn) });
    }

    return { sessionId, session };
}