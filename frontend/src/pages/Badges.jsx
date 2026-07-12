import React, { useState } from "react";
import { Search, Award, ChevronLeft } from "lucide-react";
import "./EcoSphereApp.css";

const badgesData = [
  // Environmental
  { id: 1, icon: "🌱", name: "Carbon Starter", category: "Environmental", description: "First Carbon Reduction Activity", points: 100, status: "Active" },
  { id: 2, icon: "🌿", name: "Eco Explorer", category: "Environmental", description: "5 Environmental Activities", points: 250, status: "Active" },
  { id: 3, icon: "♻", name: "Green Champion", category: "Environmental", description: "Reduce 500kg CO₂", points: 500, status: "Active" },
  { id: 4, icon: "🌍", name: "Earth Guardian", category: "Environmental", description: "Reduce 2000kg CO₂", points: 1000, status: "Active" },
  { id: 5, icon: "🌳", name: "Tree Protector", category: "Environmental", description: "Complete 20 Environmental Challenges", points: 1500, status: "Active" },
  
  // Social
  { id: 6, icon: "🤝", name: "Community Helper", category: "Social", description: "Complete first CSR Activity", points: 100, status: "Active" },
  { id: 7, icon: "❤️", name: "Volunteer", category: "Social", description: "Participate in 5 CSR Activities", points: 250, status: "Active" },
  { id: 8, icon: "🏅", name: "CSR Champion", category: "Social", description: "Participate in 20 CSR Activities", points: 1000, status: "Active" },
  { id: 9, icon: "🌟", name: "Social Impact Leader", category: "Social", description: "Earn 1000 CSR Points", points: 1500, status: "Active" },

  // Governance
  { id: 10, icon: "📜", name: "Policy Reader", category: "Governance", description: "Accept first ESG Policy", points: 100, status: "Active" },
  { id: 11, icon: "✅", name: "Compliance Star", category: "Governance", description: "Accept all mandatory policies", points: 300, status: "Active" },
  { id: 12, icon: "🛡", name: "Governance Guardian", category: "Governance", description: "No compliance violations", points: 600, status: "Active" },
  { id: 13, icon: "⚖", name: "Ethics Champion", category: "Governance", description: "Complete governance training", points: 1000, status: "Active" },

  // Challenge
  { id: 14, icon: "🚀", name: "First Challenger", category: "Challenge", description: "Complete first challenge", points: 100, status: "Active" },
  { id: 15, icon: "🔥", name: "Challenge Master", category: "Challenge", description: "Complete 10 Challenges", points: 750, status: "Active" },
  { id: 16, icon: "🏆", name: "ESG Hero", category: "Challenge", description: "Complete 50 Challenges", points: 2000, status: "Active" },
  { id: 17, icon: "⚡", name: "Speed Runner", category: "Challenge", description: "Complete challenge before deadline", points: 500, status: "Active" },

  // XP
  { id: 18, icon: "🥉", name: "Bronze ESG Member", category: "XP", description: "100 XP", points: 0, status: "Active" },
  { id: 19, icon: "🥈", name: "Silver ESG Member", category: "XP", description: "500 XP", points: 0, status: "Active" },
  { id: 20, icon: "🥇", name: "Gold ESG Member", category: "XP", description: "1000 XP", points: 0, status: "Active" },
  { id: 21, icon: "💎", name: "Platinum ESG Member", category: "XP", description: "2500 XP", points: 0, status: "Active" },
  { id: 22, icon: "💠", name: "Diamond ESG Member", category: "XP", description: "5000 XP", points: 0, status: "Active" },
  { id: 23, icon: "👑", name: "Legend", category: "XP", description: "10000 XP", points: 0, status: "Active" },

  // Leadership
  { id: 24, icon: "👨💼", name: "Team Mentor", category: "Leadership", description: "Lead 10 Employees", points: 1000, status: "Active" },
  { id: 25, icon: "🏢", name: "Department Champion", category: "Leadership", description: "Highest Department ESG Score", points: 2000, status: "Active" },
  { id: 26, icon: "🏅", name: "ESG Ambassador", category: "Leadership", description: "Recommend 20 Employees", points: 1500, status: "Active" },

  // Consistency
  { id: 27, icon: "📅", name: "7-Day Streak", category: "Consistency", description: "Complete activities 7 days", points: 250, status: "Active" },
  { id: 28, icon: "📅", name: "30-Day Streak", category: "Consistency", description: "30 Days", points: 750, status: "Active" },
  { id: 29, icon: "📅", name: "100-Day Streak", category: "Consistency", description: "100 Days", points: 2000, status: "Active" },

  // Special Event
  { id: 30, icon: "🌍", name: "Earth Day 2026", category: "Special Event", description: "Participated in Earth Day", points: 200, status: "Active" },
  { id: 31, icon: "♻", name: "Plastic Free Week", category: "Special Event", description: "Zero plastic for a week", points: 300, status: "Active" },
];

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

