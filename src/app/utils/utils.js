export const getOrderFromLocalStorage = () => {
    if (typeof window === "undefined") return null;
    try {
        const order = JSON.parse(localStorage.getItem('order') || []);
        return order;
    } catch {
        return [];
    }
};