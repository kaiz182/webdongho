import * as reviewService from "../services/review.service.js";

/**
 * Tạo review mới
 * Cần auth middleware để req.user có dữ liệu
 */
export const createReview = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        const user_id = req.user.id;
        const { product_id, rating, comment } = req.body;

        const newReview = await reviewService.createReview({
            user_id,
            product_id,
            rating,
            comment,
        });

        return res.status(201).json(newReview);
    } catch (error) {
        console.error("Error creating review:", error);
        return res.status(500).json({ message: error.message || "Failed to create review" });
    }
};

/**
 * Các controller khác
 */
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getAllReviews();
        return res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return res.status(500).json({ message: "Failed to fetch reviews" });
    }
};

export const getReviewById = async (req, res) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });
        return res.status(200).json(review);
    } catch (error) {
        console.error("Error fetching review:", error);
        return res.status(500).json({ message: "Failed to fetch review" });
    }
};

export const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByProduct(req.params.productId);
        return res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching product reviews:", error);
        return res.status(500).json({ message: "Failed to fetch product reviews" });
    }
};

export const updateReview = async (req, res) => {
    try {
        const updated = await reviewService.updateReview(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Review not found" });
        return res.status(200).json(updated);
    } catch (error) {
        console.error("Error updating review:", error);
        return res.status(500).json({ message: "Failed to update review" });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const deleted = await reviewService.deleteReview(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Review not found" });
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting review:", error);
        return res.status(500).json({ message: "Failed to delete review" });
    }
};
