import React from "react";
import ServerErrorMessage from "@/app/components/ServerErrorMessage";
import MultiSelect from "@/app/components/MultiSelect";
import Spinner from "./Spinner";

const RestaurantForm = ({ state, action, isPending, users, buttonText, id="" }) => {
    const ALLOWED_FILE_TYPES = ".jpeg,.jpg,.png,.webp,image/jpeg,image/jpg," +
        "image/png,image/webp";

    if (isPending) return <Spinner />
    return (
        <form
            action={action}
            className="card w-full gap-6 my-4"
        >
            <input name="id" type="hidden" value={id} />
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
                {state?.errors?.name && <ServerErrorMessage errors={state.errors.name} />}
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
                {state?.errors?.location && <ServerErrorMessage errors={state.errors.location} />}

                <ul className="validator-hint hidden">
                    <li>Restaurant location cannot be empty.</li>
                </ul>
            </label>

            <div className="w-full">
                <MultiSelect
                    formFieldName={"owners"}
                    options={users.map(user => ({ name: `${user.name} [ ${user.email} ]`, value: user._id }))}
                    prompt="Select restaurant owners"
                    defaultValues={state?.owners || []}
                />
            </div>
            {state?.errors?.owners &&
                <ul className="list-disc validator-hint visible text-error px-4 my-0">
                    {
                        state.errors.owners.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))
                    }
                </ul>
            }

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
                {buttonText}
            </button>
        </form>
    )
};

export default RestaurantForm;