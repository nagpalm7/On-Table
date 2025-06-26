'use client';

import React from 'react';

export default function OrderTrackingClient({ order }) {
  return (
    <>
      <div className="m-4 card bg-base-100 border border-base-300 rounded-2xl shadow-md overflow-hidden">
        <div className="card-body px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-base-content">
                Order #{order.orderNumber}
              </h2>
              <p className="text-sm text-base-content text-opacity-60">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <span className={`badge text-xs sm:text-sm ${getStatusColor(order.orderStatus)}`}>
              {order.orderStatus.toUpperCase()}
            </span>
          </div>

          {/* Meta Info */}
          <div className="text-sm text-base-content text-opacity-80 mb-4 space-y-1 break-words">
            <p>
              <strong>Customer:</strong> {order.email || 'Guest'}
            </p>
            <p>
              <strong>Restaurant:</strong>{' '}
              {order.restaurant?.name}, {order.restaurant?.location}
            </p>
          </div>

          {/* Items */}
          <h3 className="text-base font-semibold mb-2 text-base-content">Items Ordered</h3>
          <ul className="mb-4 divide-y divide-base-300 text-sm text-base-content text-opacity-90">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex justify-between items-start py-2">
                <span className="w-3/4">
                  {item.menuItem?.name || 'Item'} x {item.quantity}
                </span>
                <span className="text-right w-1/4">₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="flex justify-between items-center text-base sm:text-lg font-bold text-base-content border-t pt-3 border-base-300">
            <span>Total</span>
            <span>₹{order.totalAmount.toFixed(2)}</span>
          </div>

          {/* Payment Info */}
          <div className="mt-6 space-y-1 text-sm text-base-content text-opacity-90 break-words">
            <p>
              <strong>Payment:</strong>{' '}
              {order.paymentStatus === "paid" ? (
                <span className="text-success">✅ Paid ({order.paymentMode.toUpperCase()})</span>
              ) : (
                <span className="text-error">❌ Pending</span>
              )}
            </p>
            {order.razorpayPaymentId && (
              <p>
                <strong>Payment ID:</strong> {order.razorpayPaymentId}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
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
