import { getDatabaseConnection } from '@/lib/db';
import order from '@/model/order';
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
            console.log(sessionId);

            if (!sessionId || !email) return true;
            // 1. Upgrade session
            await Session.findOneAndUpdate(
                { sessionId },
                { email },
                { new: true, upsert: true }
            );

            // 2. Check orders with this email in draft or email and migrate if required.
            const orderWithEmail = await Order.findOne({
                email: email,
                orderStatus: { $in: ['draft', 'review'] }
            });

            const orderWithSession = await Order.findOne({
                sessionId: sessionId,
                orderStatus: { $in: ['draft', 'review'] }
            });

            if (orderWithEmail && !orderWithSession) {
                return true;
            }

            if (!orderWithEmail && orderWithSession) {
                orderWithSession.email = email;
                await orderWithSession.save();
                return true;
            }

            if (orderWithEmail && orderWithSession) {
                if (orderWithSession.orderStatus === 'review') {
                    orderWithSession.email = email;
                    orderWithSession.save();
                    // delete email order
                    await Order.findByIdAndDelete(orderWithEmail._id);
                } else {
                    // delete session order
                    await Order.findByIdAndDelete(orderWithSession._id);
                }
                return true;
            }

            return true;
        },

        async session({ session }) {
            // You can attach your session info if needed
            return session;
        }
    },
}