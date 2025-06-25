export const dynamic = 'force-dynamic';

import React from 'react';
import Steps from '@/app/components/Steps';
import { getOrderDetails } from '@/actions/client/order';
import PayClient from './pay.client';
import { redirect } from 'next/navigation';

const Pay = async ({ params }) => {
    const paramsStore = await params;
    const orderId = paramsStore.id.toString();
    const order = await getOrderDetails(orderId);

    if (order.orderStatus === 'draft')
        return redirect(`/restaurant/${order.restaurant}/order`);
    else if (order.orderStatus !== 'review')
        return redirect(`/order/${order._id}/track`);

    return (
        <div>
            <Steps currentStep={3} />
            <PayClient order={order} />
        </div>
    );
};

export default Pay;