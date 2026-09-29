const express = require("express");
const Pandal = require("../models/Pandal");

const router = express.Router();

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

// Get one pandal by ID
router.get("/:id", async (req, res) => {
  try {
    const pandal = await Pandal.findById(req.params.id);

    if (!pandal) {
      return res.status(404).json({
        message: "Pandal not found"
      });
    }

    res.json(pandal);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching pandal",
      error: error.message
    });
  }
});

// Add new pandal
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