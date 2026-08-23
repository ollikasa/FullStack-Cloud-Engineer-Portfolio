/*"use client";

export default function ProfilePage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Profile Management</h1>
        <p>Admin profile management is working.</p>
      </div>
    </main>
  );
}
*/




/*
"use client";

import { FormEvent, useEffect, useState } from "react";

interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  vision?: string | null;
  mission?: string | null;
  location?: string | null;
  phone?: string | null;
  email?: string | null;
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
}

interface ProfileForm {
  name: string;
  title: string;
  bio: string;
  vision: string;
  mission: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
}

const emptyForm: ProfileForm = {
  name: "",
  title: "",
  bio: "",
  vision: "",
  mission: "",
  location: "",
  phone: "",
  email: "",
  linkedin: "",
  github: "",
  website: "",
};

export default function ProfilePage() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/profile`);

      if (!response.ok) {
        throw new Error("Failed to load profile");
      }

      const data: Profile | null = await response.json();

      if (!data) {
        setError("No profile was found in the database.");
        return;
      }

      setProfile(data);

      setForm({
        name: data.name || "",
        title: data.title || "",
        bio: data.bio || "",
        vision: data.vision || "",
        mission: data.mission || "",
        location: data.location || "",
        phone: data.phone || "",
        email: data.email || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        website: data.website || "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load profile",
      );
    } finally {
      setLoading(false);
    }
  }

  function updateField(
    field: keyof ProfileForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!profile) {
      setError("No profile is available to update.");
      return;
    }

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!form.bio.trim()) {
      setError("Bio is required.");
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError(
        "Your session has expired. Please login again.",
      );
      return;
    }

    const payload: Record<string, string> = {
      name: form.name.trim(),
      title: form.title.trim(),
      bio: form.bio.trim(),
    };

    if (form.vision.trim()) {
      payload.vision = form.vision.trim();
    }

    if (form.mission.trim()) {
      payload.mission = form.mission.trim();
    }

    if (form.location.trim()) {
      payload.location = form.location.trim();
    }

    if (form.phone.trim()) {
      payload.phone = form.phone.trim();
    }

    if (form.email.trim()) {
      payload.email = form.email.trim();
    }

    if (form.linkedin.trim()) {
      payload.linkedin = form.linkedin.trim();
    }

    if (form.github.trim()) {
      payload.github = form.github.trim();
    }

    if (form.website.trim()) {
      payload.website = form.website.trim();
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/profile/${profile.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
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
          responseText || "Failed to update profile",
        );
      }

      const updatedProfile: Profile =
        await response.json();

      setProfile(updatedProfile);

      setForm({
        name: updatedProfile.name || "",
        title: updatedProfile.title || "",
        bio: updatedProfile.bio || "",
        vision: updatedProfile.vision || "",
        mission: updatedProfile.mission || "",
        location: updatedProfile.location || "",
        phone: updatedProfile.phone || "",
        email: updatedProfile.email || "",
        linkedin: updatedProfile.linkedin || "",
        github: updatedProfile.github || "",
        website: updatedProfile.website || "",
      });

      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update profile",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <h1>Profile Management</h1>
          <p>Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <h1>Profile Management</h1>

        <p>
          Update the personal and professional information
          displayed on your portfolio.
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

        {profile && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label>Name *</label>

              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  updateField(
                    "name",
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
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Professional Title *</label>

              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  updateField(
                    "title",
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
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Biography *</label>

              <textarea
                value={form.bio}
                onChange={(event) =>
                  updateField(
                    "bio",
                    event.target.value,
                  )
                }
                required
                rows={6}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Vision</label>

              <textarea
                value={form.vision}
                onChange={(event) =>
                  updateField(
                    "vision",
                    event.target.value,
                  )
                }
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
              <label>Mission</label>

              <textarea
                value={form.mission}
                onChange={(event) =>
                  updateField(
                    "mission",
                    event.target.value,
                  )
                }
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
              <label>Location</label>

              <input
                type="text"
                value={form.location}
                onChange={(event) =>
                  updateField(
                    "location",
                    event.target.value,
                  )
                }
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Phone</label>

              <input
                type="text"
                value={form.phone}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value,
                  )
                }
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Email</label>

              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value,
                  )
                }
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>LinkedIn URL</label>

              <input
                type="url"
                value={form.linkedin}
                onChange={(event) =>
                  updateField(
                    "linkedin",
                    event.target.value,
                  )
                }
                placeholder="https://www.linkedin.com/in/username"
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
                value={form.github}
                onChange={(event) =>
                  updateField(
                    "github",
                    event.target.value,
                  )
                }
                placeholder="https://github.com/username"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Website URL</label>

              <input
                type="url"
                value={form.website}
                onChange={(event) =>
                  updateField(
                    "website",
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

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Profile"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}*/





