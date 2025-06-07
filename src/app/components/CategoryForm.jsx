import React from "react";
import ServerErrorMessage from "@/app/components/ServerErrorMessage";

const CategoryForm = ({ state, action, isPending, restaurants, buttonText, id = "" }) => {
    return (
        <form
            action={action}
            className="card w-full gap-6 my-4"
        >
            <input name="id" type="hidden" value={id} />
            <label className="floating-label">
                <span>Category Name</span>
                <input
                    name="name"
                    type="text"
                    placeholder="Category Name"
                    className={`input validator w-full ${state?.errors?.name ? "input-error" : ""}`}
                    required
                    autoComplete="name"
                    defaultValue={state?.name}
                />
                {state?.errors?.name && <ServerErrorMessage errors={state.errors.name} />}
                <ul className="validator-hint hidden">
                    <li>Category name cannot be empty.</li>
                </ul>
            </label>

            <select
                name="restaurant"
                className={`select validator w-full ${state?.errors?.restaurant ? "input-error" : ""}`}
                defaultValue={state?.restaurant || ""}
                required
            >
                <option disabled value="">
                    Select Restaurant
                </option>
                {
                    restaurants.map((restaurant, idx) => 
                        <option value={restaurant._id} key={idx}>{restaurant.name} [ {restaurant.location} ]</option>
                    )
                }
            </select>
            {state?.errors?.restaurant && <ServerErrorMessage errors={state.errors.userType} />}

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

export default CategoryForm;