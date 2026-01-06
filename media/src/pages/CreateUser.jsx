import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import useAutoClearMessage from "../Hooks/ShowMsg";
import { registerUser } from "../services/user";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("technician");
  const [loading, setLoading] = useState(false);

  const { msg, showMsg } = useAutoClearMessage(5000);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call backend to register user
      await registerUser({ username, name, password, role });

      // ✅ Show success popup
      setSuccessOpen(true);

      // ✅ Clear all fields
      setUsername("");
      setName("");
      setPassword("");
      setRole("technician");
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      showMsg(message);
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 2,
        border: "4px double black",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create User
      </Typography>

      {/* ❌ Error Alert */}
      {msg && (
        <Alert variant="filled" severity="error" sx={{ mt: 3, mb: 3 }}>
          {msg}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading} style={{ border: "none", padding: 0 }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Role"
            select
            fullWidth
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="technician">Technician</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create User"
            )}
          </Button>
        </fieldset>
      </form>

      {/* ✅ Success Snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ✅ User created successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateUser;
