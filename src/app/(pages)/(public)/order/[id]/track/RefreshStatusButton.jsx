'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useTransition } from 'react';

export default function RefreshStatusButton({ orderNumber }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => router.refresh())}
      className="btn btn-outline btn-sm"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <span className="loading loading-spinner loading-xs"></span>
          Refreshing...
        </>
      ) : (
        <>
          🔄 Refresh Status
        </>
      )}
    </button>
  );
}
