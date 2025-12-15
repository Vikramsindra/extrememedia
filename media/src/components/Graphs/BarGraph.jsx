import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";

export default function BarGraphComponent({
  title = "Bar Chart",
  data = [],
  dataKey = "value",
  xKey = "name",
  barColor = ["#1E88E5", "#1565C0"],
  height = 420,
}) {
  // Calculate Y-axis max (add headroom)
  const maxValue = Math.max(...data.map((d) => d[dataKey] || 0));
  const yAxisMax = maxValue + Math.ceil(maxValue * 0.2);

  return (
    <div className="container mt-5 p-2 mb-5">
      <Card
        elevation={6}
        sx={{
          borderRadius: 3,
          height,
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>

          <div style={{ width: "100%", height: height - 100 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                {/* Grid */}
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

                {/* X Axis */}
                <XAxis dataKey={xKey} tick={{ fill: "#555" }} />

                {/* Y Axis */}
                <YAxis domain={[0, yAxisMax]} tick={{ fill: "#555" }} />

                <Tooltip />

                {/* Gradient */}
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={barColor[0]} />
                    <stop offset="100%" stopColor={barColor[1]} />
                  </linearGradient>
                </defs>

                {/* Bars */}
                <Bar
                  dataKey={dataKey}
                  fill="url(#barGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={45}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
