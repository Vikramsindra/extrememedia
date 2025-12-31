import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import KPISection from "../components/performance/KPISection";
import OrgPerformanceCharts from "../components/performance/OrgPerformanceCharts";
import LeaderboardTable from "../components/performance/LeaderboardTable";
import EmployeeDrawer from "../components/performance/EmployeeDrawer";

export default function PerformanceDashboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loadingEmployee, setLoadingEmployee] = useState(false);

  // =============================
  // FETCH LEADERBOARD (SUMMARY)
  // =============================
  useEffect(() => {
    fetch("/api/performance/leaderboard", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setLeaderboard(data.data))
      .catch(() => setLeaderboard([]));
  }, []);

  // =============================
  // FETCH EMPLOYEE DETAIL (DRILL DOWN)
  // =============================
  const handleSelectEmployee = (emp) => {
    if (!emp?.employeeName) return;

    setLoadingEmployee(true);

    fetch(`/api/performance/employee/${emp.employeeName}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedEmployee(data);
        setLoadingEmployee(false);
      })
      .catch(() => {
        setSelectedEmployee(null);
        setLoadingEmployee(false);
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* ================= HEADER ================= */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Performance Dashboard
      </Typography>

      {/* ================= KPI SUMMARY ================= */}
      <KPISection data={leaderboard} />

      {/* ================= ORG-LEVEL CHARTS ================= */}
      <OrgPerformanceCharts data={leaderboard} />

      {/* ================= LEADERBOARD ================= */}
      <LeaderboardTable
        data={leaderboard}
        selectedEmployee={selectedEmployee?.profile}
        onSelectEmployee={handleSelectEmployee}
      />

      {/* ================= EMPLOYEE DRAWER ================= */}
      <EmployeeDrawer
        employee={selectedEmployee}
        loading={loadingEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </Box>
  );
}

