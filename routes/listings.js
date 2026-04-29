const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all listings
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM listings ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new listing
router.post("/", async (req, res) => {
  try {
    const { title, description, price, category, image_url } = req.body;

    const result = await pool.query(
      `INSERT INTO listings (title, description, price, category, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, price, category, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;