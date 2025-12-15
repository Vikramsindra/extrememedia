import { useEffect, useState } from "react";
import { Typography, Snackbar, Alert, Box, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation } from "react-router-dom";
import Anayalatic from "../components/Graphs/AnayalticPage";

const Dashboard = ({ user }) => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (location.state?.justLoggedIn) {
      setShowPopup(true);
    }
  }, [location.state]);

  return (
    <div className="container-fluid">
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

      <div className="container-fluid">
        <h1 className="mt-2 text-center fs-1 ">Analytics </h1>
        <Anayalatic/>
      </div>
      
    </div>

  );
};

export default Dashboard;