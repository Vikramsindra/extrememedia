const express = require("express");
const passport = require("passport");
const { logout, reloadLogin } = require("../controllers/authControllers");
const { loginLimiter } = require("../Middlewares/rateLimiter");

const router = express.Router();

const DEV_MODE = process.env.NODE_ENV === "development";

console.log("AUTH ROUTES | DEV_MODE:", DEV_MODE);

/**
 * =====================
 * LOGIN
 * =====================
 */
router.post("/login", loginLimiter, (req, res, next) => {
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
router.get("/me", reloadLogin);

/**
 * =====================
 * LOGOUT
 * =====================
 */
router.post("/logout", logout);

module.exports = router;


