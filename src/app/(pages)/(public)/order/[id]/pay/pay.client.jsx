'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import PaymentMode from '@/app/(pages)/(public)/order/[id]/pay/paymentMode';
import { getCustomerEmail } from '@/actions/auth';
import Spinner from '@/app/components/common/Spinner';
import { signIn } from 'next-auth/react';

export default function PayClient({ order }) {
    const [isVerified, setIsVerified] = useState(!!order.email);
    const [isLoading, setIsLoading] = useState(!order.email); // check again if phone is not present

    useEffect(() => {
        getCustomerEmail().then((email) => {
            if (email && order.email === email) {
                setIsVerified(true);
                setIsLoading(false);
            }
            else {
                signIn("google", { callbackUrl: window.location.href });
            }
        });
    }, []);

    if (isLoading) 
        return <Spinner />

    return (
        <div>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Choose Payment Mode</h2>
                {isVerified && <PaymentMode orderId={order._id} />}
            </div>
        </div>
    );
}
