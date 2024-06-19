import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

//  Validation Variables 
const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const isValidNumber = (value) => {
    return !isNaN(value) && Number.isInteger(Number(value));
};

// GET All
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

// GET Single
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

// Create Inventory Item
const inventoryCreate = async (req, res) => {
    const { warehouse_id, item_name, description, category, status, quantity } = req.body;

    if (
        !isValidNumber(warehouse_id) ||
        !isNonEmptyString(item_name) ||
        !isNonEmptyString(description) ||
        !isNonEmptyString(category) ||
        !isNonEmptyString(status) ||
        !isValidNumber(quantity)
    ) {
        return res.status(400).json({ message: 'Invalid input. All fields are required and must be correctly formatted.' });
    }

    try {
        const warehouse = await knex('warehouses').where({ id: warehouse_id }).first();
        if (!warehouse) {
            return res.status(400).json({ message: 'Invalid warehouse_id. Warehouse does not exist.' });
        }

        const [newInventoryItemId] = await knex('inventories').insert({
            warehouse_id,
            item_name,
            description,
            category,
            status,
            quantity
        }).returning('id');

        const newInventoryItem = await knex('inventories').where({ id: newInventoryItemId }).first();

        res.status(201).json(newInventoryItem);
    } catch (error) {
        res.status(500).json({ message: `Unable to create inventory item: ${error.message}` });
    }
};


const inventoryEdit = async (req,res) => {
    
}
const inventoryDelete = async (req,res) => {
    
}


export {inventoryList,inventorySingle,inventoryCreate,inventoryEdit,inventoryDelete}