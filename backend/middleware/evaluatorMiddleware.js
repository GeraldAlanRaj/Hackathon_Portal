const evaluatorMiddleware = (req, res, next) => {
  if (!["evaluator", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Evaluator access only" });
  }
  next();
};

module.exports = evaluatorMiddleware;
