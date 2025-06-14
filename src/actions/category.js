"use server";

import { getDatabaseConnection } from "@/lib/db";
import { CategoryFormSchema } from "@/lib/rules";
import Category from "@/model/category";
import Restaurant from "@/model/restaurant";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const fetchCategories = async (rid) => {
    const query = rid ? { restaurant: rid } : {}
    await getDatabaseConnection();
    const categories = await Category.find(query)
        .sort({ name: 1 })
        .populate("restaurant", "name location")
        .lean();
    return JSON.parse(JSON.stringify(categories));
}

export const fetchCategoryById = async (id) => {
    await getDatabaseConnection();
    const category = await Category.findById(id)
        .select("-__v")
        .populate("restaurant", "_id name location")
        .lean();
    return JSON.parse(JSON.stringify(category));
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

export const updateCategory = async (state, formData) => {
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

    const id = formData.get("id");
    // Update restaurant
    const updated = await Category.findByIdAndUpdate(
        id,
        { name, restaurant },
        { new: true }
    );

    if (!updated) {
        throw new Error("Category not found");
    }

    // Redirect
    redirect(`/admin/menu/category/list?rid=${restaurant}`);
};

export const delteCategory = async (formData) => {
    await getDatabaseConnection();
    const categoryId = formData.get('id');

    // Find and delete the restaurant, returning the owners
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
        throw new Error("Category not found");
    }

    // Revalidate the restaurant list page
    revalidatePath(`/admin/menu/category/list?rid=${category.restaurant}`);
};