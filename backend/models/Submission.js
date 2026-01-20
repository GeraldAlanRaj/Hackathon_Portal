const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemStatement",
      required: true
    },

    solutionLink: {
      type: String,
      required: true
    },

    marks: {
      type: Number,
      default: null
    },

    published: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);
