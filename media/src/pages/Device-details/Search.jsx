import SearchIcon from "@mui/icons-material/Search";
import { TextField, Button, InputAdornment, Box } from "@mui/material";

function Search({ value, onChange, onSearch }) {
  const handleChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    onChange?.(numericValue);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center fs-3 mb-4 mt-5"> Search a Device Detail </h1>
      <div className="row justify-content-center ">
        <div className="col-md-6 col-lg-4">
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Enter a device no."
              value={value}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
              type="text" // keep text to avoid scroll arrows
              slotProps={{
                input: {
                  inputMode: "numeric", // mobile numeric keyboard
                  pattern: "[0-9]*",
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              onClick={onSearch}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                whiteSpace: "nowrap",
              }}
            >
              Search
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Search;
