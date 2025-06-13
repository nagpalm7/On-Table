const { default: CategoryForm } = require("@/app/components/CategoryForm");
const { default: MenuItemForm } = require("@/app/components/MenuItemForm");
const { getDatabaseConnection } = require("@/lib/db");

const getMenuByRestaurant = async (restaurantId) => {
    await getDatabaseConnection();
    const categories = await CategoryForm.find({ restaurant: restaurantId })
        .sort({ order: 1 })
        .lean();

    const menuItems = await MenuItemForm.find({
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
