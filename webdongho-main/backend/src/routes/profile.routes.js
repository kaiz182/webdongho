import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import multer from "multer";
import {
    createProfile,
    getProfile,
    updateProfile,
    getMyProfile,
    updateMyProfile,
} from "../controllers/profile.controller.js";

// Cấu hình multer lưu file avatar
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/avatars"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const router = express.Router();

// ====================
// Routes cho user đăng nhập
// ====================
router.get("/me", verifyToken, getMyProfile);
router.put("/me", verifyToken, upload.single("avatar"), updateMyProfile);

// ====================
// Routes cho admin hoặc thao tác bằng user_id
// ====================
router.post("/", createProfile);
router.get("/:user_id", getProfile);
router.put("/:user_id", upload.single("avatar"), updateProfile);

export default router;
