import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

router.route("/")
.get(warehouseController.warehouseList)
.post(warehouseController.warehouseList);

router.route("/:id").get(warehouseController.warehouseSingle);

export default router;