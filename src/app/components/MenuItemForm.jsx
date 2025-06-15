"use client";

import React, { useEffect, useState } from "react";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";
import MultiSelect from "@/app/components/common/MultiSelect";
import Spinner from "./common/Spinner";
import { CldImage } from "next-cloudinary";
import { fetchCategories } from "@/actions/category";
import VariantsInput from "./common/VariantsInput";
import { PLACEHOLDER_PUBLIC_ID } from "../utils/constants";

const MenuItemForm = ({ state, action, isPending, restaurants, buttonText, id = "" }) => {
    const ALLOWED_FILE_TYPES = ".jpeg,.jpg,.png,.webp,.svg,image/jpeg,image/jpg," +
        "image/png,image/webp,image/svg";

    const [selectedRestaurant, setSelectedRestaurant] = useState(state?.restaurant || "");
    const [selectedCategories, setSelectedCategories] = useState(state?.categories || []);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedRestaurant && selectedRestaurant != "") {
                setLoadingCategories(true);
                const categoriesData = await fetchCategories(selectedRestaurant);
                setCategories(categoriesData || []);
                if (state?.restaurant === selectedRestaurant) {
                    setSelectedCategories(state?.categories || []);
                }
                else {
                    setSelectedCategories([]);
                }
                setLoadingCategories(false);
            }
        };
        fetchData();
    }, [selectedRestaurant]);

    if (isPending)
        return <Spinner />;

    return (
        <form
            action={action}
            className="card w-full gap-6 my-4"
        >
            <input name="id" type="hidden" value={id} />
            <label className="floating-label">
                <span>Food Item Name</span>
                <input
                    name="name"
                    type="text"
                    placeholder="Food Item Name (e.g. Spicy Paneer Wrap)"
                    className={`input validator w-full ${state?.errors?.name ? "input-error" : ""}`}
                    required
                    autoComplete="name"
                    defaultValue={state?.name}
                />
                {state?.errors?.name && <ServerErrorMessage errors={state.errors.name} />}
                <ul className="validator-hint hidden">
                    <li>Food item name cannot be empty.</li>
                </ul>
            </label>

            <label className="floating-label">
                <span>Food Item Description</span>
                <textarea
                    name="description"
                    placeholder="Food Item Description (e.g. Soft tortilla stuffed with grilled paneer, crunchy veggies, and a spicy mint chutney - rolled up for a perfect on-the-go meal.)"
                    className={`textarea input validator w-full ${state?.errors?.description ? "input-error" : ""}`}
                    required
                    autoComplete="description"
                    defaultValue={state?.description}
                />
                {state?.errors?.description && <ServerErrorMessage errors={state.errors.description} />}
                <ul className="validator-hint hidden">
                    <li>Food item description cannot be empty.</li>
                </ul>
            </label>

            <select
                name="restaurant"
                className={`select validator w-full ${state?.errors?.restaurant ? "input-error" : ""}`}
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
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

            <div className="w-full z-3">
                <MultiSelect
                    formFieldName={"categories"}
                    options={categories.map(category => ({ name: `${category.name}`, value: category._id }))}
                    prompt="Select Food Categories"
                    defaultValues={selectedCategories.map(values => values.value)}
                    onChange={(values) => setSelectedCategories(values)}
                />
                {loadingCategories && <div> Loading Categories...</div>}
            </div>
            {state?.errors?.categories &&
                <ul className="list-disc validator-hint visible text-error px-4 my-0">
                    {
                        state.errors.categories.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))
                    }
                </ul>
            }

            <fieldset className="fieldset">
                {/* <legend className="fieldset-legend">Variants</legend> */}
                <VariantsInput
                    initialVariants={state?.variants || []}
                    errors={state?.errors?.variants}
                />
            </fieldset>

            {/* // image upload */}
            <input name="image" value={state?.image} type={"hidden"} />
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Upload Food Image</legend>
                <input
                    type="file"
                    className="file-input w-full file-input-bordered"
                    name="imageFile"
                    accept={ALLOWED_FILE_TYPES}
                />
                <label className="label">Max Size (2MB)</label>
                <ul className="validator-hint hidden">
                    <li>Only jpg, png, svg and webp files are supported.</li>
                </ul>
                <CldImage
                    src={state?.image || PLACEHOLDER_PUBLIC_ID}
                    width={100}
                    height={100}
                    alt="image"
                    crop="fill"
                    className="rounded shadow-md"
                />
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

export default MenuItemForm;