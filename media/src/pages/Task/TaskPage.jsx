import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import TaskListing from "./TaskListing";
import { getTasks, verifyTask, rejectTask } from "../../services/taskService";

const TaskPage = () => {
  const [status, setStatus] = useState("PENDING");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // For reject dialog
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks(status);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [status]);

  const handleVerify = async (taskId) => {
    try {
      await verifyTask(taskId);
      fetchTasks();
    } catch (err) {
      console.error("Failed to verify task:", err);
    }
  };

  const handleRejectClick = (taskId) => {
    setSelectedTaskId(taskId);
    setRejectionReason("");
    setOpenRejectDialog(true);
  };

  const handleRejectConfirm = async () => {
    try {
      await rejectTask(selectedTaskId, rejectionReason);
      setOpenRejectDialog(false);
      fetchTasks();
    } catch (err) {
      console.error("Failed to reject task:", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>

      <TextField
        select
        label="Filter by Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ mb: 3, minWidth: 200 }}
      >
        <MenuItem value="PENDING">PENDING</MenuItem>
        <MenuItem value="SUBMITTED">SUBMITTED</MenuItem>
        <MenuItem value="VERIFIED">VERIFIED</MenuItem>
        <MenuItem value="REJECTED">REJECTED</MenuItem>
      </TextField>

      <TaskListing
        tasks={tasks}
        loading={loading}
        status={status}
        onVerify={handleVerify}
        onReject={handleRejectClick}
      />

      {/* Reject Task Dialog */}
      <Dialog
        open={openRejectDialog}
        onClose={() => setOpenRejectDialog(false)}
      >
        <DialogTitle>Reject Task</DialogTitle>
        <DialogContent>
          <MuiTextField
            autoFocus
            margin="dense"
            label="Rejection Reason"
            type="text"
            fullWidth
            multiline
            minRows={3}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRejectDialog(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleRejectConfirm}
            disabled={!rejectionReason.trim()}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskPage;
