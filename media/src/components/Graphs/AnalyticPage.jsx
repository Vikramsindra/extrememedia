import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";

import StackBarGraph from "./StackBarGraph";

/* 🔹 MOCK INVENTORY DATA */
const MOCK_INVENTORY = [
  { date: "12/5/2025", batchNo: "DX214", lotNo: 10, tranType: "IN", qty: 40 },
  {
    date: "12/13/2025",
    batchNo: "DX214",
    lotNo: 10,
    tranType: "DISPATCH",
    qty: 5,
  },
  { date: "12/13/2025", batchNo: "DX214", lotNo: 11, tranType: "IN", qty: 15 },
];

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
  const [selectedBatch, setSelectedBatch] = useState("DX214");
  const [graphTab, setGraphTab] = useState(2);

  /* 🔹 Filter inventory */
  const batchData = useMemo(
    () => MOCK_INVENTORY.filter((i) => i.batchNo === selectedBatch),
    [selectedBatch]
  );

  /* 🔹 Table rows */
  const tableRows = useMemo(() => {
    const map = {};

    batchData.forEach((item) => {
      const key = `${item.date}-${item.lotNo}`;
      if (!map[key]) {
        map[key] = {
          date: item.date,
          batchNo: item.batchNo,
          lotNo: item.lotNo,
          received: 0,
          dispatch: 0,
          returned: 0,
          redispatch: 0,
        };
      }

      if (item.tranType === "IN") map[key].received += item.qty;
      if (item.tranType === "DISPATCH") map[key].dispatch += item.qty;
    });

    return Object.values(map).map((row) => {
      const balance = row.received - row.dispatch;
      return {
        ...row,
        balance,
        returnPercent: row.received
          ? Math.round((row.returned / row.received) * 100)
          : 0,
      };
    });
  }, [batchData]);

  /* 🔹 Totals */
  const totals = useMemo(() => {
    return tableRows.reduce(
      (acc, r) => {
        acc.received += r.received;
        acc.dispatch += r.dispatch;
        acc.balance += r.balance;
        return acc;
      },
      { received: 0, dispatch: 0, balance: 0 }
    );
  }, [tableRows]);

  return (
    <div className="container">
      {/* 🔹 GRAPH TABS */}
      <Box sx={{ mb: 4 }}>
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

      {/* 🔹 TABLE */}
      <Typography variant="h4" gutterBottom>
        Inventory Analytics
      </Typography>

      <Box sx={{ maxWidth: 300, mb: 3 }}>
        <TextField
          select
          label="Select Batch No"
          fullWidth
          value={selectedBatch}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedBatch(val);
            setGraphTab(BATCHES.indexOf(val));
          }}
        >
          {BATCHES.map((b) => (
            <MenuItem key={b} value={b}>
              {b}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: "#1976d2" }}>
            <TableRow>
              {["Date", "Batch", "Lot", "Received", "Dispatch", "Balance"].map(
                (h) => (
                  <TableCell key={h} sx={{ color: "#fff", fontWeight: "bold" }}>
                    {h}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.batchNo}</TableCell>
                <TableCell>{r.lotNo}</TableCell>
                <TableCell>{r.received}</TableCell>
                <TableCell>{r.dispatch}</TableCell>
                <TableCell>{r.balance}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ background: "#f0f0f0" }}>
              <TableCell colSpan={3} fontWeight="bold">
                TOTAL
              </TableCell>
              <TableCell>{totals.received}</TableCell>
              <TableCell>{totals.dispatch}</TableCell>
              <TableCell>{totals.balance}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AnalyticPage;
