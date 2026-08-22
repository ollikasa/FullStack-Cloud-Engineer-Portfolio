import {
  ExternalLink,
  Code,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const technologies = project.technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  return (
    <article className="project-card">
      <div className="project-card-content">
        <div className="project-number">
          PROJECT #{project.id.toString().padStart(2, "0")}
        </div>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        {project.problem && (
          <div className="project-detail">
            <div className="project-detail-title">
              <Lightbulb size={17} />
              <strong>Problem</strong>
            </div>

            <p>{project.problem}</p>
          </div>
        )}

        {project.solution && (
          <div className="project-detail">
            <div className="project-detail-title">
              <Wrench size={17} />
              <strong>Solution</strong>
            </div>

            <p>{project.solution}</p>
          </div>
        )}

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