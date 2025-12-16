import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./signup.css";


export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) return;

    try {
      setLoading(true);
      const res = await API.post("/signup", form);

      if (res.data.success) {
        alert("Account created. Please log in.");
        navigate("/login");
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="sign-up">
        <div>
          <div className="sidebar-logo">
            <span>🐰</span>
            <div>
              <div>Productify</div>
              <div className="sidebar-logo-mark">Focus Mode</div>
            </div>
          </div>
          <h1 className="page-title">Create your workspace</h1>
          <p className="page-subtitle">
            One dark, calm place to track tasks, priorities and progress.
          </p>
        </div>

        <p className="page-subtitle">© {new Date().getFullYear()} Productify</p>
      </div>

      <div className="auth-panel">
        <h2 style={{ marginBottom: 16 }}>Sign up</h2>
        <p className="page-subtitle" style={{ marginBottom: 16 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#a78bfa" }}>
            Log in
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Name</label>
            <input
              className="field-input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Naomi"
            />
          </div>
          <div className="field">
            <label className="field-label">Email</label>
            <input
              className="field-input"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
            />
          </div>
          <div className="field">
            <label className="field-label">Password</label>
            <input
              className="field-input"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: 12,
                fontSize: 13,
                color: "#fecaca",
              }}
            >
              {error}
            </div>
          )}

          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
