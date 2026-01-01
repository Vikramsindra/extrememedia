import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";

import useAutoClearMessage from "../Hooks/ShowMsg";
import { loginUser } from "../services/user";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("technician");
  const [loading, setLoading] = useState(false);

  const { msg, showMsg } = useAutoClearMessage(5000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ username, password, role });

      // ✅ Save user in app state
      onLogin(res.user);

      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      showMsg(message);
      console.error("Login error:", err);
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
        Login
      </Typography>

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

          {/* ✅ LOGIN BUTTON ONLY */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </fieldset>
      </form>
    </Box>
  );
};

export default Login;
