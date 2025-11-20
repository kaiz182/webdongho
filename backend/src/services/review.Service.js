import Review from "../models/review.model.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Lấy tất cả review
 */
export const getAllReviews = async () => {
    try {
        return await Review.findAll();
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw new Error("Failed to fetch reviews");
    }
};

/**
 * Lấy review theo ID
 */
export const getReviewById = async (id) => {
    try {
        return await Review.findByPk(id);
    } catch (error) {
        console.error("Error fetching review:", error);
        throw new Error("Failed to fetch review");
    }
};

/**
 * Lấy review theo sản phẩm
 */
export const getReviewsByProduct = async (productId) => {
    try {
        return await Review.findAll({ where: { product_id: productId } });
    } catch (error) {
        console.error("Error fetching product reviews:", error);
        throw new Error("Failed to fetch product reviews");
    }
};

/**
 * Tạo review mới
 */
export const createReview = async ({ user_id, product_id, rating, comment }) => {
    if (!user_id) throw new Error("user_id is required");
    if (!product_id) throw new Error("product_id is required");
    if (!rating || rating < 1 || rating > 5) throw new Error("rating must be 1-5");

    try {
        const newReview = await Review.create({
            id: uuidv4(),
            user_id,
            product_id,
            rating,
            comment: comment || "",
            created_at: new Date(),
        });
        return newReview;
    } catch (error) {
        console.error("Error creating review:", error);
        throw new Error("Failed to create review");
    }
};

/**
 * Cập nhật review
 */
export const updateReview = async (id, { rating, comment }) => {
    try {
        const review = await Review.findByPk(id);
        if (!review) return null;

        await review.update({ rating, comment });
        return review;
    } catch (error) {
        console.error("Error updating review:", error);
        throw new Error("Failed to update review");
    }
};

/**
 * Xóa review
 */
export const deleteReview = async (id) => {
    try {
        const review = await Review.findByPk(id);
        if (!review) return false;

        await review.destroy();
        return true;
    } catch (error) {
        console.error("Error deleting review:", error);
        throw new Error("Failed to delete review");
    }
};
