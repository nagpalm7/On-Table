"use client";

import React, { useActionState, useEffect, useState } from "react";
import Card from "@/app/components/Card";
import CategoryForm from "@/app/components/CategoryForm";
import Spinner from "@/app/components/Spinner";
import { fetchRestaurants } from "@/actions/restaurant";
import { addCategory } from "@/actions/menu";

const AddCategory = () => {

    const [state, action, isPending] = useActionState(addCategory, undefined);
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const restaurantsData = await fetchRestaurants();
            setRestaurants(restaurantsData || []);
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
                title={"Add Category"}
                body={
                    <CategoryForm
                        state={state}
                        action={action}
                        isPending={isPending}
                        buttonText={"Add Category"}
                        restaurants={restaurants}
                    />
                }
            />
        </div>
    );
};

export default AddCategory;
