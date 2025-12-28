import Search from "./Searching";
import { useState } from "react";
import { inventoryData, inventoryColumns } from "./SampleData";
import Table from "./Table";
import useAutoClearMessage from "../../Hooks/ShowMsg";
import { Alert } from "@mui/material";

function Summary() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const { msg, showMsg } = useAutoClearMessage(5000);

  const handleSearch = () => {
    const foundData = inventoryData.filter((obj) => {
      const [d, m, y] = obj.date.split("-");
      const objDate = `${y}-${m}-${d}`;
      return objDate >= fromDate && objDate <= toDate;
    });

    if (foundData.length > 0) {
      setSelectedData(foundData);
    } else {
      setSelectedData([]);
      showMsg("For Given Range of Date data is not available");
    }
  };

  return (
    <>
      <h1 className="text-center mt-4 fs-4">Summary </h1>
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
          <Alert variant="filled" severity="error" sx={{ width: "70%" }}>
            {msg}
          </Alert>
        </div>
      )}
    </>
  );
}

export default Summary;
