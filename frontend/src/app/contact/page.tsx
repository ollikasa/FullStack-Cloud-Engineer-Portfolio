/*import SectionTitle from "@/components/SectionTitle";
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
}*/




/*
import SectionTitle from "@/components/SectionTitle";
import {
  Mail,
  Phone,
  MapPin,
  Code,
  BriefcaseBusiness,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function getProfile() {
  const response = await fetch(`${API_URL}/profile`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load profile");
  }

  return response.json();
}

export default async function ContactPage() {
  const profile = await getProfile();

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
            <strong>
              <a href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </strong>
          </div>

          <div>
            <Phone size={20} />
            <span>Phone</span>
            <strong>
              <a href={`tel:${profile.phone}`}>
                {profile.phone}
              </a>
            </strong>
          </div>

          <div>
            <MapPin size={20} />
            <span>Location</span>
            <strong>{profile.location}</strong>
          </div>

          <div>
            <Code size={20} />
            <span>GitHub</span>
            <strong>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Profile
              </a>
            </strong>
          </div>

          <div>
            <BriefcaseBusiness size={20} />
            <span>LinkedIn</span>
            <strong>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}*/





import SectionTitle from "@/components/SectionTitle";
import {
  Mail,
  Phone,
  MapPin,
  Code,
  BriefcaseBusiness,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://fullstack-cloud-engineer-portfolio.onrender.com";

async function getProfile() {
  const response = await fetch(`${API_URL}/profile`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load profile");
  }

  return response.json();
}

export default async function ContactPage() {
  const profile = await getProfile();

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
            <strong>
              <a href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </strong>
          </div>

          <div>
            <Phone size={20} />
            <span>Phone</span>
            <strong>
              <a href={`tel:${profile.phone}`}>
                {profile.phone}
              </a>
            </strong>
          </div>

          <div>
            <MapPin size={20} />
            <span>Location</span>
            <strong>
              {profile.location}
            </strong>
          </div>

          <div>
            <Code size={20} />
            <span>GitHub</span>
            <strong>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Profile
              </a>
            </strong>
          </div>

          <div>
            <BriefcaseBusiness size={20} />
            <span>LinkedIn</span>
            <strong>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}