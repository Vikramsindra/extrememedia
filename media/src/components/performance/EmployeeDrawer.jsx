import {
  Drawer,
  Box,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function EmployeeDrawer({ employee, onClose }) {
  if (!employee || !employee.profile) return null;

  const { profile } = employee;
  const taskBreakdown = profile.taskBreakdown || [];

  return (
    <Drawer anchor="right" open={!!employee} onClose={onClose}>
      <Box sx={{ width: 420, p: 3 }}>
        {/* HEADER */}
        <Typography variant="h6">{profile.employeeName}</Typography>
        <Typography variant="body2" color="text.secondary">
          Detailed Performance Overview
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* SUMMARY */}
        <Typography>
          <strong>Performance Score:</strong> {profile.efficiencyScore}
        </Typography>
        <Typography>
          <strong>Rating:</strong> {profile.rating}
        </Typography>
        <Typography>
          <strong>Total Tasks:</strong> {profile.totalTasks}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* TASK DETAILS */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Task Details
        </Typography>

        {taskBreakdown.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No task details available
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Target</TableCell>
                <TableCell>Actual</TableCell>
                <TableCell>Achievement %</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {taskBreakdown.map((task, idx) => (
                <TableRow key={idx}>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.target}</TableCell>
                  <TableCell>{task.actual}</TableCell>
                  <TableCell>{task.achievement}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Drawer>
  );
}

