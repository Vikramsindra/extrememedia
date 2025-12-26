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

function Table({ data, header }) {
  return (
    <div className="container-fluid mb-5 mt-4">
      <Typography variant="h6" gutterBottom>
        Inventory Transactions
      </Typography>

      <TableContainer component={Paper} elevation={4}>
        <MuiTable size="small">
          <TableHead sx={{ backgroundColor: "#4f81bd" }}>
            <TableRow>
              {header.map((head) => (
                <TableCell
                  key={head}
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#e8f0fa" : "#c7d9ed",
                }}
              >
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.client}</TableCell>
                <TableCell>{row.batch}</TableCell>
                <TableCell>{row.lot}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.qty}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.rcdc}</TableCell>
                <TableCell>{row.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
}

export default Table;
