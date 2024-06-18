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


export {warehouseList}