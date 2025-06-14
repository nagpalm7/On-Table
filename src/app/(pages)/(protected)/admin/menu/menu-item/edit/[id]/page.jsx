"use client";

import React, { useActionState, useEffect, useState } from "react";
import Card from "@/app/components/common/Card";
import Spinner from "@/app/components/common/Spinner";
import { fetchRestaurants } from "@/actions/restaurant";
import { useParams } from "next/navigation";
import MenuItemForm from "@/app/components/MenuItemForm";
import { fetchMenuItemById, updateMenuItem } from "@/actions/menuItem";

const EditCategory = () => {

    const [state, action, isPending] = useActionState(updateMenuItem, undefined);
    const [restaurants, setRestaurants] = useState([]);
    const [initialState, setInitialState] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const id = params.id.toString();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const restaurantsData = await fetchRestaurants();
            setRestaurants(restaurantsData);
            const menuItemData = await fetchMenuItemById(id)
            setInitialState({
                ...menuItemData,
                restaurant: menuItemData?.restaurant._id,
                categories: menuItemData?.categories?.map(category => ({name: category?.name, value: category?._id}))
            })
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
                title={"Edit Food Item"}
                body={
                    <MenuItemForm
                        state={state ?? initialState}
                        action={action}
                        isPending={isPending}
                        buttonText={"Edit Food Item"}
                        restaurants={restaurants}
                        id={id}
                    />
                }
            />
        </div>
    );
};

export default EditCategory;
