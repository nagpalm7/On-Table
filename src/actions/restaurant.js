"use server";

import { getDatabaseConnection } from "@/lib/db";
import { RestaurantFormSchema } from "@/lib/rules";
import Restaurant from "@/model/restaurant";
import user from "@/model/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const fetchRestaurants = async () => {
    await getDatabaseConnection();
    const restaurants = await Restaurant.find({})
        .sort({name: 1})
        .select("-__v")
        .populate("owners", "-password -__v")
        .lean();
    return JSON.parse(JSON.stringify(restaurants));
};

export const addRestaurant = async (state, formData) => {
    // validate form data
    const validatedFields = RestaurantFormSchema.safeParse({
        name: formData.get('name'),
        location: formData.get('location'),
        owners: formData.getAll('owners'),
        logo: formData.get('logo'),
    });

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            name: formData.get('name'),
            location: formData.get('location'),
            owners: formData.getAll('owners'),
            logo: formData.get('logo'),
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Extract form fields
    const { name, location, owners, logo } = validatedFields.data;

    // Check if user exists and is restaurant owner
    await getDatabaseConnection();
    let errors = [];
    let validatedOwners = [];
    for (const ownerId of owners) {
        const existingUser = await user.findOne({ _id: ownerId });

        if (!existingUser) {
            errors.push(`User with ID ${ownerId} does not exist!`);
        }

        if (existingUser.userType !== 'rest_owner') {
            errors.push(`User with email ${existingUser.email} is not a restaurant owner!`);
        } else {
            validatedOwners.push(existingUser);
        }
    }

    if (errors.length > 0)
        return {
            name: formData.get('name'),
            location: formData.get('location'),
            owners: formData.getAll('owner'),
            logo: formData.get('logo'),
            errors: {
                owners: errors
            }
        };

    // Add restaurant
    const restaurant = new Restaurant({ name, location, owners, logo });
    await restaurant.save();

    // Redirect
    redirect(`/admin/restaurant/list`);
};

export const deleteRestaurant = async (formData) => {
    await getDatabaseConnection();
    const restaurantId = formData.get('id');

    // Find and delete the restaurant, returning the owners
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    // Revalidate the restaurant list page
    revalidatePath(`/admin/restaurant/list`);
};

export const fetchRestaurantById = async (id) => {
    await getDatabaseConnection();
    const restaurant = await Restaurant.findById(id)
        .select("-__v")
    if (!restaurant) {
        throw new Error("Restaurant not found");
    }
    return JSON.parse(JSON.stringify(restaurant));
};

export const editRestaurant = async (state, formData) => {
    // validate form data
    const validatedFields = RestaurantFormSchema.safeParse({
        name: formData.get('name'),
        location: formData.get('location'),
        owners: formData.getAll('owners'),
        logo: formData.get('logo'),
    });

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            name: formData.get('name'),
            location: formData.get('location'),
            owners: formData.getAll('owners'),
            logo: formData.get('logo'),
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Extract form fields
    const { name, location, owners, logo } = validatedFields.data;

    // Check if user exists and is restaurant owner
    await getDatabaseConnection();
    let errors = [];
    let validatedOwners = [];
    for (const ownerId of owners) {
        const existingUser = await user.findOne({ _id: ownerId });

        if (!existingUser) {
            errors.push(`User with ID ${ownerId} does not exist!`);
        }

        if (existingUser.userType !== 'rest_owner') {
            errors.push(`User with email ${existingUser.email} is not a restaurant owner!`);
        } else {
            validatedOwners.push(existingUser);
        }
    }

    if (errors.length > 0)
        return {
            name: formData.get('name'),
            location: formData.get('location'),
            owners: formData.getAll('owners'),
            logo: formData.get('logo'),
            errors: {
                owners: errors
            }
        };

    const id = formData.get("id");
    // Update restaurant
    const updated = await Restaurant.findByIdAndUpdate(
        id,
        { name, location, owners, logo },
        { new: true }
    );

    if (!updated) {
        throw new Error("Restaurant not found");
    }

    // Redirect
    redirect(`/admin/restaurant/list`);
};