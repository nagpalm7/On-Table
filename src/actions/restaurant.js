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
        .sort("-updatedAt")
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

    // Link Restaurant with Owners
    for (const owner of validatedOwners) {
        if (owner) {
            owner.restaurants.push(restaurant._id);
            await owner.save();
        }
    }

    // Redirect
    redirect(`/admin/restaurant/list`);
};

export const deleteRestaurant = async (formData) => {
    await getDatabaseConnection();
    const restaurantId = formData.get('id');

    // Find the restaurant and get owners in one query
    const restaurant = await Restaurant.findById(restaurantId).select("owners");
    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    // Remove restaurant reference from all owners in one operation
    if (restaurant.owners?.length) {
        await user.updateMany(
            { _id: { $in: restaurant.owners } },
            { $pull: { restaurants: restaurantId } }
        );
    }

    // Delete the restaurant
    await Restaurant.deleteOne({ _id: restaurantId });

    // Revalidate the restaurant list page
    revalidatePath(`/admin/restaurant/list`);
};
