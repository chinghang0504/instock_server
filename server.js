import express from "express";
import cors from "cors";
import 'dotenv/config';
import testRouter from './routes/test.js';
import warehouseRouter from './routes/warehouse.js'
import inventoryRouter  from "./routes/inventory.js";

// Global constants
const PORT = process.env.PORT || 8081;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
app.use('/test', testRouter);
app.use('/warehouse', warehouseRouter);
app.use('/inventory', inventoryRouter);

// Listen the port
app.listen(PORT, () => {
    console.log(`The server is running on the port:${PORT}`);
});