"use client";

import { FormEvent, useEffect, useState } from "react";

interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  vision?: string | null;
  mission?: string | null;
  location?: string | null;
  phone?: string | null;
  email?: string | null;
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
}

interface ProfileForm {
  name: string;
  title: string;
  bio: string;
  vision: string;
  mission: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
}

const emptyForm: ProfileForm = {
  name: "",
  title: "",
  bio: "",
  vision: "",
  mission: "",
  location: "",
  phone: "",
  email: "",
  linkedin: "",
  github: "",
  website: "",
};

export default function ProfilePage() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000";

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [form, setForm] =
    useState<ProfileForm>(emptyForm);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/profile`,
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load profile.",
        );
      }

      const data = await response.json();

      if (!data) {
        setProfile(null);
        setForm(emptyForm);
        return;
      }

      setProfile(data);

      setForm({
        name: data.name || "",
        title: data.title || "",
        bio: data.bio || "",
        vision: data.vision || "",
        mission: data.mission || "",
        location: data.location || "",
        phone: data.phone || "",
        email: data.email || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        website: data.website || "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load profile.",
      );
    } finally {
      setLoading(false);
    }
  }

  function updateField(
    field: keyof ProfileForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!profile) {
      setError(
        "No profile exists yet. A profile record must be created in the database first.",
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
      name: form.name.trim(),
      title: form.title.trim(),
      bio: form.bio.trim(),
    };

    const optionalFields = [
      "vision",
      "mission",
      "location",
      "phone",
      "email",
      "linkedin",
      "github",
      "website",
    ] as const;

    optionalFields.forEach((field) => {
      if (form[field].trim()) {
        payload[field] =
          form[field].trim();
      }
    });

    if (!payload.name) {
      setError("Name is required.");
      return;
    }

    if (!payload.title) {
      setError("Title is required.");
      return;
    }

    if (!payload.bio) {
      setError("Bio is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/profile/${profile.id}`,
        {
          method: "PATCH",
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
            "Failed to update profile.",
        );
      }

      const updated =
        await response.json();

      setProfile(updated);

      setForm({
        name: updated.name || "",
        title: updated.title || "",
        bio: updated.bio || "",
        vision: updated.vision || "",
        mission: updated.mission || "",
        location: updated.location || "",
        phone: updated.phone || "",
        email: updated.email || "",
        linkedin:
          updated.linkedin || "",
        github: updated.github || "",
        website:
          updated.website || "",
      });

      setSuccess(
        "Profile updated successfully.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <h1>Profile Management</h1>
          <p>Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <h1>Profile Management</h1>

        <p>
          Update the information displayed
          on your portfolio.
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

        {!profile ? (
          <p>
            No profile record was found.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label>Name *</label>

              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  updateField(
                    "name",
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
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Professional Title *</label>

              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  updateField(
                    "title",
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
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Bio *</label>

              <textarea
                value={form.bio}
                onChange={(event) =>
                  updateField(
                    "bio",
                    event.target.value,
                  )
                }
                rows={5}
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
              <label>Vision</label>

              <textarea
                value={form.vision}
                onChange={(event) =>
                  updateField(
                    "vision",
                    event.target.value,
                  )
                }
                rows={3}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Mission</label>

              <textarea
                value={form.mission}
                onChange={(event) =>
                  updateField(
                    "mission",
                    event.target.value,
                  )
                }
                rows={3}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Location</label>

              <input
                type="text"
                value={form.location}
                onChange={(event) =>
                  updateField(
                    "location",
                    event.target.value,
                  )
                }
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Phone</label>

              <input
                type="text"
                value={form.phone}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value,
                  )
                }
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Email</label>

              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value,
                  )
                }
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>LinkedIn URL</label>

              <input
                type="url"
                value={form.linkedin}
                onChange={(event) =>
                  updateField(
                    "linkedin",
                    event.target.value,
                  )
                }
                placeholder="https://www.linkedin.com/in/..."
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
                value={form.github}
                onChange={(event) =>
                  updateField(
                    "github",
                    event.target.value,
                  )
                }
                placeholder="https://github.com/..."
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Website URL</label>

              <input
                type="url"
                value={form.website}
                onChange={(event) =>
                  updateField(
                    "website",
                    event.target.value,
                  )
                }
                placeholder="https://..."
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
                : "Save Profile"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}