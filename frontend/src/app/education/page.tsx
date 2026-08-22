import SectionTitle from "@/components/SectionTitle";

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
}