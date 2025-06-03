
"use client";

import Toast from '@/app/components/Toast';
import React from 'react'
import { useSearchParams } from "next/navigation";

const Dashboard = () => {

    const searchParams = useSearchParams();
    const alertMessage = searchParams.get("alertMessage");

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            {alertMessage && <Toast message={alertMessage} />}
            <center>Welcome to the admin dashboard</center>
        </div>
    )
}

export default Dashboard;