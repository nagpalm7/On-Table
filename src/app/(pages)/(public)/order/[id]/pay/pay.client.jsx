'use client';

import React from 'react';
import PaymentMode from '@/app/(pages)/(public)/order/[id]/pay/paymentMode';

export default function PayClient({ order }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Choose Payment Mode</h2>
            <PaymentMode orderId={order._id} />
        </div>
    );
}
