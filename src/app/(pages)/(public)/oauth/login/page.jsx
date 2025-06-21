'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import LoginButtons from '@/app/(pages)/(public)/oauth/login/Login';
import { useEffect } from 'react';
import Spinner from '@/app/components/common/Spinner';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  if (session) {
    router.replace("/order/list");
  }

  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center'>
      <div className="mx-4 shadow-md card bg-base-100 rounded-2xl">
        <div className="card-body">
          <h2 className="card-title text-xl">Login</h2>
          <p className='opacity-50'>Login with your google account to save your cart and track your orders.</p>
        </div>
        <div className="card-actions justify-center mb-4">
          <LoginButtons />
        </div>
      </div>
    </div>
  );
}
