import React from 'react';
import { getMenuByRestaurant } from '@/actions/menu';
import { getOrCreateDraftOrder, removeUnavailableItemsFromOrder } from '@/actions/client/order';
import { redirect } from 'next/navigation';
import RestaurantClient from '@/app/(pages)/(public)/restaurant/[id]/order/orderClient';
import Restaurant from '@/model/restaurant';
import { getDatabaseConnection } from '@/lib/db';

const Page = async ({ params }) => {
  const paramStore = await params;
  const slug = paramStore.id.toString();

  await getDatabaseConnection();

  const restaurant = await Restaurant.findOne({ slug: slug });
  if (!restaurant) redirect("/not-found");
  const rid = restaurant._id;

  const order = await getOrCreateDraftOrder(rid);
  if (order.orderStatus === 'review') {
    // redirect to review
    return redirect(`/restaurant/${slug}/review`);
  } else if (order.orderStatus !== 'draft') {
    return redirect(`/order/${order.orderNumber}/track`);
  }

  const { updatedOrder, removed } = await removeUnavailableItemsFromOrder(order?._id);
  const menu = await getMenuByRestaurant(rid);

  return (
    <div>
      <RestaurantClient
        orderId={order._id}
        initialOrder={updatedOrder}
        menu={menu}
        slug={slug}
      />
    </div>
  );
};

export default Page;
