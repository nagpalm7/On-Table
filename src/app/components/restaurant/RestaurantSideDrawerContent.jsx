import React from "react";
import NavLink from "@/app/components/NavLink";
import { FaListUl } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { RiDrinksFill } from "react-icons/ri";
import { PiWineFill } from "react-icons/pi";


export default function RestaurantSideDrawerContent({ closeDrawer }) {
    return (
        <ul className="menu backdrop-blur min-h-full px-4 py-0 w-full">
            <li>
                <NavLink
                    label={"Dashboard"}
                    href={"/client/dashboard"}
                    icon={<IoStatsChartSharp />} 
                    closeDrawer={closeDrawer}
                />
            </li>
            <li/>
            <li>
                <NavLink
                    label={"Restaurants"}
                    href={"/client/restaurant/list"}
                    icon={<FaListUl />}
                    closeDrawer={closeDrawer}
                />
            </li>
            <li/>
            <li>
                <div className="menu-title">Menu</div>
                <ul>
                    <li>
                        <NavLink
                            label={"Food Categories"}
                            href={"/client/menu/category/list"}
                            icon={<RiDrinksFill />}
                            closeDrawer={closeDrawer}
                        />
                    </li>
                    <li>
                        <NavLink
                            label={"Food Items"}
                            href={"/client/menu/menu-item/list"}
                            icon={<PiWineFill />}
                            closeDrawer={closeDrawer}
                        />
                    </li>
                </ul>
            </li>
            
        </ul>
    )
}