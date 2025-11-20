import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";

/**
 * Lấy cart items của user
 * @param {string} userId
 * @returns {Promise<CartItem[]>}
 */
export const getCartItems = async (userId) => {
    // Lấy cart
    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) return [];

    // Lấy items
    const items = await CartItem.findAll({ where: { cart_id: cart.id } });
    return items;
};

/**
 * Thêm product vào cart
 * @param {string} userId
 * @param {string} product_id
 * @param {number} quantity
 * @returns {Promise<CartItem>}
 */
export const addToCart = async (userId, product_id, quantity = 1) => {
    // Lấy cart hoặc tạo mới
    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) cart = await Cart.create({ user_id: userId });

    // Kiểm tra item đã có chưa
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

    return item;
};

/**
 * Cập nhật số lượng item trong cart
 * @param {string} userId
 * @param {string} item_id
 * @param {number} quantity
 * @returns {Promise<CartItem>}
 */
export const updateCartItem = async (userId, item_id, quantity) => {
    if (!quantity || quantity < 1) throw new Error("Invalid quantity");

    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) throw new Error("Cart not found");

    const item = await CartItem.findOne({
        where: { id: item_id, cart_id: cart.id },
    });
    if (!item) throw new Error("Cart item not found");

    item.quantity = quantity;
    await item.save();

    return item;
};

/**
 * Xóa item khỏi cart
 * @param {string} userId
 * @param {string} item_id
 * @returns {Promise<{message: string}>}
 */
export const removeCartItem = async (userId, item_id) => {
    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) throw new Error("Cart not found");

    const item = await CartItem.findOne({
        where: { id: item_id, cart_id: cart.id },
    });
    if (!item) throw new Error("Cart item not found");

    await item.destroy();
    return { message: "Item removed" };
};
