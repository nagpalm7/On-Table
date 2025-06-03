"use client";

import React, { useActionState } from "react";
import ServerErrorMessage from "@/app/components/ServerErrorMessage";
import { signup } from "@/actions/auth";

const Register = () => {

    const [state, action, isPending] = useActionState(signup, undefined);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-base-200 p-4">
            <form
                action={action}
                className="card w-full max-w-md shadow-xl bg-base-100 p-8 gap-4"
            >
                <h2 className="text-2xl font-bold text-center">Register</h2>

                <label className="floating-label">
                    <span>Full Name</span>
                    <input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        className={`input validator w-full ${state?.errors?.name ? "input-error" : ""}`}
                        required
                        autoComplete="name"
                        defaultValue={state?.name}
                    />
                    {state?.errors?.name && (
                        state.errors.name.map((error, index) => (
                            <ServerErrorMessage key={index} errorMessage={error} />
                        ))
                    )}
                    <ul className="validator-hint hidden">
                        <li>Name cannot be empty.</li>
                    </ul>
                </label>

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
                    {state?.errors?.email && (
                        state.errors.email.map((error, index) => (
                            <ServerErrorMessage key={index} errorMessage={error} />
                        ))
                    )}
                    <div className="validator-hint hidden">Enter valid email address.</div>
                </label>

                <label className="floating-label">
                    <span>Mobile Number</span>
                    <input
                        name="mobile"
                        type="tel"
                        placeholder="Mobile Number"
                        className={`input validator w-full ${state?.errors?.mobile ? "input-error" : ""}`}
                        required
                        autoComplete="tel"
                        title="Must be 10 digits without country code"
                        pattern="[0-9]{10,10}"
                        defaultValue={state?.mobile}
                    />
                    {state?.errors?.mobile && (
                        state.errors.mobile.map((error, index) => (
                            <ServerErrorMessage key={index} errorMessage={error} />
                        ))
                    )}
                    <div className="validator-hint hidden">Enter valid mobile number. Must be 10 digits without country code.</div>
                </label>

                <select
                    name="userType"
                    className={`select validator w-full ${state?.errors?.userType ? "input-error" : ""}`}
                    defaultValue={""}
                    required
                >
                    <option disabled value="">
                        Select user type
                    </option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="rest_owner">Restaurant Owner</option>
                </select>
                {state?.errors?.userType && (
                    state.errors.userType.map((error, index) => (
                        <ServerErrorMessage key={index} errorMessage={error} />
                    ))
                )}

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
                    {state?.errors?.password && (
                        state.errors.password.map((error, index) => (
                            <ServerErrorMessage key={index} errorMessage={error} />
                        ))
                    )}
                    <div className="validator-hint hidden">Enter valid password.</div>
                </label>

                <label className="floating-label">
                    <span>Confirm Password</span>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className={`input validator w-full ${state?.errors?.confirmPassword ? "input-error" : ""}`}
                        required
                        autoComplete="new-password"
                        defaultValue={state?.confirmPassword}
                    />
                    {state?.errors?.confirmPassword && (
                        state.errors.confirmPassword.map((error, index) => (
                            <ServerErrorMessage key={index} errorMessage={error} />
                        ))
                    )}
                    <div className="validator-hint hidden">Enter valid password.</div>
                </label>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isPending}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;