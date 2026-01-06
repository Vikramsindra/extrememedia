import api from "../api/axios";

export const addData = async (data) => {
  const res = await api.post("/data/dataEntry", data, {
    withCredentials: true,
  });

  return res.data;
};

export const fetchBulkEntryData = async (fromDate, toDate) => {
  const res = await api.post(
    "/data/bulkentryData",
    { fromDate, toDate },
    { withCredentials: true } // ✅ add if not global
  );
  return res.data;
};

export const fetchInventoryData = async (fromDate, toDate) => {
  const res = await api.post(
    "/data/summary",
    { fromDate, toDate },
    { withCredentials: true }
  );
  return res.data;
};

export const fetchMonthlySummary = async (year) => {
  const res = await api.post(
    "/data/monthlySummary",
    { year },
    { withCredentials: true }
  );
  return res.data;
};

export const fetchInventorySummary = async () => {
  const res = await api.get("/data/totalSummary", {
    withCredentials: true,
  });
  return res.data;
};

export const downloadBulkEntryExcel = async (fromDate, toDate) => {
  const response = await api.post(
    "/data/bulkentryData/download",
    { fromDate, toDate },
    {
      responseType: "blob", // 🔴 IMPORTANT
    }
  );

  return response.data;
};

export const downloadInventorySummaryExcel = async (fromDate, toDate) => {
  const res = await api.post(
    "/data/summary/download",
    { fromDate, toDate },
    { responseType: "blob" }
  );
  return res.data;
};
