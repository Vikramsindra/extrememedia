import Search from "./Searching";
import Table from "./Table";
import { useState, useRef } from "react";
import { sampleData, header } from "./SampleData";
import { Alert } from "@mui/material";
import useAutoClearMessage from "../../Hooks/ShowMsg";

function View() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const { errMsg, showErrMsg } = useAutoClearMessage(5000);

  const handleSearch = () => {
    const foundData = sampleData.filter((obj) => {
      const [d, m, y] = obj.date.split("-");
      const objDate = `${y}-${m}-${d}`;
      return objDate >= fromDate && objDate <= toDate;
    });

    if (foundData.length > 0) {
      setSelectedData(foundData);
    } else {
      setSelectedData([]);
      showErrMsg("For Given Range of Date data is not available");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mb-5">
        <Search
          toDate={toDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          onSubmit={handleSearch}
        />
      </div>

      {selectedData.length > 0 && (
        <div className="row mt-5">
          <Table data={selectedData} header={header} />
        </div>
      )}

      {errMsg && (
        <div className="msg">
          <Alert variant="filled" severity="error" sx={{ width: "70%" }}>
            {msg}
          </Alert>
        </div>
      )}
    </div>
  );
}

export default View;
