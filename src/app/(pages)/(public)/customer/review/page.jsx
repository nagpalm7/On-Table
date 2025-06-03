'use client';

import React from 'react';
import Steps from "@/app/components/Steps";
import { useRouter } from 'next/navigation';
import { getOrderFromLocalStorage } from '@/app/utils/utils';

const Review = () => {

    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/pay');
    };

    const calculateTotal = (order) => {
        if (!order || order.length === 0) return 0;
        return order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const [order, setOrder] = React.useState([]);

    React.useEffect(() => {
        setOrder(getOrderFromLocalStorage());
    }, []);

    return (
        <div>
            <Steps currentStep={2} />
            <div className="my-8 p-6 bg-white rounded min-h-[40vh]">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <button
                        className="text-blue-600 hover:underline text-sm font-medium"
                        onClick={() => router.push('/order')}
                        aria-label="Edit Order"
                    >
                        Edit
                    </button>
                </div>
                {!order || order.length === 0 ? (
                    <div>No items in your order.</div>
                ) : (
                    <div>
                        <ul className="mb-4">
                            {order.map((item, id) => (
                                <li key={id} className="flex justify-between py-2 border-b">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{calculateTotal(order).toFixed(2)}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full p-4">
                <button className='btn btn-block btn-primary' onClick={handleButtonClick}>Continue</button>
            </div>
        </div>
    );
};

export default Review;