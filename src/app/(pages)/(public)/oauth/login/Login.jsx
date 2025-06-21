'use client';

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export default function LoginButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="space-y-4">
        <p className="text-center">Welcome, {session.user?.name}</p>
        <button className="btn btn-error w-full" onClick={() => signOut()}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <button
        className="btn btn-outline w-full flex items-center justify-center gap-2"
        onClick={() => signIn('google')}
      >
        <FcGoogle size={20} /> Login with Google
      </button>

      <button
        className="btn btn-primary w-full flex items-center justify-center gap-2"
        onClick={() => signIn('facebook')}
      >
        <FaFacebook size={20} /> Login with Facebook
      </button>
    </div>
  );
}
