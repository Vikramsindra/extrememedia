import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import AssignTask from "./pages/Assign";
import GiveTask from "./pages/GiveTask";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskPage from "./pages/Task/TaskPage";
import DevicePage from "./pages/Device-details/DeviceDetail";
import Inventory from "./pages/Inventory-mangement/InventoryPage";

import AnalyticPage from "./components/Graphs/AnalyticPage";
import PerformanceDashboard from "./pages/PerformanceDashboard"; // ✅ NEW

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // ✅ Check session on reload
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setIsLoggedIn(true);
        setUser(data.user);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        user={user}
      />

      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route
            path="/"
            element={<Home user={user} isLoggedIn={isLoggedIn} />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* ================= PROTECTED ROUTES ================= */}
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/assign" element={<AssignTask />} />
              <Route path="/task" element={<TaskForm />} />
              <Route path="/deviceDetail" element={<DevicePage />} />
              <Route path="/taskListing" element={<TaskPage />} />

              {/* ===== ADMIN / MANAGER ONLY ===== */}
              {(user?.role === "admin" || user?.role === "manager") && (
                <>
                  <Route path="/give-task" element={<GiveTask user={user} />} />
                  <Route
                    path="/inventory"
                    element={<Inventory user={user} />}
                  />
                  <Route path="/analytics" element={<AnalyticPage />} />

                  {/* ✅ PERFORMANCE DASHBOARD */}
                  <Route
                    path="/performance"
                    element={<PerformanceDashboard />}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Route
                path="/dashboard"
                element={<p>Please login to view dashboard.</p>}
              />
              <Route
                path="/assign"
                element={<p>Please login to view assigned tasks.</p>}
              />
              <Route path="/task" element={<p>Please login to add tasks.</p>} />
              <Route
                path="/inventory"
                element={<p>Please login to view inventory.</p>}
              />
            </>
          )}

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
