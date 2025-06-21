// app/api/logout/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import Session from '@/model/session';
import { getDatabaseConnection } from '@/lib/db';

export async function POST() {
  await getDatabaseConnection();
  const sessionId = cookies().get('sessionId')?.value;

  if (sessionId) {
    await Session.findOneAndDelete({ sessionId });
    const res = NextResponse.json({ success: true });
    res.cookies.set('sessionId', '', { maxAge: 0, path: '/' });
    return res;
  }

  return NextResponse.json({ success: false });
}
