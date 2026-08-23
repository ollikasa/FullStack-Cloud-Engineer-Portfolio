import Link from "next/link";

export default function AdminDashboard() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <span>ADMINISTRATION</span>

          <h1>Portfolio Dashboard</h1>

          <p>
            Manage your portfolio content, projects, certificates,
            education and documents.
          </p>
        </div>

        <div className="projects-grid">
          <Link href="/admin/profile" className="project-card">
            <div className="project-card-content">
              <div className="project-number">
                ADMIN #01
              </div>

              <h3>Profile</h3>

              <p>
                Manage your name, biography, vision, mission,
                contact information and social links.
              </p>
            </div>
          </Link>

          <Link href="/admin/education" className="project-card">
            <div className="project-card-content">
              <div className="project-number">
                ADMIN #02
              </div>

              <h3>Education</h3>

              <p>
                Add and manage your university and academic
                information.
              </p>
            </div>
          </Link>

          <Link href="/admin/projects" className="project-card">
            <div className="project-card-content">
              <div className="project-number">
                ADMIN #03
              </div>

              <h3>Projects</h3>

              <p>
                Create, edit and remove engineering projects.
              </p>
            </div>
          </Link>

          <Link href="/admin/certificates" className="project-card">
            <div className="project-card-content">
              <div className="project-number">
                ADMIN #04
              </div>

              <h3>Certificates</h3>

              <p>
                Manage professional certificates and credentials.
              </p>
            </div>
          </Link>

          <Link href="/admin/documents" className="project-card">
            <div className="project-card-content">
              <div className="project-number">
                ADMIN #05
              </div>

              <h3>Documents</h3>

              <p>
                Manage CV, academic records and other documents.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}