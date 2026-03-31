import Link from "next/link";
import { getMenu } from "@/lib/menu";
import MobileMenu from "@/components/MobileMenu";

export default async function Header() {
  const menuItems = await getMenu("main");

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e5e5e5",
      height: "72px",
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 32px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: "40px",
      }}>

        {/* Logo */}
        <Link href="/" style={{
          color: "#000000",
          fontWeight: 900,
          fontSize: "26px",
          letterSpacing: "-1px",
          textDecoration: "none",
          flexShrink: 0,
        }}>
          FG<span style={{ color: "#0066cc" }}>.</span>
        </Link>

        {/* Nav links — from Drupal main menu */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
          flex: 1,
        }}>
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                style={{
                  color: "#1a1a1a",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  padding: "4px 0",
                  borderBottom: "2px solid transparent",
                }}
              >
                {item.title}
              </Link>
            ))
          ) : (
            /* Fallback if Drupal menu is empty */
            <>
              <Link href="/" style={{ color: "#1a1a1a", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", textDecoration: "none" }}>Home</Link>
              <Link href="/articles" style={{ color: "#1a1a1a", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", textDecoration: "none" }}>Articles</Link>
              <Link href="/about" style={{ color: "#1a1a1a", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", textDecoration: "none" }}>About</Link>
              <Link href="/contact" style={{ color: "#1a1a1a", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", textDecoration: "none" }}>Contact</Link>
            </>
          )}
        </nav>

        {/* CTA Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <Link href="/login" style={{
            color: "#1a1a1a",
            fontSize: "13px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            padding: "8px 20px",
            border: "2px solid #1a1a1a",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            Sign In
          </Link>
          <Link href="/signup" style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            padding: "8px 20px",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            Sign Up
          </Link>
        </div>

        {/* Mobile */}
        <div style={{ flexShrink: 0 }}>
          <MobileMenu menuItems={menuItems} />
        </div>
      </div>
    </header>
  );
}
