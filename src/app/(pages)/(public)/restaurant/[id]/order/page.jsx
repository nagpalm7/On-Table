'use client';

import React, { useEffect, useState } from 'react';
import List from '@/app/components/menu/List';
import Logo from '@/app/components/Logo';
import Spinner from '@/app/components/common/Spinner';
import { useParams, useRouter } from 'next/navigation';
import { fetchRestaurantById } from '@/actions/restaurant';
import { getMenuByRestaurant } from '@/actions/menu';
import {
    getOrCreateDraftOrder,
    addOrUpdateItemToOrder,
    removeOrDecreaseItemFromOrder,
    finalizeOrder,
    removeUnavailableItemsFromOrder
} from '@/actions/client/order';

const Order = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFinalizing, setIsFinalizing] = useState(false);
    const [menu, setMenu] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const [orderId, setOrderId] = useState(null);
    const [order, setOrder] = useState({});
    const router = useRouter();
    const params = useParams();
    const rid = params.id.toString();

    useEffect(() => {
        const fetchData = async () => {
            // create or load draft order
            const order = await getOrCreateDraftOrder(rid);
            if (order.orderStatus === 'review') {
                router.push(`/restaurant/${rid}/review`);
                return;
            }
            const { updatedOrder, removed} = await removeUnavailableItemsFromOrder(order?._id);
            setOrderId(order?._id);
            setOrder(updatedOrder);

            // load data
            const menu = await getMenuByRestaurant(rid);
            setMenu(menu);
            const restaurantData = await fetchRestaurantById(rid);
            setRestaurant(restaurantData);

            // stop loading
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const handleAddItem = async (menuItemId, variant, price, quantity = 1) => {
        if (!orderId) return;

        const item = {
            menuItem: menuItemId,
            variant,
            price,
            quantity
        };

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
        const updatedOrder = {
            ...order,
            items: updatedItems,
        };
        setOrder(updatedOrder);

        try {
            const newOrder = await addOrUpdateItemToOrder(orderId, item);
        } catch (err) {
            console.error("Failed to add item:", err);
            setOrder(prevOrder); // Revert to previous state on error
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
            const updatedOrder = await removeOrDecreaseItemFromOrder(orderId, menuItemId, variant);
        } catch (err) {
            console.error("Failed to remove item:", err);
            setOrder(prevOrder);
        }
    };

    const handleContinue = async () => {
        setIsFinalizing(true);
    
        if (!orderId) return;
    
        try {
            const { updatedOrder, removed } = await removeUnavailableItemsFromOrder(orderId);
            // check if updated order is different from original
            await finalizeOrder(orderId);
            if (removed) {
                setOrder(updatedOrder);
                alert("Some items were not available and have been removed from your order.");
            }
            router.push(`/restaurant/${rid}/review`);
            setIsLoading(true);
            return;
        } catch (err) {
            alert('Could not finalize order. Please try again.');
            console.error(err);
        } finally {
            setIsFinalizing(false);
        }
    };

    if (isLoading)
        return <Spinner />;

    return (
        <div>
            <div className="banner flex items-center justify-center bg-base-200 py-2">
                {restaurant.logo &&
                    <Logo
                        logo={restaurant?.logo}
                    />
                }
            </div>
            {/* <div className='shadow-sm'>
                <Steps currentStep={1} />
            </div> */}
            <div className="sticky top-16 z-10 bg-base-100 py-4 shadow-sm">
                <div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
                    {menu.map((category) => (
                        <button
                            key={category.name}
                            className="btn btn-sm btn-outline whitespace-nowrap min-w-fit"
                            onClick={() => {
                                const element = document.getElementById(category.name);
                                if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex w-full flex-col flex-1">
                <List
                    menu={menu}
                    order={order}
                    handleAddItem={handleAddItem}
                    handleRemoveItem={handleRemoveItem}
                />
                {order.items.length > 0 && (
                    <div className="sticky bottom-0 w-full p-4 bg-transparent">
                        <button 
                            className='btn btn-block btn-soft btn-primary disabled:bg-opacity-100 disabled:opacity-100 disabled:bg-base-100' 
                            onClick={handleContinue}
                            disabled={true}
                        >
                            {isFinalizing && <span className="loading loading-spinner"></span>} CONTINUE
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;