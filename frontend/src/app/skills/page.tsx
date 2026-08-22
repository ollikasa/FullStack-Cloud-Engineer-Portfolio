import SectionTitle from "@/components/SectionTitle";
import SkillCard from "@/components/SkillCard";

const groups = [
  {
    category: "Cloud",
    skills: [
      "AWS",
      "IAM",
      "EC2",
      "S3",
      "VPC",
      "ECR",
      "EKS",
      "RDS",
      "CloudWatch",
    ],
  },
  {
    category: "DevOps",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    category: "Programming",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Bash",
    ],
  },
  {
    category: "Web Development",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "REST APIs",
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Networking",
    skills: [
      "TCP/IP",
      "DNS",
      "DHCP",
      "HTTP",
      "HTTPS",
      "Routing",
      "Switching",
      "Firewalls",
    ],
  },
  {
    category: "Databases",
    skills: [
      "SQLite",
      "PostgreSQL",
      "MySQL",
      "Prisma",
    ],
  },
];

export default function SkillsPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="SKILLS"
          title="Technical Skills"
          description="Technologies and engineering concepts I am learning and applying through projects."
        />

        <div className="skills-grid">
          {groups.map((group) => (
            <SkillCard
              key={group.category}
              category={group.category}
              skills={group.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
}