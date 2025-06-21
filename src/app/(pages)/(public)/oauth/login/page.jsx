'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import LoginButtons from '@/app/(pages)/(public)/oauth/login/Login';
import { useEffect } from 'react';
import Spinner from '@/app/components/common/Spinner';

export default function LoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log("authenticated");
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <Spinner />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-sm p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <LoginButtons />
      </div>
    </div>
  );
}
