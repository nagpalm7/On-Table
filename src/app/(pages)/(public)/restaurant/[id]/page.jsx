'use client';

import React, { useEffect, useState } from 'react';
import Steps from "@/app/components/Steps";
import List from '@/app/components/menu/List';
import { useParams, useRouter } from 'next/navigation';
import { getMenuByRestaurant } from '@/actions/menu';
import Logo from '@/app/components/Logo';
import { fetchRestaurantById } from '@/actions/restaurant';
import Spinner from '@/app/components/common/Spinner';

const Order = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [menu, setMenu] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const router = useRouter();
    const params = useParams();
    const id = params.id.toString();

    useEffect(() => {
        const fetchData = async () => {
            const menu = await getMenuByRestaurant(id);
            setMenu(menu);
            const restaurantData = await fetchRestaurantById(id);
            setRestaurant(restaurantData);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    // const handleButtonClick = () => {
    //     if (order.length === 0) {
    //         alert('Please add items to your order before proceeding.');
    //         return;
    //     }
    //     // Save the order to local storage or context if needed
    //     localStorage.setItem('order', JSON.stringify(order));
    //     // Navigate to the review page
    //     router.push('/review');
    // };


    // const addOrIncreaseQuantity = (item) => {
    //     setOrder((prevOrder) => {
    //         const index = prevOrder.findIndex(orderItem => orderItem.id === item.id);
    //         if (index !== -1) {
    //             const newOrder = [...prevOrder];
    //             newOrder[index] = { ...newOrder[index], quantity: newOrder[index].quantity + 1 };
    //             return newOrder;
    //         } else {
    //             return [...prevOrder, { ...item, quantity: 1 }];
    //         }
    //     });
    // };

    // const decreaseQuantity = (item) => {
    //     setOrder((prevOrder) => {
    //         const index = prevOrder.findIndex(orderItem => orderItem.id === item.id);
    //         if (index === -1) return prevOrder;
    //         const newOrder = [...prevOrder];
    //         if (newOrder[index].quantity > 1) {
    //             newOrder[index] = { ...newOrder[index], quantity: newOrder[index].quantity - 1 };
    //             return newOrder;
    //         } else {
    //             newOrder.splice(index, 1);
    //             return newOrder;
    //         }
    //     });
    // };

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
                />
                <div className="w-full p-4 bg-base-100">
                    <button className='btn btn-block btn-primary' >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;