import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";

// Lấy toàn bộ items trong cart của user
export const getCartController = async (req, res) => {
    try {
        const userId = req.user.id;

        // Lấy cart
        let cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) return res.json([]);

        // Lấy cart items
        const items = await CartItem.findAll({ where: { cart_id: cart.id } });
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch cart" });
    }
};

// Thêm product vào cart
export const addToCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity } = req.body;

        if (!product_id || !quantity) {
            return res.status(400).json({ message: "Missing product_id or quantity" });
        }

        // Lấy cart hoặc tạo mới
        let cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) cart = await Cart.create({ user_id: userId });

        // Tìm item trong cart
        let item = await CartItem.findOne({
            where: { cart_id: cart.id, product_id },
        });

        if (item) {
            item.quantity += quantity;
            await item.save();
        } else {
            item = await CartItem.create({
                cart_id: cart.id,
                product_id,
                quantity,
            });
        }

        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add to cart" });
    }
};

// Cập nhật số lượng
export const updateCartItemController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { item_id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        // Lấy cart
        const cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = await CartItem.findOne({
            where: { id: item_id, cart_id: cart.id },
        });

        if (!item) return res.status(404).json({ message: "Cart item not found" });

        item.quantity = quantity;
        await item.save();

        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update cart item" });
    }
};

// Xóa item
export const removeCartItemController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { item_id } = req.params;

        const cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = await CartItem.findOne({
            where: { id: item_id, cart_id: cart.id },
        });

        if (!item) return res.status(404).json({ message: "Cart item not found" });

        await item.destroy();
        res.json({ message: "Item removed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to remove cart item" });
    }
};
