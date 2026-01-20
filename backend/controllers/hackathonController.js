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
