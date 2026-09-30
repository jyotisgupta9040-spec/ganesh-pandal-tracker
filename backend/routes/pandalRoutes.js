const express = require("express");
const router = express.Router();

const Pandal = require("../models/Pandal");

// Get all pandals
router.get("/", async (req, res) => {
  try {
    const pandals = await Pandal.find();
    res.json(pandals);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching pandals",
      error: error.message
    });
  }
});

// Add a new pandal
router.post("/", async (req, res) => {
  try {
    const pandal = new Pandal(req.body);
    const savedPandal = await pandal.save();

    res.status(201).json(savedPandal);
  } catch (error) {
    res.status(500).json({
      message: "Error adding pandal",
      error: error.message
    });
  }
});

module.exports = router;