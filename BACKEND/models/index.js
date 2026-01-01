const User = require("./User");
const Task = require("./TaskModel");

// A user can assign many tasks
User.hasMany(Task, {
    foreignKey: "assignedById",
    as: "AssignedTasks",
});

// A user can receive many tasks
User.hasMany(Task, {
    foreignKey: "assignedToId",
    as: "ReceivedTasks",
});

// Each task belongs to a manager/admin
Task.belongsTo(User, {
    foreignKey: "assignedById",
    as: "AssignedBy",
});

// Each task belongs to a technician
Task.belongsTo(User, {
    foreignKey: "assignedToId",
    as: "AssignedTo",
});

module.exports = { User, Task };
