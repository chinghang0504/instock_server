import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();

router.route("/search")
    .get(inventoryController.inventorySearch)

router.route("/")
    .get(inventoryController.inventoryList)
    .post(inventoryController.inventoryCreate);
    
router.route("/:id")
    .get(inventoryController.inventorySingle)
    .put(inventoryController.inventoryEdit)
    .delete(inventoryController.inventoryDelete);

export default router;  