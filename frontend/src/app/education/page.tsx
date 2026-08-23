/*import SectionTitle from "@/components/SectionTitle";

export default function EducationPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="EDUCATION"
          title="Academic Background"
          description="My academic journey and engineering education."
        />

        <div className="info-box">
          <div>
            <span>Degree</span>
            <strong>
              B.Sc. in Electrical and Computer Engineering
            </strong>
          </div>

          <div>
            <span>Specialization</span>
            <strong>Computer Engineering</strong>
          </div>

          <div>
            <span>University</span>
            <strong>Jimma University</strong>
          </div>

          <div>
            <span>Graduation</span>
            <strong>2026</strong>
          </div>
        </div>
      </div>
    </section>
  );
}*/







import SectionTitle from "@/components/SectionTitle";
import { getEducation } from "@/lib/api";

export default async function EducationPage() {
  const education = await getEducation();

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="EDUCATION"
          title="Academic Background"
          description="My academic journey and engineering education."
        />

        {education.length > 0 ? (
          education.map((item: any) => (
            <div className="info-box" key={item.id}>
              <div>
                <span>Degree</span>
                <strong>{item.degree}</strong>
              </div>

              <div>
                <span>Specialization</span>
                <strong>{item.field}</strong>
              </div>

              <div>
                <span>University</span>
                <strong>{item.institution}</strong>
              </div>

              {item.startYear && (
                <div>
                  <span>Start Year</span>
                  <strong>{item.startYear}</strong>
                </div>
              )}

              <div>
                <span>Graduation</span>
                <strong>{item.endYear}</strong>
              </div>

              {item.grade && (
                <div>
                  <span>Grade / GPA</span>
                  <strong>{item.grade}</strong>
                </div>
              )}

              {item.description && (
                <div>
                  <span>Description</span>
                  <strong>{item.description}</strong>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="info-box">
            <strong>No education records available.</strong>
          </div>
        )}
      </div>
    </section>
  );
}