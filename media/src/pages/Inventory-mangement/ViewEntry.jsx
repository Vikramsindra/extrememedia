import Search from "./Searching";
import Table from "./Table";
import { useState } from "react";
import { columns } from "./SampleData";
import { Alert, CircularProgress, Box, Button } from "@mui/material";
import useAutoClearMessage from "../../Hooks/ShowMsg";
import {
  fetchBulkEntryData,
  downloadBulkEntryExcel,
} from "../../services/dataService";

function View() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const { msg, showMsg } = useAutoClearMessage(5000);

  // 🔍 SEARCH DATA
  const handleSearch = async () => {
    if (!fromDate || !toDate) {
      showMsg("Please select both From Date and To Date");
      return;
    }

    if (fromDate > toDate) {
      showMsg("From Date cannot be greater than To Date");
      return;
    }

    try {
      setLoading(true);
      setSelectedData([]);

      const res = await fetchBulkEntryData(fromDate, toDate);

      if (res.data?.length === 0) {
        showMsg("No data available for selected date range");
      } else {
        setSelectedData(res.data);
      }
    } catch (error) {
      showMsg(
        error.response?.data?.message || "Error while fetching inventory data"
      );
    } finally {
      setLoading(false);
    }
  };

  // 📥 DOWNLOAD EXCEL
  const handleDownload = async () => {
    try {
      setDownloading(true);

      const blob = await downloadBulkEntryExcel(fromDate, toDate);
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");
      link.href = url;
      link.download = `Inventory_${fromDate}_to_${toDate}.xlsx`;

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      showMsg("Failed to download Excel file");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="container-fluid">
      {/* 🔎 SEARCH SECTION */}
      <div className="row mb-5 text-center mt-3 border-top">
        <Search
          toDate={toDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          onSubmit={handleSearch}
        />
      </div>

      {/* ⏳ LOADER */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      )}

      {/* 📥 DOWNLOAD BUTTON */}
      {!loading && selectedData.length > 0 && (
        <Box display="flex" justifyContent="flex-end" mb={2} mr={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? "Downloading..." : "Download Excel"}
          </Button>
        </Box>
      )}

      {/* 📊 TABLE */}
      {!loading && selectedData.length > 0 && (
        <div className="row mt-3 border-top">
          <Table data={selectedData} columns={columns} />
        </div>
      )}

      {/* ⚠️ MESSAGE */}
      {msg && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Alert variant="filled" severity="warning" sx={{ width: "70%" }}>
            {msg}
          </Alert>
        </Box>
      )}
    </div>
  );
}

export default View;
