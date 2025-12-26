import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";

export default function StackedBarGraphComponent({
  title = "Stacked Bar Chart",
  data = [],
  xKey = "name",
  stackKeys = ["completed", "pending", "overdue"],
  colors = ["#2E7D32", "#F9A825", "#C62828"],
  height = 420,
  barWidth = 40, // <-- add this prop
}) {
  return (
    <div className="container mt-4 p-2 mb-5">
      <Card elevation={6} sx={{ borderRadius: 3, height }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>

          <div style={{ width: "100%", height: height - 100 }}>
            <ResponsiveContainer>
              <BarChart data={data} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey={xKey} tick={{ fill: "#555" }} />
                <YAxis tick={{ fill: "#555" }} />
                <Tooltip />
                <Legend verticalAlign="top" />
                {stackKeys.map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="a"
                    fill={colors[index % colors.length]}
                    maxBarSize={barWidth} // <-- controls bar width
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
