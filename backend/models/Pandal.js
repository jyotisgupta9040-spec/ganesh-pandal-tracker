const mongoose = require("mongoose");

const pandalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  mukhDarshan: {
    type: Number,
    required: true
  },

  charanDarshan: {
    type: Number,
    required: true
  },

  crowd: {
    type: String,
    required: true
  },

  queue: {
    type: String,
    required: true
  },

  aartiTime: {
    type: String
  },

  image: {
    type: String
  }
});

module.exports = mongoose.model("Pandal", pandalSchema);