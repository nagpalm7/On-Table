import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";

const Account = () => {
  return (
    <div className='absolute top-0 right-0 my-6 mx-4'>
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-2"><AiOutlineMenu className="text-xl text-success-content" /></div>
            <ul tabIndex={0} className="dropdown-content menu bg-gray-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a>My Account</a></li>
                <li><a>Orders</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Account