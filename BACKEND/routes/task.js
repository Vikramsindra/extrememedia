const express = require('express');
const router = express.Router();
const { EnsureAdmin } = require('../Middlewares/RolebasedMiddlewares');
const db = require('../config/db');
const wrapasync = require('../Utils/ErrorWrapper');
const { taskLimiter } = require('../Middlewares/rateLimiter');

router.post('/taskCreate', EnsureAdmin, taskLimiter, (req, res) => {
  const { title, description, assignee, assignedTo, priority } = req.body;
  const assignedBy = req.user.username;
  const newtask = { title, description, assignee, assignedTo, priority, assignedBy };
  console.log(newtask);
  res.status(200).json("task added ")
});



router.get('/tasks', (req, res) => {
  const assignedTo = req.user?.username || 'Unknown';
  const query = `SELECT * FROM tasks WHERE assigned_to=?`;

  try {
    db.query(query, [assignedTo], (err, result) => {
      if (err) {
        console.error("❌ DB Error:", err);
        return res.status(500).json({ error: 'Database error', details: err });
      }
      res.json(result);
    });
  } catch (err) {
    console.error("❌ Route Error:", err);
    res.status(500).json({ error: 'Server error', details: err });
  }
})

module.exports = router;