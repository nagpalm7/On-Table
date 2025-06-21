'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function LoginButtons() {
  return (
    <div>
      <button
        className="btn btn-block rounded-full flex items-center justify-center gap-2"
        onClick={() => signIn('google', { callbackUrl: "/order/list" })}
      >
        <FcGoogle size={20} /> Login with Google
      </button>
    </div>
  );
}
