// controllers/PerformanceController.js

const employees = require("../SampleData/EmployeesSampleData");
const performance = require("../SampleData/PerformanceSampleData");
const taskLogs = require("../SampleData/TaskLogsSampleData");

// ADMIN / MANAGER → Leaderboard
exports.getLeaderboard = (req, res) => {
  const leaderboard = performance
    .sort((a, b) => b.efficiencyScore - a.efficiencyScore)
    .map((p, index) => ({
      rank: index + 1,
      employeeName: p.employeeName,
      week: p.week,
      month: p.month,
      totalTasks: p.totalTasks,
      achievementPercent: p.achievementPercent,
      rating: p.rating,
      efficiencyScore: p.efficiencyScore,
    }));

  res.json({ data: leaderboard });
};

// ADMIN / MANAGER → Employee Detail
exports.getEmployeeDetails = (req, res) => {
  const { name } = req.params;

  const emp = performance.find(e => e.employeeName === name);
  const logs = taskLogs.filter(t => t.employeeName === name);

  if (!emp) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json({
    profile: emp,
    taskHistory: logs,
  });
};

// TECHNICIAN → Badge only
exports.getMyBadge = (req, res) => {
  const employeeName = req.user?.name || "Emmanual J."; // dev fallback
  const emp = performance.find(e => e.employeeName === employeeName);

  if (!emp) return res.json({ badge: null });

  res.json({
    badge: emp.badge,
    efficiencyScore: emp.efficiencyScore,
  });
};
