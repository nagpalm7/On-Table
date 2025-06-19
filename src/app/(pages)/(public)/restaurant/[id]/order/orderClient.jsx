'use client';

import React, { useState } from 'react';
import List from '@/app/components/menu/List.server';
import { useRouter } from 'next/navigation';
import {
    addOrUpdateItemToOrder,
    removeOrDecreaseItemFromOrder,
    finalizeOrder,
    removeUnavailableItemsFromOrder,
} from '@/actions/client/order';
import CategoryList from '@/app/components/menu/CategoryList';

const RestaurantClient = ({
    orderId: initialOrderId,
    initialOrder,
    menu,
    rid
}) => {
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
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + quantity,
            };
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
            const item = items[index];
            if (item.quantity - 1 <= 0) {
                items.splice(index, 1);
            } else {
                items[index] = { ...item, quantity: item.quantity - 1 };
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
                alert("Some items were not available and have been removed from your order.");
            }
            router.push(`/restaurant/${rid}/review`);
        } catch (err) {
            alert('Could not finalize order. Please try again.');
            console.error(err);
        } finally {
            setIsFinalizing(false);
        }
    };

    return (
        <div>
            <CategoryList menu={menu} />
            <div className="flex w-full flex-col flex-1">
                <List
                    menu={menu}
                    order={order}
                    handleAddItem={handleAddItem}
                    handleRemoveItem={handleRemoveItem}
                />
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
