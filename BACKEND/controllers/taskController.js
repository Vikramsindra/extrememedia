// const Task = require("../models/TaskModel");
// const User = require("../models/User");

const { User, Task } = require("../models");

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

exports.getTasks = async (req, res) => {
    try {
        const { status } = req.query;

        const whereClause = status ? { status } : {};

        const tasks = await Task.findAll({
            where: { status },
            include: [
                { model: User, as: "assignedBy", attributes: ["id", "username", "name"] },
                { model: User, as: "assignedTo", attributes: ["id", "username", "name"] }
            ],
            order: [["createdAt", "DESC"]],
        });


        res.status(200).json(tasks);
    } catch (err) {
        console.error("❌ Error fetching tasks:", err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.verifyTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.status !== "SUBMITTED")
            return res.status(400).json({ message: "Only submitted tasks can be verified" });

        task.status = "VERIFIED";
        await task.save();

        res.json({ message: "Task verified successfully", task });
    } catch (err) {
        console.error("❌ Error verifying task:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.rejectTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.status !== "SUBMITTED")
            return res.status(400).json({ message: "Only submitted tasks can be rejected" });

        task.status = "REJECTED";
        task.rejectionReason = reason || "No reason provided";
        await task.save();

        res.json({ message: "Task rejected", task });
    } catch (err) {
        console.error("❌ Error rejecting task:", err);
        res.status(500).json({ message: "Server error" });
    }
};

