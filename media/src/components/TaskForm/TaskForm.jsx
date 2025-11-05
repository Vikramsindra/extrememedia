import { useState } from "react";
import { Box, Tab, Typography, Snackbar, Alert } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Form1 from "./FormStep1";
import Form2 from "./FormStep2";
import Form3 from "./FormStep3";
import Form4 from "./FormStep4";
import Form5 from "./FormStep5";

const TaskForm = () => {
  const [value, setValue] = useState("1");
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
  });
  const [popup, setPopup] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setPopup({
        open: true,
        message: data.message || "Task created successfully",
        severity: "success",
      });
      setFormData({
        field1: "",
        field2: "",
        field3: "",
        field4: "",
        field5: "",
      });
      setValue("1");
    } catch {
      setPopup({
        open: true,
        message: "Failed to submit task",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Task Form
      </Typography>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Task Form Tabs">
            <Tab
              label="Form1"
              value="1"
              sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
            />
            <Tab
              label="Form2"
              value="2"
              sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
            />
            <Tab
              label="Form3"
              value="3"
              sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
            />
            <Tab
              label="Form4"
              value="4"
              sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
            />
            <Tab
              label="Form5"
              value="5"
              sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
            />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Form1 formData={formData} setFormData={setFormData} />
        </TabPanel>
        <TabPanel value="2">
          <Form2 formData={formData} setFormData={setFormData} />
        </TabPanel>
        <TabPanel value="3">
          <Form3 formData={formData} setFormData={setFormData} />
        </TabPanel>
        <TabPanel value="4">
          <Form4 formData={formData} setFormData={setFormData} />
        </TabPanel>
        <TabPanel value="5">
          <Form5
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        </TabPanel>
      </TabContext>

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
  );
};

export default TaskForm;
