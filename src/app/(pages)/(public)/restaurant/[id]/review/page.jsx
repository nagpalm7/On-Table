'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getOrCreateDraftOrder, markOrderAsDraft } from '@/actions/client/order';
import Spinner from '@/app/components/common/Spinner';

const Review = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [orderId, setOrderId] = useState(null);
    const [order, setOrder] = useState({});
    const router = useRouter();
    const params = useParams();
    const rid = params.id.toString();

    useEffect(() => {
        const fetchData = async () => {
            // create or load draft order
            const order = await getOrCreateDraftOrder(rid);
            if (order.orderStatus === 'draft') {
                router.push(`/restaurant/${rid}/order`);
                return;
            }

            setOrderId(order?._id);
            setOrder(order);

            // stop loading
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const handleEditOrder = async () => {
        if (!orderId) return;

        try {
            const updatedOrder = await markOrderAsDraft(orderId);
            router.push(`/restaurant/${rid}/order`);
            return;
        } catch (err) {
            alert('Could not edit the order. Please try again.');
            console.error(err);
        }
    };

    if (isLoading)
        return <Spinner />;

    return (
        <div className="m-4 shadow-md card bg-base-100">
            <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="card-title text-xl">Order Summary</h2>
                    <button
                        className="btn btn-link p-0 no-underline"
                        aria-label="Edit Order"
                        onClick={handleEditOrder}
                    >
                        EDIT
                    </button>
                </div>
                {!order || order?.items.length === 0 ? (
                    <div className="text-gray-500">No items in your order.</div>
                ) : (
                    <div>
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
                    </div>
                )}

            </div>
            <div className="card-actions justify-center p-4">
                <button className="btn btn-primary btn-block">PAY</button>
            </div>

        </div>
    );
};

export default Review;