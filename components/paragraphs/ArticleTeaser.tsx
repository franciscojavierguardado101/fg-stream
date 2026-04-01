"use client";

import Link from "next/link";
import { useState } from "react";

interface Teaser {
  id: string;
  attributes: {
    field_teasers_caption: string;
    field_teasers_title: string;
    field_teasers_url: { uri: string } | null;
  };
}

interface ArticleTeaserProps {
  title: string;
  teasers: Teaser[];
  color: string;
}

const COLOR_MAP: Record<string, { bg: string; titleColor: string; accentColor: string }> = {
  field_article_teaser_c_w: {
    bg: "#ffffff",
    titleColor: "#1a1a1a",
    accentColor: "rgb(0, 102, 204)",
  },
  field_article_teaser_c_db: {
    bg: "linear-gradient(135deg, #1a237e 0%, #0d47a1 30%, #01579b 60%, #006064 100%)",
    titleColor: "#ffffff",
    accentColor: "rgb(0, 102, 204)",
  },
  field_article_teaser_c_dr: {
    bg: "linear-gradient(135deg, #7f1d1d 0%, #b71c1c 30%, #c62828 60%, #8e0000 100%)",
    titleColor: "#ffffff",
    accentColor: "rgb(0, 102, 204)",
  },
  field_article_teaser_c_dy: {
    bg: "linear-gradient(135deg, #2a1f00 0%, #7a5c00 30%, #c9a227 60%, #ffca28 100%)",
    titleColor: "#ffffff",
    accentColor: "rgb(0, 102, 204)",
  },
  field_article_teaser_c_dg: {
    bg: "linear-gradient(135deg, #121212 0%, #2e2e2e 30%, #6d6d6d 60%, #bdbdbd 100%)",
    titleColor: "#ffffff",
    accentColor: "rgb(0, 102, 204)",
  },
  field_article_teaser_c_dgreen: {
    bg: "linear-gradient(135deg, #041b14 0%, #065f46 30%, #10b981 60%, #6ee7b7 100%)",
    titleColor: "#ffffff",
    accentColor: "rgb(0, 102, 204)",
  },
};

function TeaserCard({ teaser, accentColor, titleColor }: {
  teaser: Teaser;
  accentColor: string;
  titleColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  const url = teaser.attributes.field_teasers_url?.uri?.replace("internal:", "") || "#";

  return (
    <Link
      href={url}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        backgroundColor: hovered ? "#1a1a1a" : "#000000",
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "28px 24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
        borderColor: hovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
        cursor: "pointer",
      }}>
        <div>
          {/* Caption */}
          {teaser.attributes.field_teasers_caption && (
            <p style={{
              color: accentColor,
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "10px",
            }}>
              {teaser.attributes.field_teasers_caption}
            </p>
          )}

          {/* Title */}
          {teaser.attributes.field_teasers_title && (
            <h3 style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.3,
              margin: 0,
            }}>
              {teaser.attributes.field_teasers_title}
            </h3>
          )}
        </div>

        {/* Read more */}
        <span style={{
          fontSize: "12px",
          color: hovered ? "#ffffff" : "rgb(102, 102, 102)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginTop: "16px",
          display: "block",
          transition: "color 0.2s ease",
        }}>
          Read Article →
        </span>
      </div>
    </Link>
  );
}

export default function ArticleTeaser({ title, teasers, color }: ArticleTeaserProps) {
  const theme = COLOR_MAP[color] || COLOR_MAP["field_article_teaser_c_db"];
  const isWhite = color === "field_article_teaser_c_w";

  return (
    <section style={{
      padding: "60px 32px",
      background: theme.bg,
      width: "100%",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Section Title */}
        {title && (
          <h2 style={{
            fontSize: "20px",
            fontWeight: 700,
            color: theme.titleColor,
            marginBottom: "28px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            borderBottom: `2px solid ${theme.accentColor}`,
            paddingBottom: "12px",
            display: "inline-block",
          }}>
            {title}
          </h2>
        )}

        {/* Teasers Grid — max 4 cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(teasers.length, 4)}, 1fr)`,
          gap: "20px",
        }}>
          {teasers.slice(0, 4).map((teaser) => (
            <TeaserCard
              key={teaser.id}
              teaser={teaser}
              accentColor={theme.accentColor}
              titleColor={isWhite ? "#1a1a1a" : "#ffffff"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
