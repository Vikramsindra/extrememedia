import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

function Table({ data = [], columns, title = "Inventory Transactions" }) {
  if (!data.length) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        No records available
      </Typography>
    );
  }

  return (
    <div className="container-fluid mb-5 mt-4">
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <TableContainer component={Paper} elevation={4}>
        <MuiTable size="small">
          {/* Header */}
          <TableHead sx={{ backgroundColor: "#4f81bd" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                #
              </TableCell>

              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align={col.align || "left"}
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.id || index}
                hover
                sx={{
                  backgroundColor: index % 2 === 0 ? "#e8f0fa" : "#c7d9ed",
                }}
              >
                <TableCell>{index + 1}</TableCell>

                {columns.map((col) => (
                  <TableCell key={col.field} align={col.align || "left"}>
                    {row[col.field] ?? "—"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
}

export default Table;
