"use client";

import React, { useActionState, useEffect, useState } from "react";
import Card from "@/app/components/Card";
import CategoryForm from "@/app/components/CategoryForm";
import Spinner from "@/app/components/Spinner";
import { fetchRestaurants } from "@/actions/restaurant";
import { fetchCategoryById, updateCategory } from "@/actions/menu";
import { useParams } from "next/navigation";

const EditCategory = () => {

    const [state, action, isPending] = useActionState(updateCategory, undefined);
    const [restaurants, setRestaurants] = useState([]);
    const [initialState, setInitialState] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const id = params.id.toString();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const restaurantsData = await fetchRestaurants();
            setRestaurants(restaurantsData || []);
            const categoryData = await fetchCategoryById(id);
            setInitialState({
                name: categoryData?.name,
                restaurant: categoryData?.restaurant?._id
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
                title={"Edit Category"}
                body={
                    <CategoryForm
                        state={state ?? initialState}
                        action={action}
                        isPending={isPending}
                        buttonText={"Edit Category"}
                        restaurants={restaurants}
                        id={id}
                    />
                }
            />
        </div>
    );
};

export default EditCategory;
