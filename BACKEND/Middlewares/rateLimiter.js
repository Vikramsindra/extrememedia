const rateLimit = require("express-rate-limit");

// ---------------------
// 1️⃣ Global limiter (all routes)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200, // 200 requests per IP per window
    message: { error: "Too many requests. Try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

// ---------------------
// 2️⃣ Login limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5, // 5 login attempts per IP
    message: { error: "Too many login attempts. Try again in 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

// ---------------------
// 3️⃣ Task creation limiter
const taskLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 tasks per IP
    message: { error: "Too many tasks created. Slow down." },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { globalLimiter, loginLimiter, taskLimiter };
