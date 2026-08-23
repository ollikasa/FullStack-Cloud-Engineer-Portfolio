/*"use client";

export default function EducationPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Education Management</h1>
        <p>Education management is working.</p>
      </div>
    </main>
  );
}
*/




"use client";

import { FormEvent, useEffect, useState } from "react";

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startYear?: number | null;
  endYear?: number | null;
  grade?: string | null;
  description?: string | null;
  createdAt: string;
}

interface EducationForm {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
  description: string;
}

const emptyForm: EducationForm = {
  institution: "",
  degree: "",
  field: "",
  startYear: "",
  endYear: "",
  grade: "",
  description: "",
};

export default function EducationPage() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [education, setEducation] = useState<Education[]>([]);
  const [form, setForm] = useState<EducationForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadEducation();
  }, []);

  async function loadEducation() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/education`);

      if (!response.ok) {
        throw new Error("Failed to load education records.");
      }

      const data = await response.json();

      setEducation(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load education records.",
      );
    } finally {
      setLoading(false);
    }
  }

  function updateField(
    field: keyof EducationForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function editEducation(item: Education) {
    setEditingId(item.id);

    setForm({
      institution: item.institution || "",
      degree: item.degree || "",
      field: item.field || "",
      startYear:
        item.startYear !== null &&
        item.startYear !== undefined
          ? String(item.startYear)
          : "",
      endYear:
        item.endYear !== null &&
        item.endYear !== undefined
          ? String(item.endYear)
          : "",
      grade: item.grade || "",
      description: item.description || "",
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.institution.trim()) {
      setError("Institution is required.");
      return;
    }

    if (!form.degree.trim()) {
      setError("Degree is required.");
      return;
    }

    if (!form.field.trim()) {
      setError("Field of study is required.");
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError(
        "Your session has expired. Please login again.",
      );
      return;
    }

    const payload: Record<string, string | number> = {
      institution: form.institution.trim(),
      degree: form.degree.trim(),
      field: form.field.trim(),
    };

    if (form.startYear.trim()) {
      const year = Number(form.startYear);

      if (!Number.isInteger(year)) {
        setError("Start year must be a valid integer.");
        return;
      }

      payload.startYear = year;
    }

    if (form.endYear.trim()) {
      const year = Number(form.endYear);

      if (!Number.isInteger(year)) {
        setError("End year must be a valid integer.");
        return;
      }

      payload.endYear = year;
    }

    if (form.grade.trim()) {
      payload.grade = form.grade.trim();
    }

    if (form.description.trim()) {
      payload.description = form.description.trim();
    }

    try {
      setSaving(true);

      const url = editingId
        ? `${API_URL}/education/${editingId}`
        : `${API_URL}/education`;

      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        localStorage.removeItem("accessToken");

        setError(
          "Your session has expired. Please login again.",
        );

        return;
      }

      if (!response.ok) {
        const responseText = await response.text();

        throw new Error(
          responseText || "Failed to save education.",
        );
      }

      if (editingId) {
        setSuccess(
          "Education record updated successfully.",
        );
      } else {
        setSuccess(
          "Education record added successfully.",
        );
      }

      resetForm();

      await loadEducation();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save education.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteEducation(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education record?",
    );

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError(
        "Your session has expired. Please login again.",
      );
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/education/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401) {
        localStorage.removeItem("accessToken");

        setError(
          "Your session has expired. Please login again.",
        );

        return;
      }

      if (!response.ok) {
        const responseText = await response.text();

        throw new Error(
          responseText || "Failed to delete education.",
        );
      }

      setSuccess(
        "Education record deleted successfully.",
      );

      await loadEducation();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete education.",
      );
    }
  }

  return (
    <main className="section">
      <div className="container">
        <h1>Education Management</h1>

        <p>
          Add, edit, and delete your education records.
        </p>

        {error && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              border: "1px solid #dc2626",
              borderRadius: "8px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              border: "1px solid #16a34a",
              borderRadius: "8px",
            }}
          >
            {success}
          </div>
        )}

        <section
          style={{
            marginBottom: "40px",
          }}
        >
          <h2>
            {editingId
              ? "Edit Education"
              : "Add New Education"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label>Institution *</label>

              <input
                type="text"
                value={form.institution}
                onChange={(event) =>
                  updateField(
                    "institution",
                    event.target.value,
                  )
                }
                placeholder="Jimma University"
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Degree *</label>

              <input
                type="text"
                value={form.degree}
                onChange={(event) =>
                  updateField(
                    "degree",
                    event.target.value,
                  )
                }
                placeholder="B.Sc."
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Field of Study *</label>

              <input
                type="text"
                value={form.field}
                onChange={(event) =>
                  updateField(
                    "field",
                    event.target.value,
                  )
                }
                placeholder="Electrical and Computer Engineering"
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "15px",
                marginBottom: "15px",
              }}
            >
              <div>
                <label>Start Year</label>

                <input
                  type="number"
                  value={form.startYear}
                  onChange={(event) =>
                    updateField(
                      "startYear",
                      event.target.value,
                    )
                  }
                  placeholder="2021"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                  }}
                />
              </div>

              <div>
                <label>End Year</label>

                <input
                  type="number"
                  value={form.endYear}
                  onChange={(event) =>
                    updateField(
                      "endYear",
                      event.target.value,
                    )
                  }
                  placeholder="2026"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Grade / GPA</label>

              <input
                type="text"
                value={form.grade}
                onChange={(event) =>
                  updateField(
                    "grade",
                    event.target.value,
                  )
                }
                placeholder="3.50 / 4.00"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Description</label>

              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                rows={5}
                placeholder="Describe your education..."
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Education"
                  : "Add Education"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                style={{
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </section>

        <section>
          <h2>Your Education</h2>

          {loading ? (
            <p>Loading education records...</p>
          ) : education.length === 0 ? (
            <p>
              No education records found. Add your first
              education record above.
            </p>
          ) : (
            education.map((item) => (
              <article
                key={item.id}
                style={{
                  marginBottom: "25px",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              >
                <h3>{item.degree}</h3>

                <p>
                  <strong>Institution:</strong>{" "}
                  {item.institution}
                </p>

                <p>
                  <strong>Field:</strong>{" "}
                  {item.field}
                </p>

                {(item.startYear ||
                  item.endYear) && (
                  <p>
                    <strong>Period:</strong>{" "}
                    {item.startYear || "N/A"} -{" "}
                    {item.endYear || "Present"}
                  </p>
                )}

                {item.grade && (
                  <p>
                    <strong>Grade:</strong>{" "}
                    {item.grade}
                  </p>
                )}

                {item.description && (
                  <p>
                    <strong>Description:</strong>{" "}
                    {item.description}
                  </p>
                )}

                <div style={{ marginTop: "15px" }}>
                  <button
                    type="button"
                    onClick={() =>
                      editEducation(item)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteEducation(item.id)
                    }
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}