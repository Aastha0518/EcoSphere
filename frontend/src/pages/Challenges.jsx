import React, { useState } from "react";
import { Search, Trophy, CheckCircle2, Clock3, Plus, ChevronLeft, Eye, Trash2 } from "lucide-react";
import "./EcoSphereApp.css";

const challengesData = [
  { id: 1, title: "Cycle to Work Week", category: "Environmental", difficulty: "Medium", xp: 500, participants: 142, deadline: "15 Aug 2026", status: "Active", department: "All", csr: 100 },
  { id: 2, title: "Plastic Free Office", category: "Environmental", difficulty: "Easy", xp: 200, participants: 350, deadline: "30 Aug 2026", status: "Active", department: "All", csr: 50 },
  { id: 3, title: "Tree Plantation Drive", category: "Social", difficulty: "Hard", xp: 1000, participants: 85, deadline: "05 Sep 2026", status: "Active", department: "All", csr: 250 },
  { id: 4, title: "Switch Off Campaign", category: "Environmental", difficulty: "Easy", xp: 150, participants: 410, deadline: "10 Jul 2026", status: "Completed", department: "All", csr: 50 },
  { id: 5, title: "Paperless Month", category: "Governance", difficulty: "Medium", xp: 600, participants: 220, deadline: "31 Oct 2026", status: "Active", department: "Finance & Admin", csr: 150 },
  { id: 6, title: "Green Commute", category: "Environmental", difficulty: "Medium", xp: 450, participants: 180, deadline: "20 Sep 2026", status: "Active", department: "Engineering & Dev", csr: 100 },
  { id: 7, title: "Waste Segregation", category: "Environmental", difficulty: "Easy", xp: 300, participants: 500, deadline: "01 Dec 2026", status: "Active", department: "All", csr: 75 },
  { id: 8, title: "Water Saving Challenge", category: "Environmental", difficulty: "Medium", xp: 400, participants: 195, deadline: "15 Nov 2026", status: "Active", department: "All", csr: 100 },
  { id: 9, title: "Reusable Bottle Campaign", category: "Environmental", difficulty: "Easy", xp: 250, participants: 480, deadline: "25 Jul 2026", status: "Completed", department: "All", csr: 50 },
  { id: 10, title: "Carbon Footprint Reduction", category: "Environmental", difficulty: "Expert", xp: 2000, participants: 45, deadline: "31 Dec 2026", status: "Active", department: "All", csr: 500 },
  { id: 11, title: "Diversity Training", category: "Social", difficulty: "Easy", xp: 300, participants: 390, deadline: "30 Sep 2026", status: "Active", department: "Human Resources", csr: 100 },
  { id: 12, title: "Community Volunteering", category: "Social", difficulty: "Hard", xp: 800, participants: 110, deadline: "12 Oct 2026", status: "Active", department: "All", csr: 200 },
  { id: 13, title: "Code of Ethics Quiz", category: "Governance", difficulty: "Easy", xp: 150, participants: 520, deadline: "01 Jun 2026", status: "Completed", department: "All", csr: 50 },
  { id: 14, title: "Energy Audit participation", category: "Governance", difficulty: "Medium", xp: 500, participants: 75, deadline: "28 Feb 2026", status: "Archived", department: "Engineering & Dev", csr: 150 },
  { id: 15, title: "Vegan Lunch Week", category: "Environmental", difficulty: "Medium", xp: 400, participants: 230, deadline: "15 Sep 2026", status: "Active", department: "All", csr: 100 },
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
          <span className={`es-stat-delta ${positive ? "positive" : "negative"}`}>
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

function StatusBadge({ status }) {
  const key = status.toLowerCase().replace(/\s+/g, "-");
  return <span className={`es-status-badge status-${key}`}>{status}</span>;
}

function ChallengeForm({ onBack, onSave }) {
  const [formData, setFormData] = useState({
    title: "", category: "Environmental", description: "", difficulty: "Medium",
    xp: "", csr: "", department: "All", deadline: "", evidenceRequired: "Yes", maxParticipants: "", status: "Draft"
  });

  const handleSave = () => {
    onSave({
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      difficulty: formData.difficulty,
      xp: parseInt(formData.xp) || 0,
      participants: 0,
      deadline: formData.deadline,
      status: formData.status,
      department: formData.department,
      csr: parseInt(formData.csr) || 0
    });
  };

  return (
    <section className="es-fade-up" style={{ padding: "1rem 0" }}>
      <button className="es-text-action" onClick={onBack} style={{ marginBottom: "1rem" }}>Back to challenges</button>
      
      <div className="es-page-header">
        <div>
          <h1>Create Challenge</h1>
          <p>Launch a new sustainability challenge for employees.</p>
        </div>
        <div>
          <button className="es-btn-submit" onClick={handleSave} style={{ width: "auto", padding: "0.5rem 1.5rem", marginTop: 0 }}>
            Save Challenge
          </button>
        </div>
      </div>

      <div className="es-card">
        <p className="es-card-title">Challenge Details</p>
        <div className="es-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <label className="es-form-group">
            <span className="es-form-label">Title *</span>
            <input className="es-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </label>
          <label className="es-form-group">
            <span className="es-form-label">Category</span>
            <select className="es-input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option>Environmental</option>
              <option>Social</option>
              <option>Governance</option>
            </select>
          </label>
          <label className="es-form-group" style={{ gridColumn: "1 / -1" }}>
            <span className="es-form-label">Description</span>
            <textarea className="es-input" rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          </label>
          <label className="es-form-group">
            <span className="es-form-label">Difficulty</span>
            <select className="es-input" value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
              <option>Expert</option>
            </select>
          </label>
          <label className="es-form-group">
            <span className="es-form-label">Department</span>
            <select className="es-input" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
              <option>All</option>
              <option>Engineering & Dev</option>
              <option>Finance & Admin</option>
              <option>Human Resources</option>
            </select>
          </label>
          <label className="es-form-group">
            <span className="es-form-label">XP Reward</span>
            <input type="number" className="es-input" value={formData.xp} onChange={(e) => setFormData({...formData, xp: e.target.value})} />
          </label>
          <label className="es-form-group">
            <span className="es-form-label">CSR Points</span>
            <input type="number" className="es-input" value={formData.csr} onChange={(e) => setFormData({...formData, csr: e.target.value})} />
          </label>
          <label className="es-form-group">
            <span className="es-form-label">Deadline</span>
            <input type="date" className="es-input" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} />
          </label>
          <label className="es-form-group">
            <span className="es-form-label">Maximum Participants</span>
            <input type="number" className="es-input" value={formData.maxParticipants} onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})} />
          </label>
          <label className="es-form-group">
            <span className="es-form-label">Evidence Required</span>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              {["Yes", "No"].map(val => (
                <label key={val} className="es-form-checkbox-label">
                  <input type="radio" name="evidence" value={val} checked={formData.evidenceRequired === val} onChange={(e) => setFormData({...formData, evidenceRequired: e.target.value})} className="es-checkbox" />
                  <span className="es-checkbox-text">{val}</span>
                </label>
              ))}
            </div>
          </label>
          <label className="es-form-group">
            <span className="es-form-label">Status</span>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              {["Draft", "Active", "Completed", "Archived"].map(val => (
                <label key={val} className="es-form-checkbox-label">
                  <input type="radio" name="status" value={val} checked={formData.status === val} onChange={(e) => setFormData({...formData, status: e.target.value})} className="es-checkbox" />
                  <span className="es-checkbox-text">{val}</span>
                </label>
              ))}
            </div>
          </label>
        </div>
      </div>
    </section>
  );
}

