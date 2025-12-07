import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import Product from "../models/Product.model.js";
import sequelize from "../config/database.js";

class OrderService {
    static async createOrder(userId, items) {
        return await sequelize.transaction(async (t) => {
            // Tính tổng
            const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

            // Tạo order
            const order = await Order.create(
                {
                    user_id: userId,
                    total,
                    status: "pending",
                },
                { transaction: t }
            );

            // Tạo order items
            const orderItemsData = items.map((i) => ({
                order_id: order.id,
                product_id: i.product_id,
                quantity: i.quantity,
                price: i.price,
            }));

            await OrderItem.bulkCreate(orderItemsData, { transaction: t });

            return order;
        });
    }

    static async getOrdersByUser(userId) {
        const orders = await Order.findAll({
            where: { user_id: userId },
            include: [{ model: OrderItem, as: "items" }],
            order: [["created_at", "DESC"]],
        });
        return orders;
    }
}

export default OrderService;
