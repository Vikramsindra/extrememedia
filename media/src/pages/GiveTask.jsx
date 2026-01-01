import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { createTask } from "../services/taskService";

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
  "Other",
];

const GiveTask = () => {
  const [taskName, setTaskName] = useState("");
  const [customTask, setCustomTask] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);

  const isOtherSelected = taskName === "Other";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalTaskName = isOtherSelected ? customTask : taskName;

    if (!finalTaskName.trim()) {
      alert("Task name is required");
      return;
    }

    const payload = {
      title: finalTaskName, // ✅ backend expects `title`
      description,
      assignee: assignedTo, // ✅ mapped correctly
      assignedTo,
      priority,
    };

    try {
      setLoading(true);
      await createTask(payload);
      alert("✅ Task given successfully!");

      // Reset form
      setTaskName("");
      setCustomTask("");
      setDescription("");
      setAssignedTo("");
      setPriority("");
    } catch (err) {
      console.error("❌ Task creation failed:", err.response?.data || err);
      alert("❌ Failed to give task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
        <Typography variant="h5" gutterBottom>
          ✅ Give Task
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* TASK NAME */}
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

          {/* CUSTOM TASK */}
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

          {/* DESCRIPTION */}
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* ASSIGNED TO */}
          <TextField
            label="Assigned To"
            fullWidth
            margin="normal"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />

          {/* PRIORITY */}
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "GIVING TASK..." : "GIVE TASK"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default GiveTask;
