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
    checkoutOrder
} from '@/actions/client/order';

const Order = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [menu, setMenu] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const [orderId, setOrderId] = useState(null);
    const [order, setOrder] = useState({});
    const router = useRouter();
    const params = useParams();
    const rid = params.id.toString();

    useEffect(() => {
        const fetchData = async () => {
            // load data
            const menu = await getMenuByRestaurant(rid);
            setMenu(menu);
            const restaurantData = await fetchRestaurantById(rid);
            setRestaurant(restaurantData);

            // create or load draft order
            const order = await getOrCreateDraftOrder(rid);
            setOrderId(order?._id);
            setOrder(order);

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

        try {
            const updatedOrder = await addOrUpdateItemToOrder(orderId, item);
            setOrder(updatedOrder)
        } catch (err) {
            console.error("Failed to add item:", err);
        }
    };

    const handleRemoveItem = async (menuItemId, variant) => {
        if (!orderId) return;

        try {
            const updatedOrder = await removeOrDecreaseItemFromOrder(orderId, menuItemId, variant);
            setOrder(updatedOrder);
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    const handleContinue = async () => {
        if (!orderId) return;

        try {
            const placedOrder = await checkoutOrder(orderId);
            // Save order to localStorage/session if needed
            // Redirect to payment or review page
            router.push(`/restaurant/${rid}/review?orderId=${placedOrder._id}`);
        } catch (err) {
            alert('Could not finalize order. Please try again.');
            console.error(err);
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
                    <div className="sticky bottom-0 w-full p-4 bg-transparent bg-none">
                        <button className='btn btn-block btn-soft btn-primary' onClick={handleContinue}>
                            CONTINUE
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;