import React, { useState } from "react";
import {
  Building2, UserRound, MapPin, Mail, Phone, Calendar, CheckCircle2, Award, 
  ShieldCheck, Gift, Eye, Search, Plus, Trash2
} from "lucide-react";
import "./EcoSphereApp.css";

const initialEmployees = [
  {
    id: 1, code: "EMP001", name: "Sarah Connor", initials: "SC", email: "sarah.connor@ecosphere.com",
    phone: "+91 98765 43210", department: "Engineering & Dev", designation: "Sustainability Lead",
    manager: "Michael Chen", status: "Active", joiningDate: "10 Apr 2023", employmentType: "Full Time",
    location: "Bengaluru", xp: 4200, esgScore: 88, environmental: 91, social: 86, governance: 87,
    rank: 3, badges: 12, challenges: 8, csr: 15, points: 3150,
  },
  {
    id: 2, code: "EMP002", name: "Michael Chen", initials: "MC", email: "michael.chen@ecosphere.com",
    phone: "+91 98765 43211", department: "Engineering & Dev", designation: "Engineering Manager",
    manager: "Aisha Mehta", status: "Active", joiningDate: "18 Jan 2021", employmentType: "Full Time",
    location: "Hyderabad", xp: 5100, esgScore: 92, environmental: 94, social: 91, governance: 90,
    rank: 1, badges: 18, challenges: 11, csr: 22, points: 4020,
  },
  {
    id: 3, code: "EMP003", name: "Priya Nair", initials: "PN", email: "priya.nair@ecosphere.com",
    phone: "+91 98765 43212", department: "Human Resources", designation: "People Operations Partner",
    manager: "Aisha Mehta", status: "On Leave", joiningDate: "05 Aug 2022", employmentType: "Full Time",
    location: "Mumbai", xp: 3380, esgScore: 81, environmental: 78, social: 88, governance: 77,
    rank: 9, badges: 9, challenges: 6, csr: 13, points: 2440,
  },
  {
    id: 4, code: "EMP004", name: "Rahul Verma", initials: "RV", email: "rahul.verma@ecosphere.com",
    phone: "+91 98765 43213", department: "Finance & Admin", designation: "Compliance Analyst",
    manager: "Nora Kapoor", status: "Active", joiningDate: "21 Nov 2020", employmentType: "Full Time",
    location: "Delhi", xp: 2870, esgScore: 76, environmental: 72, social: 75, governance: 82,
    rank: 14, badges: 7, challenges: 5, csr: 8, points: 1980,
  },
  {
    id: 5, code: "EMP005", name: "Elena D'Souza", initials: "ED", email: "elena.dsouza@ecosphere.com",
    phone: "+91 98765 43214", department: "Brand & Marketing", designation: "CSR Campaign Manager",
    manager: "Nora Kapoor", status: "Inactive", joiningDate: "14 Mar 2019", employmentType: "Contract",
    location: "Pune", xp: 2210, esgScore: 69, environmental: 65, social: 79, governance: 63,
    rank: 22, badges: 5, challenges: 3, csr: 10, points: 1560,
  },
  {
    id: 6, code: "EMP006", name: "Arjun Rao", initials: "AR", email: "arjun.rao@ecosphere.com",
    phone: "+91 98765 43215", department: "Sales & Accounts", designation: "Enterprise Account Lead",
    manager: "Michael Chen", status: "Active", joiningDate: "02 Jun 2024", employmentType: "Full Time",
    location: "Chennai", xp: 3640, esgScore: 84, environmental: 82, social: 89, governance: 80,
    rank: 7, badges: 10, challenges: 7, csr: 12, points: 2700,
  },
];

