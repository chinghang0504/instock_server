import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const warehouseList = async (_req, res) => {
    try{
        const data= await knex("warehouses")
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


 
export {warehouseList, warehouseSingle}