import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";

const InventoryForm = ({ handleChange, formData, handleSubmit }) => {
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
            fullWidth
            margin="normal"
            value={formData.batchNo}
            onChange={handleChange}
            required
          />

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
            <MenuItem value="REPAIR_DISPATCH">REPAIR_DISPATCH</MenuItem>
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

          <TextField
            label="Return Reason"
            name="returnReason"
            fullWidth
            margin="normal"
            value={formData.returnReason}
            onChange={handleChange}
          />

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

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            SAVE INVENTORY
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default InventoryForm;
