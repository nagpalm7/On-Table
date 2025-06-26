'use client';

import React, { useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
    MdAccountCircle,
    MdLogout,
    MdLogin,
    MdShoppingCart
} from 'react-icons/md';
import { AvatarImage } from './Avatar';
import api from '@/lib/axiosInstance';
import NavLink from '../common/NavLink';

export default function UserDropdown() {
    const { data: session, status } = useSession();
    const isLoggedIn = status === 'authenticated';
    const triggerRef = useRef(null);

    const closeDropdown = () => {
        triggerRef.current?.click();
    }

    const handleLogout = async () => {
        await api.post('/auth/logout');
        await signOut({ callbackUrl: window.location.href });
    }

    if (status === "loading")
        return <div className='skeleton rounded-full w-10 h-10'></div>

    return (
        <div className="dropdown dropdown-end">
            <label ref={triggerRef} tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
                        <NavLink
                            label={"Login"}
                            href={`/oauth/login?redirect=${window.location.href}`}
                            icon={<MdLogin className="mr-2" />}
                            closeDrawer={closeDropdown}
                        />
                    </li>
                ) : (
                    <>
                        <li>
                            <NavLink
                                label={"My Orders"}
                                href={`/order/list`}
                                icon={<MdShoppingCart className="mr-2" />}
                                closeDrawer={closeDropdown}
                            />
                        </li>
                    </>
                )}
                {isLoggedIn && (
                    <li>
                        <button onClick={handleLogout}>
                            <MdLogout className="mr-2" /> Logout
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}
