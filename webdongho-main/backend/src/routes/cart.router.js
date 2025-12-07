import express from "express";
import {
    getCartController,
    addToCartController,
    updateCartItemController,
    removeCartItemController,
} from "../controllers/cart.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Bảo vệ tất cả route cart
router.use(authMiddleware);

router.get("/", getCartController);
router.post("/add", addToCartController);
router.put("/update/:item_id", updateCartItemController);
router.delete("/delete/:item_id", removeCartItemController);

export default router;
