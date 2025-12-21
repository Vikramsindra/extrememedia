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
  Paper
} from "@mui/material";

/* 🔹 MOCK INVENTORY DATA */
const MOCK_INVENTORY = [
  {
    date: "12/5/2025",
    batchNo: "DX214",
    lotNo: 10,
    tranType: "IN",
    qty: 40
  },
  {
    date: "12/13/2025",
    batchNo: "DX214",
    lotNo: 10,
    tranType: "DISPATCH",
    qty: 5
  },
  {
    date: "12/13/2025",
    batchNo: "DX214",
    lotNo: 11,
    tranType: "IN",
    qty: 15
  }
];

const BATCHES = ["DX109", "DX128", "DX214"];

const AnalyticPage = () => {
  const [selectedBatch, setSelectedBatch] = useState("DX214");

  /* 🔹 Filter by batch */
  const batchData = useMemo(() => {
    return MOCK_INVENTORY.filter(
      (item) => item.batchNo === selectedBatch
    );
  }, [selectedBatch]);

  /* 🔹 Build table rows */
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
          redispatch: 0
        };
      }

      if (item.tranType === "IN") map[key].received += item.qty;
      if (item.tranType === "DISPATCH") map[key].dispatch += item.qty;
      if (item.tranType === "RETURN") map[key].returned += item.qty;
      if (item.tranType === "REPAIR_DISPATCH")
        map[key].redispatch += item.qty;
    });

    return Object.values(map).map((row) => {
      const balance =
        row.received -
        row.dispatch -
        row.redispatch +
        row.returned;

      const returnPercent =
        row.received > 0
          ? Math.round((row.returned / row.received) * 100)
          : 0;

      return {
        ...row,
        balance,
        returnPercent
      };
    });
  }, [batchData]);

  /* 🔹 Totals row */
  const totals = useMemo(() => {
    const total = {
      received: 0,
      dispatch: 0,
      returned: 0,
      redispatch: 0,
      balance: 0
    };

    tableRows.forEach((row) => {
      total.received += row.received;
      total.dispatch += row.dispatch;
      total.returned += row.returned;
      total.redispatch += row.redispatch;
      total.balance += row.balance;
    });

    const returnPercent =
      total.received > 0
        ? Math.round((total.returned / total.received) * 100)
        : 0;

    return { ...total, returnPercent };
  }, [tableRows]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Inventory Analytics
      </Typography>

      {/* 🔹 Batch Selector */}
      <Box sx={{ maxWidth: 300, mb: 3 }}>
        <TextField
          select
          label="Select Batch No"
          fullWidth
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          {BATCHES.map((batch) => (
            <MenuItem key={batch} value={batch}>
              {batch}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* 🔹 Analytics Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              {[
                "Date",
                "Batch No",
                "Lot No",
                "Received Qty",
                "Dispatch Qty",
                "Return Qty",
                "Re-Dispatch Qty",
                "Balance Qty",
                "Return %"
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableRows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.batchNo}</TableCell>
                <TableCell>{row.lotNo}</TableCell>
                <TableCell>{row.received}</TableCell>
                <TableCell>{row.dispatch}</TableCell>
                <TableCell>{row.returned}</TableCell>
                <TableCell>{row.redispatch}</TableCell>
                <TableCell>{row.balance}</TableCell>
                <TableCell>{row.returnPercent}%</TableCell>
              </TableRow>
            ))}

            {/* 🔹 TOTAL ROW */}
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>
                TOTAL
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {totals.received}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {totals.dispatch}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {totals.returned}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {totals.redispatch}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {totals.balance}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {totals.returnPercent}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AnalyticPage;
