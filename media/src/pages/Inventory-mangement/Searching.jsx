import { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  MenuItem,
} from "@mui/material";

import useAutoClearMessage from "../../Hooks/ShowMsg";

function Search({ fromDate, toDate, setFromDate, setToDate, onSubmit }) {
  const { msg, showMsg } = useAutoClearMessage(3000);

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      showMsg("Please select both From Date and Till Date");
      return;
    }

    if (fromDate > toDate) {
      showMsg("From Date cannot be greater than Till Date");
      return;
    }
    onSubmit();
    console.log("Searching from:", fromDate, "to:", toDate);
  };

  return (
    <div className="container">
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: 4, mt: 3, fontWeight: "700" }}
      >
        Search by Date
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <TextField
          label="From Date"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ width: "20%" }}
        />

        <TextField
          label="Till Date"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ width: "20%" }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ height: "56px" }}
        >
          Search
        </Button>
      </Box>

      {msg && (
        <Stack sx={{ width: "70%", mt: 2 }}>
          <Alert variant="filled" severity="error">
            {msg}
          </Alert>
        </Stack>
      )}
    </div>
  );
}

export default Search;
