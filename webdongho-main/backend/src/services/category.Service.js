import Category from "../models/category.model.js";

// Lấy tất cả danh mục
export const getAllCategories = async () => {
    try {
        return await Category.findAll();
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// Lấy danh mục theo ID
export const getCategoryById = async (id) => {
    try {
        return await Category.findByPk(id);
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
    }
};

// Tạo mới danh mục
export const createCategory = async (data) => {
    try {
        const newCategory = await Category.create({
            name: data.name,
            description: data.description || "",
        });

        return newCategory;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error; // quan trọng
    }
};

// Cập nhật danh mục
export const updateCategory = async (id, data) => {
    try {
        const category = await Category.findByPk(id);
        if (!category) return null;

        await category.update({
            name: data.name,
            description: data.description,
        });

        return category;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

// Xóa danh mục
export const deleteCategory = async (id) => {
    try {
        const category = await Category.findByPk(id);
        if (!category) return false;

        await category.destroy();
        return true;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};
