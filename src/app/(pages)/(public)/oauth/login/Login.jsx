'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useSearchParams } from 'next/navigation';

export default function LoginButtons() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || "/order/list";
  return (
    <div>
      <button
        className="btn btn-block rounded-full flex items-center justify-center gap-2"
        onClick={() => signIn('google', { callbackUrl:  redirectUrl})}
      >
        <FcGoogle size={20} /> Login with Google
      </button>
    </div>
  );
}
