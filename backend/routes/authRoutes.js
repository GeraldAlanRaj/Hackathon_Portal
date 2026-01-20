const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup); // teams
router.post("/login", login);   // team & admin

module.exports = router;
