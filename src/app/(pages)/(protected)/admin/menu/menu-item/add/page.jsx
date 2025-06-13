"use client";

import React, { useActionState } from "react";
import { useEffect, useState } from "react";
import { fetchRestaurants } from "@/actions/restaurant";
import Spinner from "@/app/components/Spinner";
import Card from "@/app/components/Card";
import MenuItemForm from "@/app/components/MenuItemForm";
import { addMenuItem } from "@/actions/menuItem";

const AddMenuItem = () => {

    const [state, action, isPending] = useActionState(addMenuItem,undefined);
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const restaurantsData = await fetchRestaurants();
            setRestaurants(restaurantsData);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading || isPending) {
        return <Spinner />;
    }

    return (
        <div>
            <Card
                title={"Add Food Item"}
                body={
                    <MenuItemForm
                        state={state}
                        action={action}
                        isPending={isPending}
                        restaurants={restaurants}
                        buttonText={"Add Food Item"}
                    />
                }
            />
        </div>
    );
};

export default AddMenuItem;
