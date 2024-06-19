import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

router.route("/").get(warehouseController.warehouseList);
router.route("/:id").get(warehouseController.warehouseSingle);
router.route("/:id/inventories").get(warehouseController.inventoryByWarehouse);

export default router;