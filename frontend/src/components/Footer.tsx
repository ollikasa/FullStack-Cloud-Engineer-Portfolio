import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>OLJIRA LIKASA</h3>
          <p>
            Computer Engineer building skills in Cloud Engineering,
            Software Development, Networking and DevOps.
          </p>
        </div>

        <div className="footer-links">
          <Link href="/projects">Projects</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Oljira Likasa. All rights reserved.
      </div>
    </footer>
  );
}