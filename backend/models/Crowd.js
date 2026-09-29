const mongoose = require("mongoose");

const crowdSchema = new mongoose.Schema(
  {
    pandal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pandal",
      required: true
    },

    date: {
      type: String,
      required: true
    },

    day: {
      type: String,
      required: true
    },

    crowdLevel: {
      type: String,
      required: true
    },

    queueLength: {
      type: String,
      required: true
    },

    mukhWaitingTime: {
      type: Number,
      required: true
    },

    charanWaitingTime: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Crowd", crowdSchema);