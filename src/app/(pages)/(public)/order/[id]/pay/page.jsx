export const dynamic = 'force-dynamic';

import React from 'react';
import Steps from '@/app/components/Steps';
import { getOrderDetails } from '@/actions/client/order';
import PayClient from './pay.client';
import { redirect } from 'next/navigation';

const Pay = async ({ params }) => {
    const paramsStore = await params;
    const orderNumber = paramsStore.id.toString();
    const order = await getOrderDetails(orderNumber, "pay");

    if (order.orderStatus === 'draft')
        return redirect(`/restaurant/${order.restaurant.slug}/order`);
    else if (order.orderStatus !== 'review')
        return redirect(`/order/${orderNumber}/track`);

    return (
        <div>
            <Steps currentStep={3} />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Choose Payment Mode</h2>
                <PayClient order={order} />
            </div>
        </div>
    );
};

export default Pay;