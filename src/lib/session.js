import 'server-only';
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
import Session from '@/model/session';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(encodedKey);
}

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log("Failed to verify session");
    }
}

export async function createSession(userId, userType) {
    const SESSION_EXPIRY_TIME = 1 * 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_TIME);
    const session = await encrypt({ userId, userType, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: false,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

// Anonymous users session
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
            secure: false,
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