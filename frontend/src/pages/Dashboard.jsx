import React, { useState, useMemo } from "react";
import {
  Leaf, Search, Bell, ChevronDown, LogOut, Menu, X, ArrowUpRight, ArrowDownRight,
  LayoutDashboard, Globe2, Settings, FileBarChart2, Building2, Users, Trophy, Award, Calendar, Eye, Mail, Phone, MapPin, UserRound, ShieldCheck, Gift, CheckCircle2, Clock3
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { SphereMark } from "../components/SphereMark";
import { DepartmentsPage } from "./Departments";
import "./EcoSphereApp.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

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
  { key: "employees", label: "Employees", icon: Users },
  { key: "csr", label: "CSR Activities", icon: Calendar },
  { key: "challenges", label: "Challenges", icon: Trophy },
  { key: "badges", label: "Badges", icon: Award },
  { key: "reports", label: "Reports", icon: FileBarChart2 },
  { key: "User", label: "Users", icon: Users },
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

const employees = [
  {
    id: 1,
    code: "EMP001",
    name: "Sarah Connor",
    initials: "SC",
    email: "sarah.connor@ecosphere.com",
    phone: "+91 98765 43210",
    department: "Engineering & Dev",
    designation: "Sustainability Lead",
    manager: "Michael Chen",
    status: "Active",
    joiningDate: "10 Apr 2023",
    employmentType: "Full Time",
    location: "Bengaluru",
    xp: 4200,
    esgScore: 88,
    environmental: 91,
    social: 86,
    governance: 87,
    rank: 3,
    badges: 12,
    challenges: 8,
    csr: 15,
    points: 3150,
  },
  {
    id: 2,
    code: "EMP002",
    name: "Michael Chen",
    initials: "MC",
    email: "michael.chen@ecosphere.com",
    phone: "+91 98765 43211",
    department: "Engineering & Dev",
    designation: "Engineering Manager",
    manager: "Aisha Mehta",
    status: "Active",
    joiningDate: "18 Jan 2021",
    employmentType: "Full Time",
    location: "Hyderabad",
    xp: 5100,
    esgScore: 92,
    environmental: 94,
    social: 91,
    governance: 90,
    rank: 1,
    badges: 18,
    challenges: 11,
    csr: 22,
    points: 4020,
  },
  {
    id: 3,
    code: "EMP003",
    name: "Priya Nair",
    initials: "PN",
    email: "priya.nair@ecosphere.com",
    phone: "+91 98765 43212",
    department: "Human Resources",
    designation: "People Operations Partner",
    manager: "Aisha Mehta",
    status: "On Leave",
    joiningDate: "05 Aug 2022",
    employmentType: "Full Time",
    location: "Mumbai",
    xp: 3380,
    esgScore: 81,
    environmental: 78,
    social: 88,
    governance: 77,
    rank: 9,
    badges: 9,
    challenges: 6,
    csr: 13,
    points: 2440,
  },
  {
    id: 4,
    code: "EMP004",
    name: "Rahul Verma",
    initials: "RV",
    email: "rahul.verma@ecosphere.com",
    phone: "+91 98765 43213",
    department: "Finance & Admin",
    designation: "Compliance Analyst",
    manager: "Nora Kapoor",
    status: "Active",
    joiningDate: "21 Nov 2020",
    employmentType: "Full Time",
    location: "Delhi",
    xp: 2870,
    esgScore: 76,
    environmental: 72,
    social: 75,
    governance: 82,
    rank: 14,
    badges: 7,
    challenges: 5,
    csr: 8,
    points: 1980,
  },
  {
    id: 5,
    code: "EMP005",
    name: "Elena D'Souza",
    initials: "ED",
    email: "elena.dsouza@ecosphere.com",
    phone: "+91 98765 43214",
    department: "Brand & Marketing",
    designation: "CSR Campaign Manager",
    manager: "Nora Kapoor",
    status: "Inactive",
    joiningDate: "14 Mar 2019",
    employmentType: "Contract",
    location: "Pune",
    xp: 2210,
    esgScore: 69,
    environmental: 65,
    social: 79,
    governance: 63,
    rank: 22,
    badges: 5,
    challenges: 3,
    csr: 10,
    points: 1560,
  },
  {
    id: 6,
    code: "EMP006",
    name: "Arjun Rao",
    initials: "AR",
    email: "arjun.rao@ecosphere.com",
    phone: "+91 98765 43215",
    department: "Sales & Accounts",
    designation: "Enterprise Account Lead",
    manager: "Michael Chen",
    status: "Active",
    joiningDate: "02 Jun 2024",
    employmentType: "Full Time",
    location: "Chennai",
    xp: 3640,
    esgScore: 84,
    environmental: 82,
    social: 89,
    governance: 80,
    rank: 7,
    badges: 10,
    challenges: 7,
    csr: 12,
    points: 2700,
  },
];

const profileTabs = [
  "Overview",
  "CSR Activities",
  "Challenges",
  "Policies",
  "Badges",
  "Rewards",
  "Compliance",
];

const tabSamples = {
  "CSR Activities": [
    ["Tree Planting Drive", "Environment", "18 Jun 2026", "Approved", "180 pts", "Uploaded"],
    ["Beach Cleanup", "Community", "29 May 2026", "Approved", "140 pts", "Uploaded"],
    ["STEM Mentoring", "Education", "11 Apr 2026", "Pending", "90 pts", "Review"],
  ],
  Challenges: [
    ["Commute Zero", "Hard", "100%", "450 XP", "Completed", "30 Jun 2026"],
    ["Paperless Sprint", "Medium", "72%", "260 XP", "In Progress", "20 Jul 2026"],
    ["Energy Saver", "Easy", "100%", "180 XP", "Completed", "10 May 2026"],
  ],
  Policies: [
    ["Code of Sustainability", "03 Jan 2026", "Acknowledged", "No"],
    ["Waste Segregation SOP", "15 Feb 2026", "Acknowledged", "No"],
    ["Supplier Ethics Policy", "22 Jun 2026", "Pending", "Yes"],
  ],
  Badges: [
    ["Carbon Warrior", "Reduced commute footprint", "04 Apr 2026", "Complete 3 commute challenges"],
    ["CSR Champion", "Completed high-impact CSR work", "18 Jun 2026", "Earn 1,000 CSR points"],
    ["Policy Steward", "Acknowledged governance policies", "02 Mar 2026", "Acknowledge 5 policies"],
  ],
  Rewards: [
    ["Eco Store Voucher", "14 May 2026", "750", "Delivered"],
    ["Plant-a-Tree Certificate", "08 Apr 2026", "300", "Delivered"],
    ["Learning Grant", "20 Jun 2026", "1,200", "Processing"],
  ],
  Compliance: [
    ["Travel emissions evidence", "Medium", "Rahul Verma", "25 Jul 2026", "Open", "-"],
    ["CSR proof verification", "Low", "Priya Nair", "12 Jun 2026", "Resolved", "16 Jun 2026"],
  ],
};

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

      </aside>
    </>
  );
}

