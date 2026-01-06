import { useEffect, useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import { fetchInventorySummary } from "../../services/dataService";

export default function InventorySummaryPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchInventorySummary();
        setData(res);
      } catch (err) {
        console.error("Failed to load inventory summary", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const { summaryPanel, batchSummary } = data;

  const summaryCards = [
    { label: "Received Qty", value: summaryPanel.receivedQty },
    { label: "Return Qty", value: summaryPanel.returnQty },
    { label: "Dispatch Qty", value: summaryPanel.dispatchQty },
    { label: "Re-Dispatch Qty", value: summaryPanel.reDispatchQty },
    {
      label: "Available Qty",
      value: summaryPanel.totalAvailableQty,
      highlight: true,
    },
  ];

  return (
    <Box className="container-fluid" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        📦 Inventory Summary Dashboard
      </Typography>

      {/* ===== KPI CARDS ===== */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryCards.map((card, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: card.highlight ? "#fff3cd" : "#f5f7fb",
                borderLeft: card.highlight ? "6px solid #ff9800" : "none",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {card.label}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* ===== BATCH TABLE ===== */}
      <Paper elevation={4} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Batch-wise Inventory Status
        </Typography>

        <TableContainer>
          <MuiTable size="small">
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                {[
                  "Batch",
                  "Received",
                  "Dispatch",
                  "Return",
                  "Re-Dispatch",
                  "Balance",
                  "Return %",
                ].map((h) => (
                  <TableCell key={h} sx={{ color: "#fff", fontWeight: "bold" }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {batchSummary.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f5f7fb" : "#e3edf9",
                  }}
                >
                  <TableCell fontWeight="bold">{row.batch}</TableCell>
                  <TableCell>{row.received}</TableCell>
                  <TableCell>{row.dispatch}</TableCell>
                  <TableCell>{row.return}</TableCell>
                  <TableCell>{row.reDispatch}</TableCell>
                  <TableCell>{row.balance}</TableCell>
                  <TableCell>{row.returnPercent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Paper>
    </Box>
  );
}
