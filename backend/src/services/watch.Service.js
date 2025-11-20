import Watches from "../models/product.model.js";
import { v4 as uuidv4 } from "uuid";

// Lấy tất cả đồng hồ
export const getAllWatches = async () => {
    try {
        return await Watches.findAll({
            order: [["created_at", "DESC"]],
        });
    } catch (error) {
        console.error("Error fetching watches:", error);
        throw new Error("Failed to fetch watches");
    }
};

// Lấy đồng hồ theo ID
export const getWatchById = async (id) => {
    try {
        return await Watches.findByPk(id);
    } catch (error) {
        console.error("Error fetching watch:", error);
        throw new Error("Failed to fetch watch");
    }
};

// Tạo mới đồng hồ
export const createWatch = async (data) => {
    try {
        return await Watches.create({
            id: uuidv4(),
            name: data.name,
            brand: data.brand,
            price: data.price,
            image_url: data.image_url,
            description: data.description,
            category_id: data.category_id,
            stock: data.stock,
            rating: data.rating,
        });
    } catch (error) {
        console.error("Error creating watch:", error);
        throw new Error("Failed to create watch");
    }
};

// Cập nhật đồng hồ
export const updateWatch = async (id, data) => {
    try {
        const watch = await Watches.findByPk(id);
        if (!watch) return null;
        await watch.update(data);
        return watch;
    } catch (error) {
        console.error("Error updating watch:", error);
        throw new Error("Failed to update watch");
    }
};

// Xóa đồng hồ
export const deleteWatch = async (id) => {
    try {
        const watch = await Watches.findByPk(id);
        if (!watch) return false;
        await watch.destroy();
        return true;
    } catch (error) {
        console.error("Error deleting watch:", error);
        throw new Error("Failed to delete watch");
    }
};

// Export tất cả hàm
export default {
    getAllWatches,
    getWatchById,
    createWatch,
    updateWatch,
    deleteWatch,
};
