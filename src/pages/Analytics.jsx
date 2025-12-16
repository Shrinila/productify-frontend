import React, { useEffect, useState } from "react";
import "./analytics.css";
import API from "../utils/api";

// Chart.js imports
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut, Line, Bar } from "react-chartjs-2";

// Register chart components
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [tasks, setTasks] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${userId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Analytics load error:", err);
    }
  };

  // ------- ANALYTICS DATA ---------

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;

  const completionData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, total - completed],
        backgroundColor: ["#5b21b6", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const dailyCounts = {};
  tasks.forEach(t => {
    const day = new Date(t.createdAt).toLocaleDateString();
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  });

  const lineData = {
    labels: Object.keys(dailyCounts),
    datasets: [
      {
        label: "Tasks Created",
        data: Object.values(dailyCounts),
        fill: false,
        borderColor: "#5b21b6",
        tension: 0.3,
      },
    ],
  };

  const priorityCounts = {
    low: tasks.filter(t => t.priority === "low").length,
    medium: tasks.filter(t => t.priority === "medium").length,
    high: tasks.filter(t => t.priority === "high").length,
  };

  const barData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Tasks",
        data: Object.values(priorityCounts),
        backgroundColor: ["#16a34a", "#f59e0b", "#dc2626"],
      },
    ],
  };

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>
      <p className="subtitle">Visual overview of your productivity.</p>

      <div className="analytics-grid">

        {/* Donut Chart */}
        <div className="card">
          <h3>Task Completion</h3>
          <Doughnut data={completionData} />
        </div>

        {/* Line Chart */}
        <div className="card">
          <h3>Tasks Created Over Time</h3>
          <Line data={lineData} />
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h3>Priority Distribution</h3>
          <Bar data={barData} />
        </div>

      </div>
    </div>
  );
}
