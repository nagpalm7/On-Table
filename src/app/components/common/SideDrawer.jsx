"use client";

import Link from 'next/link'
import React, { useRef } from 'react'
import AdminSideDrawerContent from '@/app/components/admin/AdminSideDrawerContent';
import RestaurantSideDrawerContent from '@/app/components/restaurant/RestaurantSideDrawerContent';

const SideDrawer = ({ pageContent, userType }) => {
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
          {userType === 'admin' && <AdminSideDrawerContent closeDrawer={closeDrawer} />}
          {userType === 'rest_owner' && <RestaurantSideDrawerContent closeDrawer={closeDrawer} />}
        </aside>
      </div>
    </div>
  )
}

export default SideDrawer;