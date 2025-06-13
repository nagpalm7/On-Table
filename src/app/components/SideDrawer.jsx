"use client";

import Link from 'next/link'
import React, { useRef } from 'react'
import { FaUser, FaUsers, FaUserPlus, FaPlus, FaListUl } from "react-icons/fa";
import { IoRestaurant, IoStatsChartSharp } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { RiDrinksFill } from "react-icons/ri";
import { PiWineFill } from "react-icons/pi";

const SideDrawer = ({ pageContent }) => {
  const drawerRef = useRef(null);
  const closeDrawer = () => {
    if (drawerRef.current) drawerRef.current.checked = false;
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" ref={drawerRef} />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        {pageContent}
      </div>
      <div className="drawer-side z-3">

        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="bg-base-100 min-h-screen w-80 lg:w-70 z-5">
          <div className="navbar sticky top-0 z-20 flex shadow-xs">
            <Link className="text-xl mx-4 font-semibold" href="/">On Table</Link>
          </div>
          <div className='h-4' />
          <ul className="menu backdrop-blur min-h-full px-4 py-0 w-full">
            {/* User Nav Links */}
            <li>
              <Link href="/admin/dashboard" onClick={closeDrawer}>
                <IoStatsChartSharp /> Dashboard
              </Link>
            </li>
            {/* User Nav Links */}
            <li>
              <details open={true}>
                <summary className="group">
                  <span><FaUser /></span> User
                </summary>
                <ul>
                  <li>
                    <Link href="/admin/user/list" onClick={closeDrawer}>
                      <FaUsers /> <span>View Users</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/user/add" onClick={closeDrawer}>
                      <FaUserPlus /> <span>Add User</span>
                    </Link>
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
                  <Link href="/admin/restaurant/list" onClick={closeDrawer}>
                    <FaListUl /> View Restaurants
                  </Link>
                </li>
                <li>
                  <Link href="/admin/restaurant/add" onClick={closeDrawer}>
                    <FaPlus /> Add Restaurant
                  </Link>
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
                        <Link href="/admin/menu/category/list" onClick={closeDrawer}>
                          <FaListUl /> View Categories
                        </Link>
                      </li>
                      <li>
                        <Link href="/admin/menu/category/add" onClick={closeDrawer}>
                          <RiDrinksFill /> Add Category
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="menu-title">Food Item</div>
                    <ul>
                      <li>
                        <Link href="/admin/menu/menu-item/add" onClick={closeDrawer}>
                          <PiWineFill /> Add Food Item
                        </Link>
                      </li>
                      <li>
                        <Link href="/admin/menu/menu-item/list" onClick={closeDrawer}>
                          <RiDrinksFill /> View Food Items
                        </Link>
                      </li>
                    </ul>
                  </li>
                  
                </ul>
              </details>
              
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default SideDrawer;