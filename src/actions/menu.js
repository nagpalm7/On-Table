"use server";

import { getDatabaseConnection } from "@/lib/db";
import { CategoryFormSchema } from "@/lib/rules";
import Category from "@/model/category";
import MenuItem from "@/model/menuItem";
import Restaurant from "@/model/restaurant";
import { redirect } from "next/navigation";

const getMenuByRestaurant = async (restaurantId) => {
    await getDatabaseConnection();
    const categories = await Category.find({ restaurant: restaurantId })
        .sort({ order: 1 })
        .lean();

    const menuItems = await MenuItem.find({
        restaurant: restaurantId,
        available: true
    }).lean();

    // Grouping items under each category (multi-category supported)
    const menu = categories.map(category => ({
        ...category,
        items: menuItems.filter(item =>
            item.category.some(catId => catId.toString() === category._id.toString())
        )
    }));

    return menu;
};

export const fetchCategories = async (rid) => {
    console.log(rid)
    await getDatabaseConnection();
    const categories = await Category.find({ restaurant: rid })
        .sort({ name: 1 })
        .populate("restaurant", "name location")
        .lean();
    return JSON.parse(JSON.stringify(categories));
}

export const addCategory = async (state, formData) => {
    // validate form data
    const validatedFields = CategoryFormSchema.safeParse({
        name: formData.get('name'),
        restaurant: formData.get('restaurant')
    });

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            name: formData.get('name'),
            restaurant: formData.get('restaurant'),
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Extract form fields
    const { name, restaurant } = validatedFields.data;

    // Check if user exists and is restaurant owner
    await getDatabaseConnection();
    const existingRestaurant = await Restaurant.findOne({ _id: restaurant });

    if (!existingRestaurant)
        return {
            name: formData.get('name'),
            restaurant: formData.get('restaurant'),
            errors: {
                restaurant: "Restaurant doesn't exist."
            }
        };

    // Add Category
    const category = new Category({ name, restaurant });
    await category.save();

    // Redirect
    redirect(`/admin/menu/category/list?rid=${restaurant}`);
};