import { useEffect, useState } from "react";
import API from "../utils/api";
import "./Dashboard.css";

export default function Dashboard() {
  const userId = localStorage.getItem("userId");
const getToday = () => new Date().toDateString();

const calculateStreak = () => {
  const lastDate = localStorage.getItem("lastActiveDate");
  const streak = Number(localStorage.getItem("streakCount")) || 0;

  const today = getToday();

  if (!lastDate) {
    localStorage.setItem("lastActiveDate", today);
    localStorage.setItem("streakCount", 1);
    return 1;
  }

  const diff =
    (new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24);

  if (diff === 1) {
    const newStreak = streak + 1;
    localStorage.setItem("streakCount", newStreak);
    localStorage.setItem("lastActiveDate", today);
    return newStreak;
  }

  if (diff === 0) {
    return streak;
  }

  localStorage.setItem("streakCount", 1);
  localStorage.setItem("lastActiveDate", today);
  return 1;
};
  const [tasks, setTasks] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (!userId) return;

    API.get(`/tasks/${userId}`)
      .then((res) => setTasks(res.data))
      .catch(console.error);
  }, [userId]);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const inProgress = tasks.filter(t => t.status === "inprogress").length;
  const highPriority = tasks.filter(t => t.priority === "high").length;
  const completion = total ? Math.round((completed / total) * 100) : 0;
  const [streak, setStreak] = useState(1);

useEffect(() => {
  setStreak(calculateStreak());
}, []);


  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Track your productivity at a glance.</p>
        </div>

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Tasks" value={total} />
        <StatCard title="Completed" value={completed} />
        <StatCard title="In Progress" value={inProgress} />
        <StatCard title="High Priority" value={highPriority} />
      </div>

      <div className="lower-grid">
        <div className="card">
          <h3>Task Completion</h3>
          <div className="progress-bar">
            <div style={{ width: `${completion}%` }} />
          </div>
          <p>{completion}% completed</p>
        </div>

        <div className="card">
          <h3>Priority Distribution</h3>
          <Priority label="High" count={highPriority} total={total} />
          <Priority label="Medium" count={tasks.filter(t=>t.priority==="medium").length} total={total} />
          <Priority label="Low" count={tasks.filter(t=>t.priority==="low").length} total={total} />
        </div>

        <div className="card streak">
          <h3>🔥 Current Streak</h3>
          <div className="streak-number">{streak}</div>
          <p>Days active</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <span>{title}</span>
      <h2>{value}</h2>
    </div>
  );
}

function Priority({ label, count, total }) {
  const percent = total ? (count / total) * 100 : 0;
  return (
    <div className="priority-row">
      <span>{label}</span>
      <div className="priority-bar">
        <div style={{ width: `${percent}%` }} />
      </div>
      <span>{count}</span>
    </div>
  );
}
