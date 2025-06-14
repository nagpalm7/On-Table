"use client";

import { editRestaurant, fetchRestaurantById } from '@/actions/restaurant';
import { fetchUsers } from '@/actions/user';
import Card from '@/app/components/common/Card'
import RestaurantForm from '@/app/components/RestaurantForm';
import Spinner from '@/app/components/common/Spinner';
import React, { useActionState, useEffect, useState } from 'react'
import { useParams } from 'next/navigation';

const EditUser = () => {
    const [state, action, isPending] = useActionState(editRestaurant, undefined);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initialState, setInitialState] = useState({});
    const params = useParams();

    const id = params.id.toString();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const usersData = await fetchUsers("rest_owner");
            setUsers(usersData || []);
            const restaurant = await fetchRestaurantById(id);
            setInitialState({
                name: restaurant?.name,
                location: restaurant?.location,
                owners: restaurant?.owners,
                logo: restaurant?.logo
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
                title={"Add Restaurant"}
                body={
                    <RestaurantForm
                        state={state ? state : initialState}
                        action={action}
                        isPending={isPending}
                        users={users}
                        buttonText={"Edit Restaurant"}
                        id={id}
                    />
                }
            />
        </div>
    )
}

export default EditUser