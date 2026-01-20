const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createProblem,
  getAllTeams,
  getAllSubmissions,
  gradeSubmission,
  getLeaderboard,
  publishLeaderboard
} = require("../controllers/adminController");


const {
  setHackathonWindow,
  getHackathonWindow
} = require("../controllers/hackathonController");
const router = express.Router();

// 🔐 ADMIN PROTECTION
router.use(authMiddleware, adminMiddleware);

// 1️⃣ Problem statements
router.post("/problems", createProblem);

// 2️⃣ Teams
router.get("/teams", getAllTeams);

// 3️⃣ Submissions
router.get("/submissions", getAllSubmissions);

// 4️⃣ Grade submission
router.put("/submissions/:submissionId/grade", gradeSubmission);

// 5️⃣ Leaderboard
router.get("/leaderboard", getLeaderboard);
router.post("/leaderboard/publish", publishLeaderboard);



router.post("/hackathon", setHackathonWindow);
router.get("/hackathon", getHackathonWindow);

module.exports = router;
