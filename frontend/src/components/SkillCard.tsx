interface SkillCardProps {
  category: string;
  skills: string[];
}

export default function SkillCard({
  category,
  skills,
}: SkillCardProps) {
  return (
    <div className="skill-card">
      <h3>{category}</h3>

      <div className="skill-list">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </div>
  );
}