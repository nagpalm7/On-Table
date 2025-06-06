"use client";

import { addRestaurant } from '@/actions/restaurant';
import { fetchUsers } from '@/actions/user';
import Card from '@/app/components/Card'
import Spinner from '@/app/components/Spinner';
import React, { useActionState, useEffect, useState } from 'react'

const EditUser = () => {
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

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div>
            <Card
                title = {"Edit Restaurant"}
                body = {""}
            />
        </div>
    )
}

export default EditUser