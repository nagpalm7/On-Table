'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { markOrderAsDraft } from '@/actions/client/order';

export default function ReviewClient({ order, slug }) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(markOrderAsDraft, { slug });

  return (
    <div className="m-4 shadow-md card bg-base-100 rounded-2xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">Order Summary</h2>
          <form action={action}>
            <input type="hidden" name="id" value={order._id} />
            <button
              className="btn btn-link text-success p-0 no-underline"
              aria-label="Edit Order"
              disabled={isPending}
            >
              EDIT
            </button>
          </form>
        </div>

        {!order || order?.items.length === 0 ? (
          <div className="text-gray-500">No items in your order.</div>
        ) : (
          <>
            <ul className="mb-4 space-y-2">
              {order.items.map((item, id) => (
                <li key={id} className="flex justify-between py-2 border-b">
                  <span>{item.menuItem.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      <div className="card-actions justify-center p-4">
        <button
          onClick={() => router.push(`/order/${order.orderNumber}/pay`)}
          className="btn btn-success btn-block rounded-full"
        >
          PROCEED TO PAY
        </button>
      </div>
    </div>
  );
}
