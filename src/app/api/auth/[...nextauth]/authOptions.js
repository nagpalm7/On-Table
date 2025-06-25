import { getDatabaseConnection } from '@/lib/db';
import { createSessionWithEmail } from '@/lib/guest';
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

            console.log("Signin", email, sessionId);

            if (!email) return true;

            // create new session with email
            const updateOrdersWithEmail = [];
            const deleteOrders = [];

            createSessionWithEmail(email);

            const orderWithEmail = await Order.find({
                email: email,
                orderStatus: { $in: ['draft', 'review'] }
            });

            const orderWithSession = await Order.find({
                sessionId: sessionId,
                orderStatus: { $in: ['draft', 'review'] }
            });

            for (const order of orderWithSession) {
                const rid = order.restaurant.toString();
                if (order.orderStatus === 'review') {
                    updateOrdersWithEmail.push(order._id);
                    orderWithEmail.forEach((o) => {
                        if (o.restaurant.toString() === rid && o._id !== order._id) {
                            deleteOrders.push(o._id);
                        }
                    });
                } else {
                    if (!orderWithEmail.some(o => o.restaurant.toString() === rid)) {
                        updateOrdersWithEmail.push(order._id);
                    }
                }
            }

            console.log("Order with email", orderWithEmail);
            console.log("Order with session", orderWithSession);
            console.log("Update orders with email", updateOrdersWithEmail);
            console.log("Delete orders", deleteOrders);

            // update orders with email
            if (updateOrdersWithEmail.length > 0) {
                await Order.updateMany(
                    { _id: { $in: updateOrdersWithEmail } },
                    { $set: { email: email } }
                );
            }

            // delete orders
            if (deleteOrders.length > 0) {
                await Order.deleteMany({ _id: { $in: deleteOrders } });
            }

            return true;
        },

        async session({ session }) {
            // You can attach your session info if needed
            return session;
        }
    },
}