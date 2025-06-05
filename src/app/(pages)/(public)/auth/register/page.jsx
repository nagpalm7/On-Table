"use client";

import React, { useActionState } from "react";
import { signup } from "@/actions/auth";
import AddUserForm from "./AddUserForm";

const Register = () => {

    const [state, action, isPending] = useActionState(signup, undefined);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-base-200 p-4">
            <AddUserForm 
                state={state}
                action={action}
                isPending={isPending}
                title="Register"
                buttonText="Register"
            />
        </div>
    );
};

export default Register;