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
import PerformanceDashboard from "./pages/PerformanceDashboard";

// ✅ AUTH SERVICE
import { fetchCurrentUser } from "./services/user";
import CreateUser from "./pages/CreateUser";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // ✅ Restore session on page reload (Axios + Service)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetchCurrentUser();
        setIsLoggedIn(true);
        setUser(res.user); // ✅ FIXED
      } catch (err) {
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Optional: prevent route flicker
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

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
                  <Route
                    path="/performance"
                    element={<PerformanceDashboard />}
                  />
                  <Route path="/createUser" element={<CreateUser />} />

                  
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
