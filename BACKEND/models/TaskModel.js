const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Task = sequelize.define(
    "Task",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
        },

        priority: {
            type: DataTypes.ENUM("Low", "Medium", "High"),
            defaultValue: "Medium",
        },

        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "SUBMITTED",
                "VERIFIED",
                "REJECTED"
            ),
            defaultValue: "PENDING",
        },

        assignedById: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            field: "assigned_by_id",
        },

        assignedToId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            field: "assigned_to_id",
        },

        rejectionReason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "tasks",
        timestamps: true,
    }
);

module.exports = Task;
