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
} from "@mui/material";

export default function InventorySummaryPage() {
  const summaryTop = [
    { label: "Received Qty", value: 1223 },
    { label: "Return Qty", value: 59 },
    { label: "Total In Qty", value: 1282, highlight: true },
    { label: "Dispatch Qty", value: 805 },
    { label: "Re-Dispatch Qty", value: 59 },
  ];

  const summaryFooter = { label: "Total Available Qty", value: 418 };

  const batchData = [
    {
      batch: "DX109",
      received: 148,
      dispatch: 65,
      returned: 0,
      redispatch: 0,
      balance: 83,
      returnPercent: "0%",
    },
    {
      batch: "DX128",
      received: 1010,
      dispatch: 725,
      returned: 59,
      redispatch: 59,
      balance: 285,
      returnPercent: "6%",
    },
    {
      batch: "DX214",
      received: 65,
      dispatch: 15,
      returned: 0,
      redispatch: 0,
      balance: 50,
      returnPercent: "0%",
    },
  ];

  const totals = {
    received: 1223,
    dispatch: 805,
    returned: 59,
    redispatch: 59,
    balance: 418,
    returnPercent: "5%",
  };

  return (
    <div className="container-fluid border-top">
      <h1 className="text-center fs-2">Batch Wise Summary</h1>
      <Grid container spacing={3} sx={{ mt: 3, alignItems: "stretch", mb: 5 }}>
        {/* ===== LEFT SUMMARY TABLE ===== */}
        <Grid item xs={12} md={3}>
          <TableContainer
            component={Paper}
            elevation={4}
            sx={{ height: "100%", mt: 3 }}
          >
            <MuiTable size="small">
              <TableHead sx={{ backgroundColor: "#4f81bd" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Summary
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    align="right"
                  >
                    Qty
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {summaryTop.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      height: 42,
                      backgroundColor: row.highlight
                        ? "#ffff00"
                        : index % 2 === 0
                        ? "#e8f0fa"
                        : "#c7d9ed",
                    }}
                  >
                    <TableCell>{row.label}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}

                {/* FOOTER */}
                <TableRow sx={{ backgroundColor: "#ffff00", height: 42 }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {summaryFooter.label}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {summaryFooter.value}
                  </TableCell>
                </TableRow>
              </TableBody>
            </MuiTable>
          </TableContainer>
        </Grid>

        {/* ===== RIGHT BATCH TABLE ===== */}
        <Grid item xs={12} md={9}>
          <Typography variant="h6" gutterBottom>
            Batch-wise Inventory
          </Typography>

          <TableContainer
            component={Paper}
            elevation={4}
            sx={{ width: "130%" }}
          >
            <MuiTable size="small">
              <TableHead sx={{ backgroundColor: "#4f81bd" }}>
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
                    <TableCell
                      key={h}
                      sx={{ color: "#fff", fontWeight: "bold" }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {batchData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      height: 42,
                      backgroundColor: index % 2 === 0 ? "#e8f0fa" : "#c7d9ed",
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {row.batch}
                    </TableCell>
                    <TableCell>{row.received}</TableCell>
                    <TableCell>{row.dispatch}</TableCell>
                    <TableCell>{row.returned}</TableCell>
                    <TableCell>{row.redispatch}</TableCell>
                    <TableCell>{row.balance}</TableCell>
                    <TableCell>{row.returnPercent}</TableCell>
                  </TableRow>
                ))}

                <TableRow sx={{ backgroundColor: "#ffff00", height: 42 }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
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
                    {totals.returnPercent}
                  </TableCell>
                </TableRow>
              </TableBody>
            </MuiTable>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
