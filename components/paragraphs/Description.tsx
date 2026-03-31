"use client";

import { useEffect, useState } from "react";

interface DescriptionProps {
  subheaderUrl: string | null;
  subheaderAlt: string;
  mediaUrl: string | null;
  mediaAlt: string;
  caption: string;
  title: string;
  description: string;
  color: string;
}

const COLOR_MAP: Record<string, { bg: string; text: string; caption: string; desc: string }> = {
  field_desc_color_red:   { bg: "#cc0000",        text: "#ffffff", caption: "rgba(255,255,255,0.7)", desc: "rgba(255,255,255,0.85)" },
  field_desc_color_black: { bg: "#000000",        text: "#ffffff", caption: "rgba(255,255,255,0.6)", desc: "rgba(255,255,255,0.8)"  },
  field_desc_color_gray:  { bg: "#404040",        text: "#ffffff", caption: "rgba(255,255,255,0.6)", desc: "rgba(255,255,255,0.8)"  },
  field_desc_color_blue:  { bg: "rgb(0,102,204)", text: "#ffffff", caption: "rgba(255,255,255,0.7)", desc: "rgba(255,255,255,0.85)" },
  field_desc_color_white: { bg: "#ffffff",        text: "#1a1a1a", caption: "#888888",               desc: "#444444"               },
};

export default function Description({
  subheaderUrl,
  subheaderAlt,
  mediaUrl,
  mediaAlt,
  caption,
  title,
  description,
  color,
}: DescriptionProps) {
  const colors = COLOR_MAP[color] || COLOR_MAP["field_desc_color_white"];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Subheader — just like HBO Born to Bowl */}
      {subheaderUrl && (
        <div style={{
          position: "sticky",
          top: "72px",
          zIndex: 40,
          backgroundColor: "#ffffff",
          borderBottom: scrolled ? "1px solid #e5e5e5" : "1px solid transparent",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
        }}>
          <div style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 32px",
            height: "56px",
            display: "flex",
            alignItems: "center",
          }}>
            <img
              src={subheaderUrl}
              alt={subheaderAlt || ""}
              loading="lazy"
              style={{
                maxHeight: "36px",
                maxWidth: "280px",
                width: "auto",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <section style={{ backgroundColor: colors.bg }}>

        {/* Contained Media Image — matches HBO col-lg-10 layout */}
        {mediaUrl && (
          <div style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "48px 80px 0",
          }}>
            <img
              src={mediaUrl}
              alt={mediaAlt || title}
              loading="lazy"
              style={{
                width: "100%",
                display: "block",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* Content Area */}
        <div style={{
          maxWidth: "780px",
          margin: "0 auto",
          padding: "48px 32px 64px",
        }}>

          {/* Caption */}
          {caption && (
            <p style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: colors.caption,
              margin: "0 0 16px",
            }}>
              {caption}
            </p>
          )}

          {/* Title */}
          {title && (
            <h1 style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              color: colors.text,
              lineHeight: 1.1,
              margin: "0 0 28px",
              letterSpacing: "-1px",
            }}>
              {title}
            </h1>
          )}

          {/* Divider */}
          <div style={{
            width: "48px",
            height: "3px",
            backgroundColor: colors.text,
            opacity: 0.2,
            marginBottom: "28px",
          }} />

          {/* Description */}
          {description && (
            <div style={{
              fontSize: "17px",
              lineHeight: 1.75,
              color: colors.desc,
              whiteSpace: "pre-line",
            }}>
              {description}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
