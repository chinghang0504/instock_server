import express from "express";
import cors from "cors";
import 'dotenv/config';
import testRouter from './routes/test.js';

// Global constants
const PORT = process.env.PORT || 8081;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
app.use('/test', testRouter);

// Listen the port
app.listen(PORT, () => {
    console.log(`The server is running on the port:${PORT}`);
});
