import Link from 'next/link'
import React from 'react'
import { FaUser, FaUsers, FaUserPlus, FaPlus, FaListUl } from "react-icons/fa";
import { IoRestaurant, IoStatsChartSharp } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { RiDrinksFill } from "react-icons/ri";
import { PiWineFill } from "react-icons/pi";

const SideDrawer = ({ pageContent }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
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
              <a href="/admin/dashboard">
                <IoStatsChartSharp /> Dashboard
              </a>
            </li>
            {/* User Nav Links */}
            <li>
              <details open={true}>
                <summary className="group">
                  <span><FaUser /></span> User
                </summary>
                <ul>
                  <li>
                    <a href="/admin/user/list" className="flex items-center gap-2">
                      <FaUsers /> <span>View Users</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/user/add" className="flex items-center gap-2">
                      <FaUserPlus /> <span>Add User</span>
                    </a>
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
                <li><a href="/admin/restaurant/list"><FaListUl /> View Restaurants</a></li>
                <li><a href="/admin/restaurant/add"><FaPlus /> Add Restaurant</a></li>
              </ul>
              </details>
              
            </li>
            <li>
              <details open={true}>
                <summary className="group">
                  <span><MdFastfood /></span> Food Menu
                </summary>
                <ul>
                <li><a href="/admin/menu/category/add"><RiDrinksFill /> Add Category</a></li>
                <li><a href="/admin/menu/menu-item/add"><PiWineFill /> Add Food Item</a></li>
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