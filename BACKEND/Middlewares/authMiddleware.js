require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.ensureAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // ✅ Support Bearer token OR cookie token
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, username, role }
        next();
    } catch (err) {
        console.error("❌ JWT verification failed:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
