// ✅ LOAD ENV FIRST (VERY IMPORTANT)
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const dataRoute = require("./routes/DataRoute");
const performanceRoutes = require("./routes/performance");

const app = express();

// ✅ Initialize Passport strategies
require("./config/passport")(passport);

// =====================
// Middleware
// =====================

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS (Vite friendly)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true only with HTTPS
      sameSite: "lax",
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// =====================
// Health Check
// =====================
app.get("/api/test", (req, res) => {
  res.json({ status: "OK", env: process.env.NODE_ENV });
});

// =====================
// Routes
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/data", dataRoute);
app.use("/api/performance", performanceRoutes);

module.exports = app;
