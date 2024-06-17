import express from "express";

// Global constants
const router = express.Router();

// Testing Functions
router.get('/', (req, res) => {
    res.json({ message: 'Testing Message' });
})

export default router;
