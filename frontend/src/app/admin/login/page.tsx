"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    setError("");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      setError("Invalid email or password.");
      return;
    }

    const data = await response.json();

    localStorage.setItem(
      "accessToken",
      data.accessToken
    );

    router.push("/admin/dashboard");
  }

  return (
    <main className="section">
      <div className="container">
        <h1>Admin Login</h1>

        <form
          onSubmit={handleSubmit}
          className="admin-form"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />

          {error && (
            <p>{error}</p>
          )}

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}