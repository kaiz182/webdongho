import express from "express";
import * as watchController from "../controllers/watch.Controller.js";

const router = express.Router();
router.get("/", watchController.getAllWatches);
router.get("/:id", watchController.getWatchById);
router.post("/", watchController.createWatch);
router.put("/:id", watchController.updateWatch);
router.delete("/:id", watchController.deleteWatch);

export default router;
