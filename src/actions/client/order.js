"use server";

import { getOrCreateSession } from "@/lib/guest";
import AppSettings from "@/model/appSettings";
import Order from "@/model/order";
import MenuItem from "@/model/menuItem";
import { redirect } from "next/navigation";
import { getDatabaseConnection } from "@/lib/db";

// create draft order
export async function getOrCreateDraftOrder(restaurantId) {
    await getDatabaseConnection();
    const { sessionId } = await getOrCreateSession();
    let order = await Order.findOne({
        sessionId,
        restaurant: restaurantId,
        orderStatus: { $in: ['draft', 'review'] }
    }).populate({
        path: 'items.menuItem',
        model: 'MenuItem',
        select: 'name description image'
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
    await getDatabaseConnection();
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
    await getDatabaseConnection();
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    const index = order.items.findIndex(item =>
        item.menuItem.toString() === menuItemId &&
        item.variant === variant
    );

    if (index === -1) return JSON.parse(JSON.stringify(order));

    const item = order.items[index];

    if (item.quantity > 1) {
        order.items[index].quantity -= 1;
    } else {
        order.items.splice(index, 1); // Remove the item
    }

    await order.save();
    return JSON.parse(JSON.stringify(order));
};

export async function removeUnavailableItemsFromOrder(orderId) {
    await getDatabaseConnection();
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found")
    const menuItemIds = order.items.map(item => item.menuItem);
    const availableMenuItems = await MenuItem.find({
        _id: { $in: menuItemIds },
        available: true,
    }).select('_id');

    const availableIds = new Set(availableMenuItems.map(i => i._id.toString()));

    order.items = order.items.filter(item => availableIds.has(item.menuItem.toString()));

    await order.save();
    return JSON.parse(JSON.stringify(order));
}

export async function markOrderAsDraft(orderId) {
    await getDatabaseConnection();
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    if (order.orderStatus === 'review') {
        order.orderStatus = 'draft';
        await order.save();
    }

    return JSON.parse(JSON.stringify(order));
}

// Checkout
export async function finalizeOrder(orderId) {
    await getDatabaseConnection();
    try {
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
        order.orderStatus = 'review';
        order.expireAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hrs

        await order.save();
        // redirect("/restaurant/" + order.restaurant + "/review/");
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
