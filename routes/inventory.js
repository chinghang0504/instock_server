import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();

router.route("/").get(inventoryController.inventoryList);
router.route("/:id").get(inventoryController.inventorySingle);

export default router;