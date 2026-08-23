"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  function logout() {
    localStorage.removeItem("accessToken");
    router.replace("/admin/login");
  }

  return (
    <main className="section">
      <div className="container">

        <div className="section-title">
          <span>ADMIN</span>

          <h1>Portfolio Administration</h1>

          <p>
            Manage the content displayed on your Cloud Engineering portfolio.
          </p>
        </div>

        <div className="projects-grid">

          <Link
            href="/admin/dashboard/profile"
            className="project-card"
          >
            <div className="project-card-content">
              <div className="project-number">
                ADMIN #01
              </div>

              <h3>Profile</h3>

              <p>
                Manage your name, title, biography, vision,
                mission, location and contact information.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/dashboard/projects"
            className="project-card"
          >
            <div className="project-card-content">
              <div className="project-number">
                ADMIN #02
              </div>

              <h3>Projects</h3>

              <p>
                Add, edit and remove engineering projects
                displayed on the portfolio.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/dashboard/education"
            className="project-card"
          >
            <div className="project-card-content">
              <div className="project-number">
                ADMIN #03
              </div>

              <h3>Education</h3>

              <p>
                Manage university and academic information.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/dashboard/certificates"
            className="project-card"
          >
            <div className="project-card-content">
              <div className="project-number">
                ADMIN #04
              </div>

              <h3>Certificates</h3>

              <p>
                Add and manage professional certificates.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/dashboard/documents"
            className="project-card"
          >
            <div className="project-card-content">
              <div className="project-number">
                ADMIN #05
              </div>

              <h3>Documents</h3>

              <p>
                Manage CV, academic documents and other
                professional files.
              </p>
            </div>
          </Link>

        </div>

        <div style={{ marginTop: "2rem" }}>

          <button
            type="button"
            className="button secondary"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>
    </main>
  );
}