function BadgeDetail({ badge, onBack }) {
  return (
    <section className="es-fade-up">
      <button className="es-text-action" onClick={onBack} style={{ marginBottom: "1rem" }}>
        <ChevronLeft size={16} style={{ display: "inline", verticalAlign: "middle" }} /> Back to badges
      </button>

      <div className="es-profile-hero" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem" }}>
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>{badge.icon}</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-ink)", marginBottom: "0.5rem" }}>
          {badge.name}
        </h1>
        <StatusBadge status={badge.status} />
        <p style={{ color: "var(--color-ink-mute)", marginTop: "1rem", fontSize: "1.1rem" }}>{badge.description}</p>
      </div>

      <div className="es-profile-grid" style={{ marginTop: "2rem" }}>
        <div className="es-card">
          <p className="es-card-title">Badge Information</p>
          <div className="es-detail-list">
            <span><strong>Category</strong>{badge.category}</span>
            <span><strong>Description</strong>{badge.description}</span>
            <span><strong>CSR Points Reward</strong>{badge.points > 0 ? `${badge.points} Points` : "-"}</span>
            <span><strong>Status</strong>{badge.status}</span>
          </div>
        </div>
        
        <div className="es-card">
          <p className="es-card-title">Analytics</p>
          <div className="es-mini-stat-grid">
            <span><strong>1,245</strong>Employees Earned</span>
            <span><strong>Top 10%</strong>Rarity</span>
            <span><strong>12</strong>Departments</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const BADGES_PER_PAGE = 8;

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

export function BadgesModule() {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "All",
    rarity: "All",
    status: "All",
  });

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setCurrentPage(1);
  };

  const categories = [...new Set(badgesData.map((b) => b.category))];

  const filteredBadges = badgesData.filter((badge) => {
    const matchesSearch = badge.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filters.category === "All" || badge.category === filters.category;
    const matchesStatus = filters.status === "All" || badge.status === filters.status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (selectedBadge) {
    return <BadgeDetail badge={selectedBadge} onBack={() => setSelectedBadge(null)} />;
  }

  return (
    <section className="es-fade-up">
      <div className="es-page-header">
        <div>
          <h1>Badges</h1>
        </div>
      </div>

      <div className="es-filter-card">
        <div className="es-filter-search">
          <Search size={15} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search badges by name..."
          />
        </div>
        <div className="es-filter-grid">
          <FilterSelect label="Category" value={filters.category} onChange={(value) => updateFilter("category", value)} options={categories} />
          <FilterSelect label="Rarity" value={filters.rarity} onChange={(value) => updateFilter("rarity", value)} options={["Common", "Rare", "Epic", "Legendary"]} />
          <FilterSelect label="Status" value={filters.status} onChange={(value) => updateFilter("status", value)} options={["Active", "Archived"]} />
        </div>
      </div>

      <div className="es-card es-employee-table-card">
        <div className="es-card-header-row">
          <div>
            <p className="es-card-title">Badges Collection</p>
            <p className="es-card-subtitle">{filteredBadges.length} badges found &middot; Page {currentPage} of {Math.ceil(filteredBadges.length / BADGES_PER_PAGE) || 1}</p>
          </div>
        </div>
        <div className="es-table-wrap es-scrollbar">
          <table className="es-data-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Badge Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>CSR Points Required</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBadges.slice((currentPage - 1) * BADGES_PER_PAGE, currentPage * BADGES_PER_PAGE).map((badge) => (
                <tr key={badge.id}>
                  <td style={{ fontSize: "1.5rem" }}>{badge.icon}</td>
                  <td><strong>{badge.name}</strong></td>
                  <td>{badge.category}</td>
                  <td>{badge.description}</td>
                  <td className="es-mono">{badge.points > 0 ? badge.points : "-"}</td>
                  <td><StatusBadge status={badge.status} /></td>
                  <td>
                    <button className="es-view-btn" onClick={() => setSelectedBadge(badge)}>
                      <Award size={14} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          total={filteredBadges.length}
          perPage={BADGES_PER_PAGE}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
