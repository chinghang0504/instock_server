import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

router.route("/search")
    .get(warehouseController.warehouseSearch)

router.route("/")
    .get(warehouseController.warehouseList)
    .post(warehouseController.warehouseCreate)

router.route("/:id")
    .get(warehouseController.warehouseSingle)
    .delete(warehouseController.warehouseDelete)
    .put(warehouseController.warehouseEdit);

router.route("/:id/inventories")
    .get(warehouseController.inventoryByWarehouse);

export default router;