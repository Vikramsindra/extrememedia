import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";

export default function LineGraphComponent({
  title = "Line Chart",
  data = [],
  dataKey = "value",
  xKey = "name",
  lineColor = "#1E88E5",
  height = 420,
}) {
  const maxValue = Math.max(...data.map((d) => d[dataKey] || 0));
  const yAxisMax = maxValue + Math.ceil(maxValue * 0.2);

  return (
    <div className="container mt-5 p-2 mb-5">
      <Card elevation={6} sx={{ borderRadius: 3, height }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>

          <div style={{ width: "100%", height: height - 100 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey={xKey} tick={{ fill: "#555" }} />
                <YAxis domain={[0, yAxisMax]} tick={{ fill: "#555" }} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={lineColor}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
