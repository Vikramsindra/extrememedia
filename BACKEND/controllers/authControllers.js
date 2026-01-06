require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
    try {
        const { username, name, password, role } = req.body;

        // ✅ Proper validation
        if (!username || !password || !role || !name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Check if user exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create user
        const newUser = await User.create({
            username,
            name,
            password: hashedPassword,
            role,
        });

        console.log(`✅ User "${username}" created`);

        // ✅ Send response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role,
            },
        });

    } catch (error) {
        console.error("❌ Register error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
/**
 * LOGIN
 */
exports.login = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ message: "All fields required" });
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.role !== role) {
            return res.status(403).json({ message: "Role mismatch" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // ✅ HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name,
            },
        });
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * LOGOUT
 */
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
};

exports.reloadLogin = (req, res) => {
    res.json({ user: req.user });
};
