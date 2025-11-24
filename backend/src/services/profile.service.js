import Profile from "../models/profile.model.js";

// Lấy profile theo userId
export const getProfileByUserId = async (userId) => {
    return await Profile.findOne({ where: { user_id: userId } });
};

// Tạo profile mặc định khi chưa có
export const createEmptyProfile = async (userId) => {
    return await Profile.create({
        user_id: userId,
        full_name: "",
        phone: "",
        address: "",
        gender: "other",
    });
};

// Cập nhật profile
export const updateProfile = async (userId, data) => {
    let profile = await getProfileByUserId(userId);

    if (!profile) {
        profile = await createEmptyProfile(userId);
    }

    await profile.update({
        full_name: data.full_name ?? profile.full_name,
        phone: data.phone ?? profile.phone,
        address: data.address ?? profile.address,
        gender: data.gender ?? profile.gender,
    });

    return profile;
};
