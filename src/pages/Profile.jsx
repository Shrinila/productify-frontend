import { useState, useEffect } from "react";
import API from "../utils/api";
import "./Profile.css";

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const storedName = localStorage.getItem("userName") || "User";
  const storedEmail = localStorage.getItem("userEmail") || "user@email.com";

  const [name, setName] = useState(storedName);
  const [editing, setEditing] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
  });

  useEffect(() => {
    if (!userId) return;

    API.get(`/tasks/${userId}`)
      .then((res) => {
        const tasks = res.data || [];
        setStats({
          total: tasks.length,
          completed: tasks.filter((t) => t.status === "done").length,
        });
      })
      .catch(console.error);
  }, [userId]);

  const saveName = () => {
    localStorage.setItem("userName", name);
    setEditing(false);
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="profile-page">
      <h1 className="profile-title">Profile</h1>

      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="avatar">{initials}</div>

        <div className="profile-info">
          {!editing ? (
            <>
              <h2>{name}</h2>
              <p>{storedEmail}</p>
              <button onClick={() => setEditing(true)} className="edit-btn">
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <input
                className="name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={saveName} className="save-btn">
                Save
              </button>
            </>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="profile-stats">
        <div className="stat-box">
          <span>Total Tasks</span>
          <h3>{stats.total}</h3>
        </div>
        <div className="stat-box">
          <span>Completed</span>
          <h3>{stats.completed}</h3>
        </div>
      </div>
    </div>
  );
}
