import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import TaskRow from "./Task";

export default function TaskTable({ tasks = [], onMarkComplete }) {
  return (
    <TableContainer
      component={Paper}
      elevation={6}
      sx={{
        borderRadius: 3,
        maxHeight: 600,        // 🔹 required for sticky header
        overflow: "auto",
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Task Verification List
      </Typography>

      {/* 🔹 stickyHeader enabled */}
      <Table stickyHeader sx={{ minWidth: 1200 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Task ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Technician</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TaskRow
              key={task.task_id}
              task={task}
              onMarkComplete={onMarkComplete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
