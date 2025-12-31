// routes/performance.js

const express = require("express");
const router = express.Router();
const controller = require("../controllers/PerformanceController");
const { allowRoles } = require("../Middleware");

// Admin / Manager
router.get(
  "/leaderboard",
  allowRoles("admin", "manager"),
  controller.getLeaderboard
);

// Admin / Manager → employee detail
router.get(
  "/employee/:name",
  allowRoles("admin", "manager"),
  controller.getEmployeeDetails
);

// Technician (mobile app)
router.get(
  "/me/badge",
  allowRoles("technician"),
  controller.getMyBadge
);

module.exports = router;
