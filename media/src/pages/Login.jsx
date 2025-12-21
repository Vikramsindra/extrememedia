import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("technician");

  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState("info");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role })
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { message: "Server error. Invalid response." };
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      onLogin(data.user);

      setPopupMessage(`Welcome ${data.user.username}`);
      setPopupSeverity("success");
      setShowPopup(true);

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      setPopupMessage(err.message);
      setPopupSeverity("error");
      setShowPopup(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 3, border: "2px solid black", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>

      <Snackbar
        open={showPopup}
        autoHideDuration={4000}
        onClose={() => setShowPopup(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={popupSeverity} sx={{ width: "100%" }}>
          {popupMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
