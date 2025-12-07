// review.api.ts
import axios from "axios";
const API_URL = "http://localhost:5000/api"; // base URL backend

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
}

export const getReviewsByProduct = async (
  productId: string
): Promise<Review[]> => {
  const res = await axios.get(`/api/reviews?productId=${productId}`);
  return res.data;
};

export const createReview = async (
  review: Omit<Review, "id" | "created_at">,
  token: string
): Promise<Review> => {
  const res = await axios.post("/api/reviews", review, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
