import Razorpay from 'razorpay';
import { getDatabaseConnection } from '@/lib/db';
import Order from '@/model/order';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(req) {
  const { orderId } = await req.json();
  await getDatabaseConnection();

  const order = await Order.findById(orderId);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  const razorpayOrder = await razorpay.orders.create({
    amount: order.amount * 100, // paisa
    currency: 'INR',
    receipt: order.orderNumber.toString(),
    payment_capture: true,
  });

  order.status = 'placed';
  order.razorpayOrderId = razorpayOrder.id;
  await order.save();

  return NextResponse.json({ order, razorpayOrder });
}
