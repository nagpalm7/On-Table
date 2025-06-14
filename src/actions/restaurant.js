"use server";

import { getDatabaseConnection } from "@/lib/db";
import { RestaurantFormSchema } from "@/lib/rules";
import Restaurant from "@/model/restaurant";
import user from "@/model/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { convertFileToDataUrl } from "./utils";
import cloudinary from "@/lib/cloudinary";
import getAuthUser from "@/lib/getAuthUser";

export const getFieldsFromFormData = async (formData) => {
    return {
        name: formData.get('name'),
        location: formData.get('location'),
        owners: formData.getAll('owners'),
        logo: formData.get('logo'),
        logoFile: formData.get('logoFile'),
    };
}

export const fetchRestaurants = async () => {
    await getDatabaseConnection();
    const restaurants = await Restaurant.find({})
        .sort({name: 1})
        .select("-__v")
        .populate("owners", "-password -__v")
        .lean();
    return JSON.parse(JSON.stringify(restaurants));
};

export const fetchRestaurantsByOwner = async () => {
    const user = await getAuthUser();
    await getDatabaseConnection();
    const restaurants = await Restaurant.find({ owners: user?.userId })
        .sort({name: 1})
        .select("-__v")
        .populate("owners", "-password -__v")
        .lean();
    return JSON.parse(JSON.stringify(restaurants));
};

export const addRestaurant = async (state, formData) => {
    const data = await getFieldsFromFormData(formData);
    // validate form data
    const validatedFields = RestaurantFormSchema.safeParse();

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            ...data,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Extract form fields
    const { name, location, owners, logo, logoFile } = validatedFields.data;

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
            ...data,
            errors: {
                owners: errors
            }
        };
    
    const dataUrl = await convertFileToDataUrl(logoFile);
    let logoPublicId = logo;
    if (dataUrl !== null) {
        const upload = await cloudinary.uploader.upload(dataUrl, {
            folder: 'restaurant-logos',
        })
        logoPublicId = upload.public_id;
    }

    if (logo && logoPublicId !== logo) {
        await cloudinary.uploader.destroy(logo);
    }

    // Add restaurant
    const restaurant = new Restaurant({ name, location, owners, logo: logoPublicId});
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

    if (restaurant.logo) {
        await cloudinary.uploader.destroy(restaurant.logo);
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

export const updateRestaurantStatus = async (formData) => {
    const id = formData.get('id');
    const active = formData.get('active') === "on";
    await getDatabaseConnection();
    const updated = await Restaurant.findByIdAndUpdate(
        id,
        { active },
        { new: true }
    );

    if (!updated) {
        throw new Error("Restaurant not found");
    }

    // Redirect
    revalidatePath(`/admin/restaurant/list`);
};

export const editRestaurant = async (state, formData) => {
    const data = await getFieldsFromFormData(formData);
    // validate form data
    const validatedFields = RestaurantFormSchema.safeParse({
        ...data
    });

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            ...data,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Extract form fields
    const { name, location, owners, logo, logoFile } = validatedFields.data;

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
            ...data,
            errors: {
                owners: errors
            }
        };

    const dataUrl = await convertFileToDataUrl(logoFile);
    let logoPublicId = logo;
    if (dataUrl) {
        const upload = await cloudinary.uploader.upload(dataUrl, {
            folder: 'restaurant-logos',
        })
        logoPublicId = upload.public_id;
    }

    if (logo && logoPublicId !== logo) {
        await cloudinary.uploader.destroy(logo);
    }

    const id = formData.get("id");
    // Update restaurant
    const updated = await Restaurant.findByIdAndUpdate(
        id,
        { name, location, owners, logo:logoPublicId },
        { new: true }
    );

    if (!updated) {
        throw new Error("Restaurant not found");
    }

    // Redirect
    redirect(`/admin/restaurant/list`);
};