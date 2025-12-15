import AreaGraphComponent from "./AreaGraph";
import BarGraphComponent from "./BarGraph";
import LineGraphComponent from "./LineGraph";
import PieChartComponent from "./PieChart";
import StackedBarGraphComponent from "./StackBarGraph";

const deviceData = [
  { name: "Desktop", value: 50 },
  { name: "Mobile", value: 30 },
  { name: "Tablet", value: 20 },
];

const taskStatusData = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 25 },
  { name: "Overdue", value: 15 },
];

const monthlySalesData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 450 },
  { name: "May", sales: 600 },
];

const monthlyRevenueData = [
  { name: "Jan", revenue: 1200 },
  { name: "Feb", revenue: 900 },
  { name: "Mar", revenue: 1500 },
  { name: "Apr", revenue: 1300 },
  { name: "May", revenue: 1800 },
];

const monthlyUsersData = [
  { name: "Jan", users: 200 },
  { name: "Feb", users: 350 },
  { name: "Mar", users: 450 },
  { name: "Apr", users: 400 },
  { name: "May", users: 550 },
];

const monthlyEfficiencyData = [
  { name: "Jan", efficiency: 72 },
  { name: "Feb", efficiency: 75 },
  { name: "Mar", efficiency: 78 },
  { name: "Apr", efficiency: 80 },
  { name: "May", efficiency: 85 },
  { name: "Jun", efficiency: 83 },
  { name: "Jul", efficiency: 88 },
  { name: "Aug", efficiency: 90 },
  { name: "Sep", efficiency: 92 },
  { name: "Oct", efficiency: 91 },
  { name: "Nov", efficiency: 94 },
  { name: "Dec", efficiency: 95 },
];

const monthlyTaskStatusData = [
  { name: "Jan", completed: 40, pending: 10, overdue: 5 },
  { name: "Feb", completed: 50, pending: 15, overdue: 8 },
  { name: "Mar", completed: 60, pending: 12, overdue: 10 },
  { name: "Apr", completed: 55, pending: 10, overdue: 7 },
  { name: "May", completed: 70, pending: 5, overdue: 5 },
  { name: "Jun", completed: 65, pending: 8, overdue: 4 },
];

function Anayalatic() {
  return (
    <div className="container">
      {/* Pie Charts */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <PieChartComponent
            title="Device Usage Distribution"
            data={deviceData}
          />
        </div>

        <div className="col-md-6">
          <PieChartComponent
            title="Task Status Overview"
            data={taskStatusData}
            colors={["#2E7D32", "#F9A825", "#C62828"]}
          />
        </div>
      </div>

      {/* Bar Graphs */}
      <div className="row g-4">
        <div className="col-md-12">
          <BarGraphComponent
            title="Monthly Sales"
            data={monthlySalesData}
            dataKey="sales"
            xKey="name"
            barColor={["#1E88E5", "#1565C0"]} // Blue
          />
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-12">
          <div className="col-md-12">
            <StackedBarGraphComponent
              title="Monthly Task Status"
              data={monthlyTaskStatusData}
              xKey="name"
              stackKeys={["completed", "pending", "overdue"]}
              colors={["#2E7D32", "#F9A825", "#C62828"]} // Green, Yellow, Red
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <LineGraphComponent
            title="Monthly Active Users"
            data={monthlyUsersData}
            dataKey="users"
            xKey="name"
            lineColor="#1E88E5"
          />
        </div>
      </div>
      <div className="row g-4 mt-4">
        <div className="col-md-12">
          <AreaGraphComponent
            title="Team Efficiency Over Year"
            data={monthlyEfficiencyData}
            dataKey="efficiency"
            xKey="name"
            areaColor="#43A047" // Green theme for efficiency
          />
        </div>
      </div>
    </div>
  );
}

export default Anayalatic;
