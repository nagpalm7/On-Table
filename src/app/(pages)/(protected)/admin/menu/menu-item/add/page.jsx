"use client";

import React, { useActionState } from "react";
import { useEffect, useState } from "react";
import { addRestaurant } from "@/actions/restaurant";
import Spinner from "@/app/components/Spinner";
import Card from "@/app/components/Card";
import RestaurantForm from "@/app/components/RestaurantForm";
import { fetchCategories } from "@/actions/menu";

const AddMenuItem = () => {

    const [state, action, isPending] = useActionState(addRestaurant, undefined);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const categoriesData = await fetchCategories();
            setCategories(categoriesData || []);
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
                    <RestaurantForm
                        state={state}
                        action={action}
                        isPending={isPending}
                        users={categories}
                        buttonText={"Add Restaurant"}
                    />
                }
            />
        </div>
    );
};

export default AddMenuItem;
