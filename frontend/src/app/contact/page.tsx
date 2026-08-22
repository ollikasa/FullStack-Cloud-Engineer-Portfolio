import SectionTitle from "@/components/SectionTitle";
import {
  Mail,
  Phone,
  MapPin,
  Code,
  BriefcaseBusiness,
} from "lucide-react";

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="CONTACT"
          title="Let's Connect"
          description="You can contact me through the channels below."
        />

        <div className="info-box">
          <div>
            <Mail size={20} />
            <span>Email</span>
            <strong>YOUR_EMAIL@example.com</strong>
          </div>

          <div>
            <Phone size={20} />
            <span>Phone</span>
            <strong>YOUR_PHONE</strong>
          </div>

          <div>
            <MapPin size={20} />
            <span>Location</span>
            <strong>Addis Ababa, Ethiopia</strong>
          </div>

          <div>
            <Code size={20} />
            <span>GitHub</span>
            <strong>YOUR_GITHUB_URL</strong>
          </div>

          <div>
            <BriefcaseBusiness size={20} />
            <span>LinkedIn</span>
            <strong>YOUR_LINKEDIN_URL</strong>
          </div>
        </div>
      </div>
    </section>
  );
}