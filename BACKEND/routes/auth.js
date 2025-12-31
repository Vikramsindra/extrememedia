const express = require("express");
const passport = require("passport");

const router = express.Router();

const DEV_MODE = process.env.NODE_ENV === "development";

console.log("AUTH ROUTES | DEV_MODE:", DEV_MODE);

/**
 * =====================
 * LOGIN
 * =====================
 */
router.post("/login", (req, res, next) => {
  // ✅ DEV MODE: bypass passport & DB
  if (DEV_MODE) {
    return res.json({
      user: {
        id: 1,
        username: "demo",
        role: "admin",
        name: "Dev Admin",
      },
    });
  }

  // 🔐 PROD MODE: real authentication
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
        return res.status(500).json({ message: "Login failed" });
      }

      res.json({
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          name: user.name,
        },
      });
    });
  })(req, res, next);
});

/**
 * =====================
 * CURRENT USER (IMPORTANT)
 * =====================
 * Used by App.jsx on page reload
 */
router.get("/me", (req, res) => {
  // ✅ DEV MODE
  if (DEV_MODE) {
    return res.json({
      user: {
        id: 1,
        username: "demo",
        role: "admin",
        name: "Dev Admin",
      },
    });
  }

  // 🔐 PROD MODE
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json({ user: req.user });
});

/**
 * =====================
 * LOGOUT
 * =====================
 */
router.post("/logout", (req, res) => {
  if (DEV_MODE) {
    return res.json({ message: "Logged out (dev)" });
  }

  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

module.exports = router;


