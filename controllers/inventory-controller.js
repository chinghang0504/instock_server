import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);


const inventoryList = async (_req, res) => {
    try {
        const data = await knex("inventories")
            .join("warehouses", "inventories.warehouse_id", "warehouses.id")
            .select(
                "inventories.id",
                "inventories.warehouse_id",
                "warehouses.warehouse_name",
                "inventories.item_name",
                "inventories.description",
                "inventories.category",
                "inventories.status",
                "inventories.quantity"
            );

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving inventory list: ${error}`);
    }
};


const inventorySingle = async (req, res) => {
    try {
        const inventoryData = await knex("inventories")
            .where({ "inventories.id": req.params.id })
            .join("warehouses", "inventories.warehouse_id", "warehouses.id")
            .select(
                "inventories.id",
                "inventories.warehouse_id",
                "warehouses.warehouse_name",
                "inventories.item_name",
                "inventories.description",
                "inventories.category",
                "inventories.status",
                "inventories.quantity"
            )
            .first();

        if (!inventoryData) {
            return res.status(404).json({ message: `Inventory with ID: ${req.params.id} not found` });
        }

        return res.status(200).json(inventoryData);
    } catch (error) {
        return res.status(500).json({ message: `Unable to retrieve data for inventory with ID: ${req.params.id}: ${error.message}` });
    }
};


export {inventoryList,inventorySingle}