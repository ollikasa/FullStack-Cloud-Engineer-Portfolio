import Link from "next/link";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import SkillCard from "@/components/SkillCard";

const projects = [
  {
    id: 1,
    title: "Intelligent Traffic Management System",
    description:
      "An intelligent system designed to improve traffic management using software, data and intelligent technologies.",
    technologies:
      "Python, Machine Learning, IoT, Computer Networks",
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: 2,
    title: "AI-Integrated Client Management System",
    description:
      "A web-based client management platform integrating intelligent features to improve business workflows.",
    technologies:
      "React, Next.js, Node.js, AI, SQLite",
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: 3,
    title: "BidAssist AI",
    description:
      "An AI-assisted tender platform designed to help users understand Ethiopian tender information across multiple languages.",
    technologies:
      "Python, AI, NLP, React, Next.js, FastAPI",
    githubUrl: "",
    liveUrl: "",
  },
];

const skillGroups = [
  {
    category: "Cloud & DevOps",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Linux",
    ],
  },
  {
    category: "Software Development",
    skills: [
      "TypeScript",
      "JavaScript",
      "Python",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
    ],
  },
  {
    category: "Networking",
    skills: [
      "TCP/IP",
      "DNS",
      "DHCP",
      "HTTP/HTTPS",
      "Routing",
      "Switching",
      "Network Security",
    ],
  },
  {
    category: "Data & Infrastructure",
    skills: [
      "SQLite",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "Git",
      "CI/CD",
    ],
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="01 — ABOUT"
            title="Computer Engineer building toward Cloud Engineering"
            description="My journey combines computer engineering, software development, networking, cloud infrastructure and automation."
          />

          <div className="about-grid">
            <div>
              <p>
                I am a Computer Engineering graduate interested in building
                reliable software and infrastructure systems.
              </p>

              <p>
                My current goal is to develop strong practical skills in
                Linux, networking, AWS, Docker, Kubernetes, Terraform and
                CI/CD.
              </p>

              <Link href="/about" className="text-link">
                More about me →
              </Link>
            </div>

            <div className="info-box">
              <div>
                <span>Location</span>
                <strong>Addis Ababa, Ethiopia</strong>
              </div>

              <div>
                <span>Focus</span>
                <strong>Cloud Engineering</strong>
              </div>

              <div>
                <span>Education</span>
                <strong>B.Sc. Computer Engineering</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="02 — PROJECTS"
            title="Selected Projects"
            description="Projects that demonstrate my software engineering and technology experience."
          />

          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>

          <div className="center-button">
            <Link href="/projects" className="button secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="03 — SKILLS"
            title="Technical Skills"
            description="The technologies I am developing through projects and practical learning."
          />

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <SkillCard
                key={group.category}
                category={group.category}
                skills={group.skills}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="04 — CLOUD JOURNEY"
            title="From Code to Cloud"
            description="My portfolio is also my Cloud Engineering laboratory."
          />

          <div className="cloud-flow">
            <div>Code</div>
            <span>→</span>
            <div>Git</div>
            <span>→</span>
            <div>Docker</div>
            <span>→</span>
            <div>Terraform</div>
            <span>→</span>
            <div>Kubernetes</div>
            <span>→</span>
            <div>AWS</div>
            <span>→</span>
            <div>CI/CD</div>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <SectionTitle
            eyebrow="05 — CONTACT"
            title="Let's connect"
            description="Interested in technology, cloud infrastructure, software engineering and opportunities to build useful systems."
          />

          <Link href="/contact" className="button primary">
            Contact Me
          </Link>
        </div>
      </section>
    </>
  );
}