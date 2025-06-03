import { revalidatePath } from "next/cache";

"user server";

// Mock database
let cart = [];
let orders = [];

export async function addToCart(item) {
    cart.push(item);
    revalidatePath("/cart");
    return { success: true, cart };
}

export async function removeFromCart(itemId) {
    cart = cart.filter((item) => item.id !== itemId);
    revalidatePath("/cart");
    return { success: true, cart };
}

export async function placeOrder(userId) {
    if (cart.length === 0) {
        return { success: false, message: "Cart is empty" };
    }
    const order = {
        id: Date.now(),
        userId,
        items: [...cart],
        status: "placed",
        createdAt: new Date(),
    };
    orders.push(order);
    cart = [];
    revalidatePath("/orders");
    return { success: true, order };
}

export async function getOrders(userId) {
    return orders.filter((order) => order.userId === userId);
}