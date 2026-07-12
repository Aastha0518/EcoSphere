import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SphereMark } from "../components/SphereMark";
import "./EcoSphereApp.css";

// ---------------------------------------------------------------------------
// Font import & style definition compatibility wrapper
// ---------------------------------------------------------------------------
export const FontImport = () => null;

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ---------------------------------------------------------------------------
// LOGIN SCREEN
// ---------------------------------------------------------------------------
export function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Enter your username and password to continue.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });
      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error("Login API did not return JSON. Check that the backend server is running on port 5000.");
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      onLogin({
        username: data.user?.username || username.trim(),
        token: data.token,
        role: data.user?.role || "User",
      });
    } catch (err) {
      setError(err.message || "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="es-login-container">
      {/* Left brand panel */}
      <div className="es-brand-panel">
        <div className="es-brand-header es-fade-up">
          <SphereMark size={38} />
          <span className="es-brand-logo-text">EcoSphere</span>
        </div>

        <div className="es-brand-hero es-fade-up" style={{ animationDelay: "80ms" }}>
          <div className="es-brand-logo-center">
            <SphereMark size={220} />
          </div>
          <h1 className="es-brand-title">
            Empower employees, cut emissions, and lead CSR.
          </h1>
          <p className="es-brand-desc">
            EcoSphere connects departments and employees with your corporate sustainability goals,
            letting you track carbon reductions, CSR campaigns, and green badge achievements in one view.
          </p>
        </div>

        <div className="es-brand-stats es-fade-up" style={{ animationDelay: "160ms" }}>
          <div>
            <p className="es-brand-stat-val">1,248</p>
            <p className="es-brand-stat-lbl">active employees</p>
          </div>
          <div className="es-brand-stat-divider" />
          <div>
            <p className="es-brand-stat-val">12</p>
            <p className="es-brand-stat-lbl">departments</p>
          </div>
          <div className="es-brand-stat-divider" />
          <div>
            <p className="es-brand-stat-val">245.8 t</p>
            <p className="es-brand-stat-lbl">CO₂ emissions cut</p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="es-form-panel">
        <div className="es-form-box es-fade-up">
          <div className="es-mobile-brand-header">
            <SphereMark size={34} />
            <span className="es-mobile-brand-text">EcoSphere</span>
          </div>

          <h2 className="es-form-title">Welcome back</h2>
          <p className="es-form-subtitle">
            Sign in to your corporate ESG dashboard.
          </p>

          <form onSubmit={handleSubmit} className="es-form">
            <div className="es-form-group">
              <label className="es-form-label">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="es-input"
              />
            </div>

            <div className="es-form-group">
              <div className="es-form-group-header">
                <label className="es-form-label">Password</label>
                <button type="button" className="es-form-link">
                  Forgot password?
                </button>
              </div>
              <div className="es-input-wrapper">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="es-input es-input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="es-password-toggle"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="es-form-error">
                {error}
              </p>
            )}

            <label className="es-form-checkbox-label">
              <input type="checkbox" className="es-checkbox" />
              <span className="es-checkbox-text">Keep me signed in</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="es-btn-submit"
            >
              {loading ? (
                <>
                  <span className="es-spinner" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="es-demo-footer">
            Sign in with your EcoSphere username and password.
          </p>
        </div>
      </div>
    </div>
  );
}
