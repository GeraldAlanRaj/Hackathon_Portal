const Problem = require("../models/ProblemStatement");
const Submission = require("../models/Submission");
const Evaluation = require("../models/Evaluation");
/**
 * 1️⃣ View all problem statements
 */
exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: "Failed to load problems" });
  }
};

/**
 * 2️⃣ Submit solution (ONLY ONE per team)
 */
exports.submitSolution = async (req, res) => {
  const { problemId, solutionLink } = req.body;
  const teamObjectId = req.user.id;

  try {
    // Check if already submitted
    const existingSubmission = await Submission.findOne({
      teamId: teamObjectId
    });

    if (existingSubmission) {
      return res.status(400).json({
        message: "You have already submitted a solution"
      });
    }

    const submission = await Submission.create({
      teamId: teamObjectId,
      problemId,
      solutionLink
    });

    res.status(201).json({
      message: "Solution submitted successfully",
      submission
    });
  } catch (error) {
    res.status(500).json({ message: "Submission failed" });
  }
};

/**
 * 3️⃣ View leaderboard
 */
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Evaluation.aggregate([
      // 1. Group evaluations by submission
      {
        $group: {
          _id: "$submissionId",
          totalMarks: { $sum: "$total" }
        }
      },
      { $sort: { totalMarks: -1 } },

      // 2. Join submissions
      {
        $lookup: {
          from: "submissions",
          localField: "_id",
          foreignField: "_id",
          as: "submission"
        }
      },
      { $unwind: "$submission" },

      // ✅ 3. ONLY published submissions
      {
        $match: {
          "submission.published": true
        }
      },

      // 4. Join team (users)
      {
        $lookup: {
          from: "users",
          localField: "submission.teamId",
          foreignField: "_id",
          as: "team"
        }
      },
      { $unwind: "$team" },

      // 5. Join problem statement
      {
        $lookup: {
          from: "problemstatements",
          localField: "submission.problemId",
          foreignField: "_id",
          as: "problem"
        }
      },
      { $unwind: "$problem" },

      // 6. Final shape (SAME as admin)
      {
        $project: {
          submissionId: "$_id",
          totalMarks: 1,
          teamId: "$team.teamId",
          problemTitle: "$problem.title"
        }
      }
    ]);

    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load leaderboard" });
  }
};


/**
 * Check if team has already submitted
 */
exports.getMySubmission = async (req, res) => {
  try {
    const submission = await Submission.findOne({
      teamId: req.user.id
    }).populate("problemId", "title");

    res.json(submission); // null if not submitted
  } catch (error) {
    res.status(500).json({ message: "Failed to check submission" });
  }
};
