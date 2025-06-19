'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import {
    addOrUpdateItemToOrder,
    removeOrDecreaseItemFromOrder,
    finalizeOrder,
    removeUnavailableItemsFromOrder,
} from '@/actions/client/order';
import CategoryList from '@/app/components/menu/CategoryList';
import SkeletonList from '@/app/components/skeleton/list';

const LazyCategoryItems = dynamic(() => import('@/app/components/menu/CategoryItems'), {
    ssr: false,
    loading: () => <SkeletonList />,
});

const RestaurantClient = ({ orderId: initialOrderId, initialOrder, menu, rid }) => {
    const [order, setOrder] = useState(initialOrder);
    const [orderId] = useState(initialOrderId);
    const [isFinalizing, setIsFinalizing] = useState(false);
    const router = useRouter();

    const handleAddItem = async (menuItemId, variant, price, quantity = 1) => {
        if (!orderId) return;

        const item = { menuItem: menuItemId, variant, price, quantity };
        const prevOrder = order;

        const existingItemIndex = order.items.findIndex(
            (i) => i.menuItem.toString() === menuItemId && i.variant === variant
        );

        const updatedItems = [...order.items];
        if (existingItemIndex >= 0) {
            updatedItems[existingItemIndex].quantity += quantity;
        } else {
            updatedItems.push(item);
        }

        const updatedOrder = { ...order, items: updatedItems };
        setOrder(updatedOrder);

        try {
            await addOrUpdateItemToOrder(orderId, item);
        } catch (err) {
            console.error("Failed to add item:", err);
            setOrder(prevOrder);
        }
    };

    const handleRemoveItem = async (menuItemId, variant) => {
        if (!orderId) return;

        const prevOrder = order;
        const index = order.items.findIndex(
            (i) => i.menuItem.toString() === menuItemId && i.variant === variant
        );

        if (index >= 0) {
            const items = [...order.items];
            if (items[index].quantity - 1 <= 0) {
                items.splice(index, 1);
            } else {
                items[index].quantity -= 1;
            }
            setOrder({ ...order, items });
        }

        try {
            await removeOrDecreaseItemFromOrder(orderId, menuItemId, variant);
        } catch (err) {
            console.error("Failed to remove item:", err);
            setOrder(prevOrder);
        }
    };

    const handleContinue = async () => {
        setIsFinalizing(true);
        try {
            const { updatedOrder, removed } = await removeUnavailableItemsFromOrder(orderId);
            await finalizeOrder(orderId);
            if (removed) {
                setOrder(updatedOrder);
                alert("Some items were not available and have been removed.");
            }
            router.push(`/restaurant/${rid}/review`);
        } catch (err) {
            setIsFinalizing(false);
            alert('Could not finalize order. Please try again.');
        }
    };

    return (
        <div>
            <CategoryList menu={menu} />
            <div className="flex w-full flex-col flex-1">
                <div>
                    <ul className="list">
                        {menu.map((category) => (
                            <div
                                key={category.name}
                                id={category.name}
                                className="collapse collapse-arrow scroll-mt-16"
                            >
                                <input type="checkbox" className="peer" defaultChecked />
                                <div className="collapse-title font-semibold">
                                    {category.name}
                                </div>
                                <div className="collapse-content gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
                                    <LazyCategoryItems
                                        items={category.items}
                                        order={order}
                                        handleAddItem={handleAddItem}
                                        handleRemoveItem={handleRemoveItem}
                                    />
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
                {order.items.length > 0 && (
                    <div className="sticky bottom-0 w-full py-4 px-8 bg-transparent">
                        <button
                            className='btn btn-block btn-success rounded-full shadow-md'
                            onClick={handleContinue}
                            disabled={isFinalizing}
                        >
                            {isFinalizing && <span className="loading loading-spinner"></span>} CONTINUE
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantClient;
