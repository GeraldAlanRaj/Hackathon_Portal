const mongoose = require("mongoose");

const HackathonConfigSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("HackathonConfig", HackathonConfigSchema);
