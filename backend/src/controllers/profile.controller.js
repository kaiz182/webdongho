// controllers/profile.controller.js
import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";

// ====================
// Tạo profile
// ====================
export const createProfile = async (req, res) => {
    try {
        const { user_id, phone_number, address, city, country } = req.body;
        const avatar_url = req.file ? `/uploads/avatars/${req.file.filename}` : null;

        const user = await User.findByPk(user_id);
        if (!user) return res.status(404).json({ message: "User không tồn tại" });

        const existingProfile = await Profile.findOne({ where: { user_id } });
        if (existingProfile)
            return res.status(400).json({ message: "Profile đã tồn tại" });

        const profile = await Profile.create({
            user_id,
            phone_number: phone_number || "",
            address: address || "",
            city: city || "",
            country: country || "Vietnam",
            avatar_url,
        });

        res.status(201).json(profile);
    } catch (err) {
        console.error("createProfile error:", err);
        res.status(500).json({ message: err.message });
    }
};

// ====================
// Lấy profile theo user_id
// ====================
export const getProfile = async (req, res) => { /* ... */ };

// ====================
// Cập nhật profile theo user_id
// ====================
export const updateProfile = async (req, res) => { /* ... */ };

// ====================
// Lấy profile của user đang login
// ====================
export const getMyProfile = async (req, res) => { /* ... */ };

// ====================
// Cập nhật profile của user đang login
// ====================
export const updateMyProfile = async (req, res) => { /* ... */ };
