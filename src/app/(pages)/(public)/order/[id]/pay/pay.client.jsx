'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import PaymentMode from '@/app/(pages)/(public)/order/[id]/pay/paymentMode';
import { getCustomerPhone } from '@/actions/auth';
import Spinner from '@/app/components/common/Spinner';
import { useRouter } from 'next/navigation';

export default function PayClient({ order }) {
    const [isVerified, setIsVerified] = useState(!!order.phone);
    const [isLoading, setIsLoading] = useState(!order.phone); // check again if phone is not present
    const router = useRouter();

    useEffect(() => {
        getCustomerPhone().then((phone) => {
            if (phone && order.phone === phone) {
                setIsVerified(true);
                setIsLoading(false);
            }
            else {
                router.replace(`/verify?redirect=/order/${order._id}/order/pay`);
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
