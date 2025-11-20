// src/api/cart.api.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

// Lấy tất cả items trong cart
export const getCartItems = async (): Promise<CartItem[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please login");

  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.items || res.data; // backend có thể trả {items: [...]}
};

// Thêm item vào cart
export const addToCart = async (item: { id: string; quantity: number }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please login");

  const res = await axios.post(`${API_URL}/add`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Cập nhật quantity
export const updateCartItem = async (item_id: string, quantity: number) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please login");

  const res = await axios.put(
    `${API_URL}/update/${item_id}`,
    { quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Xóa item
export const removeCartItem = async (item_id: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please login");

  const res = await axios.delete(`${API_URL}/delete/${item_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
