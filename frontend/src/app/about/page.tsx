import SectionTitle from "@/components/SectionTitle";

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="ABOUT ME"
          title="My Engineering Journey"
          description="Computer Engineering graduate developing practical skills in software, networking and cloud infrastructure."
        />

        <div className="about-grid">
          <div>
            <h3>Who I Am</h3>

            <p>
              I am Oljira Likasa, a Computer Engineering graduate interested
              in building software systems and reliable technology
              infrastructure.
            </p>

            <p>
              My current professional direction is Cloud Engineering,
              combining software development, Linux, networking, DevOps,
              automation and cloud infrastructure.
            </p>
          </div>

          <div className="info-box">
            <div>
              <span>Vision</span>
              <strong>
                Become a highly capable engineer who builds reliable,
                scalable and useful technology systems.
              </strong>
            </div>

            <div>
              <span>Mission</span>
              <strong>
                Continuously learn, build practical systems and solve
                real-world problems through technology.
              </strong>
            </div>

            <div>
              <span>Current Focus</span>
              <strong>
                Cloud Engineering, AWS, Linux, Networking, Docker,
                Kubernetes and Terraform.
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}