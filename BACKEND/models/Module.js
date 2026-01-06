const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Inventory = sequelize.define(
    "Inventory",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        tranDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "tran_date",
        },

        client: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        batchNo: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "batch_no",
        },

        lotNo: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "lot_no",
        },

        tranType: {
            type: DataTypes.ENUM(
                "IN",
                "DISPATCH",
                "REPAIR_DISPATCH",
                "RETURN"
            ),
            allowNull: false,
            field: "tran_type",
        },

        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },

        returnReason: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "return_reason",
        },

        rcDcNo: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "rc_dc_no",
        },

        remarks: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "inventories",
        timestamps: true,
        hooks: {
            beforeValidate: (inventory) => {
                // ✅ Enforce return reason only for RETURN type
                if (
                    inventory.tranType === "RETURN" &&
                    !inventory.returnReason
                ) {
                    throw new Error("Return reason is required for RETURN transaction");
                }

                // ❌ Clear returnReason for other types
                if (inventory.tranType !== "RETURN") {
                    inventory.returnReason = null;
                }
            },
        },
    }
);

module.exports = Inventory;
