"use client";

import React, { useActionState } from "react";
import ServerErrorMessage from "@/app/components/ServerErrorMessage";

const AddRestaurant = () => {

    const [state, action, isPending] = useActionState(() => {}, undefined);
    const ALLOWED_FILE_TYPES = ".jpeg,.jpg,.png,.webp,image/jpeg,image/jpg," +
                                    "image/png,image/webp";

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-base-100 p-4 ">
            <form
                action={action}
                className="card w-full max-w-md shadow-xl bg-base-100 p-8 gap-6"
            >   
                <h2 className="text-2xl font-bold text-center">Add Restaurant</h2>
                <label className="floating-label">
                    <span>Restaurant Name</span>
                    <input
                        name="name"
                        type="text"
                        placeholder="Restaurant Name"
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
                        <li>Restaurant name cannot be empty.</li>
                    </ul>
                </label>

                <label className="floating-label">
                    <span>Restaurant Location</span>
                    <input
                        name="location"
                        type="text"
                        placeholder="Restaurant Location"
                        className={`input validator w-full ${state?.errors?.location ? "input-error" : ""}`}
                        required
                        defaultValue={state?.location}
                    />
                    {state?.errors?.location && (
                        state.errors.location.map((error, index) => (
                            <ServerErrorMessage key={index} errorMessage={error} />
                        ))
                    )}
                    <ul className="validator-hint hidden">
                        <li>Restaurant location cannot be empty.</li>
                    </ul>
                </label>

                <select
                    name="owner"
                    className={`select validator w-full ${state?.errors?.owner ? "input-error" : ""}`}
                    defaultValue={""}
                    required
                >
                    <option disabled value="">
                        Select restaurant owner
                    </option>
                    <option value="user">User 1</option>
                </select>
                {state?.errors?.owner && (
                    state.errors.owner.map((error, index) => (
                        <ServerErrorMessage key={index} errorMessage={error} />
                    ))
                )}

                {/* // logo upload */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Upload Logo</legend>
                    <input 
                        type="file"
                        className="file-input w-full file-input-bordered" 
                        name="logo"
                        accept={ALLOWED_FILE_TYPES}
                    />
                    <label className="label">Max Size (2MB)</label>
                    <ul className="validator-hint hidden">
                        <li>Only jpg, png, svg and webp files are supported.</li>
                    </ul>
                </fieldset>
                
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isPending}
                >
                    Add Restaurant
                </button>
            </form>
        </div>
    );
};

export default AddRestaurant;
