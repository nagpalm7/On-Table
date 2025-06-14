"use client";
import React from "react";
import Link from "next/link"
import { usePathname } from "next/navigation";

const NavLink = ({label, href, icon, closeDrawer}) => {
    const pathname = usePathname();
    return (
        <Link href={href} onClick={closeDrawer} className={pathname === href ? "menu-active" : ""}>
            {icon}<span>{label}</span>
        </Link>
    )
}

export default NavLink;