import React from 'react';
import Steps from '@/app/components/Steps';
import { getOrderDetails } from '@/actions/client/order';
import PayClient from './pay.client';

const Pay = async ({ params }) => {
    const paramsStore = await params;
    const orderId = paramsStore.id.toString();
    const order = await getOrderDetails(orderId);

    return (
        <div>
            <Steps currentStep={3} />
            <PayClient order={order} />
        </div>
    );
};

export default Pay;