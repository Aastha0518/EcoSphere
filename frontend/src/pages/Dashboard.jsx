import React, { useState, useMemo } from "react";
import {
  Leaf, Search, Bell, ChevronDown, LogOut, Menu, X, ArrowUpRight, ArrowDownRight,
  LayoutDashboard, Globe2, Settings, FileBarChart2, Building2, Users, Trophy, Award, Calendar
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { SphereMark } from "../components/SphereMark";
import "./EcoSphereApp.css";

// -- Radial "Sustainability Score" dial -------------------------------------
function ScoreDial({ score = 82, size = 128 }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg width={size} height={size} viewBox="0 0 130 130">
      <circle cx="65" cy="65" r={r} stroke="#E8F3FC" strokeWidth="12" fill="none" />
      <circle
        cx="65" cy="65" r={r} stroke="#17B890" strokeWidth="12" fill="none"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 65 65)"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x="65" y="60" textAnchor="middle" className="es-display" fontSize="26" fontWeight="700" fill="#0F1F2E">
        {score}
      </text>
      <text x="65" y="78" textAnchor="middle" className="es-body" fontSize="10" fill="#5B7186">
        / 100
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// DASHBOARD SCREEN
// ---------------------------------------------------------------------------
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "departments", label: "Departments", icon: Building2 },
  { key: "csr", label: "CSR Activities", icon: Calendar },
  { key: "challenges", label: "Challenges", icon: Trophy },
  { key: "badges", label: "Badges", icon: Award },
  { key: "reports", label: "Reports", icon: FileBarChart2 },
  { key: "settings", label: "Settings", icon: Settings },
];

const usageData = [
  { month: "Jan", carbon: 45.2, csr: 120 },
  { month: "Feb", carbon: 42.8, csr: 145 },
  { month: "Mar", carbon: 40.5, csr: 190 },
  { month: "Apr", carbon: 38.1, csr: 210 },
  { month: "May", carbon: 35.6, csr: 250 },
  { month: "Jun", carbon: 32.4, csr: 290 },
  { month: "Jul", carbon: 30.1, csr: 320 },
];

const leaderboardData = [
  { rank: 1, name: "Engineering & Dev", dept: "Tech", points: "4,820", badges: "42 badges" },
  { rank: 2, name: "Sales & Accounts", dept: "Commercial", points: "4,150", badges: "38 badges" },
  { rank: 3, name: "Human Resources", dept: "HR", points: "3,890", badges: "32 badges" },
  { rank: 4, name: "Brand & Marketing", dept: "Creative", points: "3,420", badges: "28 badges" },
  { rank: 5, name: "Finance & Admin", dept: "Operations", points: "2,980", badges: "21 badges" },
];

const activity = [
  { id: 1, icon: Award, color: "#17B890", text: "Sarah Connor earned 'Carbon Warrior' badge", time: "5m ago" },
  { id: 2, icon: Calendar, color: "#0B5FA5", text: "Tree planting CSR event registration hit 100%", time: "30m ago" },
  { id: 3, icon: Trophy, color: "#E0A100", text: "Tech Department won the 'Commute Zero' challenge", time: "2h ago" },
  { id: 4, icon: Users, color: "#1483C9", text: "15 new employees joined CSR team activities", time: "4h ago" },
  { id: 5, icon: Leaf, color: "#17B890", text: "Monthly Carbon Emissions audit report published", time: "1d ago" },
];

const goals = [
  { label: "100% Employee participation in CSR", value: 78 },
  { label: "Net-zero Carbon footprint goal YTD", value: 65 },
  { label: "Sustainability challenges completed", value: 87 },
];

function StatCard({ icon: Icon, label, value, delta, positive, tint, cardStyle = "minimalist", theme = "blue" }) {
  const isVibrant = cardStyle === "vibrant";
  return (
    <div className={`es-stat-card style-${cardStyle} theme-${theme}`}>
      <div className="es-stat-card-header">
        <div className="es-stat-icon-wrapper" style={{ background: isVibrant ? "rgba(255, 255, 255, 0.2)" : tint }}>
          <Icon size={18} color={isVibrant ? "#FFFFFF" : "#0B5FA5"} />
        </div>
        {delta && (
          <span
            className={`es-stat-delta ${positive ? "positive" : "negative"}`}
          >
            {positive && delta.includes("%") && <ArrowUpRight size={13} />}
            {!positive && delta.includes("%") && <ArrowDownRight size={13} />}
            {delta}
          </span>
        )}
      </div>
      <div>
        <p className="es-stat-value">{value}</p>
        <p className="es-stat-label">{label}</p>
      </div>
    </div>
  );
}

