/*"use client";

export default function DocumentsPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Documents Management</h1>
        <p>Document management is working.</p>
      </div>
    </main>
  );
}
*/






"use client";

import { FormEvent, useEffect, useState } from "react";

interface DocumentItem {
  id: number;
  title: string;
  category: string;
  fileUrl: string;
  description?: string | null;
  createdAt: string;
}

interface DocumentForm {
  title: string;
  category: string;
  fileUrl: string;
  description: string;
}

const emptyForm: DocumentForm = {
  title: "",
  category: "",
  fileUrl: "",
  description: "",
};

export default function DocumentsPage() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000";

  const [documents, setDocuments] = useState<
    DocumentItem[]
  >([]);

  const [form, setForm] =
    useState<DocumentForm>(emptyForm);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/documents`,
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load documents.",
        );
      }

      const data = await response.json();

      setDocuments(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load documents.",
      );
    } finally {
      setLoading(false);
    }
  }

  function updateField(
    field: keyof DocumentForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError(
        "Document title is required.",
      );
      return;
    }

    if (!form.category.trim()) {
      setError(
        "Document category is required.",
      );
      return;
    }

    if (!form.fileUrl.trim()) {
      setError(
        "Document file URL is required.",
      );
      return;
    }

    const token =
      localStorage.getItem("accessToken");

    if (!token) {
      setError(
        "Your session has expired. Please login again.",
      );
      return;
    }

    const payload: Record<string, string> = {
      title: form.title.trim(),
      category: form.category.trim(),
      fileUrl: form.fileUrl.trim(),
    };

    if (form.description.trim()) {
      payload.description =
        form.description.trim();
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/documents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.status === 401) {
        localStorage.removeItem(
          "accessToken",
        );

        setError(
          "Your session has expired. Please login again.",
        );

        return;
      }

      if (!response.ok) {
        const responseText =
          await response.text();

        throw new Error(
          responseText ||
            "Failed to add document.",
        );
      }

      setSuccess(
        "Document added successfully.",
      );

      resetForm();

      await loadDocuments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to add document.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteDocument(
    id: number,
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?",
    );

    if (!confirmed) {
      return;
    }

    const token =
      localStorage.getItem("accessToken");

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
        `${API_URL}/documents/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401) {
        localStorage.removeItem(
          "accessToken",
        );

        setError(
          "Your session has expired. Please login again.",
        );

        return;
      }

      if (!response.ok) {
        const responseText =
          await response.text();

        throw new Error(
          responseText ||
            "Failed to delete document.",
        );
      }

      setSuccess(
        "Document deleted successfully.",
      );

      await loadDocuments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete document.",
      );
    }
  }

  return (
    <main className="section">
      <div className="container">
        <h1>Documents Management</h1>

        <p>
          Add and delete documents from your
          portfolio.
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
          <h2>Add New Document</h2>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <label>
                Document Title *
              </label>

              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  updateField(
                    "title",
                    event.target.value,
                  )
                }
                placeholder="Bachelor Degree Certificate"
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
                marginBottom: "15px",
              }}
            >
              <label>Category *</label>

              <select
                value={form.category}
                onChange={(event) =>
                  updateField(
                    "category",
                    event.target.value,
                  )
                }
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              >
                <option value="">
                  Select category
                </option>

                <option value="CV">
                  CV
                </option>

                <option value="Grade 8">
                  Grade 8
                </option>

                <option value="Grade 10">
                  Grade 10
                </option>

                <option value="Grade 12">
                  Grade 12
                </option>

                <option value="Transcript">
                  Transcript
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Certificate">
                  Certificate
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <label>
                File URL *
              </label>

              <input
                type="url"
                value={form.fileUrl}
                onChange={(event) =>
                  updateField(
                    "fileUrl",
                    event.target.value,
                  )
                }
                placeholder="https://example.com/document.pdf"
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
                marginBottom: "20px",
              }}
            >
              <label>
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                placeholder="Short description of this document"
                rows={4}
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
                ? "Adding..."
                : "Add Document"}
            </button>
          </form>
        </section>

        <section>
          <h2>Your Documents</h2>

          {loading ? (
            <p>
              Loading documents...
            </p>
          ) : documents.length === 0 ? (
            <p>
              No documents found. Add your
              first document above.
            </p>
          ) : (
            documents.map((document) => (
              <article
                key={document.id}
                style={{
                  marginBottom: "25px",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              >
                <h3>
                  {document.title}
                </h3>

                <p>
                  <strong>
                    Category:
                  </strong>{" "}
                  {document.category}
                </p>

                {document.description && (
                  <p>
                    <strong>
                      Description:
                    </strong>{" "}
                    {
                      document.description
                    }
                  </p>
                )}

                <p>
                  <a
                    href={
                      document.fileUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                </p>

                <button
                  type="button"
                  onClick={() =>
                    deleteDocument(
                      document.id,
                    )
                  }
                >
                  Delete
                </button>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}