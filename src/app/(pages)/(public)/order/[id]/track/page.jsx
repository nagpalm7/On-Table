import { getOrderDetails } from '@/actions/client/order';
import { notFound } from 'next/navigation';
import OrderTrackingServer from '@/app/(pages)/(public)/order/[id]/track/OrderTrackingServer';
import React from 'react';

export default async function OrderTrackPage({ params }) {
  const paramsStore = await params;
  const orderNumber = paramsStore.id.toString();

  const order = await getOrderDetails(orderNumber, "track");

  if (!order) return notFound();

  return <OrderTrackingServer order={order} />;
}