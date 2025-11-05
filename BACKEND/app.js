const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const task = require('./routes/task');

dotenv.config();
const app = express();

// ✅ Initialize Passport strategy BEFORE routes
require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set to true if using HTTPS
    sameSite: 'lax'
  }
}));
app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true // 🔐 allows cookies/session to be sent
}));


app.use(passport.initialize());
app.use(passport.session());

// ✅ Register routes AFTER passport is ready
app.use('/api/auth', authRoutes);
app.use('/api/task',task);

module.exports = app;