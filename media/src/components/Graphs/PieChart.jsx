import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Default blue theme (can be overridden)
const DEFAULT_COLORS = ["#1E88E5", "#42A5F5", "#90CAF9"];

const renderLabel = ({ percent }) =>
  `${(percent * 100).toFixed(0)}%`;

export default function AnalyticsPieChart({
  title,
  data,
  colors = DEFAULT_COLORS,
  width = 500,
  height = 500
}) {
  return (
    <div className="mb-5">
      <div
        style={{
          width,
          height,
          borderRadius: "20px",
          background: "#ffffff",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          padding: "1.5rem"
        }}
      >
        <h5 className="text-center mb-3">{title}</h5>

        <ResponsiveContainer>
          <PieChart>

            {/* Shadow layer */}
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="52%"
              innerRadius="45%"
              outerRadius="75%"
              fill="#000"
              opacity={0.1}
            />

            {/* Main pie */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="75%"
              label={renderLabel}
              labelLine={false}
              animationDuration={800}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
