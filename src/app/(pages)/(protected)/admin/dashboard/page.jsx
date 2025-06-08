
import Toast from '@/app/components/Toast';
import React from 'react'

const Dashboard = async ({searchParams}) => {

    const { alertMessage } = await searchParams;

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            {alertMessage && <Toast message={alertMessage} />}
            <center>Welcome to the admin dashboard</center>
        </div>
    )
}

export default Dashboard;