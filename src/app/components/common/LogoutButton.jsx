"use client";

import { logout } from '@/actions/auth';
import React, { useActionState } from 'react'

const LogoutButton = ({ authUser }) => {
  const [state, action, isPending] = useActionState(logout, undefined);

  if (!authUser) {
    return null;
  }

  return (
    <div className="flex-none margin-right-4">
        <form action={action}>
            <button className="btn btn-ghost" disabled={isPending}>
                {isPending && <span className="loading loading-spinner"></span>}LOG OUT
            </button>
        </form>
    </div>
  )
}

export default LogoutButton