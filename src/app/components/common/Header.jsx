import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import LogoutButton from '@/app/components/common/LogoutButton';
import Link from 'next/link';
import getAuthUser from '@/lib/getAuthUser';

const Header = async () => {
    const authUser = await getAuthUser();
    return (
        <header className="sticky top-0 z-20 w-full bg-base-100">
            <div className="navbar shadow-xs">
                {authUser &&
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
                            <AiOutlineMenu className="text-xl" />
                        </label>
                    </div>
                }
                <div className="flex-1">
                    <Link className={"text-xl mx-4 font-semibold" + (authUser ? " lg:hidden" : "")} href="/">On Table</Link>
                </div>
                <LogoutButton />
            </div>
        </header>
    );
};

export default Header;