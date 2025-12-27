import React, { useState, useEffect } from "react";
import "./tasks.css";
import API from "../utils/api"; // your axios instance

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    text: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const userId = localStorage.getItem("userId");

  // Fetch tasks
  useEffect(() => {
    if (!userId) return;
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${userId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  // Create a task

  const createTask = async () => {
    if (!form.text.trim()) return alert("Task title is required!");

    try {
      await API.post("/tasks", {
    userId,
text: form.text,
  description: form.description,
  dueDate: form.dueDate,
  priority: form.priority,   // ✅ THIS WAS MISSING
  status: "todo",
      });

      setForm({ text: "", description: "", dueDate: "", priority: "medium" });
      fetchTasks();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // Update a task
  const updateTask = async (id, updates) => {
    try {
      await API.put(`/tasks/${id}`, updates);
      fetchTasks();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="tasks-container">

      {/* HEADER */}
      <h1 className="tasks-title">Tasks</h1>

      {/* CREATE NEW TASK */}
      <div className="task-form">

        <input
          type="text"
          placeholder="Task title..."
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="input"
        />

        <textarea
          placeholder="Description..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="textarea"
        />

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="input"
        />

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="select"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button className="btn-create" onClick={createTask}>
          + Add Task
        </button>
      </div>

      {/* LISTING TASKS */}
      <div className="tasks-list">
        {tasks.length === 0 && <p className="empty">No tasks yet.</p>}

        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            
            <div className="task-header">
              <h3>{task.text}</h3>
              <span className={`priority ${task.priority}`}>
                {task.priority}
              </span>
            </div>

            <p className="desc">{task.description || "No description"}</p>

            <p className="date">
              Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
            </p>

            <div className="task-actions">

              <select
                value={task.status}
                onChange={(e) =>
                  updateTask(task._id, { status: e.target.value })
                }
                className="select small"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Completed</option>
              </select>

              <button
                className="btn-delete"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
