'use client';

import React from 'react';
import PaymentMode from '@/app/(pages)/(public)/order/[id]/pay/paymentMode';

export default function PayClient({ order }) {
    return (
        <PaymentMode orderId={order._id} />
    );
}
