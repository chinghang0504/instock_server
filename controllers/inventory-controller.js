import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const inventoryList = async (_req, res) => {
    try{
        const data= await knex("inventories");
        res.status(200).json(data)
    } catch (error) {
        res.status(400).send (`Error retriving inventory list:${error}`);
    }
};
const inventorySingle = async (req, res) => {
    try {
        const inventoryData = await knex("inventories").where({ id: req.params.id }).first();

        if (!inventoryData) {
            return res.status(404).json({ message: `Inventory with ID: ${req.params.id} not found` });
        }

        return res.status(200).json(inventoryData);
    } catch (error) {
        return res.status(500).json({ message: `Unable to retrieve data for inventory with ID: ${req.params.id}` });
    }
};



export {inventoryList,inventorySingle}