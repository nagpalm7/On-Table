"use server";

import { getDatabaseConnection } from "@/lib/db";
import { MenuItemFormSchema } from "@/lib/rules";
import { convertFileToDataUrl, getVariantsFromFormData } from "./utils";
import MenuItem from "@/model/menuItem";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

const getFieldsFromFormData = async (formData) => {
    return {
        name: formData.get('name'),
        description: formData.get('description'),
        restaurant: formData.get('restaurant'),
        categories: formData.getAll('categories'),
        variants: await getVariantsFromFormData(formData),
        image: formData.get('image'),
        imageFile: formData.get('imageFile')
    };
}

export const fetchMenuItemById = async (id) => {
    await getDatabaseConnection();
    const menuItem = await MenuItem.findById(id)
        .select("-__v")
        .populate("restaurant", "_id name location")
        .populate("categories", "_id name location")
        .lean();
    return JSON.parse(JSON.stringify(menuItem));
}

export const fetchMenuItems = async (rid = null, cid = null) => {
    const query = {};
    if (rid) query.restaurant = rid;
    if (cid) query.categories = cid;
    await getDatabaseConnection();
    const menuItems = await MenuItem.find(query)
        .sort({ name: 1 })
        .populate("restaurant", "name location")
        .populate("categories", "name")
        .lean();
    return JSON.parse(JSON.stringify(menuItems));
}

export const addMenuItem = async (state, formData) => {
    const data = await getFieldsFromFormData(formData);

    // validate form data
    const validatedFields = MenuItemFormSchema.safeParse(data);

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            ...data,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Extract form fields
    const { name, description, restaurant, categories, variants, image, imageFile } = validatedFields.data;

    // Check if restaurant exists
    await getDatabaseConnection();

    const dataUrl = await convertFileToDataUrl(imageFile);
    let imagePublicId = image;
    if (dataUrl !== null) {
        const upload = await cloudinary.uploader.upload(dataUrl, {
            folder: `restaurants/${restaurant}/`,
        })
        imagePublicId = upload.public_id;
    }

    if (image && imagePublicId !== image) {
        await cloudinary.uploader.destroy(image);
    }

    // Add Menu Item
    const menuItem = new MenuItem({ name, description, restaurant, categories, variants, image: imagePublicId });
    await menuItem.save();

    // Redirect
    redirect(`/admin/menu/menu-item/list?rid=${restaurant}`);
};

export const updateMenuItemAvailability = async (formData) => {
    const id = formData.get('id');
    const available = formData.get('available') === "on";
    await getDatabaseConnection();
    const updated = await MenuItem.findByIdAndUpdate(
        id,
        { available },
        { new: true }
    );

    if (!updated) {
        throw new Error("Menu Item not found");
    }

    // Redirect
    revalidatePath(`/admin/menu/menu-item/list`);
    return;
}

export const updateMenuItem = async (state, formData) => {
    const data = await getFieldsFromFormData(formData);

    // validate form data
    const validatedFields = MenuItemFormSchema.safeParse(data);

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            ...data,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Extract form fields
    const { name, description, restaurant, categories, variants, image, imageFile } = validatedFields.data;

    // Check if restaurant exists
    await getDatabaseConnection();

    const dataUrl = await convertFileToDataUrl(imageFile);
    let imagePublicId = image;
    if (dataUrl !== null) {
        const upload = await cloudinary.uploader.upload(dataUrl, {
            folder: `restaurants/${restaurant}/`,
        })
        imagePublicId = upload.public_id;
    }

    if (image && imagePublicId !== image) {
        await cloudinary.uploader.destroy(image);
    }

    const id = formData.get("id");
    // Update restaurant
    const updated = await MenuItem.findByIdAndUpdate(
        id,
        { name, description, restaurant, categories, variants, image: imagePublicId },
        { new: true }
    );

    if (!updated) {
        throw new Error("Menu Item not found");
    }

    // Redirect
    redirect(`/admin/menu/menu-item/list?rid=${restaurant}`);
};

export const deletMenuItem = async (formData) => {
    await getDatabaseConnection();
    const menuItemId = formData.get('id');

    // Find and delete the restaurant, returning the owners
    const menuItem = await MenuItem.findByIdAndDelete(menuItemId);
    if (!menuItem) {
        throw new Error("Menu Item not found");
    }

    if (menuItem.image) {
        await cloudinary.uploader.destroy(menuItem.image);
    }

    // Revalidate the restaurant list page
    revalidatePath(`/admin/menu/menu-item/list?rid=${menuItem.restaurant}`);
};