function StatusBadge({ status }) {
  const key = status.toLowerCase().replace(/\s+/g, "-");
  return <span className={`es-status-badge status-${key}`}>{status}</span>;
}

function EmployeeAvatar({ employee, large = false }) {
  return (
    <div className={`es-employee-avatar ${large ? "large" : ""}`}>
      {employee.initials}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="es-filter-field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="All">All</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function MetricStrip({ employee }) {
  const metrics = [
    { label: "Environmental", value: employee.environmental },
    { label: "Social", value: employee.social },
    { label: "Governance", value: employee.governance },
    { label: "Overall ESG", value: employee.esgScore },
  ];

  return (
    <div className="es-score-strip">
      {metrics.map((metric) => (
        <div key={metric.label} className="es-score-metric">
          <div className="es-score-metric-header">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
          <div className="es-goal-progress-wrapper">
            <div className="es-goal-progress-bar" style={{ width: `${metric.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmployeeProfile({ employee, onBack }) {
  const [tab, setTab] = useState("Overview");

  return (
    <section className="es-employee-profile es-fade-up">
      <button className="es-text-action" onClick={onBack}>Back to employees</button>

      <div className="es-profile-hero">
        <div className="es-profile-main">
          <EmployeeAvatar employee={employee} large />
          <div>
            <div className="es-profile-title-row">
              <h1>{employee.name}</h1>
              <StatusBadge status={employee.status} />
            </div>
            <p>{employee.code} · {employee.designation}</p>
            <div className="es-profile-meta">
              <span><Building2 size={14} />{employee.department}</span>
              <span><UserRound size={14} />{employee.manager}</span>
              <span><MapPin size={14} />{employee.location}</span>
            </div>
          </div>
        </div>
        <div className="es-profile-contact">
          <span><Mail size={14} />{employee.email}</span>
          <span><Phone size={14} />{employee.phone}</span>
          <span><Calendar size={14} />Joined {employee.joiningDate}</span>
        </div>
      </div>

      <div className="es-tabs es-scrollbar">
        {profileTabs.map((item) => (
          <button
            key={item}
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Overview" ? (
        <div className="es-profile-grid">
          <div className="es-card">
            <p className="es-card-title">Employee Information</p>
            <div className="es-detail-list">
              <span><strong>Department</strong>{employee.department}</span>
              <span><strong>Reporting Manager</strong>{employee.manager}</span>
              <span><strong>Employment Type</strong>{employee.employmentType}</span>
              <span><strong>Joining Date</strong>{employee.joiningDate}</span>
              <span><strong>Years of Service</strong>3 years</span>
            </div>
          </div>

          <div className="es-card">
            <p className="es-card-title">ESG Summary</p>
            <MetricStrip employee={employee} />
          </div>

          <div className="es-card">
            <p className="es-card-title">Gamification</p>
            <div className="es-mini-stat-grid">
              <span><strong>{employee.xp.toLocaleString()}</strong>Total XP</span>
              <span><strong>{employee.points.toLocaleString()}</strong>Total Points</span>
              <span><strong>#{employee.rank}</strong>Current Rank</span>
              <span><strong>{employee.badges}</strong>Badges Earned</span>
              <span><strong>{employee.challenges}</strong>Challenges Done</span>
              <span><strong>{employee.csr}</strong>CSR Completed</span>
            </div>
          </div>

          <div className="es-card">
            <p className="es-card-title">Recent ESG Activities</p>
            <div className="es-timeline">
              <span><CheckCircle2 size={15} />Completed Commute Zero challenge</span>
              <span><Award size={15} />Earned CSR Champion badge</span>
              <span><ShieldCheck size={15} />Acknowledged Supplier Ethics Policy</span>
              <span><Gift size={15} />Redeemed Eco Store Voucher</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="es-card es-tab-table-card">
          <p className="es-card-title">{tab}</p>
          <div className="es-table-wrap es-scrollbar">
            <table className="es-data-table">
              <tbody>
                {(tabSamples[tab] || []).map((row) => (
                  <tr key={row.join("-")}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

function EmployeesModule() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    department: "All",
    designation: "All",
    employmentType: "All",
    status: "All",
    location: "All",
    manager: "All",
    joined: "All",
  });

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const unique = (key) => [...new Set(employees.map((employee) => employee[key]))];

  const filteredEmployees = employees.filter((employee) => {
    const searchText = `${employee.name} ${employee.code} ${employee.email}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesFilters =
      (filters.department === "All" || employee.department === filters.department) &&
      (filters.designation === "All" || employee.designation === filters.designation) &&
      (filters.employmentType === "All" || employee.employmentType === filters.employmentType) &&
      (filters.status === "All" || employee.status === filters.status) &&
      (filters.location === "All" || employee.location === filters.location) &&
      (filters.manager === "All" || employee.manager === filters.manager) &&
      (filters.joined === "All" || employee.joiningDate.includes(filters.joined));

    return matchesSearch && matchesFilters;
  });

  const activeEmployees = employees.filter((employee) => employee.status === "Active").length;
  const inactiveEmployees = employees.filter((employee) => employee.status === "Inactive").length;
  const avgEsg = Math.round(employees.reduce((sum, employee) => sum + employee.esgScore, 0) / employees.length);
  const avgXp = Math.round(employees.reduce((sum, employee) => sum + employee.xp, 0) / employees.length);

  const stats = [
    { icon: Users, label: "Total Employees", value: employees.length, delta: "Read only", positive: true, tint: "#E8F3FC", theme: "blue" },
    { icon: CheckCircle2, label: "Active Employees", value: activeEmployees, delta: "Live", positive: true, tint: "#E9FBF5", theme: "green" },
    { icon: Clock3, label: "Inactive Employees", value: inactiveEmployees, delta: "Archived", positive: true, tint: "#FEF9E7", theme: "gold" },
    { icon: Building2, label: "Departments Covered", value: unique("department").length, delta: "100%", positive: true, tint: "#E8F3FC", theme: "blue" },
    { icon: Leaf, label: "Average ESG Score", value: avgEsg, delta: "+4.1%", positive: true, tint: "#E9FBF5", theme: "green" },
    { icon: Trophy, label: "Average XP", value: avgXp.toLocaleString(), delta: "+8.7%", positive: true, tint: "#FEF9E7", theme: "gold" },
  ];

  if (selectedEmployee) {
    return <EmployeeProfile employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} />;
  }

  return (
    <section className="es-employees-page es-fade-up">
      <div className="es-page-header">
        <div>
          <h1>Employees</h1>
          <p>View employee information and ESG engagement across the organization.</p>
        </div>
      </div>

      <div className="es-stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} cardStyle="vibrant" />
        ))}
      </div>

      <div className="es-filter-card">
        <div className="es-filter-search">
          <Search size={15} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by employee name, code, or email"
          />
        </div>
        <div className="es-filter-grid">
          <FilterSelect label="Department" value={filters.department} onChange={(value) => updateFilter("department", value)} options={unique("department")} />
          <FilterSelect label="Designation" value={filters.designation} onChange={(value) => updateFilter("designation", value)} options={unique("designation")} />
          <FilterSelect label="Employment Type" value={filters.employmentType} onChange={(value) => updateFilter("employmentType", value)} options={unique("employmentType")} />
          <FilterSelect label="Status" value={filters.status} onChange={(value) => updateFilter("status", value)} options={["Active", "Inactive", "On Leave"]} />
          <FilterSelect label="Location" value={filters.location} onChange={(value) => updateFilter("location", value)} options={unique("location")} />
          <FilterSelect label="Manager" value={filters.manager} onChange={(value) => updateFilter("manager", value)} options={unique("manager")} />
          <FilterSelect label="Date Joined" value={filters.joined} onChange={(value) => updateFilter("joined", value)} options={["2024", "2023", "2022", "2021", "2020"]} />
        </div>
      </div>

      <div className="es-card es-employee-table-card">
        <div className="es-card-header-row">
          <div>
            <p className="es-card-title">Employee Directory</p>
            <p className="es-card-subtitle">{filteredEmployees.length} employees shown</p>
          </div>
        </div>
        <div className="es-table-wrap es-scrollbar">
          <table className="es-data-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Employee Code</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Manager</th>
                <th>Status</th>
                <th>Joining Date</th>
                <th>XP</th>
                <th>ESG Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td><EmployeeAvatar employee={employee} /></td>
                  <td className="es-mono">{employee.code}</td>
                  <td>
                    <div className="es-table-person">
                      <strong>{employee.name}</strong>
                      <span>{employee.email}</span>
                    </div>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.manager}</td>
                  <td><StatusBadge status={employee.status} /></td>
                  <td>{employee.joiningDate}</td>
                  <td className="es-mono">{employee.xp.toLocaleString()}</td>
                  <td>
                    <span className="es-score-pill">{employee.esgScore}</span>
                  </td>
                  <td>
                    <button className="es-view-btn" onClick={() => setSelectedEmployee(employee)}>
                      <Eye size={14} />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function AddUserForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "User",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [saving, setSaving] = useState(false);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.username.trim() || !form.password || !form.role) {
      setStatus({ type: "error", message: "Username, password, and role are required." });
      return;
    }

    setSaving(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username.trim(),
          password: form.password,
          role: form.role,
        }),
      });
      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error("Register API did not return JSON. Check that the backend server is running.");
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to add user.");
      }

      setForm({ username: "", password: "", role: "User" });
      setStatus({ type: "success", message: data.message || "User added successfully." });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Unable to add user." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="es-admin-user-page es-fade-up">
      <div className="es-page-header">
        <div>
          <h1>Add user</h1>
          <p>Create a new EcoSphere account using the register API.</p>
        </div>
      </div>

      <div className="es-card es-admin-user-card">
        <div className="es-card-header-row">
          <div>
            <p className="es-card-title">User account</p>
            <p className="es-card-subtitle">Register a User or Admin account.</p>
          </div>
          <div className="es-admin-user-icon">
            <Users size={18} />
          </div>
        </div>

        <form className="es-admin-user-form" onSubmit={handleSubmit}>
          <label className="es-admin-field">
            <span>Username</span>
            <input
              value={form.username}
              onChange={(event) => updateField("username", event.target.value)}
              placeholder="Enter username"
            />
          </label>

          <label className="es-admin-field">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              placeholder="Enter password"
            />
          </label>

          <label className="es-admin-field">
            <span>Role</span>
            <select
              value={form.role}
              onChange={(event) => updateField("role", event.target.value)}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </label>

          {status.message && (
            <p className={`es-admin-form-message ${status.type}`}>
              {status.message}
            </p>
          )}

          <div className="es-admin-form-actions">
            <button type="submit" disabled={saving} className="es-admin-submit">
              {saving ? "Adding..." : "Add user"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function UserDashboard({ user, onLogout }) {
  const initials = user
    .slice(0, 2)
    .toUpperCase();
  const userStats = [
    { icon: Leaf, label: "My ESG Score", value: "82", delta: "Good standing", positive: true, tint: "#E9FBF5", theme: "green" },
    { icon: Trophy, label: "Challenge Points", value: "1,250", delta: "+120 this month", positive: true, tint: "#FEF9E7", theme: "gold" },
    { icon: Calendar, label: "CSR Activities", value: "6", delta: "2 upcoming", positive: true, tint: "#E8F3FC", theme: "blue" },
  ];

  return (
    <div className="es-app-container es-user-dashboard">
      <header className="es-user-header">
        <div className="es-user-brand">
          <SphereMark size={32} />
          <span>EcoSphere</span>
        </div>
        <button onClick={onLogout} className="es-user-logout">
          <LogOut size={15} />
          Sign out
        </button>
      </header>

      <main className="es-user-main">
        <section className="es-user-welcome es-fade-up">
          <div className="es-user-avatar">{initials}</div>
          <div>
            <p className="es-user-kicker">Dashboard</p>
            <h1>Welcome, {user}</h1>
            <p>Your EcoSphere activity summary is ready.</p>
          </div>
        </section>

        <section className="es-stats-grid es-fade-up">
          {userStats.map((stat) => (
            <StatCard key={stat.label} {...stat} cardStyle="vibrant" />
          ))}
        </section>

        <section className="es-card es-user-static-card es-fade-up">
          <p className="es-card-title">My sustainability snapshot</p>
          <div className="es-timeline">
            <span><CheckCircle2 size={15} />Completed profile verification</span>
            <span><Award size={15} />Earned Carbon Warrior badge</span>
            <span><Calendar size={15} />Next CSR event: Tree plantation drive</span>
          </div>
        </section>
      </main>
    </div>
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

function AdminDashboard({ user, onLogout }) {
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
          {active === "departments" ? (
            <DepartmentsPage />
          ) : active === "employees" ? (
            <EmployeesModule />
          ) : active === "settings" ? (
            <AddUserForm />
          ) : (
            <>
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
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export function Dashboard({ user, role, onLogout }) {
  if (role === "User") {
    return <UserDashboard user={user} onLogout={onLogout} />;
  }

  return <AdminDashboard user={user} onLogout={onLogout} />;
}
