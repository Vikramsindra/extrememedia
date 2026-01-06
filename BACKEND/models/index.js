const User = require("./User");
const Task = require("./TaskModel");

// A user can assign many tasks
User.hasMany(Task, { foreignKey: "assignedById", as: "assignedTasks" });

// A user can receive many tasks
User.hasMany(Task, { foreignKey: "assignedToId", as: "receivedTasks" });

// Each task belongs to a manager/admin
Task.belongsTo(User, { foreignKey: "assignedById", as: "assignedBy" });

// Each task belongs to a technician
Task.belongsTo(User, { foreignKey: "assignedToId", as: "assignedTo" });

module.exports = { User, Task };
