import api from "../api/axios";

export const fetchBulkEntryData = (fromDate, toDate) => {
  return api.post("/data/bulkentryData", {
    fromDate,
    toDate,
  });
};

export const fetchInventoryData = (fromDate, toDate) => {
  return api.post("/data/inventoryTransactionData", {
    fromDate,
    toDate,
  });
};
