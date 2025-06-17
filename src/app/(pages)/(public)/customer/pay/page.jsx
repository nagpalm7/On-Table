'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Pay = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/thank-you');
    };

    return (
        <div>
            <div className="flex flex-col items-center my-8 min-h-[40vh]">
                <h2 className="text-lg font-semibold mb-6">How would you like to pay?</h2>
                <button className="btn btn-outline btn-primary w-64 mb-4" type="button" onClick={handleButtonClick}>
                    Pay at Counter
                </button>
                <button className="btn btn-primary w-64" type="button" disabled>
                    Pay Online
                </button>
            </div>
        </div>
    );
};

export default Pay;