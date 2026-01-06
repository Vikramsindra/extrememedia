import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

const TaskListing = ({ tasks, loading, status, onVerify, onReject }) => {
  if (loading) return <CircularProgress />;

  if (!tasks || tasks.length === 0)
    return <Typography>No tasks found for this status</Typography>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Priority</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Assigned By</TableCell>
          <TableCell>Assigned To</TableCell>
          {status === "SUBMITTED" && <TableCell>Action</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.id}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.assignedBy?.username}</TableCell>
            <TableCell>{task.assignedTo?.username}</TableCell>
            {status === "SUBMITTED" && (
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1, // horizontal spacing between buttons
                    flexWrap: "wrap", // wrap buttons on small screens
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => onVerify(task.id)}
                  >
                    Verify
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onReject(task.id)}
                  >
                    Reject
                  </Button>
                </Box>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskListing;
