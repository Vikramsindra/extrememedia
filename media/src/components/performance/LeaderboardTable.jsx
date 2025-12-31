import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

export default function LeaderboardTable({
  data,
  onSelectEmployee,
  selectedEmployee,
}) {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Employee Rankings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Click on an employee to view detailed performance
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Tasks</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((emp, i) => {
            const isSelected =
              selectedEmployee?.employeeName === emp.employeeName;

            return (
              <TableRow
                key={emp.employeeName}
                hover
                selected={isSelected}
                onClick={() => onSelectEmployee(emp)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f7fa",
                  },
                }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ fontWeight: isSelected ? 600 : 400 }}>
                  {emp.employeeName}
                </TableCell>
                <TableCell>{emp.totalTasks}</TableCell>
                <TableCell>{emp.rating}</TableCell>
                <TableCell>{emp.efficiencyScore}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

