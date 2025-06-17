"use client";

import React, { useActionState } from "react";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";
import Toast from "@/app/components/common/Toast";
import { login } from "@/actions/auth";
import { useSearchParams } from "next/navigation";

const Login = () => {

    const [state, action, isPending] = useActionState(login, undefined);
    const searchParams = useSearchParams();
    const alertMessage = searchParams.get("alertMessage");

    return (
        <div className="flex items-center justify-center bg-base-100 p-4 my-12">
            {alertMessage && <Toast message={alertMessage} />}
            <form
                action={action}
                className="card w-full max-w-md shadow-md bg-base-100 p-8 gap-8"
            >   
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <label className="floating-label">
                    <span>Email</span>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className={`input validator w-full ${state?.errors?.email ? "input-error" : ""}`}
                        required
                        autoComplete="email"
                        defaultValue={state?.email}
                    />
                    {state?.errors?.email && <ServerErrorMessage errors={state.errors.email} />}

                    <div className="validator-hint hidden">Enter valid email address.</div>
                </label>

                <label className="floating-label">
                    <span>Password</span>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={`input validator w-full ${state?.errors?.password ? "input-error" : ""}`}
                        required
                        autoComplete="new-password"
                        defaultValue={state?.password}
                    />
                    {state?.errors?.password && <ServerErrorMessage errors={state.errors.password} />}

                    <div className="validator-hint hidden">Enter valid password.</div>
                </label>
                
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isPending}
                >
                     {isPending && <span className="loading loading-spinner"></span>} Login
                </button>
            </form>
        </div>
    );
};

export default Login;
