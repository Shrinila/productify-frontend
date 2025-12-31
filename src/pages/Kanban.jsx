import { useEffect, useState } from "react";
import "./Kanban.css";
import api from "../utils/api";

export default function Kanban() {
  const [tasks, setTasks] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/${userId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  // ------------------------
  // Handle Drag + Drop
  // ------------------------
  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = async (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");

    try {
      await api.put(`/tasks/status/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const allowDrop = (e) => e.preventDefault();

  // Group tasks by status
  const groups = {
    todo: tasks.filter((t) => t.status === "todo"),
    inprogress: tasks.filter((t) => t.status === "inprogress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <div className="kanban-container">
      <h1 className="kanban-title">Kanban Board</h1>

      <div className="kanban-board">
        {["todo", "inprogress", "done"].map((status) => (
          <div
            key={status}
            className="kanban-column"
            onDragOver={allowDrop}
            onDrop={(e) => onDrop(e, status)}
          >
            <h2 className="column-title">
              {status === "todo" && "To Do"}
              {status === "inprogress" && "In Progress"}
              {status === "done" && "Done"}
            </h2>

            <div className="task-list">
              {groups[status].length === 0 && (
                <p className="empty-msg">No tasks</p>
              )}

              {groups[status].map((task) => (
                <div
                  key={task._id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => onDragStart(e, task._id)}
                >
                  <p className="task-text">{task.text}</p>
                  <span className={`priority ${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
