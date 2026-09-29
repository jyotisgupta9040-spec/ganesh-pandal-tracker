const express = require("express");
const Visarjan = require("../models/Visarjan");

const router = express.Router();

// Get all visarjan information
router.get("/", async (req, res) => {
  try {
    const data = await Visarjan.find().populate("pandal");

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching visarjan information",
      error: error.message
    });
  }
});

// Add visarjan information
router.post("/", async (req, res) => {
  try {
    const visarjan = new Visarjan(req.body);

    const savedData = await visarjan.save();

    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({
      message: "Error adding visarjan information",
      error: error.message
    });
  }
});

module.exports = router;