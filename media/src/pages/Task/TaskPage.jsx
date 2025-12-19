import { useState } from "react";
import TaskTable from "./TaskListing";

const sampleTasks = [
  {
    task_id: "T001",
    task_desc: "LED Panel Installation – Office Floor 1",
    technician: "John Doe",
    quantity: 12,
    status: "Pending",
  },
  {
    task_id: "T002",
    task_desc: "Faulty LED Panel Debugging – Conference Hall",
    technician: "Alex Smith",
    quantity: 5,
    status: "Completed",
  },
  {
    task_id: "T003",
    task_desc: "LED Panel Testing and Quality Check",
    technician: "Maria Garcia",
    quantity: 8,
    status: "Pending",
  },
  {
    task_id: "T004",
    task_desc: "LED Driver Replacement – Warehouse Section A",
    technician: "David Brown",
    quantity: 6,
    status: "Overdue",
  },
  {
    task_id: "T005",
    task_desc: "Short Circuit Debugging in LED Panel Board",
    technician: "Emma Wilson",
    quantity: 3,
    status: "Completed",
  },
  {
    task_id: "T006",
    task_desc: "LED Panel Brightness Calibration",
    technician: "Chris Johnson",
    quantity: 10,
    status: "Pending",
  },
  {
    task_id: "T007",
    task_desc: "Fault Detection in Outdoor LED Panels",
    technician: "Sophia Martinez",
    quantity: 4,
    status: "Overdue",
  },
  {
    task_id: "T008",
    task_desc: "LED Panel Wiring Inspection and Testing",
    technician: "Daniel Lee",
    quantity: 7,
    status: "Completed",
  },
  {
    task_id: "T009",
    task_desc: "Replacement of Damaged LED Modules",
    technician: "Olivia Taylor",
    quantity: 9,
    status: "Pending",
  },
  {
    task_id: "T010",
    task_desc: "Thermal Issue Debugging in LED Panels",
    technician: "Michael Anderson",
    quantity: 5,
    status: "Completed",
  },
  {
    task_id: "T011",
    task_desc: "Final Inspection of Newly Installed LED Panels",
    technician: "Isabella Thomas",
    quantity: 11,
    status: "Pending",
  },
  {
    task_id: "T012",
    task_desc: "Power Supply Testing for LED Panel System",
    technician: "William Moore",
    quantity: 6,
    status: "Completed",
  },
  {
    task_id: "T013",
    task_desc: "LED Panel Flickering Issue Debugging",
    technician: "Ava Martin",
    quantity: 4,
    status: "Overdue",
  },
  {
    task_id: "T014",
    task_desc: "Control Board Testing for LED Display",
    technician: "James White",
    quantity: 2,
    status: "Pending",
  },
  {
    task_id: "T015",
    task_desc: "Preventive Maintenance of LED Panel Units",
    technician: "Emily Harris",
    quantity: 15,
    status: "Completed",
  },
];

function TaskPage() {
  // ✅ Hooks INSIDE component
  const [tasks, setTasks] = useState(sampleTasks);

  const handleMarkComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.task_id === taskId ? { ...task, status: "Verified" } : task
      )
    );
  };

  return (
    <div className="container-fluid mt-4 mb-4 ">
      <TaskTable tasks={tasks} onMarkComplete={handleMarkComplete} />
    </div>
  );
}

export default TaskPage;
