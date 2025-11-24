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

// Lấy token từ localStorage
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please login");
  return token;
};

// Xử lý dữ liệu item luôn có số
const formatCartItem = (item: any): CartItem => ({
  id: item.id,
  name: item.name || "Unknown Product",
  price: Number(item.price) || 0,
  quantity: Number(item.quantity) || 1,
  image_url: item.image_url || "/images/default-watch.jpg",
});

// GET tất cả items
export const getCartItems = async (): Promise<CartItem[]> => {
  const token = getToken();
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = res.data.items || res.data; // backend có thể trả {items: [...]}
  return data.map(formatCartItem);
};

// Thêm item vào cart
export const addToCart = async (item: { id: string; quantity: number }) => {
  const token = getToken();
  const res = await axios.post(`${API_URL}/add`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Cập nhật quantity
export const updateCartItem = async (item_id: string, quantity: number) => {
  const token = getToken();
  const res = await axios.put(
    `${API_URL}/update/${item_id}`,
    { quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Xóa item
export const removeCartItem = async (item_id: string) => {
  const token = getToken();
  const res = await axios.delete(`${API_URL}/delete/${item_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
