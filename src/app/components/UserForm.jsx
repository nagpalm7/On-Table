import React from 'react'

import ServerErrorMessage from "@/app/components/ServerErrorMessage";
import Spinner from './Spinner';

const UserForm = ({action, state, isPending, buttonText, id = "", allowPasswordUpdate = true}) => {

    if (isPending) {
        return <Spinner />
    }

    return (
        <>
            <form
                className="card w-full bg-base-100 gap-4 my-4"
                action={action}
            >
                <input name="id" value={id} type="hidden" />
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
                    {state?.errors?.name && <ServerErrorMessage errors={state.errors.name} />}
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
                    {state?.errors?.email && <ServerErrorMessage errors={state.errors.email} />}

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
                    {state?.errors?.mobile && <ServerErrorMessage errors={state.errors.mobile} />}

                    <div className="validator-hint hidden">Enter valid mobile number. Must be 10 digits without country code.</div>
                </label>
                <select
                    name="userType"
                    className={`select validator w-full ${state?.errors?.userType ? "input-error" : ""}`}
                    defaultValue={state?.userType || ""}
                    required
                >
                    <option disabled value="">
                        Select user type
                    </option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="rest_owner">Restaurant Owner</option>
                </select>
                {state?.errors?.userType && <ServerErrorMessage errors={state.errors.userType} />}
                {allowPasswordUpdate && 
                    <>
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
                            {state?.errors?.confirmPassword && <ServerErrorMessage errors={state.errors.confirmPassword} />}
                            <div className="validator-hint hidden">Enter valid password.</div>
                        </label>
                    </>
                }
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isPending}
                >
                    {buttonText}
                </button>
            </form>
        </>
    )
}

export default UserForm;