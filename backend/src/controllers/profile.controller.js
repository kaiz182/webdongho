import {
    getProfileByUserId,
    createEmptyProfile,
    updateProfile
} from "../services/profile.service.js";

export const getMyProfile = async (req, res) => {
    try {
        // Lấy ID từ token, KHÔNG lấy từ query
        const userId = req.user.id;

        let profile = await getProfileByUserId(userId);
        if (!profile) profile = await createEmptyProfile(userId);

        res.json(profile);
    } catch (err) {
        console.error("getMyProfile error:", err);
        res.status(500).json({ message: err.message });
    }
};

export const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { full_name, phone, address, gender } = req.body;

        const updated = await updateProfile(userId, {
            full_name,
            phone,
            address,
            gender
        });

        res.json({ message: "Profile updated", profile: updated });
    } catch (err) {
        console.error("updateMyProfile error:", err);
        res.status(500).json({ message: err.message });
    }
};
