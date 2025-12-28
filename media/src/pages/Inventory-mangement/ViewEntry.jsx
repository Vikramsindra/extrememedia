import Search from "./Searching";
import Table from "./Table";
import { useState } from "react";
import { columns } from "./SampleData";
import { Alert } from "@mui/material";
import useAutoClearMessage from "../../Hooks/ShowMsg";
import { fetchBulkEntryData } from "../../services/dataService";

function View() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const { msg, showMsg } = useAutoClearMessage(5000);

  const handleSearch = async () => {
    try {
      const res = await fetchBulkEntryData(fromDate, toDate);
      setSelectedData(res.data);
    } catch (error) {
      setSelectedData([]);
      showMsg(
        error.response?.data?.message ||
          "For given date range, data is not available"
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mb-5 text-center mt-3 border-top">
        <Search
          toDate={toDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          onSubmit={handleSearch}
        />
      </div>

      {selectedData.length > 0 && (
        <div className="row mt-5 border-top">
          <Table data={selectedData} columns={columns} />
        </div>
      )}

      {msg && (
        <div className="msg text-center">
          <Alert variant="filled" severity="error" sx={{ width: "70%" }}>
            {msg}
          </Alert>
        </div>
      )}
    </div>
  );
}

export default View;
