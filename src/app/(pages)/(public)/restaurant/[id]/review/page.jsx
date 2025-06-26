// app/(pages)/(public)/restaurant/[id]/review/page.tsx
import { getOrCreateDraftOrder } from '@/actions/client/order';
import { getDatabaseConnection } from '@/lib/db';
import { redirect } from 'next/navigation';
import Steps from '@/app/components/Steps';
import ReviewClient from '@/app/(pages)/(public)/restaurant/[id]/review/client';
import React from 'react';
import Restaurant from '@/model/restaurant';

export default async function ReviewPage({ params }) {
    const paramsStore = await params;
    const slug = paramsStore.id.toString();

    await getDatabaseConnection();

    const restaurant = await Restaurant.findOne({ slug: slug });
    if (!restaurant) redirect("/not-found");
    const rid = restaurant._id;

    const order = await getOrCreateDraftOrder(rid);

    if (order.orderStatus === 'draft') {
        redirect(`/restaurant/${slug}/order`);
    } else if (order.orderStatus !== 'review') {
        redirect(`/order/${order.orderNumber}/track`);
    }

    return (
        <>
            <Steps currentStep={2} />
            <ReviewClient order={order} slug={slug} />
        </>
    );
}
