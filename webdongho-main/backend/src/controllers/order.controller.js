import OrderService from "../services/order.service.js";


export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id; // user đã được verifyToken gắn vào req.user
        const { items } = req.body; // [{ product_id, quantity, price }]

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = await OrderService.createOrder(userId, items);
        res.status(201).json({ message: "Order created successfully", order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await OrderService.getOrdersByUser(userId);
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
