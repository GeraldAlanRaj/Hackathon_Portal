const mongoose = require("mongoose");

const EvaluationSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true
    },

    evaluatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    executiveSummary: { type: Number, min: 0, max: 10, required: true },
    methodology: { type: Number, min: 0, max: 10, required: true },
    resultsAnalysis: { type: Number, min: 0, max: 10, required: true },
    limitations: { type: Number, min: 0, max: 10, required: true },
    improvements: { type: Number, min: 0, max: 10, required: true },

    total: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

// prevent duplicate evaluation by same evaluator
EvaluationSchema.index(
  { submissionId: 1, evaluatorId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Evaluation", EvaluationSchema);