function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="es-sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`es-sidebar ${open ? "open" : ""}`}
      >
        <div className="es-sidebar-header">
          <SphereMark size={30} />
          <span className="es-sidebar-title">EcoSphere</span>
          <button className="es-sidebar-close" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="es-sidebar-nav es-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                  setOpen(false);
                }}
                className={`es-nav-item ${isActive ? "active" : ""}`}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="es-sidebar-footer">
          <div className="es-grid-status-box">
            <div className="es-grid-status-header">
              <Globe2 size={14} color="#0B5FA5" />
              <span className="es-grid-status-title">Live system status</span>
            </div>
            <p className="es-grid-status-desc">
              All 12 departments sync'd. CSR activities live.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function Navbar({ setSidebarOpen, user, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const initials = user
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="es-navbar">
      <button
        className="es-menu-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="es-nav-headline">
        <p className="es-nav-title">Dashboard</p>
        <p className="es-nav-subtitle">Corporate ESG & CSR Tracker</p>
      </div>

      <div className="es-search-box">
        <div className="es-search-wrapper">
          <Search size={15} className="es-search-icon" />
          <input
            placeholder="Search departments, CSR events, badges..."
            className="es-search-input"
          />
        </div>
      </div>

      <div className="es-navbar-actions">
        <button className="es-icon-btn">
          <Bell size={18} />
          <span className="es-badge" />
        </button>

        <div className="es-profile-menu">
          <button
            onClick={() => setProfileOpen((s) => !s)}
            className="es-profile-btn"
          >
            <div className="es-profile-avatar">
              {initials}
            </div>
            <span className="es-profile-name">
              {user}
            </span>
            <ChevronDown size={14} className="es-chevron-down" />
          </button>

          {profileOpen && (
            <div className="es-dropdown es-fade-up">
              <button
                onClick={onLogout}
                className="es-dropdown-item"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = useMemo(
    () => [
      { icon: Users, label: "Total Employees", value: "1,248", delta: "+4.5%", positive: true, tint: "#E8F3FC", theme: "blue" },
      { icon: Building2, label: "Total Departments", value: "12", delta: "100% sync'd", positive: true, tint: "#E8F3FC", theme: "blue" },
      { icon: Leaf, label: "Total Carbon Emission", value: "245.8 t", delta: "-12.4%", positive: true, tint: "#E9FBF5", theme: "green" },
      { icon: Calendar, label: "Total CSR Activities", value: "34", delta: "+15.2%", positive: true, tint: "#E9FBF5", theme: "green" },
      { icon: Trophy, label: "Total Challenges", value: "8", delta: "2 active", positive: true, tint: "#FEF9E7", theme: "gold" },
      { icon: Award, label: "Total Badges", value: "1,850", delta: "+8.3%", positive: true, tint: "#FEF9E7", theme: "gold" },
    ],
    []
  );

  return (
    <div className="es-app-container es-dashboard-container">
      <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="es-main-content">
        <Navbar setSidebarOpen={setSidebarOpen} user={user} onLogout={onLogout} />

        <main className="es-dashboard-main es-scrollbar">
          {/* Stat cards — Vibrant Gradient style */}
          <div className="es-stats-grid es-fade-up">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} cardStyle="vibrant" />
            ))}
          </div>

          {/* Chart + score */}
          <div className="es-charts-grid">
            <div className="es-chart-card-large">
              <div className="es-chart-header">
                <div>
                  <p className="es-chart-title">Carbon &amp; CSR metrics</p>
                  <p className="es-chart-subtitle">Monthly emissions reduction and event registrations</p>
                </div>
                <div className="es-chart-legend">
                  <span className="es-legend-item">
                    <span className="es-legend-dot" style={{ background: "#0B5FA5" }} />
                    Emissions (t CO₂e)
                  </span>
                  <span className="es-legend-item">
                    <span className="es-legend-dot" style={{ background: "#17B890" }} />
                    CSR Registrations
                  </span>
                </div>
              </div>
              <div className="es-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData} margin={{ left: -20, right: 10, top: 10 }}>
                    <defs>
                      <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0B5FA5" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#0B5FA5" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="csrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#17B890" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#17B890" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEF4F9" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#93A5B6" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#93A5B6" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 10, border: "1px solid #E7EFF6", fontSize: 12, fontFamily: "Inter" }}
                    />
                    <Area type="monotone" dataKey="carbon" stroke="#0B5FA5" fill="url(#carbonGrad)" strokeWidth={2.2} />
                    <Area type="monotone" dataKey="csr" stroke="#17B890" fill="url(#csrGrad)" strokeWidth={2.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="es-score-card">
              <p className="es-score-card-title">ESG Overall Score</p>
              <p className="es-score-card-subtitle">Composite ESG metric performance</p>
              <ScoreDial score={82} />
              <p className="es-score-delta-text">↑ 4 points vs. last quarter</p>
            </div>
          </div>

          {/* Goals + leaderboard + activity */}
          <div className="es-bottom-grid">
            <div className="es-card">
              <p className="es-card-title">Leaderboard</p>
              <p className="es-card-subtitle">Top departments leading in sustainability</p>
              <div className="es-leaderboard-list">
                {leaderboardData.map((item) => (
                  <div key={item.rank} className="es-leaderboard-item">
                    <div className={`es-rank-badge rank-${item.rank}`}>
                      {item.rank}
                    </div>
                    <div className="es-leaderboard-info">
                      <span className="es-leaderboard-name">{item.name}</span>
                      <span className="es-leaderboard-dept">{item.dept} Department</span>
                    </div>
                    <div className="es-leaderboard-score">
                      <span className="es-leaderboard-points">{item.points} pts</span>
                      <div className="es-leaderboard-badges">{item.badges}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="es-card">
              <p className="es-card-title">Sustainability goals</p>
              <p className="es-card-subtitle">YTD target metrics progression</p>
              <div className="es-goals-list" style={{ marginTop: "1rem" }}>
                {goals.map((g) => (
                  <div key={g.label} className="es-goal-item">
                    <div className="es-goal-item-header">
                      <span className="es-goal-label">{g.label}</span>
                      <span className="es-mono">{g.value}%</span>
                    </div>
                    <div className="es-goal-progress-wrapper">
                      <div
                        className="es-goal-progress-bar"
                        style={{ width: `${g.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="es-card">
              <p className="es-card-title">Recent activity</p>
              <p className="es-card-subtitle">Live employee &amp; team audit logs</p>
              <div className="es-activity-list es-scrollbar" style={{ marginTop: "1rem" }}>
                {activity.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div key={a.id} className="es-activity-item">
                      <div
                        className="es-activity-icon-box"
                        style={{ background: `${a.color}1A` }}
                      >
                        <Icon size={14} color={a.color} />
                      </div>
                      <div>
                        <p className="es-activity-text">{a.text}</p>
                        <p className="es-activity-time">{a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
