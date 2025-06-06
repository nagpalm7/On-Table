"use client";

import React, { useActionState } from "react";
import { signup } from "@/actions/auth";
import UserForm from "@/app/components/UserForm";
import Card from "@/app/components/Card";

const Register = () => {

    const [state, action, isPending] = useActionState(signup, undefined);

    return (
        <div>
            <Card
                title={"Register"}
                body={
                    <UserForm
                        state={state}
                        action={action}
                        isPending={isPending}
                        buttonText="Add User"
                    />
                }
            />

        </div>
    );
};

export default Register;