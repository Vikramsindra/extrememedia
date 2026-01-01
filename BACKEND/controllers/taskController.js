const Task = require("../models/TaskModel");
const User = require("../models/User");

exports.createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, priority } = req.body;

        if (!title || !assignedTo) {
            return res.status(400).json({ message: "❌ Title and technician username are required" });
        }

        const technician = await User.findOne({ where: { username: assignedTo } });
        if (!technician) {
            return res.status(404).json({ message: "❌ Technician not found" }); // ✅ clear error message
        }


        const task = await Task.create({
            title,
            description,
            priority: priority || "Medium",
            status: "PENDING",
            assignedById: req.user.id,        // logged-in manager/admin
            assignedToId: technician.id,      // resolved from username
        });

        res.status(201).json({
            message: "Task created successfully",
            task,
        });
    } catch (err) {
        console.error("❌ Task creation error:", err);
        res.status(500).json({ message: "Server error" });
    }
}