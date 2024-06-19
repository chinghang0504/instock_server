import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const warehouseList = async (_req, res) => {
    try{
        const data= await knex("warehouses");
        res.status(200).json(data)
    } catch (error) {
        res.status(400).send (`Error retriving warehouse list:${error}`);
    }
};


const warehouseSingle = async (req, res) => {
    try {
        const warehouseData = await knex("warehouses").where({ id: req.params.id }).first();

        if (!warehouseData) {
            return res.status(404).json({ message: `Warehouse with ID: ${req.params.id} not found` });
        }

        return res.status(200).json(warehouseData);
    } catch (error) {
        return res.status(500).json({ message: `Unable to retrieve data for warehouse with ID: ${req.params.id}` });
    }
};

// Get Inventory By Warehouse
const inventoryByWarehouse = async (req, res) =>{
    const warehouseId = req.params.id;

    try {
        const warehouseExists = await knex('warehouses').where({ id: warehouseId }).first();
        if (!warehouseExists) {
            return res.status(404).json({ message: `Warehouse with ID ${warehouseId} not found` });
        }

        const inventories = await knex('inventories').where({ warehouse_id: warehouseId }).select('id', 'item_name', 'category', 'status', 'quantity');
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ message: `Unable to retrieve inventories: ${error.message}` });
    }
}
 
export {warehouseList, warehouseSingle,inventoryByWarehouse}