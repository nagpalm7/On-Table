"use client";

import React, { useActionState } from "react";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/actions/user";
import { addRestaurant } from "@/actions/restaurant";
import Spinner from "@/app/components/Spinner";
import Card from "@/app/components/Card";
import RestaurantForm from "@/app/components/RestaurantForm";

const AddRestaurant = () => {

    const [state, action, isPending] = useActionState(addRestaurant, undefined);


    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const usersData = await fetchUsers("rest_owner");
            setUsers(usersData || []);
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
                title={"Add Restaurant"}
                body={
                    <RestaurantForm
                        state={state}
                        action={action}
                        isPending={isPending}
                        users={users}
                        buttonText={"Add Restaurant"}
                    />
                }
            />
        </div>
    );
};

export default AddRestaurant;
