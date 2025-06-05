import Link from 'next/link'
import React from 'react'

const SideDrawer = ({ pageContent }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        {pageContent}
      </div>
      <div className="drawer-side min-h-[100vh]">
        
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex flex-col h-full bg-base-200">
          {/* Sidebar content here */}
          <div className="navbar bg-neutral text-neutral-content shadow-sm">
            <Link className="text-xl mx-4 font-semibold" href="">On Table</Link>
          </div>
          <ul className="menu text-base-content min-h-full w-80 p-4">
            {/* User Nav Links */}
            <li>
              <a href="/admin/user/list">
                User
              </a>
                <ul>
                  <li><a href="/admin/user/list">View Users</a></li>
                  <li><a href="/admin/user/add">Add User</a></li>
                </ul>
            </li>
            <li>
              <a href="/admin/restaurant/list">
                Restaurant
              </a>
                <ul>
                  <li><a href="/admin/restaurant/list">View Restaurants</a></li>
                  <li><a href="/admin/restaurant/add">Add Restaurant</a></li>
                </ul>
            </li>
            <li><a href='/admin/dashboard'>Menu</a></li>
          </ul>
        </div>
        
        
      </div>
    </div>
  )
}

export default SideDrawer;