const profileTabs = [
  "Overview", "CSR Activities", "Challenges", "Policies", "Badges", "Rewards", "Compliance"
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
    ["Carbon Warrior", "04 Apr 2026", "500 CSR Points"],
    ["CSR Champion", "18 Jun 2026", "1000 CSR Points"],
    ["Policy Steward", "02 Mar 2026", "300 CSR Points"],
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

export function StatusBadge({ status }) {
  const key = status.toLowerCase().replace(/\s+/g, "-");
  return <span className={`es-status-badge status-${key}`}>{status}</span>;
}

export function EmployeeAvatar({ employee, large = false }) {
  return (
    <div className={`es-employee-avatar ${large ? "large" : ""}`}>
      {employee.initials}
    </div>
  );
}

export function FilterSelect({ label, value, onChange, options }) {
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
              {tab === "Badges" && (
                <thead>
                  <tr>
                    <th>Badge</th>
                    <th>Earned Date</th>
                    <th>CSR Points Required</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {(tabSamples[tab] || []).map((row) => (
                  <tr key={row.join("-")}>
                    {row.map((cell, idx) => (
                      <td key={idx}>{cell}</td>
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

function EmployeeForm({ onBack, onSave }) {
  const [formData, setFormData] = useState({
    code: "", name: "", email: "", phone: "", gender: "", dob: "",
    joiningDate: "", employmentType: "", designation: "", status: "Active", workLocation: "",
    department: "", manager: "", businessUnit: "", officeLocation: "", country: "", state: "", city: ""
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.code) newErrors.code = "Required";
    if (!formData.name) newErrors.name = "Required";
    if (!formData.email) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) {
      newErrors.phone = "Required";
    }
    if (!formData.department) newErrors.department = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave({
        id: Date.now(),
        code: formData.code,
        name: formData.name,
        initials: formData.name.substring(0, 2).toUpperCase(),
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        designation: formData.designation || "Employee",
        manager: formData.manager || "Unassigned",
        status: formData.status,
        joiningDate: formData.joiningDate || new Date().toISOString().split("T")[0],
        employmentType: formData.employmentType || "Full Time",
        location: formData.workLocation || formData.city || "Remote",
        xp: 0, esgScore: 0, environmental: 0, social: 0, governance: 0,
        rank: 0, badges: 0, challenges: 0, csr: 0, points: 0,
      });
    }
  };

  return (
    <section className="es-fade-up" style={{ padding: "1rem 0" }}>
      <button className="es-text-action" onClick={onBack} style={{ marginBottom: "1rem" }}>Back to employees</button>
      
      <div className="es-page-header">
        <div>
          <h1>Add Employee</h1>
          <p>Create a new employee profile in the system.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="es-btn-submit" onClick={handleSave} style={{ width: "auto", padding: "0.5rem 1.5rem", marginTop: 0 }}>
            Save Employee
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* Basic Information */}
        <div className="es-card">
          <p className="es-card-title">Basic Information</p>
          <div className="es-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <label className="es-form-group">
              <span className="es-form-label">Employee Code *</span>
              <input className="es-input" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} />
              {errors.code && <span className="es-form-error" style={{marginTop: "0.5rem"}}>{errors.code}</span>}
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Full Name *</span>
              <input className="es-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              {errors.name && <span className="es-form-error" style={{marginTop: "0.5rem"}}>{errors.name}</span>}
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Email *</span>
              <input className="es-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              {errors.email && <span className="es-form-error" style={{marginTop: "0.5rem"}}>{errors.email}</span>}
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Phone Number *</span>
              <input className="es-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              {errors.phone && <span className="es-form-error" style={{marginTop: "0.5rem"}}>{errors.phone}</span>}
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Profile Photo Upload</span>
              <input type="file" className="es-input" accept="image/*" />
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Gender</span>
              <select className="es-input" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Date of Birth</span>
              <input type="date" className="es-input" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
            </label>
          </div>
        </div>

        {/* Employment Information */}
        <div className="es-card">
          <p className="es-card-title">Employment Information</p>
          <div className="es-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <label className="es-form-group">
              <span className="es-form-label">Joining Date</span>
              <input type="date" className="es-input" value={formData.joiningDate} onChange={(e) => setFormData({...formData, joiningDate: e.target.value})} />
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Employment Type</span>
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                {["Full Time", "Part Time", "Contract", "Intern"].map(type => (
                  <label key={type} className="es-form-checkbox-label">
                    <input type="radio" name="employmentType" value={type} checked={formData.employmentType === type} onChange={(e) => setFormData({...formData, employmentType: e.target.value})} className="es-checkbox" />
                    <span className="es-checkbox-text">{type}</span>
                  </label>
                ))}
              </div>
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Designation / Job Title</span>
              <input className="es-input" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} />
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Employee Status</span>
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                {["Active", "On Leave", "Inactive"].map(status => (
                  <label key={status} className="es-form-checkbox-label">
                    <input type="radio" name="status" value={status} checked={formData.status === status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="es-checkbox" />
                    <span className="es-checkbox-text">{status}</span>
                  </label>
                ))}
              </div>
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Work Location</span>
              <input className="es-input" value={formData.workLocation} onChange={(e) => setFormData({...formData, workLocation: e.target.value})} />
            </label>
          </div>
        </div>

        {/* Organization */}
        <div className="es-card">
          <p className="es-card-title">Organization</p>
          <div className="es-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <label className="es-form-group">
              <span className="es-form-label">Department *</span>
              <input className="es-input" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
              {errors.department && <span className="es-form-error" style={{marginTop: "0.5rem"}}>{errors.department}</span>}
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Reporting Manager</span>
              <input className="es-input" value={formData.manager} onChange={(e) => setFormData({...formData, manager: e.target.value})} />
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Business Unit</span>
              <input className="es-input" value={formData.businessUnit} onChange={(e) => setFormData({...formData, businessUnit: e.target.value})} />
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Office Location</span>
              <input className="es-input" value={formData.officeLocation} onChange={(e) => setFormData({...formData, officeLocation: e.target.value})} />
            </label>
            <label className="es-form-group">
              <span className="es-form-label">Country</span>
              <input className="es-input" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
            </label>
            <label className="es-form-group">
              <span className="es-form-label">State</span>
              <input className="es-input" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
            </label>
            <label className="es-form-group">
              <span className="es-form-label">City</span>
              <input className="es-input" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

const ITEMS_PER_PAGE = 8;

function Pagination({ total, perPage, current, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="es-pagination">
      <button
        className="es-page-btn"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
      >&#8249;</button>
      {pages.map((p) => (
        <button
          key={p}
          className={`es-page-btn${current === p ? " active" : ""}`}
          onClick={() => onChange(p)}
        >{p}</button>
      ))}
      <button
        className="es-page-btn"
        onClick={() => onChange(current + 1)}
        disabled={current === totalPages}
      >&#8250;</button>
    </div>
  );
}

export function EmployeesModule() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    department: "All", designation: "All", employmentType: "All",
    status: "All", location: "All", manager: "All", joined: "All",
  });

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setCurrentPage(1);
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

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  if (showForm) {
    return <EmployeeForm 
      onBack={() => setShowForm(false)} 
      onSave={(newEmp) => {
        setEmployees([newEmp, ...employees]);
        setShowForm(false);
      }} 
    />;
  }

  if (selectedEmployee) {
    return <EmployeeProfile employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} />;
  }

  return (
    <section className="es-employees-page es-fade-up">
      <div className="es-page-header">
        <div>
          <h1>Employees</h1>
        </div>
        <div>
          <button className="es-btn-submit" onClick={() => setShowForm(true)} style={{ width: "auto", padding: "0.5rem 1rem", margin: 0 }}>
            <Plus size={16} /> Add Employee
          </button>
        </div>
      </div>

      <div className="es-filter-card">
        <div className="es-filter-search">
          <Search size={15} />
          <input
            value={search}
            onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }}
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
            <p className="es-card-subtitle">{filteredEmployees.length} employees found &middot; Page {currentPage} of {Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE) || 1}</p>
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
              {paginatedEmployees.map((employee) => (
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
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="es-view-btn" onClick={() => setSelectedEmployee(employee)}>
                        <Eye size={14} />
                        View
                      </button>
                      <button className="es-view-btn" style={{ color: "var(--color-error)" }} onClick={() => handleDelete(employee.id, employee.name)}>
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          total={filteredEmployees.length}
          perPage={ITEMS_PER_PAGE}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
