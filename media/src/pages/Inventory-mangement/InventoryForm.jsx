import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { addData } from "../../services/dataService";

// helper → today's date (YYYY-MM-DD)
const today = new Date().toISOString().split("T")[0];

const InventoryForm = () => {
  const initialState = {
    tranDate: today,
    client: "Xtream Media",
    batchNo: "",
    lotNo: "",
    tranType: "",
    qty: "",
    returnReason: "",
    rcDcNo: "",
    remarks: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // popup states
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // auto clear returnReason if not RETURN
      ...(name === "tranType" && value !== "RETURN"
        ? { returnReason: "" }
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addData(formData);

      // ✅ success popup
      setSuccessOpen(true);

      // ✅ reset form
      setFormData(initialState);
    } catch (err) {
      console.error("Inventory save error:", err);
      setErrorMsg(
        err.response?.data?.message || "Failed to save inventory entry"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Module Inward Entry
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Tran Date"
            type="date"
            name="tranDate"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.tranDate}
            onChange={handleChange}
            required
          />

          <TextField
            label="Client"
            name="client"
            fullWidth
            margin="normal"
            value={formData.client}
            onChange={handleChange}
          />

          <TextField
            label="Batch No"
            name="batchNo"
            select
            fullWidth
            margin="normal"
            value={formData.batchNo}
            onChange={handleChange}
            required
          >
            <MenuItem value="DX109">DX109</MenuItem>
            <MenuItem value="DX128">DX128</MenuItem>
            <MenuItem value="DX214">DX214</MenuItem>
          </TextField>

          <TextField
            label="Lot No"
            name="lotNo"
            fullWidth
            margin="normal"
            value={formData.lotNo}
            onChange={handleChange}
            required
          />

          <TextField
            label="Tran Type"
            name="tranType"
            select
            fullWidth
            margin="normal"
            value={formData.tranType}
            onChange={handleChange}
            required
          >
            <MenuItem value="IN">IN</MenuItem>
            <MenuItem value="DISPATCH">DISPATCH</MenuItem>
            <MenuItem value="REPAIR_DISPATCH">REPAIR DISPATCH</MenuItem>
            <MenuItem value="RETURN">RETURN</MenuItem>
          </TextField>

          <TextField
            label="Quantity"
            name="qty"
            type="number"
            fullWidth
            margin="normal"
            value={formData.qty}
            onChange={handleChange}
            required
          />

          {/* ✅ Show only when RETURN */}
          {formData.tranType === "RETURN" && (
            <TextField
              label="Return Reason"
              name="returnReason"
              fullWidth
              margin="normal"
              value={formData.returnReason}
              onChange={handleChange}
              required
            />
          )}

          <TextField
            label="RC / DC No"
            name="rcDcNo"
            fullWidth
            margin="normal"
            value={formData.rcDcNo}
            onChange={handleChange}
          />

          <TextField
            label="Remarks"
            name="remarks"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={formData.remarks}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Saving..." : "SAVE INVENTORY"}
          </Button>
        </form>
      </Paper>

      {/* ✅ SUCCESS POPUP */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessOpen(false)}
        >
          Inventory entry saved successfully ✅
        </Alert>
      </Snackbar>

      {/* ❌ ERROR POPUP */}
      <Snackbar
        open={!!errorMsg}
        autoHideDuration={4000}
        onClose={() => setErrorMsg("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorMsg("")}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InventoryForm;
