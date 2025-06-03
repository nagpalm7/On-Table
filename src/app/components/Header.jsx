import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import LogoutButton from '@/app/components/LogoutButton';
import Link from 'next/link';
import getAuthUser from '@/lib/getAuthUser';

const Header = async () => {
    const authUser = await getAuthUser();
    return (
        <header className="sticky top-0 z-1 w-full bg-base-200">
            <div className="navbar shadow-sm">
                {authUser &&
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
                            <AiOutlineMenu className="text-xl" />
                        </label>
                    </div>
                }
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" href="/">On Table</Link>
                </div>
                <LogoutButton />
            </div>
        </header>
    );
};

export default Header;