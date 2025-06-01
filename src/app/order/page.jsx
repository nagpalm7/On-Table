'use client';

import React, { useState } from 'react';
import Steps from "@/app/components/Steps";
import List from '@/app/components/menu/List';
import { useRouter } from 'next/navigation';
import { getOrderFromLocalStorage } from '@/app/utils/utils';

const Order = () => {
    const router = useRouter();
    const [order, setOrder] = useState(getOrderFromLocalStorage());

    const handleButtonClick = () => {
        if (order.length === 0) {
            alert('Please add items to your order before proceeding.');
            return;
        }
        // Save the order to local storage or context if needed
        localStorage.setItem('order', JSON.stringify(order));
        // Navigate to the review page
        router.push('/review');
    };


    const addOrIncreaseQuantity = (item) => {
        setOrder((prevOrder) => {
            const index = prevOrder.findIndex(orderItem => orderItem.id === item.id);
            if (index !== -1) {
                const newOrder = [...prevOrder];
                newOrder[index] = { ...newOrder[index], quantity: newOrder[index].quantity + 1 };
                return newOrder;
            } else {
                return [...prevOrder, { ...item, quantity: 1 }];
            }
        });
    };

    const decreaseQuantity = (item) => {
        setOrder((prevOrder) => {
            const index = prevOrder.findIndex(orderItem => orderItem.id === item.id);
            if (index === -1) return prevOrder;
            const newOrder = [...prevOrder];
            if (newOrder[index].quantity > 1) {
                newOrder[index] = { ...newOrder[index], quantity: newOrder[index].quantity - 1 };
                return newOrder;
            } else {
                newOrder.splice(index, 1);
                return newOrder;
            }
        });
    };

    return (
        <div>
            <Steps currentStep={1} />
            <div className="flex w-full flex-col flex-1 min-h-[40vh]">
                <div className="divider font-bold">Menu</div>
                <List 
                    addOrIncreaseQuantity={addOrIncreaseQuantity} 
                    decreaseQuantity={decreaseQuantity} 
                    order={order}
                />
                <div className="w-full p-4 bg-base-100 shadow">
                    <button className='btn btn-block btn-primary' onClick={handleButtonClick} >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;