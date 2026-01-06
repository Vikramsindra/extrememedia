/**
 * Script: seedInventory.js
 * Purpose:
 * 1. Clear all existing inventory data
 * 2. Insert fresh sample inventory records
 */

const Inventory = require("../models/Module"); // Inventory model
const { sequelize } = require("../config/db");

const sampleData = [
    {
        tranDate: '2025-03-05',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 1,
        tranType: 'IN',
        qty: 110,
        returnReason: null,
        rcDcNo: 'RC1',
        remarks: null
    },
    {
        tranDate: '2025-03-26',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 1,
        tranType: 'DISPATCH',
        qty: 108,
        returnReason: null,
        rcDcNo: 'DC1',
        remarks: null
    },
    {
        tranDate: '2025-05-02',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 1,
        tranType: 'RETURN',
        qty: 96,
        returnReason: 'Functional Fail',
        rcDcNo: null,
        remarks: null
    },
    {
        tranDate: '2025-12-05',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 1,
        tranType: 'REPAIR_DISPATCH',
        qty: 77,
        returnReason: null,
        rcDcNo: null,
        remarks: null
    },
    {
        tranDate: '2025-03-30',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 2,
        tranType: 'IN',
        qty: 150,
        returnReason: null,
        rcDcNo: 'RC2',
        remarks: null
    },
    {
        tranDate: '2025-05-15',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 2,
        tranType: 'DISPATCH',
        qty: 150,
        returnReason: null,
        rcDcNo: 'DC2',
        remarks: null
    },
    {
        tranDate: '2025-04-17',
        client: 'Xtream Media',
        batchNo: 'DX109',
        lotNo: 3,
        tranType: 'IN',
        qty: 48,
        returnReason: null,
        rcDcNo: 'Tran Date',
        remarks: null
    },
    {
        tranDate: '2025-05-02',
        client: 'Xtream Media',
        batchNo: 'DX109',
        lotNo: 3,
        tranType: 'DISPATCH',
        qty: 48,
        returnReason: null,
        rcDcNo: 'DC3',
        remarks: null
    },
    {
        tranDate: '2025-06-12',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 4,
        tranType: 'IN',
        qty: 300,
        returnReason: null,
        rcDcNo: 'Tran Date',
        remarks: null
    },
    {
        tranDate: '2025-07-08',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 4,
        tranType: 'DISPATCH',
        qty: 120,
        returnReason: null,
        rcDcNo: 'DC4',
        remarks: null
    },
    {
        tranDate: '2025-07-08',
        client: 'Xtream Media',
        batchNo: 'DX109',
        lotNo: 5,
        tranType: 'IN',
        qty: 100,
        returnReason: null,
        rcDcNo: 'RC5',
        remarks: null
    },
    {
        tranDate: '2025-10-31',
        client: 'Xtream Media',
        batchNo: 'DX109',
        lotNo: 5,
        tranType: 'DISPATCH',
        qty: 17,
        returnReason: null,
        rcDcNo: 'DC5',
        remarks: null
    },
    {
        tranDate: '2025-07-30',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 4,
        tranType: 'DISPATCH',
        qty: 160,
        returnReason: null,
        rcDcNo: 'DC6',
        remarks: null
    },
    {
        tranDate: '2025-08-12',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 4,
        tranType: 'RETURN',
        qty: 33,
        returnReason: 'Functional Fail',
        rcDcNo: null,
        remarks: null
    },
    {
        tranDate: '2025-07-30',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 6,
        tranType: 'IN',
        qty: 200,
        returnReason: null,
        rcDcNo: 'Tran Date',
        remarks: null
    },
    {
        tranDate: '2025-09-20',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 6,
        tranType: 'DISPATCH',
        qty: 90,
        returnReason: null,
        rcDcNo: 'DC7',
        remarks: null
    },
    {
        tranDate: '2025-10-08',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 6,
        tranType: 'RETURN',
        qty: 26,
        returnReason: 'Functional Fail',
        rcDcNo: null,
        remarks: null
    },
    {
        tranDate: '2025-10-03',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 6,
        tranType: 'DISPATCH',
        qty: 60,
        returnReason: null,
        rcDcNo: 'DC8',
        remarks: null
    },
    {
        tranDate: '2025-10-03',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 7,
        tranType: 'IN',
        qty: 200,
        returnReason: null,
        rcDcNo: 'Tran Date',
        remarks: null
    },
    {
        tranDate: '2025-12-05',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 7,
        tranType: 'DISPATCH',
        qty: 37,
        returnReason: null,
        rcDcNo: 'DC9',
        remarks: null
    },
    {
        tranDate: '2025-11-20',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 8,
        tranType: 'IN',
        qty: 200,
        returnReason: null,
        rcDcNo: 'Tran Date',
        remarks: null
    },
    {
        tranDate: '2025-11-20',
        client: 'Xtream Media',
        batchNo: 'DX214',
        lotNo: 9,
        tranType: 'IN',
        qty: 10,
        returnReason: null,
        rcDcNo: 'Tran Date',
        remarks: null
    },
    {
        tranDate: '2025-12-13',
        client: 'Xtream Media',
        batchNo: 'DX214',
        lotNo: 9,
        tranType: 'DISPATCH',
        qty: 10,
        returnReason: null,
        rcDcNo: 'DC10',
        remarks: null
    },
    {
        tranDate: '2025-12-05',
        client: 'Xtream Media',
        batchNo: 'DX214',
        lotNo: 10,
        tranType: 'IN',
        qty: 40,
        returnReason: null,
        rcDcNo: 'Tran Date',
        remarks: null
    },
    {
        tranDate: '2025-12-13',
        client: 'Xtream Media',
        batchNo: 'DX214',
        lotNo: 10,
        tranType: 'DISPATCH',
        qty: 5,
        returnReason: null,
        rcDcNo: 'DC11',
        remarks: null
    },
    {
        tranDate: '2025-12-05',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 4,
        tranType: 'REPAIR_DISPATCH',
        qty: 33,
        returnReason: null,
        rcDcNo: null,
        remarks: null
    },
    {
        tranDate: '2025-12-05',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 6,
        tranType: 'REPAIR_DISPATCH',
        qty: 26,
        returnReason: null,
        rcDcNo: null,
        remarks: null
    },
    {
        tranDate: '2025-12-05',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 4,
        tranType: 'DISPATCH',
        qty: 20,
        returnReason: null,
        rcDcNo: 'DC12',
        remarks: null
    },
    {
        tranDate: '2025-12-05',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 6,
        tranType: 'DISPATCH',
        qty: 34,
        returnReason: null,
        rcDcNo: 'DC13',
        remarks: null
    },
    {
        tranDate: '2025-12-13',
        client: 'Xtream Media',
        batchNo: 'DX214',
        lotNo: 11,
        tranType: 'IN',
        qty: 15,
        returnReason: null,
        rcDcNo: 'Tran Date',
        remarks: null
    },
    {
        tranDate: '2025-12-19',
        client: 'Xtream Media',
        batchNo: 'DX214',
        lotNo: 10,
        tranType: 'DISPATCH',
        qty: 15,
        returnReason: null,
        rcDcNo: 'DC13',
        remarks: null
    },
    {
        tranDate: '2025-12-19',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 7,
        tranType: 'DISPATCH',
        qty: 92,
        returnReason: null,
        rcDcNo: 'DC13',
        remarks: null
    },
    {
        tranDate: '2025-12-19',
        client: 'Xtream Media',
        batchNo: 'DX128',
        lotNo: 6,
        tranType: 'DISPATCH',
        qty: 16,
        returnReason: null,
        rcDcNo: 'DC13',
        remarks: null
    },
    {
        tranDate: '2025-12-19',
        client: 'Xtream Media',
        batchNo: 'DX214',
        lotNo: 12,
        tranType: 'IN',
        qty: 30,
        returnReason: null,
        rcDcNo: null,
        remarks: null
    }
]

async function seedInventory() {
    try {
        console.log("🔌 Connecting to database...");
        await sequelize.authenticate();

        console.log("🧹 Clearing inventory table...");
        await Inventory.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });

        console.log("📦 Inserting new inventory data...");
        await Inventory.bulkCreate(sampleData, {
            validate: true,
        });

        console.log("✅ Inventory seeding completed successfully!");
    } catch (error) {
        console.error("❌ Inventory seeding failed:", error);
    } finally {
        await sequelize.close();
        console.log("🔒 DB connection closed");
    }
}

seedInventory();
