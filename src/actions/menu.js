import Category from "@/model/category";
import MenuItem from "@/model/menuItem";

const getMenuByRestaurant = async (restaurantId) => {
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