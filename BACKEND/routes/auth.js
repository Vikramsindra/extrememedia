const express = require("express");
const { logout, reloadLogin, login } = require("../controllers/authControllers");
const { loginLimiter } = require("../Middlewares/rateLimiter");
const { ensureAuth } = require("../Middlewares/authMiddleware");

const router = express.Router();

/**
 * =====================
 * LOGIN
 * =====================
 */
router.post("/login", loginLimiter, login);

/**
 * =====================
 * CURRENT USER (IMPORTANT)
 * =====================
 * Used by App.jsx on page reload
 */
router.get("/me", ensureAuth, reloadLogin);

/**
 * =====================
 * LOGOUT
 * =====================
 */
router.post("/logout", logout);


module.exports = router;


