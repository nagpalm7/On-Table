'use client';

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
    MdAccountCircle, 
    MdLogout, 
    MdLogin, 
    MdShoppingCart, 
    MdTrackChanges 
} from 'react-icons/md';
import { AvatarImage } from './Avatar';

export default function UserDropdown() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoggedIn = status === 'authenticated';

  if (status === "loading") 
    return <div className='skeleton rounded-full w-10 h-10'></div>

  console.log("loaded auth")
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        {isLoggedIn && session.user?.image ? (
            <div className="flex items-center justify-center rounded-full bg-base-200 text-base-content ring ring-success ring-offset-2">
                <AvatarImage src={session.user.image} alt={session.user.name[0]} />
            </div>
        ) : (
          <div className="flex items-center justify-center rounded-full bg-base-100 text-base-content ring ring-success ring-offset-1">
            <MdAccountCircle className="text-4xl" />
          </div>
        )}
      </label>

      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-md menu menu-md dropdown-content bg-base-300 rounded-box w-56">
        {!isLoggedIn ? (
          <li>
            <button onClick={() => signIn('google', { callbackUrl: window.location.href })}>
              <MdLogin className="mr-2" /> Login
            </button>
          </li>
        ) : (
          <>
            <li>
              <button onClick={() => router.push('/account')}>
                <MdAccountCircle className="mr-2" /> My Account
              </button>
            </li>
            <li>
              <button onClick={() => router.push('/orders')}>
                <MdShoppingCart className="mr-2" /> My Orders
              </button>
            </li>
            <li>
            <button onClick={() => router.push('/track-order')}>
                <MdTrackChanges className="mr-2" /> Track My Order
            </button>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={() => signOut({ callbackUrl: window.location.href })}>
              <MdLogout className="mr-2" /> Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
