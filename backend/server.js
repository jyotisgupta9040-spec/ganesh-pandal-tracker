const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const pandalRoutes = require("./routes/pandalRoutes");
const crowdRoutes = require("./routes/crowdRoutes");
const visarjanRoutes = require("./routes/visarjanRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/pandals", pandalRoutes);
app.use("/api/crowd", crowdRoutes);
app.use("/api/visarjan", visarjanRoutes);

app.get("/", (req, res) => {
  res.send("Ganesh Pandal Tracker Backend is Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:");
    console.log(error.message);
  });