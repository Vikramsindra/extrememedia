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
    <div className="container-fluid text-center">
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{
          borderRadius: 3,
          maxHeight: 600,
          overflowX: "auto",

          // 👇 INCREASE WIDTH NICELY
          width: "100%",
          maxWidth: "95vw", // takes almost full screen
          margin: "0 auto", // center table
        }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Task Verification List
        </Typography>

        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                Task ID
              </TableCell>

              {/* 👇 wider description column */}
              <TableCell sx={{ fontWeight: "bold", minWidth: 400 }}>
                Description
              </TableCell>

              <TableCell sx={{ fontWeight: "bold", minWidth: 160 }}>
                Technician
              </TableCell>

              <TableCell sx={{ fontWeight: "bold", minWidth: 120 }}>
                Quantity
              </TableCell>

              <TableCell sx={{ fontWeight: "bold", minWidth: 140 }}>
                Status
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: "bold", minWidth: 140 }}
              >
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
    </div>
  );
}
