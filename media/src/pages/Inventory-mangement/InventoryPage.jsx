import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import InventoryForm from "./InventoryForm";
import View from "./ViewEntry";
import Summary from "./Summary";

function InventoryPage() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Box>
      {/* 🔹 Tabs */}
      <Tabs
        value={currentTab}
        onChange={(_, v) => setCurrentTab(v)}
        sx={{ mb: 3 }}
      >
        <Tab
          label="Add Entries"
          sx={{ fontWeight: currentTab === 0 ? "bold" : "normal" }}
        />
        <Tab
          label="View Entries"
          sx={{ fontWeight: currentTab === 1 ? "bold" : "normal" }}
        />
        <Tab
          label="Summary Batch Wise"
          sx={{ fontWeight: currentTab === 2 ? "bold" : "normal" }}
        />
      </Tabs>

      {/* 🔹 Tab Content */}
      {currentTab === 0 && <InventoryForm />}
      {currentTab === 1 && <View />}
      {currentTab === 2 && <Summary />}
    </Box>
  );
}

export default InventoryPage;
