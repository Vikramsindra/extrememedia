import { TableRow, TableCell, Button, Chip } from "@mui/material";

export default function TaskRow({ task, onMarkComplete }) {
  return (
    <TableRow hover>
      <TableCell>{task.task_id}</TableCell>
      <TableCell>{task.task_desc}</TableCell>
      <TableCell>{task.technician}</TableCell>
      <TableCell>{task.quantity}</TableCell>

      {/* Status */}
      <TableCell>
        <Chip
          label={task.status}
          color={task.status === "Verified" ? "success" : "warning"}
          variant="outlined"
        />
      </TableCell>

      {/* Action */}
      <TableCell align="center">
        <Button
          variant="contained"
          size="small"
          color="success"
          disabled={task.status === "Verified"}
          onClick={() => onMarkComplete(task.task_id)}
        >
          Verify
        </Button>
      </TableCell>
    </TableRow>
  );
}
