const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * TEAM SIGNUP
 * POST /api/auth/signup
 */
exports.signup = async (req, res) => {
  const { teamId, password, members } = req.body;

  try {
    if (!members || members.length !== 3) {
      return res
        .status(400)
        .json({ message: "Exactly 3 team members are required" });
    }

    const existingTeam = await User.findOne({ teamId });
    if (existingTeam) {
      return res.status(400).json({ message: "Team Name already exists, Choose a different name" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const team = new User({
      teamId,
      password: hashedPassword,
      role: "team",
      members
    });

    await team.save();

    res.status(201).json({ message: "Team registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

/**
 * LOGIN (Team / Admin)
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  const { teamId, password } = req.body;

  try {
    const user = await User.findOne({ teamId });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        teamId: user.teamId
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({
      token,
      user: {
        teamId: user.teamId,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
