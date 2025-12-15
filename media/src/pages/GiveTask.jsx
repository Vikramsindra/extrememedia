import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TaskTable from "./Task/TaskListing";

const GiveTask = ({ user }) => {
  // ✅ Calculate tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDueDate = tomorrow.toISOString().split("T")[0];

  // ✅ Form state with assignee = logged-in user
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: user?.username || "",
    assignedTo: "",
    priority: "",
    dueDate: defaultDueDate,
  });

  const [popup, setPopup] = useState({
    open: false,
    message: "",
    severity: "info",
  });


  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/task/taskcreate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ sends session cookies
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setPopup({
          open: true,
          message: result.message || "Task given successfully",
          severity: "success",
        });
        setFormData({
          title: "",
          description: "",
          assignee: user?.username || "",
          assignedTo: "",
          priority: "",
          dueDate: defaultDueDate,
        });
      } else {
        setPopup({
          open: true,
          message: result.error || "Something went wrong",
          severity: "error",
        });
        console.log(result);
      }
    } catch (err) {
      setPopup({
        open: true,
        message: "Network error",
        severity: "error",
      });
    }
  };

  return (
    <div className="container">
      <Box sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <AssignmentTurnedInIcon color="primary" fontSize="large" />
          <Typography variant="h5" fontWeight="bold">
            Give Task
          </Typography>
        </Box>

        <Stack spacing={2} sx={{ maxWidth: 600 }}>
          <TextField
            label="Task Title"
            fullWidth
            value={formData.title}
            onChange={handleChange("title")}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange("description")}
          />
          <TextField
            label="Assignee"
            fullWidth
            value={formData.assignee}
            disabled
          />
          <TextField
            label="Assigned To"
            fullWidth
            value={formData.assignedTo}
            onChange={handleChange("assignedTo")}
            placeholder="e.g. Electrical Team, Project A"
          />
          <TextField
            label="Priority"
            select
            fullWidth
            value={formData.priority}
            onChange={handleChange("priority")}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            value={formData.dueDate}
            onChange={handleChange("dueDate")}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Give Task
          </Button>
        </Stack>

        <Snackbar
          open={popup.open}
          autoHideDuration={4000}
          onClose={() => setPopup({ ...popup, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={popup.severity}
            onClose={() => setPopup({ ...popup, open: false })}
          >
            {popup.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default GiveTask;
