import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Columns,
  BarChart3,
  User,
  Settings,
} from "lucide-react";
import "./Sidebar.css";

const menu = [
  { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { name: "Tasks", to: "/tasks", icon: CheckSquare },
  { name: "Kanban", to: "/kanban", icon: Columns },
  { name: "Analytics", to: "/analytics", icon: BarChart3 },
  { name: "Profile", to: "/profile", icon: User },
  { name: "Settings", to: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-logo">
        <span className="logo-icon">🐰</span>
        <div>
          <h2>Productify</h2>
          <p>Focus Mode</p>
        </div>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
