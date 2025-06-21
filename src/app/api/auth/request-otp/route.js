import { NextResponse } from 'next/server';
import OtpToken from '@/model/otpToken';
import { getDatabaseConnection } from '@/lib/db';

export async function POST(req) {
  await getDatabaseConnection();
  const { phone } = await req.json();

  if (!phone || !/^\d{10}$/.test(phone)) {
    return NextResponse.json({ error: 'Invalid phone' }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  await OtpToken.findOneAndUpdate(
    { phone },
    { otp, expiresAt },
    { upsert: true }
  );

  // TODO: Replace this with SMS provider like Twilio or MSG91
  console.log(`OTP for ${phone}: ${otp}`);

  return NextResponse.json({ success: true });
}
