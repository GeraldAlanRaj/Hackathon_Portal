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
    }
  },
  { timestamps: true }
);

// One submission per team
SubmissionSchema.index({ teamId: 1 }, { unique: true });

module.exports = mongoose.model("Submission", SubmissionSchema);
