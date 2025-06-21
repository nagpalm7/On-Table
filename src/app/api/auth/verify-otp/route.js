import { cookies } from 'next/headers';
import OtpToken from '@/model/otpToken';
import Session from '@/model/session';
import Order from '@/model/order';
import { getDatabaseConnection } from '@/lib/db';

export async function POST(req) {
  await getDatabaseConnection();
  const { phone, otp } = await req.json();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value;

  const record = await OtpToken.findOne({ phone });
  const isExpired = !record || new Date() > record.expiresAt;

  if (isExpired || record.otp !== otp) {
    return new Response(JSON.stringify({ error: 'Invalid or expired OTP' }), { status: 400 });
  }

  await OtpToken.deleteOne({ phone });

  // Upgrade session in DB
  await Session.findOneAndUpdate({ sessionId }, { $set: { phone } });

  // Update all orders with phone
  await Order.updateMany({ sessionId }, { $set: { phone } });

  // Set customerPhone in cookie
  cookieStore.set('customerPhone', phone, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax"
  });

  return new Response(JSON.stringify({ success: true }));
}
