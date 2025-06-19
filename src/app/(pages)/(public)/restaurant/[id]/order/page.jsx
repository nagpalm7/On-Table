import React from 'react';
import { getMenuByRestaurant } from '@/actions/menu';
import { getOrCreateDraftOrder, removeUnavailableItemsFromOrder } from '@/actions/client/order';
import { redirect } from 'next/navigation';
import RestaurantClient from '@/app/(pages)/(public)/restaurant/[id]/order/orderClient';
import Account from '@/app/components/user/Account';

const Page = async ({ params }) => {
  const rid = params.id.toString();

  const order = await getOrCreateDraftOrder(rid);
  if (order.orderStatus === 'review') {
    // redirect to review
    return redirect(`/restaurant/${rid}/review`);
  }

  const { updatedOrder, removed } = await removeUnavailableItemsFromOrder(order?._id);
  const menu = await getMenuByRestaurant(rid);

  return (
    <div>
      <Account />
      <RestaurantClient
        orderId={order._id}
        initialOrder={updatedOrder}
        menu={menu}
        rid={rid}
      />
    </div>
  );
};

export default Page;
