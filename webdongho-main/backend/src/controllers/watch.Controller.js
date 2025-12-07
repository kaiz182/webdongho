import * as watchService from "../services/watch.service.js";

// Lấy danh sách tất cả đồng hồ
export const getAllWatches = async (req, res) => {
  try {
    const watches = await watchService.getAllWatches();
    console.log(watches);
    return res.status(200).json(watches);
  } catch (error) {
    console.error("Error fetching watches:", error);
    return res.status(500).json({ message: "Failed to fetch watches" });
  }
};

// Lấy thông tin đồng hồ theo ID
export const getWatchById = async (req, res) => {
  try {
    const id = req.params.id;
    const watch = await watchService.getWatchById(id);

    if (!watch) {
      return res.status(404).json({ message: "Watch not found" });
    }

    return res.status(200).json(watch);
  } catch (error) {
    console.error("Error fetching watch:", error);
    return res.status(500).json({ message: "Failed to fetch watch" });
  }
};

// Thêm mới đồng hồ
export const createWatch = async (req, res) => {
  try {
    const watchData = req.body;
    const newWatch = await watchService.createWatch(watchData);
    return res.status(201).json(newWatch);
  } catch (error) {
    console.error("Error creating watch:", error);
    return res.status(500).json({ message: "Failed to create watch" });
  }
};

// Cập nhật thông tin đồng hồ
export const updateWatch = async (req, res) => {
  try {
    const id = req.params.id;
    const watchData = req.body;
    const updatedWatch = await watchService.updateWatch(id, watchData);

    if (!updatedWatch) {
      return res.status(404).json({ message: "Watch not found" });
    }

    return res.status(200).json(updatedWatch);
  } catch (error) {
    console.error("Error updating watch:", error);
    return res.status(500).json({ message: "Failed to update watch" });
  }
};

// Xóa đồng hồ theo ID
export const deleteWatch = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await watchService.deleteWatch(id);

    if (!deleted) {
      return res.status(404).json({ message: "Watch not found" });
    }

    return res.status(200).json({ message: "Watch deleted successfully" });
  } catch (error) {
    console.error("Error deleting watch:", error);
    return res.status(500).json({ message: "Failed to delete watch" });
  }
};
