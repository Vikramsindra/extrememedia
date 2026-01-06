const express = require("express");
const { logout, reloadLogin, login, register } = require("../controllers/authControllers");
const { loginLimiter } = require("../Middlewares/rateLimiter");
const { ensureAuth } = require("../Middlewares/authMiddleware");
const { ensureManager } = require("../Middlewares/roleMiddleware");

const router = express.Router();


router.post("/register", ensureAuth, ensureManager, register);

/**
 * =====================
 * LOGIN
 * =====================
 */
router.post("/auth/login", loginLimiter, login);

/**
 * =====================
 * CURRENT USER (IMPORTANT)
 * =====================
 * Used by App.jsx on page reload
 */
router.get("/auth/me", ensureAuth, reloadLogin);

/**
 * =====================
 * LOGOUT
 * =====================
 */
router.post("/logout", logout);


module.exports = router;


