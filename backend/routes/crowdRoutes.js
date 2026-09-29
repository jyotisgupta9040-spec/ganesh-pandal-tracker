const express = require("express");
const Crowd = require("../models/Crowd");

const router = express.Router();

// Get all crowd history
router.get("/", async (req, res) => {
  try {
    const crowdData = await Crowd.find().populate("pandal");

    res.json(crowdData);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching crowd history",
      error: error.message
    });
  }
});

// Add crowd history
router.post("/", async (req, res) => {
  try {
    const crowd = new Crowd(req.body);

    const savedCrowd = await crowd.save();

    res.status(201).json(savedCrowd);
  } catch (error) {
    res.status(500).json({
      message: "Error adding crowd history",
      error: error.message
    });
  }
});

module.exports = router;