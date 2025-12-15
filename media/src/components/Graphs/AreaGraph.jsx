import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";

export default function AreaGraphComponent({
  title = "Area Chart",
  data = [],
  dataKey = "value",
  xKey = "name",
  areaColor = "#1E88E5",
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
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey={xKey} tick={{ fill: "#555" }} />
                <YAxis domain={[0, yAxisMax]} tick={{ fill: "#555" }} />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke={areaColor}
                  fill={areaColor + "33"} // 20% opacity
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
