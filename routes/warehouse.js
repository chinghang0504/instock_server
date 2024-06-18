import express from "express";
import * as userController from "../controllers/warehouse-controller.js";

const router = express.Router();

router.route("/").get(userController.warehouselist);

export default router;