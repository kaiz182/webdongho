import Profile from "../models/profile.model.js";

export const getProfileByUserId = async (userId) => {
    return await Profile.findOne({ where: { user_id: userId } });
};

export const createEmptyProfile = async (userId) => {
    return await Profile.create({
        user_id: userId,
        full_name: "",
        phone: "",
        address: "",
        gender: "other",
    });
};

export const updateProfile = async (userId, data) => {
    const profile = await Profile.findOne({ where: { user_id: userId } });
    if (!profile) throw new Error("Profile not found");
    return await profile.update(data);
};
export const deleteProfile = async (userId) => {
    const profile = await Profile.findOne({ where: { user_id: userId } });
    if (!profile) throw new Error("Profile not found");
    return await profile.destroy();
};