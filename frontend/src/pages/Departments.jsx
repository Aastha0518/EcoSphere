import React, { useEffect, useState } from "react";
import {
  Plus, Pencil, Trash2, X, Building2, Users,
  ChevronRight, Search, ArrowLeft, Save,
} from "lucide-react";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

const departmentRequest = async (path = "", options = {}) => {
  const response = await fetch(`${API_BASE_URL}/api/departments${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(options.headers || {}),
    },
  });
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("Department API did not return JSON. Check that the backend server is running.");
  }

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Department request failed.");
  }

  return data;
};

function AddDepartmentForm({ departments, onSave, onCancel, saving, apiError }) {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [employees, setEmployees] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Department name is required.";
    if (employees === "" || Number(employees) < 0) {
      e.employees = "Enter a valid employee count.";
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    await onSave({ name: name.trim(), parent, employees: Number(employees) });
  };

  return (
    <div className="dm-page es-fade-up">
      <div className="dm-page-header">
        <div>
          <h1 className="dm-page-title">Add Department</h1>
          <p className="dm-page-subtitle">Fill in the details to create a new department</p>
        </div>
        <button className="dm-btn-back" onClick={onCancel}>
          <ArrowLeft size={16} />
          Back to List
        </button>
      </div>

      <div className="dm-add-form-card">
        <div className="dm-add-form-icon-row">
          <div className="dm-add-form-icon-box">
            <Building2 size={24} color="#0B5FA5" />
          </div>
          <div>
            <p className="dm-add-form-card-title">New Department Details</p>
            <p className="dm-add-form-card-subtitle">All fields marked * are required</p>
          </div>
        </div>

        {apiError && <p className="dm-field-error">{apiError}</p>}

        <form onSubmit={handleSubmit} className="dm-add-form" noValidate>
          <div className="dm-field">
            <label className="dm-label">
              Department Name <span className="dm-required">*</span>
            </label>
            <input
              className={`dm-input ${errors.name ? "dm-input-error" : ""}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((p) => ({ ...p, name: "" }));
              }}
              placeholder="e.g. Engineering & Dev"
            />
            {errors.name && <p className="dm-field-error">{errors.name}</p>}
          </div>

          <div className="dm-field">
            <label className="dm-label">
              Parent Department <span className="dm-optional">(optional)</span>
            </label>
            <select
              className="dm-select"
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">None (top-level)</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="dm-field">
            <label className="dm-label">
              Employee Count <span className="dm-required">*</span>
            </label>
            <input
              type="number"
              min="0"
              className={`dm-input ${errors.employees ? "dm-input-error" : ""}`}
              value={employees}
              onChange={(e) => {
                setEmployees(e.target.value);
                setErrors((p) => ({ ...p, employees: "" }));
              }}
              placeholder="e.g. 120"
            />
            {errors.employees && <p className="dm-field-error">{errors.employees}</p>}
          </div>

          <div className="dm-add-form-actions">
            <button type="button" className="dm-btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="dm-btn-save" disabled={saving}>
              <Save size={15} />
              {saving ? "Saving..." : "Save Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditModal({ dept, departments, onSave, onClose, saving, apiError }) {
  const [name, setName] = useState(dept?.name ?? "");
  const [parent, setParent] = useState(dept?.parent ?? "");
  const [employees, setEmployees] = useState(dept?.employees ?? "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Department name is required.";
    if (employees === "" || Number(employees) < 0) {
      e.employees = "Enter a valid employee count.";
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    await onSave({ name: name.trim(), parent, employees: Number(employees) });
  };

  const parentOptions = departments.filter((d) => d.id !== dept?.id);

  return (
    <div className="dm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dm-modal es-fade-up">
        <div className="dm-modal-header">
          <div className="dm-modal-header-left">
            <div className="dm-modal-icon-box">
              <Building2 size={18} color="#0B5FA5" />
            </div>
            <div>
              <p className="dm-modal-title">Edit Department</p>
              <p className="dm-modal-subtitle">Update department details below.</p>
            </div>
          </div>
          <button className="dm-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {apiError && <p className="dm-field-error">{apiError}</p>}

        <form onSubmit={handleSubmit} className="dm-form" noValidate>
          <div className="dm-field">
            <label className="dm-label">Department Name <span className="dm-required">*</span></label>
            <input
              className={`dm-input ${errors.name ? "dm-input-error" : ""}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((p) => ({ ...p, name: "" }));
              }}
              placeholder="e.g. Engineering & Dev"
            />
            {errors.name && <p className="dm-field-error">{errors.name}</p>}
          </div>

          <div className="dm-field">
            <label className="dm-label">Parent Department <span className="dm-optional">(optional)</span></label>
            <select
              className="dm-select"
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">None (top-level)</option>
              {parentOptions.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="dm-field">
            <label className="dm-label">Employee Count <span className="dm-required">*</span></label>
            <input
              type="number"
              min="0"
              className={`dm-input ${errors.employees ? "dm-input-error" : ""}`}
              value={employees}
              onChange={(e) => {
                setEmployees(e.target.value);
                setErrors((p) => ({ ...p, employees: "" }));
              }}
              placeholder="e.g. 120"
            />
            {errors.employees && <p className="dm-field-error">{errors.employees}</p>}
          </div>

          <div className="dm-actions">
            <button type="button" className="dm-btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="dm-btn-save" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirm({ dept, onConfirm, onCancel, deleting, apiError }) {
  return (
    <div className="dm-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="dm-confirm-box es-fade-up">
        <div className="dm-confirm-icon-wrap">
          <Trash2 size={22} color="#C0392B" />
        </div>
        <p className="dm-confirm-title">Delete Department?</p>
        <p className="dm-confirm-msg">
          <strong>{dept.name}</strong> will be permanently removed.
        </p>
        {apiError && <p className="dm-field-error">{apiError}</p>}
        <div className="dm-actions">
          <button className="dm-btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="dm-btn-danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editDept, setEditDept] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadDepartments = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await departmentRequest();
      setDepartments(data.data || []);
    } catch (err) {
      setError(err.message || "Unable to load departments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.parent || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * rowsPerPage;
  const pageRows = filtered.slice(startIdx, startIdx + rowsPerPage);

  const handleSearch = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleRowsChange = (val) => {
    setRowsPerPage(Number(val));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = new Set([1, totalPages, safePage, safePage - 1, safePage + 1]);
    return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  };
  const pageNumbers = getPageNumbers();

  const handleAddSave = async (payload) => {
    setSaving(true);
    setError("");

    try {
      const data = await departmentRequest("", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setDepartments((prev) => [...prev, data.data]);
      setShowAddForm(false);
    } catch (err) {
      setError(err.message || "Unable to add department.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditSave = async (payload) => {
    setSaving(true);
    setError("");

    try {
      const data = await departmentRequest(`/${editDept.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setDepartments((prev) =>
        prev.map((d) => (d.id === editDept.id ? data.data : d))
      );
      setEditDept(null);
    } catch (err) {
      setError(err.message || "Unable to update department.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setError("");

    try {
      await departmentRequest(`/${delTarget.id}`, {
        method: "DELETE",
      });
      setDepartments((prev) =>
        prev
          .filter((d) => d.id !== delTarget.id)
          .map((d) => d.parent === delTarget.name ? { ...d, parent: "" } : d)
      );
      setDelTarget(null);
    } catch (err) {
      setError(err.message || "Unable to delete department.");
    } finally {
      setSaving(false);
    }
  };

  if (showAddForm) {
    return (
      <AddDepartmentForm
        departments={departments}
        onSave={handleAddSave}
        onCancel={() => {
          setError("");
          setShowAddForm(false);
        }}
        saving={saving}
        apiError={error}
      />
    );
  }

  return (
    <>
      <div className="dm-page es-fade-up">
        <div className="dm-page-header">
          <div>
            <h1 className="dm-page-title">Departments</h1>
            <p className="dm-page-subtitle">Manage all company departments and their hierarchy</p>
          </div>
          <button className="dm-btn-add" onClick={() => {
            setError("");
            setShowAddForm(true);
          }}>
            <Plus size={16} />
            Add Department
          </button>
        </div>

        {error && !editDept && !delTarget && (
          <p className="dm-field-error">{error}</p>
        )}

        <div className="dm-stats-strip">
          <div className="dm-stat-chip">
            <Building2 size={15} color="#0B5FA5" />
            <span className="dm-stat-chip-val">{departments.length}</span>
            <span className="dm-stat-chip-lbl">Total Departments</span>
          </div>
          <div className="dm-stat-divider" />
          <div className="dm-stat-chip">
            <Users size={15} color="#17B890" />
            <span className="dm-stat-chip-val">
              {departments.reduce((s, d) => s + d.employees, 0).toLocaleString()}
            </span>
            <span className="dm-stat-chip-lbl">Total Employees</span>
          </div>
          <div className="dm-stat-divider" />
          <div className="dm-stat-chip">
            <ChevronRight size={15} color="#E0A100" />
            <span className="dm-stat-chip-val">
              {departments.filter((d) => !d.parent).length}
            </span>
            <span className="dm-stat-chip-lbl">Top-level Departments</span>
          </div>
        </div>

        <div className="dm-table-card">
          <div className="dm-toolbar">
            <div className="dm-search-wrapper">
              <Search size={14} className="dm-search-icon" />
              <input
                className="dm-search-input"
                placeholder="Search department or parent..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="dm-toolbar-right">
              <label className="dm-rpp-label">Rows per page</label>
              <select
                className="dm-rpp-select"
                value={rowsPerPage}
                onChange={(e) => handleRowsChange(e.target.value)}
              >
                {[5, 10, 25, 50].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="dm-count-badge">{filtered.length} records</span>
            </div>
          </div>

          <div className="dm-table-wrapper es-scrollbar">
            <table className="dm-table">
              <thead>
                <tr>
                  <th className="dm-th dm-th-sr">Sr. No</th>
                  <th className="dm-th">Department Name</th>
                  <th className="dm-th">Parent Department</th>
                  <th className="dm-th dm-th-center">Employee Count</th>
                  <th className="dm-th dm-th-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="dm-empty-row">
                      Loading departments...
                    </td>
                  </tr>
                ) : pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="dm-empty-row">
                      No departments match your search.
                    </td>
                  </tr>
                ) : (
                  pageRows.map((dept, idx) => (
                    <tr key={dept.id} className="dm-tr">
                      <td className="dm-td dm-td-sr">{startIdx + idx + 1}</td>
                      <td className="dm-td">
                        <div className="dm-dept-name-cell">
                          <div className="dm-dept-avatar">{dept.name.charAt(0)}</div>
                          <span className="dm-dept-name">{dept.name}</span>
                        </div>
                      </td>
                      <td className="dm-td">
                        {dept.parent ? (
                          <span className="dm-parent-badge">{dept.parent}</span>
                        ) : (
                          <span className="dm-no-parent">Top level</span>
                        )}
                      </td>
                      <td className="dm-td dm-td-center">
                        <span className="dm-emp-count">{dept.employees.toLocaleString()}</span>
                      </td>
                      <td className="dm-td dm-td-center">
                        <div className="dm-action-btns">
                          <button
                            className="dm-action-btn dm-edit-btn"
                            title="Edit"
                            onClick={() => {
                              setError("");
                              setEditDept(dept);
                            }}
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            className="dm-action-btn dm-delete-btn"
                            title="Delete"
                            onClick={() => {
                              setError("");
                              setDelTarget(dept);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="dm-pagination">
            <span className="dm-pg-info">
              Showing <strong>{filtered.length === 0 ? 0 : startIdx + 1}</strong>-
              <strong>{Math.min(startIdx + rowsPerPage, filtered.length)}</strong> of{" "}
              <strong>{filtered.length}</strong> records
            </span>

            <div className="dm-pg-controls">
              <button
                className="dm-pg-btn dm-pg-arrow"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                aria-label="Previous page"
              >
                Prev
              </button>

              {pageNumbers.map((page, i) => {
                const prev = pageNumbers[i - 1];
                return (
                  <span key={page} className="dm-pg-num-wrap">
                    {prev && page - prev > 1 && (
                      <span className="dm-pg-ellipsis">...</span>
                    )}
                    <button
                      className={`dm-pg-btn ${safePage === page ? "dm-pg-btn-active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </span>
                );
              })}

              <button
                className="dm-pg-btn dm-pg-arrow"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {editDept && (
        <EditModal
          dept={editDept}
          departments={departments}
          onSave={handleEditSave}
          onClose={() => {
            setError("");
            setEditDept(null);
          }}
          saving={saving}
          apiError={error}
        />
      )}

      {delTarget && (
        <DeleteConfirm
          dept={delTarget}
          onConfirm={handleDelete}
          onCancel={() => {
            setError("");
            setDelTarget(null);
          }}
          deleting={saving}
          apiError={error}
        />
      )}
    </>
  );
}
