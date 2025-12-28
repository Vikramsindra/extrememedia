import Search from "./Searching";
import { useState } from "react";
import Table from "./Table";
import useAutoClearMessage from "../../Hooks/ShowMsg";
import { Alert } from "@mui/material";
import { fetchInventoryData } from "../../services/dataService"; // service function
import { inventoryColumns } from "./SampleData";

function Summary() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const { msg, showMsg } = useAutoClearMessage(5000);

  const handleSearch = async () => {
    try {
      const res = await fetchInventoryData(fromDate, toDate);
      setSelectedData(res.data); // populate table with backend data
    } catch (error) {
      setSelectedData([]);
      showMsg(
        error.response?.data?.message ||
          "For given date range, data is not available"
      );
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

      {selectedData.length > 0 && (
        <Table data={selectedData} columns={inventoryColumns} />
      )}

      {msg && (
        <div className="msg">
          <Alert variant="filled" severity="error" sx={{ width: "70%", mt: 5 }}>
            {msg}
          </Alert>
        </div>
      )}
    </>
  );
}

export default Summary;
