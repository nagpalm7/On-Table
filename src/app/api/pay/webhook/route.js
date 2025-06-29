import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDatabaseConnection } from '@/lib/db';
import Order from '@/model/order';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const rawBody = await req.text(); // get raw body text
    const signature = req.headers.get('x-razorpay-signature');

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');

    if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Only act on successful payments
    if (event.event === 'payment.captured') {
        const payment = event.payload.payment.entity;
        const razorpayOrderId = payment.order_id;
        const razorpayPaymentId = payment.id;

        await getDatabaseConnection();

        const order = await Order.findOne({ razorpayOrderId });

        if (order && order.paymentStatus !== 'paid') {
            order.paymentStatus = 'paid';
            order.orderStatus = 'placed';
            order.razorpayPaymentId = razorpayPaymentId;
            await order.save();
        }

        if (event.event === 'payment.failed') {
            const payment = event.payload.payment.entity;

            await Order.findOneAndUpdate(
                { razorpayOrderId: payment.order_id },
                {
                    paymentStatus: 'failed',
                    razorpayPaymentId: payment.id,
                    failureReason: payment.error_description || 'Payment failed'
                }
            );
        }
    }

    return NextResponse.json({ status: 'ok' });
}
