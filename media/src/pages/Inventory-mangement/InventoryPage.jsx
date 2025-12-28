import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import InventoryFrom from "./InventoryForm";
import View from "./ViewEntry";
import Summary from "./Summary";

function InventoryPage() {
  const [formData, setFormData] = useState({
    tranDate: "",
    client: "Xtream Media",
    batchNo: "",
    lotNo: "",
    tranType: "",
    qty: "",
    returnReason: "",
    rcDcNo: "",
    remarks: "",
  });

  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inventory Data:", formData);

    // 🔗 Later send to backend
    // fetch("/api/inventory", { method: "POST", body: JSON.stringify(formData) })
  };
  return (
    <>
      <Box>
        <Tabs value={currentTab} onChange={(_, v) => setCurrentTab(v)}>
          <Tab
            label="Add Entries"
            sx={{
              fontWeight: currentTab === 0 ? "bold" : "normal",
            }}
          />
          <Tab
            label="View Entries"
            sx={{
              fontWeight: currentTab === 1 ? "bold" : "normal",
            }}
          />
          <Tab
            label="Summary Batch Wise"
            sx={{
              fontWeight: currentTab === 2 ? "bold" : "normal",
            }}
          />
        </Tabs>
        {currentTab == 0 && (
          <InventoryFrom
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
          />
        )}
        {currentTab == 1 && <View />}
        {currentTab == 2 && <Summary />}
      </Box>
    </>
  );
}

export default InventoryPage;
