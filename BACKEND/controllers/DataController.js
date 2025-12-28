const { sampleData } = require("../SampleData/BulkEntryData.js");
const { inventoryData } = require("../SampleData/InventoryTransactionData.js")
const findData = require("../Utils/FindData.js")
//controller function
const bulkDataEntry = (req, res) => {
    const { fromDate, toDate } = req.body;

    const data = findData(sampleData, fromDate, toDate);

    if (data.length === 0) {
        return res.status(404).json({ message: "Data not available" });
    }

    res.json(data);
};

const inventoryTransactionData = (req, res) => {
    const { fromDate, toDate } = req.body;
    const data = findData(inventoryData, fromDate, toDate);

    if (data.length === 0) {
        return res.status(404).json({ message: "Data not available" });
    }

    res.json(data);
}



module.exports = { bulkDataEntry, inventoryTransactionData };