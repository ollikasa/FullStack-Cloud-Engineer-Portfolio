import CertificateCard from "@/components/CertificateCard";
import SectionTitle from "@/components/SectionTitle";

const certificates = [
  {
    id: 1,
    title: "Cloud Engineering",
    issuer: "Add your certificate issuer",
    issueDate: "Add date",
    credentialUrl: "",
  },
  {
    id: 2,
    title: "Networking",
    issuer: "Add your certificate issuer",
    issueDate: "Add date",
    credentialUrl: "",
  },
];

export default function CertificatesPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="CERTIFICATES"
          title="Professional Learning"
          description="Certificates and professional training."
        />

        <div className="projects-grid">
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}