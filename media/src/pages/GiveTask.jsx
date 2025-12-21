import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper
} from "@mui/material";

const TASK_OPTIONS = [
  "Full Opening",
  "Silicone Removing",
  "IC Removing, Tinning & Cleaning",
  "Resister Removing",
  "IC Replacing",
  "Resister Replacing",
  "Debugging",
  "Rework",
  "Applying Silicon (IC)",
  "Applying Silicon (LEDs)",
  "Half Fitting",
  "Mesh Fitting",
  "Full Fitting",
  "QC",
  "Back Glue Apply",
  "Other"
];

const GiveTask = () => {
  const [taskName, setTaskName] = useState("");
  const [customTask, setCustomTask] = useState("");
  const [description, setDescription] = useState("");
  const [assignedBy, setAssignedBy] = useState("manager01");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const isOtherSelected = taskName === "Other";

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalTaskName = isOtherSelected ? customTask : taskName;

    const payload = {
      taskName: finalTaskName,
      description,
      assignedBy,
      assignedTo,
      priority,
      dueDate
    };

    console.log("TASK DATA:", payload);

    // 🔗 Later you can send this to backend
    // fetch("/api/task", { method: "POST", body: JSON.stringify(payload) })
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
        <Typography variant="h5" gutterBottom>
          ✅ Give Task
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* TASK NAME DROPDOWN */}
          <TextField
            label="Task Name"
            select
            fullWidth
            margin="normal"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          >
            {TASK_OPTIONS.map((task) => (
              <MenuItem key={task} value={task}>
                {task}
              </MenuItem>
            ))}
          </TextField>

          {/* SHOW ONLY IF "OTHER" */}
          {isOtherSelected && (
            <TextField
              label="Custom Task Name"
              fullWidth
              margin="normal"
              value={customTask}
              onChange={(e) => setCustomTask(e.target.value)}
              required
            />
          )}

          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="Assigned By"
            fullWidth
            margin="normal"
            value={assignedBy}
            disabled
          />

          <TextField
            label="Assigned To"
            fullWidth
            margin="normal"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />

          <TextField
            label="Priority"
            select
            fullWidth
            margin="normal"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>

          <TextField
            label="Due Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            GIVE TASK
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default GiveTask;

