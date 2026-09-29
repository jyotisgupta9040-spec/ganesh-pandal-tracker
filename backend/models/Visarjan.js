const mongoose = require("mongoose");

const visarjanSchema = new mongoose.Schema(
  {
    pandal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pandal",
      required: true
    },

    visarjanDate: {
      type: String,
      required: true
    },

    visarjanTime: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    route: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Visarjan", visarjanSchema);