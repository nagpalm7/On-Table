
import Toast from '@/app/components/common/Toast';
import React from 'react'

const Dashboard = async ({searchParams}) => {

    const { alertMessage } = await searchParams;

    return (
        <div className='min-h-[80vh] flex flex-col items-center justify-center'>
            {alertMessage && <Toast message={alertMessage} />}
            <center>Welcome to the admin dashboard</center>
        </div>
    )
}

export default Dashboard;