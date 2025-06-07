import Link from 'next/link'
import React from 'react'
import { FaUser, FaUsers, FaUserPlus, FaPlus, FaListUl } from "react-icons/fa";
import { IoRestaurant, IoStatsChartSharp } from "react-icons/io5";

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
              <a href="/admin/user/list">
                <FaUser /> User
              </a>
              <ul>
                <li><a href="/admin/user/list"><FaUsers /> View Users</a></li>
                <li><a href="/admin/user/add"><FaUserPlus /> Add User</a></li>
              </ul>
            </li>
            {/* Restaurant Nav Links */}
            <li>
              <a href="/admin/restaurant/list">
                <IoRestaurant /> Restaurant
              </a>
              <ul>
                <li><a href="/admin/restaurant/list"><FaListUl /> View Restaurants</a></li>
                <li><a href="/admin/restaurant/add"><FaPlus /> Add Restaurant</a></li>
              </ul>
            </li>
            <li><a href='/admin/dashboard'>Menu</a></li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default SideDrawer;