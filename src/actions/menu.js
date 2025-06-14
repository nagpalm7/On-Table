"use server";

import MenuItem from "@/model/menuItem";
import Category from "@/model/category";
import { getDatabaseConnection } from "@/lib/db";
import Restaurant from "@/model/restaurant";

export const getMenuByRestaurant = async (restaurantId) => {
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
            item.categories.some(catId => catId.toString() === category._id.toString())
        )
    }));

    return JSON.parse(JSON.stringify(menu));
};
