/*"use client";

export default function CertificatesPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Certificates Management</h1>
        <p>Certificate management is working.</p>
      </div>
    </main>
  );
}
*/






"use client";

import { FormEvent, useEffect, useState } from "react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issueDate?: string | null;
  credentialUrl?: string | null;
  fileUrl?: string | null;
  createdAt: string;
}

interface CertificateForm {
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  fileUrl: string;
}

const emptyForm: CertificateForm = {
  title: "",
  issuer: "",
  issueDate: "",
  credentialUrl: "",
  fileUrl: "",
};

export default function CertificatesPage() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [certificates, setCertificates] = useState<Certificate[]>(
    [],
  );

  const [form, setForm] =
    useState<CertificateForm>(emptyForm);

  const [editingId, setEditingId] = useState<number | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadCertificates();
  }, []);

  async function loadCertificates() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/certificates`,
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load certificates.",
        );
      }

      const data = await response.json();

      setCertificates(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load certificates.",
      );
    } finally {
      setLoading(false);
    }
  }

  function updateField(
    field: keyof CertificateForm,
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

  function editCertificate(certificate: Certificate) {
    setEditingId(certificate.id);

    setForm({
      title: certificate.title || "",
      issuer: certificate.issuer || "",
      issueDate: certificate.issueDate || "",
      credentialUrl:
        certificate.credentialUrl || "",
      fileUrl: certificate.fileUrl || "",
    });

    setError("");
    setSuccess("");

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

    if (!form.title.trim()) {
      setError("Certificate title is required.");
      return;
    }

    if (!form.issuer.trim()) {
      setError("Certificate issuer is required.");
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
      issuer: form.issuer.trim(),
    };

    if (form.issueDate.trim()) {
      payload.issueDate =
        form.issueDate.trim();
    }

    if (form.credentialUrl.trim()) {
      payload.credentialUrl =
        form.credentialUrl.trim();
    }

    if (form.fileUrl.trim()) {
      payload.fileUrl =
        form.fileUrl.trim();
    }

    try {
      setSaving(true);

      const url = editingId
        ? `${API_URL}/certificates/${editingId}`
        : `${API_URL}/certificates`;

      const method = editingId
        ? "PATCH"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

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
            "Failed to save certificate.",
        );
      }

      setSuccess(
        editingId
          ? "Certificate updated successfully."
          : "Certificate added successfully.",
      );

      resetForm();

      await loadCertificates();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save certificate.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteCertificate(
    id: number,
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?",
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
        `${API_URL}/certificates/${id}`,
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
            "Failed to delete certificate.",
        );
      }

      setSuccess(
        "Certificate deleted successfully.",
      );

      await loadCertificates();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete certificate.",
      );
    }
  }

  return (
    <main className="section">
      <div className="container">
        <h1>Certificates Management</h1>

        <p>
          Add, edit, and delete your professional
          certificates.
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
              ? "Edit Certificate"
              : "Add New Certificate"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <label>
                Certificate Title *
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
                placeholder="AWS Certified Cloud Practitioner"
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
              <label>Issuer *</label>

              <input
                type="text"
                value={form.issuer}
                onChange={(event) =>
                  updateField(
                    "issuer",
                    event.target.value,
                  )
                }
                placeholder="Amazon Web Services"
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
              <label>Issue Date</label>

              <input
                type="text"
                value={form.issueDate}
                onChange={(event) =>
                  updateField(
                    "issueDate",
                    event.target.value,
                  )
                }
                placeholder="August 2026"
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
              <label>
                Credential URL
              </label>

              <input
                type="url"
                value={form.credentialUrl}
                onChange={(event) =>
                  updateField(
                    "credentialUrl",
                    event.target.value,
                  )
                }
                placeholder="https://example.com/credential"
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
                Certificate File URL
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
                placeholder="https://example.com/certificate.pdf"
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
                  ? "Update Certificate"
                  : "Add Certificate"}
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
          <h2>Your Certificates</h2>

          {loading ? (
            <p>
              Loading certificates...
            </p>
          ) : certificates.length === 0 ? (
            <p>
              No certificates found. Add your
              first certificate above.
            </p>
          ) : (
            certificates.map(
              (certificate) => (
                <article
                  key={certificate.id}
                  style={{
                    marginBottom: "25px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                  }}
                >
                  <h3>
                    {certificate.title}
                  </h3>

                  <p>
                    <strong>
                      Issuer:
                    </strong>{" "}
                    {certificate.issuer}
                  </p>

                  {certificate.issueDate && (
                    <p>
                      <strong>
                        Issue Date:
                      </strong>{" "}
                      {
                        certificate.issueDate
                      }
                    </p>
                  )}

                  {certificate.credentialUrl && (
                    <p>
                      <strong>
                        Credential:
                      </strong>{" "}
                      <a
                        href={
                          certificate.credentialUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Credential
                      </a>
                    </p>
                  )}

                  {certificate.fileUrl && (
                    <p>
                      <strong>
                        Certificate File:
                      </strong>{" "}
                      <a
                        href={
                          certificate.fileUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Certificate
                      </a>
                    </p>
                  )}

                  <div
                    style={{
                      marginTop: "15px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        editCertificate(
                          certificate,
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteCertificate(
                          certificate.id,
                        )
                      }
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ),
            )
          )}
        </section>
      </div>
    </main>
  );
}