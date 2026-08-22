import { ExternalLink } from "lucide-react";
import { Certificate } from "@/types";

interface CertificateCardProps {
  certificate: Certificate;
}

export default function CertificateCard({
  certificate,
}: CertificateCardProps) {
  return (
    <article className="certificate-card">
      <div>
        <span className="certificate-label">CERTIFICATE</span>

        <h3>{certificate.title}</h3>

        <p className="certificate-issuer">
          {certificate.issuer}
        </p>

        {certificate.issueDate && (
          <p className="certificate-date">
            {certificate.issueDate}
          </p>
        )}
      </div>

      {certificate.credentialUrl && (
        <a
          href={certificate.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Verify
          <ExternalLink size={16} />
        </a>
      )}
    </article>
  );
}