const mongoose = require("mongoose");

const pandalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    },

    mukhWaitingTime: {
      type: Number,
      default: 0
    },

    charanWaitingTime: {
      type: Number,
      default: 0
    },

    crowdStatus: {
      type: String,
      default: "Medium"
    },

    queueStatus: {
      type: String,
      default: "Medium"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pandal", pandalSchema);