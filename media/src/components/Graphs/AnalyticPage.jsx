import { useState, useMemo } from "react";
import { Box, Tabs, Tab } from "@mui/material";

import StackBarGraph from "./StackBarGraph";
import InventorySummary from "./IInventorySumarry";

/* 🔹 GRAPH DATA */
const dx128Data = [
  { name: "Mar", received: 260, dispatch: 108, return: 0, redispatch: 0 },
  { name: "Apr", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "May", received: 0, dispatch: 150, return: 96, redispatch: 0 },
  { name: "Jun", received: 300, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Jul", received: 200, dispatch: 280, return: 0, redispatch: 0 },
  { name: "Aug", received: 0, dispatch: 0, return: 33, redispatch: 0 },
  { name: "Sep", received: 0, dispatch: 90, return: 0, redispatch: 0 },
  { name: "Oct", received: 200, dispatch: 60, return: 26, redispatch: 0 },
  { name: "Nov", received: 200, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Dec", received: 0, dispatch: 91, return: 0, redispatch: 144 },
];

const dx109Data = [
  { name: "Mar", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Apr", received: 48, dispatch: 0, return: 0, redispatch: 0 },
  { name: "May", received: 0, dispatch: 48, return: 0, redispatch: 0 },
  { name: "Jun", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Jul", received: 100, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Aug", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Sep", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Oct", received: 0, dispatch: 17, return: 0, redispatch: 0 },
  { name: "Nov", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Dec", received: 0, dispatch: 0, return: 0, redispatch: 0 },
];

const dx214Data = [
  { name: "Mar", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Apr", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "May", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Jun", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Jul", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Aug", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Sep", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Oct", received: 0, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Nov", received: 10, dispatch: 0, return: 0, redispatch: 0 },
  { name: "Dec", received: 55, dispatch: 15, return: 0, redispatch: 0 },
];

const BATCHES = ["DX109", "DX128", "DX214"];

const AnalyticPage = () => {
  const [graphTab, setGraphTab] = useState(2);

  return (
    <div className="container">
      {/* 🔹 GRAPH TABS */}
      <Box sx={{ mb: 5, mt: 5 }}>
        <Tabs value={graphTab} onChange={(_, v) => setGraphTab(v)}>
          <Tab label="DX109" />
          <Tab label="DX128" />
          <Tab label="DX214" />
        </Tabs>

        {graphTab === 0 && (
          <StackBarGraph
            title="DX109 Monthly Inventory Flow"
            data={dx109Data}
            xKey="name"
            stackKeys={["received", "dispatch", "return", "redispatch"]}
            colors={["#1976d2", "#2e7d32", "#ed6c02", "#9c27b0"]}
            height={450}
            barWidth={45}
          />
        )}
        {graphTab === 1 && (
          <StackBarGraph
            title="DX128 Monthly Inventory Flow"
            data={dx128Data}
            xKey="name"
            stackKeys={["received", "dispatch", "return", "redispatch"]}
            colors={["#1976d2", "#2e7d32", "#ed6c02", "#9c27b0"]}
            height={450}
            barWidth={45}
          />
        )}
        {graphTab === 2 && (
          <StackBarGraph
            title="DX214 Monthly Inventory Flow"
            data={dx214Data}
            xKey="name"
            stackKeys={["received", "dispatch", "return", "redispatch"]}
            colors={["#1976d2", "#2e7d32", "#ed6c02", "#9c27b0"]}
            height={450}
            barWidth={45}
          />
        )}
      </Box>

      <Box>
        <InventorySummary />
      </Box>
    </div>
  );
};

export default AnalyticPage;
