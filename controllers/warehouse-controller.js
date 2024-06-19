import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Get All 
const warehouseList = async (_req, res) => {
    try{
        const data= await knex("warehouses");
        res.status(200).json(data)
    } catch (error) {
        res.status(400).send (`Error retriving warehouse list:${error}`);
    }
};

// Get Single
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

// Post Single
const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const isValidPhoneNumber = (phone) => {
    const regex = /^(\+\d{1,3}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const regexWithoutCountryCode = /^(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return regex.test(phone) || regexWithoutCountryCode.test(phone);
};


const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const warehouseCreate = async (req, res) => {
    const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;

    if (
        !isNonEmptyString(warehouse_name) ||
        !isNonEmptyString(address) ||
        !isNonEmptyString(city) ||
        !isNonEmptyString(country) ||
        !isNonEmptyString(contact_name) ||
        !isNonEmptyString(contact_position) ||
        !isValidPhoneNumber(contact_phone) ||
        !isValidEmail(contact_email)
    ) {
        return res.status(400).json({ message: 'Invalid input. All fields are required and must be correctly formatted.' });
    }
    try {
        const [newWarehouseId] = await knex('warehouses').insert({
            warehouse_name,
            address,
            city,
            country,
            contact_name,
            contact_position,
            contact_phone,
            contact_email
        });

        const newWarehouse = await knex('warehouses').where({ id: newWarehouseId }).first();

        res.status(201).json(newWarehouse);
    } catch (error) {
        res.status(500).json({ message: `Unable to create warehouse: ${error.message}` });
    }
};


 
export {warehouseList, warehouseSingle,warehouseCreate}