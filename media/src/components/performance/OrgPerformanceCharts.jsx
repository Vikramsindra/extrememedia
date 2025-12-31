import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { Box, Typography } from "@mui/material";

export default function OrgPerformanceCharts({ data }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 4 }}>
      {/* PERFORMANCE COMPARISON */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Performance Score by Employee
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="employeeName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="efficiencyScore" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* TASK VOLUME */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Task Output Comparison
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis dataKey="employeeName" />
              <YAxis />
              <Tooltip />
              <Line dataKey="totalTasks" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}


