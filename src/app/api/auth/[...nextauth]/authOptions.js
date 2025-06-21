import { getDatabaseConnection } from '@/lib/db';
import Order from '@/model/order';
import Session from '@/model/session';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({ user }) {
            await getDatabaseConnection();
            const email = user.email;
            const cookieStore = await cookies();
            const sessionId = cookieStore.get('sessionId')?.value;

            if (!sessionId || !email) return true;
            // 1. Upgrade session
            await Session.findOneAndUpdate(
                { sessionId },
                { email },
                { new: true, upsert: true }
            );

            // 2. Migrate any orders by sessionId or matching email
            await Order.updateMany(
                {
                    $or: [
                        { sessionId },
                        { email: { $exists: true, $eq: email } },
                    ],
                },
                {
                    email,
                    sessionId,
                }
            );

            return true;
        },

        async session({ session }) {
            // You can attach your session info if needed
            console.log(session);
            return session;
        }
    },
}