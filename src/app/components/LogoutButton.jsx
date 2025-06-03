"use server";

import { logout } from '@/actions/auth';
import getAuthUser from '@/lib/getAuthUser';
import React from 'react'

const LogoutButton = async () => {
  const authUser = await getAuthUser();

  if (!authUser) {
    return null; // or handle unauthenticated state
  }

  return (
    <div className="flex-none margin-right-4">
        <form action={logout}>
            <button className="btn btn-ghost">
                Log out
                {/* <FiShoppingCart className="text-xl" /> */}
            </button>
        </form>
    </div>
  )
}

export default LogoutButton