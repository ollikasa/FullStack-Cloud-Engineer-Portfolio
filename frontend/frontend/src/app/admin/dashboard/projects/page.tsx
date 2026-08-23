"use client";

import { FormEvent, useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  problem?: string | null;
  solution?: string | null;
  technologies: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  imageUrl?: string | null;
  createdAt: string;
}

interface ProjectForm {
  title: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

const emptyForm: ProjectForm = {
  title: "",
  description: "",
  problem: "",
  solution: "",
  technologies: "",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
};

export default function ProjectsPage() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectForm>(emptyForm);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/projects`);

      if (!response.ok) {
        throw new Error("Failed to load projects");
      }

      const data = await response.json();

      setProjects(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load projects",
      );
    } finally {
      setLoading(false);
    }
  }

  function updateField(
    field: keyof ProjectForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function startEdit(project: Project) {
    setEditingId(project.id);

    setForm({
      title: project.title || "",
      description: project.description || "",
      problem: project.problem || "",
      solution: project.solution || "",
      technologies: project.technologies || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      imageUrl: project.imageUrl || "",
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Project title is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Project description is required.");
      return;
    }

    if (!form.technologies.trim()) {
      setError("Technologies are required.");
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Your session has expired. Please login again.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      problem: form.problem.trim() || undefined,
      solution: form.solution.trim() || undefined,
      technologies: form.technologies.trim(),
      githubUrl: form.githubUrl.trim() || undefined,
      liveUrl: form.liveUrl.trim() || undefined,
      imageUrl: form.imageUrl.trim() || undefined,
    };

    try {
      setSaving(true);

      const url =
        editingId === null
          ? `${API_URL}/projects`
          : `${API_URL}/projects/${editingId}`;

      const method =
        editingId === null ? "POST" : "PATCH";

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
          responseText || "Failed to save project",
        );
      }

      if (editingId === null) {
        setSuccess("Project created successfully.");
      } else {
        setSuccess("Project updated successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);

      await loadProjects();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save project",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Your session has expired. Please login again.");
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/projects/${id}`,
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
          responseText || "Failed to delete project",
        );
      }

      setSuccess("Project deleted successfully.");

      if (editingId === id) {
        cancelEdit();
      }

      await loadProjects();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete project",
      );
    }
  }

  return (
    <main className="section">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1>
              {editingId === null
                ? "Projects Management"
                : "Edit Project"}
            </h1>

            <p>
              Add, edit, and delete projects from your
              portfolio.
            </p>
          </div>

          {editingId !== null && (
            <button
              type="button"
              onClick={cancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>

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
            marginBottom: "50px",
            padding: "25px",
            border: "1px solid #ddd",
            borderRadius: "12px",
          }}
        >
          <h2>
            {editingId === null
              ? "Add New Project"
              : "Update Project"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label>Project Title *</label>

              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  updateField(
                    "title",
                    event.target.value,
                  )
                }
                placeholder="Intelligent Traffic Management System"
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
              <label>Description *</label>

              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                placeholder="Describe the project..."
                required
                rows={5}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Problem</label>

              <textarea
                value={form.problem}
                onChange={(event) =>
                  updateField(
                    "problem",
                    event.target.value,
                  )
                }
                placeholder="What problem does this project solve?"
                rows={4}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Solution</label>

              <textarea
                value={form.solution}
                onChange={(event) =>
                  updateField(
                    "solution",
                    event.target.value,
                  )
                }
                placeholder="How does your project solve the problem?"
                rows={4}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>
                Technologies * (comma separated)
              </label>

              <input
                type="text"
                value={form.technologies}
                onChange={(event) =>
                  updateField(
                    "technologies",
                    event.target.value,
                  )
                }
                placeholder="React, Next.js, Node.js, PostgreSQL"
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
              <label>GitHub URL</label>

              <input
                type="url"
                value={form.githubUrl}
                onChange={(event) =>
                  updateField(
                    "githubUrl",
                    event.target.value,
                  )
                }
                placeholder="https://github.com/username/project"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Live Project URL</label>

              <input
                type="url"
                value={form.liveUrl}
                onChange={(event) =>
                  updateField(
                    "liveUrl",
                    event.target.value,
                  )
                }
                placeholder="https://example.com"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Project Image URL</label>

              <input
                type="url"
                value={form.imageUrl}
                onChange={(event) =>
                  updateField(
                    "imageUrl",
                    event.target.value,
                  )
                }
                placeholder="https://example.com/project-image.jpg"
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
                : editingId === null
                  ? "Add Project"
                  : "Update Project"}
            </button>
          </form>
        </section>

        <section>
          <h2>Your Projects</h2>

          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "20px",
              }}
            >
              {projects.map((project) => (
                <article
                  key={project.id}
                  style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                  }}
                >
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  {project.problem && (
                    <div>
                      <strong>Problem:</strong>
                      <p>{project.problem}</p>
                    </div>
                  )}

                  {project.solution && (
                    <div>
                      <strong>Solution:</strong>
                      <p>{project.solution}</p>
                    </div>
                  )}

                  <p>
                    <strong>Technologies:</strong>{" "}
                    {project.technologies}
                  </p>

                  {project.githubUrl && (
                    <p>
                      <strong>GitHub:</strong>{" "}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.githubUrl}
                      </a>
                    </p>
                  )}

                  {project.liveUrl && (
                    <p>
                      <strong>Live:</strong>{" "}
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.liveUrl}
                      </a>
                    </p>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        startEdit(project)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteProject(project.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}