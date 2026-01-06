import { useState, useEffect } from "react";
import { Box, Tabs, Tab, CircularProgress } from "@mui/material";

import StackBarGraph from "./StackBarGraph";
import InventorySummary from "./IInventorySumarry";
import { fetchMonthlySummary } from "../../services/dataService"; // 👈 API

const AnalyticPage = () => {
  const [graphTab, setGraphTab] = useState(0);
  const [monthlyData, setMonthlyData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMonthlyData = async () => {
      try {
        const res = await fetchMonthlySummary(2025); // 🔁 dynamic later
        setMonthlyData(res.data);
      } catch (err) {
        console.error("❌ Failed to load monthly summary", err);
      } finally {
        setLoading(false);
      }
    };

    loadMonthlyData();
  }, []);

  const batches = Object.keys(monthlyData); // ["DX128", "DX109", "DX214"]

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="container">
      {/* 🔹 GRAPH TABS */}
      <Box sx={{ mb: 5, mt: 5 }}>
        <Tabs value={graphTab} onChange={(_, v) => setGraphTab(v)}>
          {batches.map((batch) => (
            <Tab key={batch} label={batch} />
          ))}
        </Tabs>

        {batches.map(
          (batch, index) =>
            graphTab === index && (
              <StackBarGraph
                key={batch}
                title={`${batch} Monthly Inventory Flow`}
                data={monthlyData[batch]}
                xKey="name"
                stackKeys={["received", "dispatch", "return", "redispatch"]}
                colors={["#1976d2", "#2e7d32", "#ed6c02", "#9c27b0"]}
                height={450}
                barWidth={45}
              />
            )
        )}
      </Box>

      <Box>
        <InventorySummary />
      </Box>
    </div>
  );
};

export default AnalyticPage;
