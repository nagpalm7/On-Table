
"use client";

import Toast from '@/app/components/Toast';
import React from 'react'
import { useSearchParams } from "next/navigation";

const Dashboard = () => {

    const searchParams = useSearchParams();
    const alertMessage = searchParams.get("alertMessage");

    return (
        <div>
            {alertMessage && <Toast message={alertMessage} />}
        </div>
    )
}

export default Dashboard;