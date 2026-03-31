import Link from "next/link";
import { getMenu } from "@/lib/menu";

export default async function Footer() {
  const footerLinks = await getMenu("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#404040" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 32px 40px" }}>

        {/* Logo centered */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link href="/" style={{
            color: "#ffffff",
            fontWeight: 900,
            fontSize: "36px",
            letterSpacing: "-1px",
            textDecoration: "none",
          }}>
            FG<span style={{ color: "#0066cc" }}>.</span>
          </Link>
        </div>

        {/* Primary nav links from Drupal — centered like HBO */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 32px",
          marginBottom: "32px",
        }}>
          {footerLinks.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              style={{
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "2px",
                textDecoration: "none",
                padding: "4px 0",
              }}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #555555", margin: "0 0 28px" }} />

        {/* Legal links */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "6px 24px",
          marginBottom: "24px",
        }}>
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Use", href: "/terms" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                color: "#aaaaaa",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Built with */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <span style={{ color: "#777777", fontSize: "11px" }}>
            Built with Drupal 11 + Next.js 16 + Pantheon
          </span>
        </div>

        {/* Copyright */}
        <p style={{ textAlign: "center", color: "#777777", fontSize: "11px" }}>
          {currentYear} Francisco Guardado. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
