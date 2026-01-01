// routes/performance.js

const express = require("express");
const router = express.Router();
const controller = require("../controllers/PerformanceController");
const { allowRoles, ensureManager } = require("../Middlewares/roleMiddleware");
const { ensureAuth } = require("../Middlewares/authMiddleware");

// Admin / Manager
router.get(
  "/leaderboard",
  ensureAuth,
  ensureManager,
  controller.getLeaderboard
);

// Admin / Manager → employee detail
router.get(
  "/employee/:name",
  ensureAuth,
  ensureManager,
  controller.getEmployeeDetails
);

// Technician (mobile app)
router.get(
  "/me/badge",
  ensureAuth,
  ensureManager,
  controller.getMyBadge
);

module.exports = router;
