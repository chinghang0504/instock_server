import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

//  Validation Variables 
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

const formatSearchTerm = (term) => {
    return typeof term === 'string' ? `%${term.toLowerCase()}%` : '%';
};

// GET All 
const warehouseList = async (_req, res) => {
    try{
        const data= await knex("warehouses");
        res.status(200).json(data)
    } catch (error) {
        res.status(400).send (`Error retriving warehouse list:${error}`);
    }
};

// GET Single
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

// EDIT Warehouse
const warehouseEdit = async (req, res) => {
    const warehouseId = req.params.id;
    const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;
  
    const existingWarehouse = await knex ('warehouses').where({ id: warehouseId }).first();
    if (!existingWarehouse) {
      return res.status(404).json({ message: `Warehouse with ID ${warehouseId} not found` });
    }
  
    if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
      return res.status(400).json({ message: 'Invalid input. All fields are required and must be correctly formatted.' });
    }
    if (!isValidPhoneNumber(contact_phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }
    if (!isValidEmail(contact_email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
    try {
    
      await knex ('warehouses').where({ id: warehouseId }).update({
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email
      });
  
      const updatedWarehouse = await knex ('warehouses').where({ id: warehouseId }).first();
      res.status(200).json(updatedWarehouse);
    } catch (error) {
      res.status(500).json({ message: `Unable to update warehouse: ${error.message}` });
    }
  };

  // CREATE Warehouse
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

// DELETE Warehouse
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

// GET Inventory By Warehouse
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
};
 
//GET Warehouse Search
const warehouseSearch = async (req, res) => {
    const searchTerm = formatSearchTerm(req.query.s);
    try {
        console.log(searchTerm)
        const filteredWarehouses = await knex('warehouses')
            .where('warehouse_name', 'like', searchTerm)
            .orWhere('address', 'like', searchTerm)
            .orWhere('city', 'like', searchTerm)
            .orWhere('country', 'like', searchTerm)
            .orWhere('contact_name', 'like', searchTerm)
            .orWhere('contact_phone', 'like', searchTerm);

        res.status(200).json(filteredWarehouses);
    } catch (error) {
        res.status(400).send(`Error retrieving warehouse list: ${error}`);
    }
};





export {warehouseList, warehouseSingle,warehouseEdit,warehouseCreate, warehouseDelete,inventoryByWarehouse,warehouseSearch}
