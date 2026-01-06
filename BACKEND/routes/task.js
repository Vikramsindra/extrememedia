const express = require('express');
const router = express.Router();
const { taskLimiter } = require('../Middlewares/rateLimiter');
const { ensureAuth } = require('../Middlewares/authMiddleware');
const { ensureManager } = require('../Middlewares/roleMiddleware');
const { createTask, getTasks, verifyTask, rejectTask } = require('../controllers/taskController');


router.post("/taskCreate", taskLimiter, ensureAuth, ensureManager, createTask);

// ============================
// View tasks
// GET /api/task?status=STATUS
// ============================
router.get("/", ensureAuth, getTasks);

// ============================
// Verify a submitted task
// PUT /api/task/:id/verify
// ============================
router.put("/:id/verify", ensureAuth, verifyTask);

// ============================
// Reject a submitted task
// PUT /api/task/:id/reject
// ============================
router.put("/:id/reject", ensureAuth, rejectTask);


module.exports = router;