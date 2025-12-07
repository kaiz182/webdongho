import express from "express";
import { createOrder, getMyOrders } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Tạo order
router.post("/checkout", verifyToken, createOrder);

// Lấy order của user
router.get("/", verifyToken, getMyOrders);

export default router;
