'use client';

import React from 'react';
import MobileLogin from '@/app/(pages)/(public)/verify/MobileLogin';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyPhonePage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isVerified) {
      router.replace(redirect);
    }
  }, [isVerified]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Verify Your Phone</h1>
      <MobileLogin onVerified={() => setIsVerified(true)} />
    </div>
  );
}
