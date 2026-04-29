const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Use Render port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const listingRoutes = require("./routes/listings");
app.use("/api/listings", listingRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("ACITY Connect Backend is running...");
});

// 🔥 Test DB route
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      time: result.rows[0],
    });
  } catch (error) {
    console.error("DB ERROR:", error.message); // helpful for Render logs
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});