const Problem = require("../models/ProblemStatement");
const User = require("../models/User");
const Submission = require("../models/Submission");
const Evaluation = require("../models/Evaluation");

/**
 * 1️⃣ Create Problem Statement
 */
exports.createProblem = async (req, res) => {
  const { title, driveLink } = req.body;

  try {
    const problem = await Problem.create({ title, driveLink });
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create problem" });
  }
};

/**
 * 2️⃣ View All Teams
 */
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await User.find({ role: "team" }).select("-password");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};


exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Evaluation.aggregate([
      {
        $group: {
          _id: "$submissionId",
          totalMarks: { $sum: "$total" },
          evaluatorCount: { $addToSet: "$evaluatorId" }
        }
      },
      {
        $addFields: {
          evaluatorCount: { $size: "$evaluatorCount" }
        }
      },
      { $sort: { totalMarks: -1 } },

      {
        $lookup: {
          from: "submissions",
          localField: "_id",
          foreignField: "_id",
          as: "submission"
        }
      },
      { $unwind: "$submission" },

      {
        $lookup: {
          from: "users",
          localField: "submission.teamId",
          foreignField: "_id",
          as: "team"
        }
      },
      { $unwind: "$team" },

      {
        $lookup: {
          from: "problemstatements",
          localField: "submission.problemId",
          foreignField: "_id",
          as: "problem"
        }
      },
      { $unwind: "$problem" },

      {
        $project: {
          submissionId: "$_id",
          totalMarks: 1,
          evaluatorCount: 1,
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
 * 6️⃣ Publish leaderboard
 */
exports.publishLeaderboard = async (req, res) => {
  try {
    await Submission.updateMany(
  { _id: { $in: await Evaluation.distinct("submissionId") } },
  { $set: { published: true } }
);


    res.json({ message: "Leaderboard published successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to publish leaderboard" });
  }
};
