import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Technician");

  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState("info");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        onLogin(data.user);
        setPopupMessage(`Welcome ${data.user.username} 👋`);
        setPopupSeverity("success");
        setShowPopup(true);
        setTimeout(() => navigate("/"), 1000);
      } else {
        setPopupMessage(data.message || "Login failed");
        setPopupSeverity("error");
        setShowPopup(true);
      }
    } catch {
      setPopupMessage("Network error");
      setPopupSeverity("error");
      setShowPopup(true);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card shadow-lg p-4"
        style={{
          width: "380px",
          borderRadius: "16px",
        }}
      >
        {/* Avatar */}
        <div className="text-center mb-3">
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 56,
              height: 56,
              margin: "0 auto",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
        </div>

        {/* Title */}
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={2}>
          Login
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <TextField
              label="Role"
              select
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="Technician">Technician</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            size="large"
            sx={{
              borderRadius: "30px",
              py: 1.2,
              fontWeight: "bold",
              textTransform: "none",
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              border: "2px solid transparent",
              transition: "all 0.3s ease",
              color: "black",
              "&:hover": {
                background: "transparent",
                color: "#1976d2",
                border: "2px solid #1976d2",
                boxShadow: "0 8px 20px rgba(25, 118, 210, 0.3)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Sign In
          </Button>
        </form>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={showPopup}
        autoHideDuration={4000}
        onClose={() => setShowPopup(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={popupSeverity} onClose={() => setShowPopup(false)}>
          {popupMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
