const HackathonConfig = require("../models/HackathonConfig");

const hackathonWindowMiddleware = async (req, res, next) => {
  try {
    const config = await HackathonConfig.findOne();
    if (!config) {
      return res.status(500).json({ message: "Hackathon not configured" });
    }

    const now = new Date();

    if (now < config.startTime || now > config.endTime) {
      return res.status(403).json({
        message: "Hackathon submission window is closed"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Time window check failed" });
  }
};

module.exports = hackathonWindowMiddleware;
