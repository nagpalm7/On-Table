import { NextResponse } from 'next/server';
import { getDatabaseConnection } from '@/lib/db';
import Order from '@/model/order';
import axios from 'axios';

export async function POST(req) {
  try {
    const { razorpay_payment_id, orderNumber } = await req.json();
    if (!razorpay_payment_id || !orderNumber)
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });

    await getDatabaseConnection();

    // Fetch payment status from Razorpay
    const auth = Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
    ).toString('base64');

    const razorpayRes = await axios.get(
      `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const payment = razorpayRes.data;

    if (payment.status === 'captured') {
      await Order.findOneAndUpdate(
        { orderNumber },
        {
          paymentStatus: 'paid',
          paymentMode: payment.method,
          razorpayPaymentId: payment.id,
        }
      );
    }

    return NextResponse.json({ success: true, status: payment.status });
  } catch (err) {
    console.error('[VERIFY_PAYMENT_ERROR]', err);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
