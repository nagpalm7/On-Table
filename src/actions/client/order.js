"use server";

import { getOrCreateSession } from "@/lib/guest";
import AppSettings from "@/model/appSettings";
import Order from "@/model/order";
import { revalidatePath } from "next/cache";


// create draft order
export async function getOrCreateDraftOrder(restaurantId) {
    const { sessionId } = await getOrCreateSession();
    let order = await Order.findOne({
        sessionId,
        restaurant: restaurantId,
        orderStatus: 'draft'
    });

    if (!order) {
        const expireAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hrs

        order = await Order.create({
            sessionId,
            restaurant: restaurantId,
            items: [],
            totalAmount: 0,
            commissionAmount: 0,
            paymentStatus: 'pending',
            orderStatus: 'draft',
            expireAt,
        });
    }

    return JSON.parse(JSON.stringify(order));
}

// add item to order
export async function addOrUpdateItemToOrder(orderId, newItem) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    const index = order.items.findIndex(
        (item) => item.menuItem.toString() === newItem.menuItem && item.variant === newItem.variant
    );

    if (index >= 0) {
        // Update quantity
        order.items[index].quantity += newItem.quantity || 1;
    } else {
        order.items.push(newItem);
    }

    await order.save();
    return JSON.parse(JSON.stringify(order));
}

// remove item from cart
export const removeOrDecreaseItemFromOrder = async (orderId, menuItemId, variant) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    const index = order.items.findIndex(item =>
        item.menuItem.toString() === menuItemId &&
        item.variant === variant
    );

    if (index === -1) return order;

    const item = order.items[index];

    if (item.quantity > 1) {
        order.items[index].quantity -= 1;
    } else {
        order.items.splice(index, 1); // Remove the item
    }

    await order.save();
    return JSON.parse(JSON.stringify(order));
};


// Checkout
export async function checkoutOrder(orderId) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.orderStatus !== 'draft') throw new Error('Order already finalized');

    // Calculate total
    let total = 0;
    for (const item of order.items) {
        total += (item.price) * item.quantity;
    }

    // Get commission settings
    const settings = await AppSettings.findOne({ restaurant: order.restaurant });
    const commissionType = settings?.commissionType || 'percentage';
    const commissionValue = settings?.commissionValue ?? 10;

    let commissionAmount = 0;
    if (commissionType === 'percentage') {
        commissionAmount = (total * commissionValue) / 100;
    } else if (commissionType === 'flat') {
        commissionAmount = commissionValue;
    }

    // Finalize order
    order.totalAmount = total;
    order.commissionAmount = commissionAmount;
    order.orderStatus = 'placed';
    order.expireAt = undefined;

    await order.save();
    return JSON.parse(JSON.stringify(order));
}
