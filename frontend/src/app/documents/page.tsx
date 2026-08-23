/*import SectionTitle from "@/components/SectionTitle";

const documents = [
  {
    title: "Curriculum Vitae",
    category: "CV",
    description: "My current professional curriculum vitae.",
    fileUrl: "/cv.pdf",
  },
  {
    title: "Academic Documents",
    category: "Education",
    description: "Academic records and educational documents.",
    fileUrl: "#",
  },
  {
    title: "Grade 8 Certificate",
    category: "Certificate",
    description: "Grade 8 educational certificate.",
    fileUrl: "#",
  },
  {
    title: "Grade 10 Certificate",
    category: "Certificate",
    description: "Grade 10 educational certificate.",
    fileUrl: "#",
  },
  {
    title: "Grade 12 Certificate",
    category: "Certificate",
    description: "Grade 12 educational certificate.",
    fileUrl: "#",
  },
];

export default function DocumentsPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="DOCUMENTS"
          title="My Documents"
          description="Important academic, professional and career documents."
        />

        <div className="document-grid">
          {documents.map((document) => (
            <article className="document-card" key={document.title}>
              <span>{document.category}</span>

              <h3>{document.title}</h3>

              <p>{document.description}</p>

              {document.fileUrl !== "#" ? (
                <a
                  href={document.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Document
                </a>
              ) : (
                <span>Coming Soon</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}*/






import SectionTitle from "@/components/SectionTitle";
import { getDocuments } from "@/lib/api";

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="DOCUMENTS"
          title="My Documents"
          description="Important academic, professional and career documents."
        />

        {documents.length > 0 ? (
          <div className="document-grid">
            {documents.map((document: any) => (
              <article className="document-card" key={document.id}>
                <span>{document.category}</span>

                <h3>{document.title}</h3>

                {document.description && (
                  <p>{document.description}</p>
                )}

                <a
                  href={document.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Document
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="info-box">
            <span>Documents</span>
            <strong>
              Academic and professional documents will be added here.
            </strong>
          </div>
        )}
      </div>
    </section>
  );
}