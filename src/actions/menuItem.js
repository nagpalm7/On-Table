"use server";

import { getDatabaseConnection } from "@/lib/db";
import { MenuItemFormSchema } from "@/lib/rules";
import { convertFileToDataUrl, getVariantsFromFormData } from "./utils";
import MenuItem from "@/model/menuItem";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";

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

export const fetchMenuItems = async (rid) => {
    const query = rid ? { restaurant: rid } : {}
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
    const menuItem = new MenuItem({ name, description, restaurant, categories, variants, image:imagePublicId });
    await menuItem.save();

    // Redirect
    redirect(`/admin/menu/menu-item/list?rid=${restaurant}`);
};