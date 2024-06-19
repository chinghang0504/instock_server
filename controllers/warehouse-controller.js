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

const warehouseDelete = async (req, res) => {
    const warehouseId = req.params.id;
    try {
        const rowsDeleted = await knex('warehouses').where({ id: warehouseId }).del();
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `Warehouse with ID ${warehouseId} not found` });
        }
        await knex('inventories').where({ warehouse_id: warehouseId }).del();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: `Unable to delete warehouse: ${error.message}` });
    }
};

export {warehouseList, warehouseSingle, warehouseDelete}