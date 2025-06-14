"use client";

import UserForm from '@/app/components/UserForm';
import React , { useActionState } from "react";
import { addUser } from "@/actions/user";
import Card from '@/app/components/common/Card';
import Spinner from '@/app/components/common/Spinner';

const AddUser = () => {

    const [state, action, isPending] = useActionState(addUser, undefined);
    
    if (isPending) return <Spinner />
    return (
        <div>
            <Card 
                title = {"Add User"}
                body = {
                    <UserForm
                        state={state}
                        action={action}
                        isPending={isPending}
                        buttonText="Add User"
                    />
                }
            />
            
        </div>
    )
}

export default AddUser;