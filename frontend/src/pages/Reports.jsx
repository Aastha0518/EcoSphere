import React, { useState } from "react";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import "./EcoSphereApp.css";

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

const REPORTS_PER_PAGE = 8;

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

export function ReportsModule() {
  const [reportType, setReportType] = useState("Environmental Report");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    department: "All", employee: "All", challenge: "All", badge: "All", category: "All", status: "All", dateRange: "All"
  });

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleExport = (format) => {
    // Dummy export logic
    console.log(`Exporting ${reportType} as ${format}`);
    alert(`Successfully generated ${reportType} as ${format}`);
  };

  const reportTypes = [
    "Environmental Report", "Social Report", "Governance Report", "ESG Summary Report",
    "Employee Report", "Department Report", "Challenge Report", "Badge Report"
  ];

  // Dummy data based on the report type
  const previewData = Array.from({ length: 8 }).map((_, idx) => ({
    id: idx,
    metric: `${reportType.split(' ')[0]} Metric ${idx + 1}`,
    value: Math.floor(Math.random() * 1000) + 100,
    department: "Engineering & Dev",
    status: idx % 2 === 0 ? "Completed" : "In Progress",
    date: "12 Jul 2026"
  }));

  return (
    <section className="es-fade-up">
      <div className="es-page-header">
        <div>
          <h1>Reports</h1>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="es-icon-btn" onClick={() => handleExport('PDF')} title="Export PDF" style={{ border: "1px solid var(--color-line-light)" }}>
            <FileText size={16} />
          </button>
          <button className="es-icon-btn" onClick={() => handleExport('Excel')} title="Export Excel" style={{ border: "1px solid var(--color-line-light)" }}>
            <FileSpreadsheet size={16} />
          </button>
          <button className="es-icon-btn" onClick={() => handleExport('CSV')} title="Export CSV" style={{ border: "1px solid var(--color-line-light)" }}>
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="es-filter-card">
        <div className="es-filter-grid">
          <label className="es-filter-field" style={{ gridColumn: "span 2" }}>
            <span>Report Type</span>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
              {reportTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="es-filter-grid" style={{ marginTop: "1rem", borderTop: "1px solid var(--color-line-light)", paddingTop: "1rem" }}>
          <FilterSelect label="Department" value={filters.department} onChange={(value) => updateFilter("department", value)} options={["Engineering & Dev", "Human Resources", "Finance & Admin", "Sales & Accounts"]} />
          <FilterSelect label="Employee" value={filters.employee} onChange={(value) => updateFilter("employee", value)} options={["Sarah Connor", "Michael Chen", "Priya Nair"]} />
          <FilterSelect label="Challenge" value={filters.challenge} onChange={(value) => updateFilter("challenge", value)} options={["Cycle to Work Week", "Plastic Free Office"]} />
          <FilterSelect label="Badge" value={filters.badge} onChange={(value) => updateFilter("badge", value)} options={["Carbon Warrior", "Eco Explorer"]} />
          <FilterSelect label="Category" value={filters.category} onChange={(value) => updateFilter("category", value)} options={["Environmental", "Social", "Governance"]} />
          <FilterSelect label="Status" value={filters.status} onChange={(value) => updateFilter("status", value)} options={["Completed", "In Progress", "Pending"]} />
          <FilterSelect label="Date Range" value={filters.dateRange} onChange={(value) => updateFilter("dateRange", value)} options={["Last 7 Days", "Last 30 Days", "This Quarter", "This Year"]} />
        </div>
      </div>

      <div className="es-card es-employee-table-card">
        <div className="es-card-header-row">
          <div>
            <p className="es-card-title">Report Preview: {reportType}</p>
            <p className="es-card-subtitle">Sample data based on current filters</p>
          </div>
        </div>
        <div className="es-table-wrap es-scrollbar">
          <table className="es-data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Metric / Indicator</th>
                <th>Value</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {previewData.slice((currentPage - 1) * REPORTS_PER_PAGE, currentPage * REPORTS_PER_PAGE).map((row) => (
                <tr key={row.id}>
                  <td className="es-mono">#{row.id + 1000}</td>
                  <td><strong>{row.metric}</strong></td>
                  <td className="es-mono">{row.value}</td>
                  <td>{row.department}</td>
                  <td>{row.date}</td>
                  <td><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          total={previewData.length}
          perPage={REPORTS_PER_PAGE}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
