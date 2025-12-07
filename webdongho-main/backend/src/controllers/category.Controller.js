import * as categoryService from "../services/category.service.js";

// Lấy tất cả danh mục
export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ message: "Failed to fetch categories" });
    }
};

// Lấy danh mục theo ID
export const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await categoryService.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).json({ message: "Failed to fetch category" });
    }
};

// Tạo mới danh mục
export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        const newCategory = await categoryService.createCategory(data);
        return res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({ message: "Failed to create category" });
    }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedCategory = await categoryService.updateCategory(id, data);
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({ message: "Failed to update category" });
    }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await categoryService.deleteCategory(id);
        if (!deleted) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(204).send(); // Không cần nội dung trả về
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ message: "Failed to delete category" });
    }
};
