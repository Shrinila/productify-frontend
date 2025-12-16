import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import API from "../utils/api";

export default function AppLayout() {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchTasks = async () => {
      const res = await API.get(`/tasks/${userId}`);
      setTasks(res.data || []);
    };

    fetchTasks();
  }, [userId]);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Outlet context={{ tasks, setTasks }} />
      </main>
    </div>
  );
}
