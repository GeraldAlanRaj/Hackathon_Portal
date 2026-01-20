const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const hackathonWindowMiddleware = require("../middleware/hackathonWindowMiddleware");
const {
  getHackathonWindow
} = require("../controllers/hackathonController");
const {
  getProblems,
  submitSolution,
  getLeaderboard,
  getMySubmission,
} = require("../controllers/userController");

const router = express.Router();

// 🔐 Protected routes
router.get("/problems", authMiddleware, getProblems);

// ⏱ Submission allowed only during hackathon window
router.post(
  "/submit",
  authMiddleware,
  hackathonWindowMiddleware,
  submitSolution
);

router.get("/hackathon", getHackathonWindow);

router.get("/leaderboard", authMiddleware, getLeaderboard);

router.get("/my-submission", authMiddleware, getMySubmission);


module.exports = router;
