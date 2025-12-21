import { useNavigate } from "react-router-dom";
import "./Cards.css";



const Cards = () => {
  const navigate = useNavigate();

  return (
    <div className="cards-container">
      {/* Analytics */}
      <div className="card">
        <img src="/img/analytics.png" alt="Analytics" />
        <h3>See Analytics</h3>
        <button onClick={() => navigate("/analytics")}>
          View Analytics
        </button>
      </div>

      {/* Task Queue */}
      <div className="card">
        <img src="/img/taskqueue.avif" alt="Task Queue" />
        <h3>Task Queue</h3>
        <button onClick={() => navigate("/task")}>
          Check Queue
        </button>
      </div>

      {/* Assign Task */}
      <div className="card">
        <img src="/img/task asign.png" alt="Assign Task" />
        <h3>Assign Task</h3>
        <button onClick={() => navigate("/give-task")}>
          Assign Task
        </button>
      </div>

      {/* 🔥 NEW INVENTORY CARD */}
      <div className="card">
        <img src="/img/searchDevice2.jpg" alt="Inventory" />
        <h3>Inventory</h3>
        <button onClick={() => navigate("/inventory")}>
          Add Inventory
        </button>
      </div>
    </div>
  );
};

export default Cards;

