const Submission = require("../models/Submission");
const Evaluation = require("../models/Evaluation");

/**
 * View all submissions
 */
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("teamId", "teamId")
      .populate("problemId", "title");

    res.json(submissions);
  } catch {
    res.status(500).json({ message: "Failed to load submissions" });
  }
};

/**
 * Submit evaluation
 */
exports.evaluateSubmission = async (req, res) => {
  const { submissionId } = req.params;
  const evaluatorId = req.user.id;

  const {
    executiveSummary,
    methodology,
    resultsAnalysis,
    limitations,
    improvements
  } = req.body;

  const total =
    executiveSummary +
    methodology +
    resultsAnalysis +
    limitations +
    improvements;

  try {
    const evaluation = await Evaluation.findOneAndUpdate(
      { submissionId, evaluatorId },   // 🔑 unique pair
      {
        executiveSummary,
        methodology,
        resultsAnalysis,
        limitations,
        improvements,
        total
      },
      {
        new: true,      // return updated doc
        upsert: true    // 🔥 create if not exists
      }
    );

    res.json({
      message: "Evaluation saved successfully",
      evaluation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to save evaluation"
    });
  }
};

exports.getMyEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({
      evaluatorId: req.user.id
    });

    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: "Failed to load evaluations" });
  }
};