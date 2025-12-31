import { useEffect, useState } from "react";
import {
  Typography,
  Snackbar,
  Alert,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import Analytic from "../components/Graphs/AnalyticPage";

const Dashboard = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  // Show login success message
  useEffect(() => {
    if (location.state?.justLoggedIn) {
      setShowPopup(true);
    }
  }, [location.state]);

  return (
    <Box className="container-fluid">
      {/* ================= LOGIN SUCCESS POPUP ================= */}
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
            marginTop: "100px",
          }}
        >
          ✅ Login successful — Welcome {user?.username}!
        </Alert>
      </Snackbar>

      {/* ================= DASHBOARD HEADER ================= */}
      <Typography
        variant="h4"
        align="center"
        sx={{ mt: 3, mb: 4, fontWeight: 600 }}
      >
        Dashboard
      </Typography>

      {/* ================= DASHBOARD ACTION CARDS ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 3,
          mb: 5,
        }}
      >
        {/* PERFORMANCE DASHBOARD CARD */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Performance Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View top performing employees, rankings, and detailed performance
              insights with charts.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              onClick={() => navigate("/performance")}
            >
              View Performance
            </Button>
          </CardActions>
        </Card>

        {/* (Future cards can be added here easily) */}
      </Box>

      {/* ================= ANALYTICS SECTION ================= */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 2, fontWeight: 500 }}
        >
          Analytics
        </Typography>

        <Analytic />
      </Box>
    </Box>
  );
};

export default Dashboard;

