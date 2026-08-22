/*import ProjectCard from "@/components/ProjectCard";
import SectionTitle from "@/components/SectionTitle";

const projects = [
  {
    id: 1,
    title: "Intelligent Traffic Management System",
    description:
      "An intelligent traffic management project combining computing, data and intelligent technologies.",
    technologies:
      "Python, Machine Learning, IoT, Networking",
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: 2,
    title: "AI-Integrated Client Management System",
    description:
      "A web application designed to manage clients and integrate intelligent functionality.",
    technologies:
      "React, Next.js, Node.js, SQLite, AI",
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: 3,
    title: "BidAssist AI",
    description:
      "An AI-powered tender assistance platform for Ethiopian tender information.",
    technologies:
      "Python, NLP, AI, React, Next.js, FastAPI",
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: 4,
    title: "Cloud Portfolio Infrastructure",
    description:
      "This portfolio itself is being developed as a Cloud Engineering laboratory using Docker, Kubernetes, AWS, Terraform and CI/CD.",
    technologies:
      "Next.js, NestJS, Docker, Kubernetes, AWS, Terraform",
    githubUrl: "",
    liveUrl: "",
  },
];

export default function ProjectsPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="PROJECTS"
          title="Engineering Projects"
          description="Software, AI, networking and cloud engineering projects."
        />

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
  */







import ProjectCard from "@/components/ProjectCard";
import SectionTitle from "@/components/SectionTitle";
import { getProjects } from "@/lib/api";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="PROJECTS"
          title="Engineering Projects"
          description="Software, AI, networking and cloud engineering projects."
        />

        <div className="projects-grid">
          {projects.map((project: any) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}