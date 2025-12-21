const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const taskRoutes = require('./routes/task');

dotenv.config();
const app = express();

// ✅ Initialize Passport strategy BEFORE routes
require('./config/passport')(passport);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ CORS (flexible for Vite ports like 5173 / 5174)
app.use(cors({
  origin: true,
  credentials: true
}));

// ✅ Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set true only in HTTPS
    sameSite: 'lax'
  }
}));

// ✅ Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// 🔹 Health check route (TEMP / useful)
app.get('/api/test', (req, res) => {
  res.send('Backend OK');
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

module.exports = app;
