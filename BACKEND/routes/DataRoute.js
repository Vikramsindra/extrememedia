const express = require("express");
const router = express.Router();
const { inventorySummary, bulkDataEntry, dataEntry, monthlySummary, totalInventorySummary, downloadBulkDataExcel, downloadInventorySummaryExcel } = require("../controllers/DataController");
const { ensureAuth } = require("../Middlewares/authMiddleware");
const { ensureManager } = require("../Middlewares/roleMiddleware");


//get data
router.post("/bulkentryData", ensureAuth, ensureManager, bulkDataEntry);
router.post("/bulkentryData/download", downloadBulkDataExcel);

//view summary 
router.post("/summary", ensureAuth, ensureManager, inventorySummary);
router.post("/summary/download", downloadInventorySummaryExcel);


//add data
router.post("/dataEntry", ensureAuth, ensureManager, dataEntry);

//monthly summary 

router.post("/monthlySummary", monthlySummary);

router.get("/totalSummary", totalInventorySummary);

module.exports = router;
