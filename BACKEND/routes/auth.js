const express = require('express');
const passport = require('passport');
const{ loginSuccess , logout} = require('../controllers/authControllers');

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info?.message || 'Unauthorized' }); // ✅ JSON error
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        message: 'Login Successful',
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    });
  })(req, res, next);
});

router.get('/logout',logout);

module.exports=router;