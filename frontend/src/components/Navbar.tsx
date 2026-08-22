"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Education", href: "/education" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "Certificates", href: "/certificates" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          OLJIRA<span>.</span>
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}