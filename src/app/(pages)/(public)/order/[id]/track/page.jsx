import { getOrderDetails } from '@/actions/client/order';
import { notFound } from 'next/navigation';
import OrderTrackingClient from '@/app/(pages)/(public)/order/[id]/track/OrderTrackingClient';
import React from 'react';

export default async function OrderTrackPage({ params }) {
  const paramsStore = await params;
  const orderNumber = paramsStore.id.toString();

  const order = await getOrderDetails(orderNumber, "track");

  if (!order) return notFound();

  return <OrderTrackingClient order={order} />;
}