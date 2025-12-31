export default function Leaderboard({ data, onSelectEmployee }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {data.map(emp => (
        <div
          key={emp.rank}
          onClick={() => onSelectEmployee(emp)}
          style={{
            padding: "12px",
            borderBottom: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          <strong>#{emp.rank}</strong> {emp.employeeName}
          <span style={{ float: "right" }}>
            Score: {emp.efficiencyScore}
          </span>
        </div>
      ))}
    </div>
  );
}
