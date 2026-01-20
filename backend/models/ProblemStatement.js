const mongoose = require("mongoose");

const ProblemStatementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    driveLink: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProblemStatement", ProblemStatementSchema);