function ChallengeDetail({ challenge, onBack }) {
  return (
    <section className="es-fade-up">
      <button className="es-text-action" onClick={onBack} style={{ marginBottom: "1rem" }}>
        <ChevronLeft size={16} style={{ display: "inline", verticalAlign: "middle" }} /> Back to challenges
      </button>

      <div className="es-profile-hero" style={{ padding: "2rem" }}>
        <div className="es-profile-title-row">
          <h1>{challenge.title}</h1>
          <StatusBadge status={challenge.status} />
        </div>
        <p style={{ marginTop: "0.5rem" }}>{challenge.category} · {challenge.difficulty} Difficulty</p>
      </div>

      <div className="es-profile-grid" style={{ marginTop: "1rem" }}>
        <div className="es-card">
          <p className="es-card-title">Overview</p>
          <div className="es-detail-list">
            <span><strong>XP Reward</strong>{challenge.xp} XP</span>
            <span><strong>CSR Points</strong>{challenge.csr} Points</span>
            <span><strong>Deadline</strong>{challenge.deadline}</span>
            <span><strong>Participants</strong>{challenge.participants}</span>
            <span><strong>Target Department</strong>{challenge.department}</span>
          </div>
        </div>

        <div className="es-card">
          <p className="es-card-title">Leaderboard (Top 3)</p>
          <div className="es-table-wrap">
            <table className="es-data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Employee</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Sarah Connor</td>
                  <td>100%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Michael Chen</td>
                  <td>90%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Arjun Rao</td>
                  <td>85%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

const CHALLENGES_PER_PAGE = 8;

function Pagination({ total, perPage, current, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="es-pagination">
      <button className="es-page-btn" onClick={() => onChange(current - 1)} disabled={current === 1}>&#8249;</button>
      {pages.map((p) => (
        <button key={p} className={`es-page-btn${current === p ? " active" : ""}`} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button className="es-page-btn" onClick={() => onChange(current + 1)} disabled={current === totalPages}>&#8250;</button>
    </div>
  );
}

export function ChallengesModule() {
  const [challenges, setChallenges] = useState(challengesData);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "All", difficulty: "All", status: "All", department: "All", date: "All"
  });

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setCurrentPage(1);
  };

  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filters.category === "All" || c.category === filters.category;
    const matchesDifficulty = filters.difficulty === "All" || c.difficulty === filters.difficulty;
    const matchesStatus = filters.status === "All" || c.status === filters.status;
    const matchesDepartment = filters.department === "All" || c.department === filters.department;
    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus && matchesDepartment;
  });

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this challenge?")) {
      setChallenges(challenges.filter(c => c.id !== id));
    }
  };

  if (showForm) {
    return <ChallengeForm onBack={() => setShowForm(false)} onSave={(newC) => { setChallenges([newC, ...challenges]); setShowForm(false); }} />;
  }

  if (selectedChallenge) {
    return <ChallengeDetail challenge={selectedChallenge} onBack={() => setSelectedChallenge(null)} />;
  }

  const activeCount = challenges.filter(c => c.status === "Active").length;
  const completedCount = challenges.filter(c => c.status === "Completed").length;
  const archivedCount = challenges.filter(c => c.status === "Archived").length;

  return (
    <section className="es-fade-up">
      <div className="es-page-header">
        <div>
          <h1>Challenges</h1>
        </div>
        <div>
          <button className="es-btn-submit" onClick={() => setShowForm(true)} style={{ width: "auto", padding: "0.5rem 1rem", margin: 0 }}>
            <Plus size={16} /> Create Challenge
          </button>
        </div>
      </div>

      <div className="es-stats-grid">
        <StatCard icon={Trophy} label="Total Challenges" value={challenges.length} cardStyle="vibrant" theme="blue" />
        <StatCard icon={CheckCircle2} label="Active" value={activeCount} cardStyle="vibrant" theme="green" />
        <StatCard icon={CheckCircle2} label="Completed" value={completedCount} cardStyle="vibrant" theme="gold" />
        <StatCard icon={Clock3} label="Archived" value={archivedCount} cardStyle="vibrant" theme="blue" />
      </div>

      <div className="es-filter-card">
        <div className="es-filter-search">
          <Search size={15} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search challenges by title..."
          />
        </div>
        <div className="es-filter-grid">
          <FilterSelect label="Category" value={filters.category} onChange={(value) => updateFilter("category", value)} options={["Environmental", "Social", "Governance"]} />
          <FilterSelect label="Difficulty" value={filters.difficulty} onChange={(value) => updateFilter("difficulty", value)} options={["Easy", "Medium", "Hard", "Expert"]} />
          <FilterSelect label="Status" value={filters.status} onChange={(value) => updateFilter("status", value)} options={["Active", "Completed", "Archived", "Draft"]} />
          <FilterSelect label="Department" value={filters.department} onChange={(value) => updateFilter("department", value)} options={["Engineering & Dev", "Finance & Admin", "Human Resources"]} />
        </div>
      </div>

      <div className="es-card es-employee-table-card">
        <div className="es-card-header-row">
          <div>
            <p className="es-card-title">Challenge Directory</p>
            <p className="es-card-subtitle">{filteredChallenges.length} challenges found &middot; Page {currentPage} of {Math.ceil(filteredChallenges.length / CHALLENGES_PER_PAGE) || 1}</p>
          </div>
        </div>
        <div className="es-table-wrap es-scrollbar">
          <table className="es-data-table">
            <thead>
              <tr>
                <th>Challenge Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>XP Reward</th>
                <th>Participants</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredChallenges.slice((currentPage - 1) * CHALLENGES_PER_PAGE, currentPage * CHALLENGES_PER_PAGE).map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.title}</strong></td>
                  <td>{c.category}</td>
                  <td>{c.difficulty}</td>
                  <td className="es-mono">{c.xp} XP</td>
                  <td>{c.participants}</td>
                  <td>{c.deadline}</td>
                  <td><StatusBadge status={c.status} /></td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="es-view-btn" onClick={() => setSelectedChallenge(c)}>
                        <Eye size={14} /> View
                      </button>
                      <button className="es-view-btn" style={{ color: "var(--color-error)" }} onClick={() => handleDelete(c.id)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          total={filteredChallenges.length}
          perPage={CHALLENGES_PER_PAGE}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
