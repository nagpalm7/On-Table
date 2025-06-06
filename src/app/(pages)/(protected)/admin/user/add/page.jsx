"use client";

import AddUserForm from '@/app/(pages)/(public)/auth/register/AddUserForm';
import React , { useActionState } from "react";
import { addUser } from "@/actions/user";
import Card from '@/app/components/Card';

const AddUser = () => {

    const [state, action, isPending] = useActionState(addUser, undefined);
    
    return (
        <div>
            <Card 
                title = {"Add User"}
                body = {
                    <AddUserForm
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