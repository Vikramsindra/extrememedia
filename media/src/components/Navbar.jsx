import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  AssignmentTurnedIn,
  Login as LoginIcon,
  AddCircleOutline,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout, user }) => {
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState("info");
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log("✅ Logout successful:", data);

      onLogout();
      navigate("/");

      setPopupMessage(data.message || "Logged out successfully");
      setPopupSeverity("info");
      setShowPopup(true);
    } catch (err) {
      console.log("❌ Logout failed:", err);
      setPopupMessage("Logout failed");
      setPopupSeverity("error");
      setShowPopup(true);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ height: 80, justifyContent: "center" }}>
        <Toolbar sx={{ minHeight: 80 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              flexGrow: 1,
            }}
            onClick={() => navigate("/")}
          >
            <AssignmentTurnedIn sx={{ mr: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              Extreme Media
            </Typography>
          </Box>

          {/* ✅ Always visible */}

          {isLoggedIn && (
            <Button
              sx={{ fontSize: "1.1rem", px: 3 }}
              color="inherit"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          )}

          {isLoggedIn &&
            (user?.role === "manager" || user?.role === "admin" ? (
              <Button
                sx={{ fontSize: "1.1rem", px: 3 }}
                color="inherit"
                onClick={() => navigate("/give-task")}
                startIcon={<AddCircleOutline />}
              >
                Give Task
              </Button>
            ) : (
              <Button
                sx={{ fontSize: "1.1rem", px: 3 }}
                color="inherit"
                onClick={() => navigate("/assign")}
                startIcon={<AddCircleOutline />}
              >
                Assigned Task
              </Button>
            ))}

          {!isLoggedIn ? (
            <Button
              sx={{ fontSize: "1.1rem", px: 3 }}
              color="inherit"
              onClick={() => navigate("/login")}
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          ) : (
            <Box>
              <Button
                sx={{ fontSize: "1.1rem", px: 3 }}
                color="inherit"
                onClick={() => navigate("/task")}
                startIcon={<AddCircleOutline />}
              >
                Add Task
              </Button>
              <Button
                sx={{ fontSize: "1.1rem", px: 3 }}
                color="inherit"
                onClick={handleLogout}
                startIcon={<Logout />}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* ✅ Logout Popup */}
      <Snackbar
        open={showPopup}
        autoHideDuration={4000}
        onClose={() => setShowPopup(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={popupSeverity}
          onClose={() => setShowPopup(false)}
          sx={{ width: "300%" }}
        >
          {popupMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
