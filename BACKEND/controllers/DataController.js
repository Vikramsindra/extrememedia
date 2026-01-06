const { Op, fn, col, literal } = require("sequelize");
const Inventory = require("../models/Module.js");
const ExcelJS = require("exceljs");
const { summaryHelper, totalSummary } = require("../Utils/Summary.helper.js");

//controller function

const dataEntry = async (req, res) => {
    try {
        const {
            tranDate,
            client,
            batchNo,
            lotNo,
            tranType,
            qty,
            returnReason,
            rcDcNo,
            remarks,
        } = req.body;

        // 🔴 Required field validation
        if (!batchNo || !lotNo || !tranType || !qty) {
            return res.status(400).json({
                message: "Batch No, Lot No, Tran Type and Quantity are required",
            });
        }

        // 🔴 RETURN specific validation
        if (tranType === "RETURN" && !returnReason) {
            return res.status(400).json({
                message: "Return reason is required for RETURN transaction",
            });
        }

        // ✅ Create inventory entry
        const inventory = await Inventory.create({
            tranDate: tranDate || new Date(), // today if not provided
            client,
            batchNo,
            lotNo,
            tranType,
            qty,
            returnReason: tranType === "RETURN" ? returnReason : null,
            rcDcNo,
            remarks,
        });

        console.log(inventory);

        return res.status(201).json({
            message: "Inventory entry saved successfully",
            data: inventory,
        });
    } catch (error) {
        console.error("❌ Inventory Entry Error:", error);
        return res.status(500).json({
            message: "Server error while saving inventory entry",
        });
    }
};

const bulkDataEntry = async (req, res) => {
    try {
        const { fromDate, toDate } = req.body;

        // ✅ Validation
        if (!fromDate || !toDate) {
            return res.status(400).json({
                message: "FromDate and ToDate is required",
            });
        }

        const data = await Inventory.findAll({
            where: {
                tranDate: {
                    [Op.between]: [fromDate, toDate],
                },
            },
            order: [["tranDate", "ASC"]], // ✅ FIXED
        });

        return res.status(200).json({
            message: "Data fetched successfully",
            count: data.length,
            data,
        });
    } catch (error) {
        console.error("❌ Error fetching bulk data:", error);
        return res.status(500).json({
            message: "Server error while fetching data",
        });
    }
};

const inventorySummary = async (req, res) => {
    try {
        const { fromDate, toDate } = req.body;

        if (!fromDate || !toDate) {
            return res.status(400).json({ message: "From Date and To Date required" });
        }

        const rows = await Inventory.findAll({
            where: {
                tranDate: {
                    [Op.between]: [fromDate, toDate],
                },
            },
            raw: true,
        });

        const summary = summaryHelper(rows);

        res.status(200).json({
            count: summary.length,
            data: summary,
        });
    } catch (error) {
        console.error("❌ Summary Error:", error);
        res.status(500).json({ message: "Failed to generate summary" });
    }
};


const monthlySummary = async (req, res) => {
    try {
        const { year } = req.body;

        if (!year) {
            return res.status(400).json({ message: "Year is required" });
        }

        const rows = await Inventory.findAll({
            attributes: [
                "batchNo",
                [fn("DATE_PART", "year", col("tran_date")), "year"],
                [fn("DATE_PART", "month", col("tran_date")), "month"],
                "tranType",
                [fn("SUM", col("qty")), "totalQty"],
            ],
            where: {
                tranDate: {
                    [Op.between]: [`${year}-01-01`, `${year}-12-31`],
                },
            },
            group: [
                "batchNo",
                fn("DATE_PART", "year", col("tran_date")),
                fn("DATE_PART", "month", col("tran_date")),
                "tranType",
            ],
            order: [[fn("DATE_PART", "month", col("tran_date")), "ASC"]],
            raw: true,
        });

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const result = {};

        rows.forEach((r) => {
            const batch = r.batchNo;
            const monthName = months[Number(r.month) - 1];

            if (!result[batch]) {
                result[batch] = months.map((m) => ({
                    name: m,
                    received: 0,
                    dispatch: 0,
                    return: 0,
                    redispatch: 0,
                }));
            }

            const record = result[batch].find((x) => x.name === monthName);

            if (r.tranType === "IN") record.received += Number(r.totalQty);
            if (r.tranType === "DISPATCH") record.dispatch += Number(r.totalQty);
            if (r.tranType === "RETURN") record.return += Number(r.totalQty);
            if (r.tranType === "REPAIR_DISPATCH")
                record.redispatch += Number(r.totalQty);
        });

        res.status(200).json({
            year,
            data: result,
        });
    } catch (error) {
        console.error("❌ Monthly Summary Error:", error);
        res.status(500).json({ message: "Failed to fetch monthly summary" });
    }
};

