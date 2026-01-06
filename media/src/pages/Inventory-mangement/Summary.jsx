import Search from "./Searching";
import { useState } from "react";
import Table from "./Table";
import useAutoClearMessage from "../../Hooks/ShowMsg";
import { Alert, CircularProgress, Box, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import {
  fetchInventoryData,
  downloadInventorySummaryExcel,
} from "../../services/dataService";
import { inventoryColumns } from "./SampleData";

function Summary() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const { msg, showMsg } = useAutoClearMessage(5000);

  const handleSearch = async () => {
    if (!fromDate || !toDate) {
      showMsg("Please select both From Date and To Date");
      return;
    }

    try {
      setLoading(true);
      setSelectedData([]);

      const res = await fetchInventoryData(fromDate, toDate);
      setSelectedData(res.data);
    } catch (error) {
      setSelectedData([]);
      showMsg(
        error.response?.data?.message ||
          "For given date range, data is not available"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!fromDate || !toDate) {
      showMsg("Please select From Date and To Date before download");
      return;
    }

    try {
      setDownloading(true);

      const res = await downloadInventorySummaryExcel(fromDate, toDate);

      const blob = res;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `Inventory_Summary_${fromDate}_to_${toDate}.xlsx`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      showMsg("Failed to download Excel file");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <h1 className="text-center mt-4 fs-4">Summary</h1>

      <div className="border-top mt-2 text-center">
        <Search
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          onSubmit={handleSearch}
        />
      </div>

      {/* 🔽 ACTION BAR */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
          mr: 2,
        }}
      >
        <Button
          variant="contained"
          color="success"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          disabled={downloading || loading}
        >
          {downloading ? "Downloading..." : "Download Excel"}
        </Button>
      </Box>

      {/* ⏳ Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* 📊 Table */}
      {!loading && selectedData.length > 0 && (
        <Table data={selectedData} columns={inventoryColumns} />
      )}

      {/* ❌ Error */}
      {msg && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Alert variant="filled" severity="error" sx={{ width: "70%", mt: 5 }}>
            {msg}
          </Alert>
        </Box>
      )}
    </>
  );
}

export default Summary;
