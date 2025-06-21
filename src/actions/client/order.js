"use server";

import { getOrCreateSession } from "@/actions/guest";
import AppSettings from "@/model/appSettings";
import Order from "@/model/order";
import MenuItem from "@/model/menuItem";
import { redirect } from "next/navigation";
import { getDatabaseConnection } from "@/lib/db";
import { getUserIdentifier } from "@/lib/getUserIdentifier";
import { cookies } from "next/headers";
import Session from "@/model/session";

// create draft order
export async function getOrCreateDraftOrder(restaurantId) {
    await getDatabaseConnection();
    // Ensure session exists
    const sessionId = await getOrCreateSession();
    // Use email if logged in, otherwise sessionId
    const user = await getUserIdentifier();

    const filters = [];

    if (user?.type === 'email') {
        filters.push({ email: user.value });
    } else if (user?.type === 'session') {
        filters.push({ sessionId: user.value });
    } else {
        filters.push({ sessionId }); // fallback
    }

    let order = await Order.findOne({
        $or: filters,
        restaurant: restaurantId,
        orderStatus: { $in: ['draft', 'review'] }
    }).populate({
        path: 'items.menuItem',
        model: 'MenuItem',
        select: 'name description image'
    });

    if (!order) {
        const expireAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

        order = await Order.create({
            sessionId,
            email: user?.type === 'email' ? user.value : undefined,
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

export async function getOrderDetails(orderId) {
    await getDatabaseConnection();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;
    if (!sessionId) return null;

    const session = await Session.findOne({ sessionId });
    const userEmail = session?.email;

    const order = await Order.findById(orderId);

    if (!order) return null;

    if (order.email) {
        // If order has email, but session doesn't — ask user to re-verify
        if (!userEmail) return null;
        return order.email === userEmail ? JSON.parse(JSON.stringify(order)) : null;
    } else {
        // For guest orders
        return order.sessionId === sessionId ? JSON.parse(JSON.stringify(order)) : null;
    }
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
    const order = await Order.findById(orderId).select("-__v");
    if (!order) throw new Error("Order not found")
    const menuItemIds = order.items.map(item => item.menuItem);
    const availableMenuItems = await MenuItem.find({
        _id: { $in: menuItemIds },
        available: true,
    }).select('_id');

    const availableIds = new Set(availableMenuItems.map(i => i._id.toString()));

    const removedItems = order.items.filter(item => !availableIds.has(item.menuItem.toString()));
    order.items = order.items.filter(item => availableIds.has(item.menuItem.toString()));

    await order.save();
    return {
        updatedOrder: JSON.parse(JSON.stringify(order)),
        removed: removedItems.length > 0
    };
}

export async function markOrderAsDraft(state, formData) {
    const orderId = formData.get('id');
    await getDatabaseConnection();
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    if (order.orderStatus === 'review') {
        order.orderStatus = 'draft';
        await order.save();
    }

    redirect(`/restaurant/${state.rid}/order`);
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

        await order.save();
        // redirect("/restaurant/" + order.restaurant + "/review/");
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}

export async function placeOrder(formData) {
    const orderId = await formData.get('orderId');
    const paymentMode = await formData.get('paymentMode');

    switch (paymentMode) {
        case 'cash':
            await placeCashOrder(orderId);
            break;
        case 'online':
            await placeOnlineOrder(orderId);
            break;
    }
}

export async function placeCashOrder(orderId) {
    await getDatabaseConnection();
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    order.orderStatus = "placed";
    order.paymentMode = "cash";
    order.paymentStatus = "pending";

    await order.save();
    redirect(`/order/${orderId}/track`);
}

export async function placeOnlineOrder(orderId) {
    await getDatabaseConnection();
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    order.orderStatus = "placed";
    order.paymentMode = "online";
    order.paymentStatus = "pending";

    await order.save();
    redirect(`/order/${orderId}/track`);
}

