import { useEffect, useState } from "react";
import { Typography, Snackbar, Alert, Box, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation } from "react-router-dom";

const Dashboard = ({ user }) => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (location.state?.justLoggedIn) {
      setShowPopup(true);
    }
  }, [location.state]);

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.username}
          </Typography>
          <Typography variant="subtitle1">
            You are logged in as <strong>{user?.role}</strong>.
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={showPopup}
        autoHideDuration={4000}
        onClose={() => setShowPopup(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setShowPopup(false)}
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            py: 2,
            px: 3,
            borderRadius: 2,
            marginTop: "30px"
          }}
        >
          ✅ Login successful — Welcome {user?.username}!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;