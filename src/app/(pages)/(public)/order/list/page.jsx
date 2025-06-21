// app/orders/page.jsx

import React from 'react';
import Order from '@/model/order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import { getDatabaseConnection } from '@/lib/db';
import MenuItem from '@/model/menuItem';

export default async function OrdersPage() {
  // Get session
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) return redirect('/oauth/login');

  // Connect to DB
  await getDatabaseConnection();

  // Fetch user's orders
  const orders = await Order.find({ email })
    .sort({ createdAt: -1 })
    .populate('items.menuItem', 'name') // limit fields for performance
    .lean();

  console.log("loading my orders")

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="card bg-base-100 shadow-xl p-5 border border-base-200"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-lg">
                    Order #{order._id.toString().slice(-6).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="badge badge-info capitalize">
                  {order.orderStatus}
                </span>
              </div>

              <ul className="divide-y divide-gray-200 text-sm mb-3">
                {order.items.map(({ menuItem, quantity }) => (
                  <li key={menuItem._id} className="flex justify-between py-1">
                    <span>{menuItem.name}</span>
                    <span>x{quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="text-right font-bold text-base">
                ₹{order.totalAmount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