const totalInventorySummary = async (req, res) => {
    try {
        const rows = await Inventory.findAll({ raw: true });

        const { summaryPanel, batchSummary } = totalSummary(rows);

        res.status(200).json({
            summaryPanel,
            batchSummary,
        });
    } catch (error) {
        console.error("❌ Summary Error:", error);
        res.status(500).json({ message: "Failed to generate summary" });
    }
};

const downloadBulkDataExcel = async (req, res) => {
    try {
        const { fromDate, toDate } = req.body;

        if (!fromDate || !toDate) {
            return res.status(400).json({
                message: "FromDate and ToDate is required",
            });
        }

        const data = await Inventory.findAll({
            where: {
                tranDate: {
                    [Op.between]: [fromDate, toDate],
                },
            },
            order: [["tranDate", "ASC"]],
            raw: true,
        });

        // 📘 Create Workbook & Sheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Inventory Data");

        // 🧱 Columns
        worksheet.columns = [
            { header: "Tran Date", key: "tranDate", width: 15 },
            { header: "Client", key: "client", width: 20 },
            { header: "Batch No", key: "batchNo", width: 15 },
            { header: "Lot No", key: "lotNo", width: 15 },
            { header: "Tran Type", key: "tranType", width: 20 },
            { header: "Quantity", key: "qty", width: 12 },
            { header: "RC / DC No", key: "rcDcNo", width: 18 },
            { header: "Remarks", key: "remarks", width: 25 },
        ];

        // ➕ Add Rows
        data.forEach((row) => {
            worksheet.addRow(row);
        });

        // 🎨 Header Styling
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // ❄ Freeze Header Row
        worksheet.views = [{ state: "frozen", ySplit: 1 }];

        // 🔍 Auto Filter
        worksheet.autoFilter = {
            from: "A1",
            to: "H1",
        };

        // 📤 Response Headers
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Inventory_${fromDate}_to_${toDate}.xlsx`
        );

        // 📥 Send Excel
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("❌ Bulk Excel Download Error:", error);
        res.status(500).json({
            message: "Failed to download bulk inventory Excel",
        });
    }
};



const downloadInventorySummaryExcel = async (req, res) => {
    try {
        const { fromDate, toDate } = req.body; // 👈 IMPORTANT: query, not body

        if (!fromDate || !toDate) {
            return res.status(400).json({ message: "From Date and To Date required" });
        }

        const rows = await Inventory.findAll({
            where: {
                tranDate: {
                    [Op.between]: [fromDate, toDate],
                },
            },
            raw: true,
        });

        const summary = summaryHelper(rows);

        // 📘 Create Excel
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Inventory Summary");

        sheet.columns = [
            { header: "Batch No", key: "batchNo", width: 15 },
            { header: "Lot No", key: "lotNo", width: 15 },
            { header: "Received Qty", key: "receivedQty", width: 18 },
            { header: "Dispatch Qty", key: "dispatchQty", width: 18 },
            { header: "Return Qty", key: "returnQty", width: 15 },
            { header: "Re-Dispatch Qty", key: "reDispatchQty", width: 20 },
            { header: "Balance Qty", key: "balanceQty", width: 15 },
            { header: "Return %", key: "returnPercent", width: 12 },
        ];

        summary.forEach((row) => sheet.addRow(row));

        sheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: "center" };
        });

        // ✅ WRITE TO BUFFER (CRITICAL FIX)
        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Inventory_Summary_${fromDate}_to_${toDate}.xlsx`
        );

        return res.send(buffer); // 👈 THIS FIXES CORRUPTION
    } catch (error) {
        console.error("❌ Excel Download Error:", error);
        res.status(500).json({ message: "Failed to download Excel" });
    }
};


module.exports = { bulkDataEntry, inventorySummary, dataEntry, monthlySummary, totalInventorySummary, downloadBulkDataExcel, downloadInventorySummaryExcel };