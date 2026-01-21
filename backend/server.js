require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const connectDB = require("./config/db");
const { generalLimiter, authLimiter } = require("./middleware/rateLimiter");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const evaluatorRoutes = require("./routes/evaluatorRoutes");

const app = express();

// TRUST RENDER PROXY (IMPORTANT)
app.set("trust proxy", 1);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security & performance
app.use(helmet());
app.use(compression());
app.use(generalLimiter);

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

connectDB();

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/evaluator", evaluatorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
