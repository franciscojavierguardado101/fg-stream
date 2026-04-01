"use client";

import Link from "next/link";
import { useState } from "react";

interface PresentationProps {
  caption: string;
  title: string;
  description: string;
  url1: { uri: string; title: string } | null;
  url2: { uri: string; title: string } | null;
  color: string;
}

const COLOR_MAP: Record<string, { gradient: string; buttonColor: string }> = {
  field_pres_c_db: {
    gradient: "linear-gradient(135deg, rgb(26,35,126) 0%, rgb(13,71,161) 30%, rgb(1,87,155) 60%, rgb(0,96,100) 100%)",
    buttonColor: "rgb(0, 102, 204)",
  },
  field_pres_c_rd: {
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #b71c1c 30%, #c62828 60%, #8e0000 100%)",
    buttonColor: "rgb(204, 51, 51)",
  },
  field_pres_c_dy: {
    gradient: "linear-gradient(135deg, #2a1f00 0%, #7a5c00 30%, #c9a227 60%, #ffca28 100%)",
    buttonColor: "rgb(0, 102, 204)",
  },
  field_pres_c_dg: {
    gradient: "linear-gradient(135deg, #121212 0%, #2e2e2e 30%, #6d6d6d 60%, #bdbdbd 100%)",
    buttonColor: "rgb(96, 96, 96)",
  },
  field_pres_c_dgn: {
    gradient: "linear-gradient(135deg, #0b1f14 0%, #14532d 30%, #2e7d32 60%, #66bb6a 100%)",
    buttonColor: "rgb(51, 204, 51)",
  },
  field_pres_c_dp: {
    gradient: "linear-gradient(135deg, #140a1f 0%, #4a148c 30%, #6a1b9a 60%, #ba68c8 100%)",
    buttonColor: "rgb(153, 51, 204)",
  },
};

export default function Presentation({
  caption,
  title,
  description,
  url1,
  url2,
  color,
}: PresentationProps) {
  const [url2Hovered, setUrl2Hovered] = useState(false);
  const theme = COLOR_MAP[color] || COLOR_MAP["field_pres_c_db"];

  function resolveUrl(uri: string): string {
    return uri.replace("internal:", "");
  }

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "560px",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* Gradient background from color field */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: theme.gradient,
          zIndex: 0,
        }}
      />

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%), linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 32px",
          width: "100%",
        }}
      >
        {/* Caption */}
        {caption && (
          <p
            style={{
              color: "rgb(170, 170, 170)",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "12px",
            }}
          >
            {caption}
          </p>
        )}

        {/* Title */}
        {title && (
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: "16px",
              maxWidth: "600px",
            }}
          >
            {title}
          </h1>
        )}

        {/* Description */}
        {description && (
          <p
            style={{
              color: "rgb(204, 204, 204)",
              fontSize: "16px",
              lineHeight: 1.6,
              marginBottom: "32px",
              maxWidth: "520px",
            }}
          >
            {description}
          </p>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>

          {/* URL 1 - always has background color */}
          {url1 && (
            <Link
              href={resolveUrl(url1.uri)}
              style={{
                backgroundColor: theme.buttonColor,
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                padding: "14px 28px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              ▶ {url1.title || "Read More"}
            </Link>
          )}

          {/* URL 2 - transparent with hover fill */}
          {url2 && (
            <Link
              href={resolveUrl(url2.uri)}
              style={{
                backgroundColor: url2Hovered ? theme.buttonColor : "transparent",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                padding: "14px 28px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: "2px solid rgba(255,255,255,0.5)",
                transition: "background-color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={() => setUrl2Hovered(true)}
              onMouseLeave={() => setUrl2Hovered(false)}
            >
              {url2.title || "Learn More"}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
