import React from 'react';
import Steps from '@/app/components/Steps';
import { getOrderDetails } from '@/actions/client/order';
import PayClient from './pay.client';
import { redirect } from 'next/navigation';

const Pay = async ({ params }) => {
    const paramsStore = await params;
    const orderId = paramsStore.id.toString();
    const order = await getOrderDetails(orderId);

    if (order == null) {
        redirect("/not-found");
    }

    return (
        <div>
            <Steps currentStep={3} />
            <PayClient order={order} />
        </div>
    );
};

export default Pay;