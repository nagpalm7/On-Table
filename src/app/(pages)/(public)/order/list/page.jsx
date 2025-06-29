// app/orders/page.tsx (or wherever applicable)

import React from 'react';
import Link from 'next/link';
import Order from '@/model/order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import { getDatabaseConnection } from '@/lib/db';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) return redirect('/oauth/login');
  await getDatabaseConnection();

  const orders = await Order.find({ email, orderStatus: { $not: { $in: ['draft', 'review'] } } })
    .sort({ createdAt: -1 })
    .populate([
      { path: 'items.menuItem', select: 'name' },
      { path: 'restaurant', select: 'name location' },
    ])
    .lean();

  return (
    <div className='mx-4'>
      <h1 className="sticky top-0 z-20 py-4 text-lg font-bold bg-base-100 text-base-content">
        ORDERS
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-base-content text-opacity-50">
          You haven’t placed any orders yet.
        </div>
      ) : (
        <div className="space-y-4 pb-6">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/order/${order.orderNumber}/track`}
              className="block card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow rounded-2xl overflow-hidden"
            >
              <div className="card-body px-4 sm:px-6 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-base-content">
                      {order.restaurant?.name} — {order.restaurant?.location}
                    </p>
                    <p className="text-sm text-base-content text-opacity-60">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className={`badge text-xs sm:text-sm ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-base-content text-opacity-80 mb-2">
                  <strong>Order #:</strong> {order.orderNumber}
                </p>

                <ul className="text-sm divide-y divide-base-300 text-base-content text-opacity-90 mb-3">
                  {order.items.map(({ menuItem, quantity }) => (
                    <li key={menuItem._id} className="flex justify-between py-1">
                      <span>{menuItem.name}</span>
                      <span>x{quantity}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-right text-base font-bold text-success">
                  ₹{order.totalAmount.toFixed(2)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'draft':
      return 'badge-outline';
    case 'review':
      return 'badge-info';
    case 'placed':
      return 'badge-success';
    case 'cancelled':
      return 'badge-error';
    default:
      return 'badge-neutral';
  }
}
