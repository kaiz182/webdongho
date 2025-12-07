import express from "express";
import * as reviewController from "../controllers/review.Controller.js";

const router = express.Router();

// Lấy tất cả đánh giá
router.get("/", reviewController.getAllReviews);

// Lấy đánh giá theo sản phẩm **phải trước /:id**
router.get("/product/:productId", reviewController.getReviewsByProduct);

// Lấy đánh giá theo ID
router.get("/:id", reviewController.getReviewById);

// Thêm đánh giá mới
router.post("/", reviewController.createReview);

// Cập nhật đánh giá
router.put("/:id", reviewController.updateReview);

// Xóa đánh giá
router.delete("/:id", reviewController.deleteReview);

export default router;
