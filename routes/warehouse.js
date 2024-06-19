import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

router.route("/")
    .get(warehouseController.warehouseList)
    .post(warehouseController.warehouseCreate)
    .put(warehouseController.warehouseEdit);

router.route("/:id")
    .get(warehouseController.warehouseSingle)
    .delete(warehouseController.warehouseDelete)

router.route("/:id/inventories")
    .get(warehouseController.inventoryByWarehouse);

export default router;