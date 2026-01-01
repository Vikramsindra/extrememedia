const express = require('express');
const router = express.Router();
const { taskLimiter } = require('../Middlewares/rateLimiter');
const { ensureAuth } = require('../Middlewares/authMiddleware');
const { ensureManager } = require('../Middlewares/roleMiddleware');
const { createTask } = require('../controllers/taskController');


router.post("/taskCreate", taskLimiter, ensureAuth, ensureManager, createTask);


module.exports = router;