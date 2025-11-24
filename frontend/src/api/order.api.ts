// src/api/order.api.ts
import axios from "axios";

const API_BASE = "http://localhost:5000/api/orders";

/**
 * Tạo đơn hàng
 * @param items Danh sách sản phẩm [{ product_id, quantity, price }]
 * @param token Token người dùng
 */
export const createOrder = async (items: any[], token: string) => {
  const res = await axios.post(
    `${API_BASE}/checkout`,
    { items },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

/**
 * Lấy danh sách đơn hàng của user
 * @param token Token người dùng
 */
export const getMyOrders = async (token: string) => {
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
