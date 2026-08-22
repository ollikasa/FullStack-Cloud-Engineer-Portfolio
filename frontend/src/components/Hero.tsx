import Link from "next/link";
import {
  ArrowRight,
  Download,
  Code,
  BriefcaseBusiness,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-label">
            COMPUTER ENGINEER • CLOUD ENGINEERING JOURNEY
          </p>

          <h1>
            Building reliable
            <span> cloud-powered systems.</span>
          </h1>

          <p className="hero-description">
            I am Oljira Likasa, a Computer Engineering graduate focused on
            Cloud Engineering, Software Development, Networking, DevOps,
            automation and scalable technology solutions.
          </p>

          <div className="hero-actions">
            <Link href="/projects" className="button primary">
              View My Projects
              <ArrowRight size={18} />
            </Link>

            <a href="/cv.pdf" className="button secondary" download>
              Download CV
              <Download size={18} />
            </a>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code size={22} />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BriefcaseBusiness size={22} />
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="terminal">
            <div className="terminal-header">
              <span />
              <span />
              <span />
            </div>

            <div className="terminal-body">
              <p>
                <span className="terminal-green">$</span> whoami
              </p>

              <p>oljira@cloud-engineer</p>

              <p>
                <span className="terminal-green">$</span> skills
              </p>

              <p>Linux Docker Kubernetes AWS Terraform</p>

              <p>
                <span className="terminal-green">$</span> status
              </p>

              <p className="terminal-success">
                Building. Learning. Deploying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}