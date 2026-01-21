const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const evaluator = require("../middleware/evaluatorMiddleware");
const {getSubmissions, evaluateSubmission, getMyEvaluations} = require("../controllers/evaluatorController");

router.get("/submissions", auth, evaluator, getSubmissions);
router.post(
  "/submissions/:submissionId/evaluate",
  auth,
  evaluator,
  evaluateSubmission
);
router.get(
  "/evaluations",
  auth,
  evaluator,
  getMyEvaluations
);


module.exports = router;
