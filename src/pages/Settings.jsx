import { useState } from "react";
import "./Settings.css";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark")
  );
  const [notifications, setNotifications] = useState(true);

  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "user@email.com";

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>

      {/* Profile */}
      <div className="settings-card">
        <h3>Profile</h3>
        <p><strong>Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {userEmail}</p>
      </div>

      {/* Appearance */}
      <div className="settings-card">
        <h3>Appearance</h3>
        <div className="settings-row">
          <span>Dark Mode</span>
          <button onClick={toggleDarkMode} className="toggle-btn">
            {darkMode ? "ON 🌙" : "OFF ☀️"}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-card">
        <h3>Notifications</h3>
        <div className="settings-row">
          <span>Email Notifications</span>
          <button
            className="toggle-btn"
            onClick={() => setNotifications(!notifications)}
          >
            {notifications ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Cloud */}
      <div className="settings-card">
        <h3>Cloud Status</h3>
        <p>✅ Connected to MongoDB Atlas</p>
        <p>☁️ Ready for deployment</p>
      </div>

      {/* Logout */}
      <div className="settings-card danger">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
