const Problem = require("../models/ProblemStatement");
const User = require("../models/User");
const Submission = require("../models/Submission");
const HackathonConfig = require("../models/HackathonConfig");

/**
 * SET or UPDATE hackathon window
 */
exports.setHackathonWindow = async (req, res) => {
  const { startTime, endTime } = req.body;

  if (!startTime || !endTime) {
    return res.status(400).json({ message: "Start and end time required" });
  }

  try {
    let config = await HackathonConfig.findOne();

    if (config) {
      config.startTime = startTime;
      config.endTime = endTime;
      await config.save();
    } else {
      config = await HackathonConfig.create({ startTime, endTime });
    }

    res.json({
      message: "Hackathon window configured successfully",
      config
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to configure hackathon" });
  }
};

/**
 * GET hackathon window
 */
exports.getHackathonWindow = async (req, res) => {
  try {
    const config = await HackathonConfig.findOne();
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hackathon config" });
  }
};


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

/**
 * 3️⃣ View All Submissions
 */
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("teamId", "teamId members")
      .populate("problemId", "title");

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};

/**
 * 4️⃣ Grade Submission
 */
exports.gradeSubmission = async (req, res) => {
  const { submissionId } = req.params;
  const { marks } = req.body;

  try {
    const submission = await Submission.findByIdAndUpdate(
      submissionId,
      { marks },
      { new: true }
    );

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: "Failed to grade submission" });
  }
};

/**
 * 5️⃣ Leaderboard
 */
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Submission.find({ marks: { $ne: null } })
      .populate("teamId", "teamId")
      .populate("problemId", "title")
      .sort({ marks: -1, updatedAt: 1 });

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Failed to load leaderboard" });
  }
};
