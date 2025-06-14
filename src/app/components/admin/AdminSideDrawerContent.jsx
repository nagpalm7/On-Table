import React from "react";
import NavLink from "@/app/components/NavLink";
import { FaUser, FaUsers, FaUserPlus, FaPlus, FaListUl } from "react-icons/fa";
import { IoRestaurant, IoStatsChartSharp } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { RiDrinksFill } from "react-icons/ri";
import { PiWineFill } from "react-icons/pi";


export default function AdminSideDrawerContent({ closeDrawer }) {
    return (
        <ul className="menu backdrop-blur min-h-full px-4 py-0 w-full">
            <li>
                <NavLink
                    label={"Dashboard"}
                    href={"/admin/dashboard"}
                    icon={<IoStatsChartSharp />}
                    closeDrawer={closeDrawer}
                />
            </li>
            <li/>
            {/* User Nav Links */}
            <li>
                <details open={true}>
                    <summary className="group">
                        <span><FaUser /></span> User
                    </summary>
                    <ul>
                        <li>
                            <NavLink
                                label={"View Users"}
                                href={"/admin/user/list"}
                                icon={<FaUsers />}
                                closeDrawer={closeDrawer}
                            />
                        </li>
                        <li>
                            <NavLink
                                label={"Add User"}
                                href={"/admin/user/add"}
                                icon={<FaUserPlus />}
                                closeDrawer={closeDrawer}
                            />
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <details open={true}>
                    <summary className="group">
                        <span><IoRestaurant /></span> Restaurant
                    </summary>
                    <ul>
                        <li>
                            <NavLink
                                label={"View Restaurants"}
                                href={"/admin/restaurant/list"}
                                icon={<FaListUl />}
                                closeDrawer={closeDrawer}
                            />
                        </li>
                        <li>
                            <NavLink
                                label={"Add Restaurant"}
                                href={"/admin/restaurant/add"}
                                icon={<FaPlus />}
                                closeDrawer={closeDrawer}
                            />
                        </li>
                    </ul>
                </details>

            </li>
            <li>
                <details open={true}>
                    <summary className="group">
                        <span><MdFastfood /></span> Food Menu
                    </summary>
                    <ul>
                        <li>
                            <div className="menu-title">Food Category</div>
                            <ul>
                                <li>
                                    <NavLink
                                        label={"View Categories"}
                                        href={"/admin/menu/category/list"}
                                        icon={<FaListUl />}
                                        closeDrawer={closeDrawer}
                                    />
                                </li>
                                <li>
                                    <NavLink
                                        label={"Add Category"}
                                        href={"/admin/menu/category/add"}
                                        icon={<RiDrinksFill />}
                                        closeDrawer={closeDrawer}
                                    />
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="menu-title">Food Item</div>
                            <ul>
                                <li>
                                    <NavLink
                                        label={"View Food Items"}
                                        href={"/admin/menu/menu-item/list"}
                                        icon={<RiDrinksFill />}
                                        closeDrawer={closeDrawer}
                                    />
                                </li>
                                <li>
                                    <NavLink
                                        label={"Add Food Item"}
                                        href={"/admin/menu/menu-item/add"}
                                        icon={<PiWineFill />}
                                        closeDrawer={closeDrawer}
                                    />
                                </li>
                            </ul>
                        </li>

                    </ul>
                </details>
            </li>
        </ul>
    )
}