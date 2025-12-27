const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/login", (req, res, next) => {
  console.log("LOGIN BODY:", req.body);

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Passport error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: info?.message || "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Login failed" });
      }

      return res.json({
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    });
  })(req, res, next);
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
      }
    });
  }
  res.status(401).json({ message: "Not authenticated" });
});


router.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
