import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-base-100">
            <div className="navbar shadow-sm">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <AiOutlineMenu className="text-xl" />
                    </button>
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl" href="./order">On Table</a>
                </div>
                <div className="flex-none margin-right-4">
                    <button className="btn btn-square btn-ghost">
                        {/* <FiShoppingCart className="text-xl" /> */}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;