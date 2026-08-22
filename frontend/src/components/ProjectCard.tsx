import { ExternalLink, Code } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const technologies = project.technologies
    .split(",")
    .map((technology) => technology.trim());

  return (
    <article className="project-card">
      <div className="project-card-content">
        <div className="project-number">
          PROJECT #{project.id.toString().padStart(2, "0")}
        </div>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="technology-list">
          {technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className="project-links">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code size={17} />
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={17} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}