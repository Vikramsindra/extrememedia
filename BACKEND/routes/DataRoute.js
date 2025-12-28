const express = require("express");
const router = express.Router();
const { inventoryTransactionData, bulkDataEntry } = require("../controllers/DataController");

router.post("/bulkentryData", bulkDataEntry);
router.post("/inventoryTransactionData", inventoryTransactionData);

module.exports = router;
