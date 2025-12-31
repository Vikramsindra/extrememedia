import { Box, Card, Typography } from "@mui/material";

export default function KPISection({ data }) {
  if (!data.length) return null;

  const avgScore =
    Math.round(
      data.reduce((a, b) => a + b.efficiencyScore, 0) / data.length
    );

  const topPerformer = data[0]?.employeeName;
  const avgRating =
    (
      data.reduce((a, b) => a + b.rating, 0) / data.length
    ).toFixed(1);

  const totalTasks = data.reduce((a, b) => a + b.totalTasks, 0);

  const items = [
    { label: "Avg Performance Score", value: avgScore },
    { label: "Top Performer", value: topPerformer },
    { label: "Avg Rating", value: avgRating },
    { label: "Total Tasks", value: totalTasks },
  ];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mb: 4 }}>
      {items.map((item, i) => (
        <Card key={i} sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {item.label}
          </Typography>
          <Typography variant="h6">{item.value}</Typography>
        </Card>
      ))}
    </Box>
  );
}
