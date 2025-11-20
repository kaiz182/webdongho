// src/api/review.api.ts
import axios from "axios";

const API_BASE = "http://localhost:5000/api/reviews"; // URL backend

export interface Review {
  id: string;
  user_id: string;
  user_name?: string;
  product_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

// Lấy tất cả review
export const getAllReviews = async (): Promise<Review[]> => {
  const res = await axios.get(API_BASE);
  return res.data;
};

// Lấy review theo ID
export const getReviewById = async (id: string): Promise<Review> => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

// Lấy review theo sản phẩm
export const getReviewsByProduct = async (
  productId: string
): Promise<Review[]> => {
  const res = await axios.get(`${API_BASE}/product/${productId}`);
  return res.data;
};

// Thêm review mới
export const createReview = async (
  data: {
    user_id: string;
    product_id: string;
    rating: number;
    comment: string;
  },
  token: string
): Promise<Review> => {
  const res = await axios.post(API_BASE, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Cập nhật review
export const updateReview = async (
  id: string,
  data: { rating?: number; comment?: string },
  token: string
): Promise<Review> => {
  const res = await axios.put(`${API_BASE}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Xóa review
export const deleteReview = async (
  id: string,
  token: string
): Promise<void> => {
  await axios.delete(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
