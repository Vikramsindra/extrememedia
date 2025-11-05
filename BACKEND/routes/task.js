const express = require('express');
const router = express.Router();
const {EnsureAdmin} = require('../Middleware');
const db = require('../config/db');

router.post('/taskcreate', EnsureAdmin, (req, res) => {
  try {
    const { title, description, assignee, assignedTo, priority, dueDate } = req.body;
    const assignedBy = req.user?.username || 'Unknown';

    const query = `
      INSERT INTO tasks (title, description, assignee, assigned_to, priority, due_date, assigned_by, is_done)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [title, description, assignee, assignedTo, priority, dueDate, assignedBy, false],
      (err) => {
        if (err) {
          console.error("❌ DB Error:", err);
          return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json({ message: 'Task given successfully' });
      }
    );
  } catch (err) {
    console.error("❌ Route Error:", err);
    res.status(500).json({ error: 'Server error', details: err });
  }
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