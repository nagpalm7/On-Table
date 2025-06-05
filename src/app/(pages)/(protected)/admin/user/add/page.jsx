"use client";

import AddUserForm from '@/app/(pages)/(public)/auth/register/AddUserForm';
import React , { useActionState } from "react";
import { addUser } from "@/actions/user";

const AddUser = () => {

    const [state, action, isPending] = useActionState(addUser, undefined);
    
    return (
        <div className='min-h-[80vh] flex items-center justify-center bg-base-200 p-4'>
            <AddUserForm
                state={state}
                action={action}
                isPending={isPending}
                title="Add User"
                buttonText="Add User"
            />
        </div>
    )
}

export default AddUser;