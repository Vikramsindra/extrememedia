// ✅ LOAD ENV FIRST (VERY IMPORTANT)
require("dotenv").config();

const express = require("express");
const cookiesParser = require("cookie-parser");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const dataRoute = require("./routes/DataRoute");
const performanceRoutes = require("./routes/performance");
const { globalLimiter } = require("./Middlewares/rateLimiter");

const app = express();

// ✅ Initialize Passport strategies
// require("./config/passport")(passport);

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

app.use(cookiesParser());

// Sessions
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "dev-secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: false, // true only with HTTPS
//       sameSite: "lax",
//     },
//   })
// );

// // Passport
// app.use(passport.initialize());
// app.use(passport.session());

// =====================
// Health Check
// =====================


app.use(globalLimiter)
app.get("/api/test", (req, res) => {
  res.json({ status: "OK", env: process.env.NODE_ENV });
});

// =====================
// Routes
// =====================
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/data", dataRoute);
app.use("/api/performance", performanceRoutes);

module.exports = app;
