"use client";

import Link from "next/link";

interface FiftyFiftyProps {
  title: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string;
  ctaUrl: string | null;
  ctaLabel: string | null;
  color: string;
  position: string;
}

const COLOR_MAP: Record<string, { bg: string; text: string; desc: string; cta: string; ctaBorder: string }> = {
  field_50_50_color_red:   { bg: "#cc0000",           text: "#ffffff", desc: "rgba(255,255,255,0.85)", cta: "#ffffff", ctaBorder: "#ffffff" },
  field_50_50_color_black: { bg: "#000000",           text: "#ffffff", desc: "rgba(255,255,255,0.8)",  cta: "#ffffff", ctaBorder: "#ffffff" },
  field_50_50_color_gray:  { bg: "#404040",           text: "#ffffff", desc: "rgba(255,255,255,0.8)",  cta: "#ffffff", ctaBorder: "#ffffff" },
  field_50_50_color_blue:  { bg: "rgb(0,102,204)",    text: "#ffffff", desc: "rgba(255,255,255,0.85)", cta: "#ffffff", ctaBorder: "#ffffff" },
  field_50_50_color_white: { bg: "#ffffff",           text: "#1a1a1a", desc: "#555555",                cta: "#1a1a1a", ctaBorder: "#1a1a1a" },
};

export default function FiftyFifty({
  title,
  description,
  imageUrl,
  imageAlt,
  ctaUrl,
  ctaLabel,
  color,
  position,
}: FiftyFiftyProps) {
  const isImageLeft = position === "field_50_50_left";
  const colors = COLOR_MAP[color] || COLOR_MAP["field_50_50_color_white"];

  const ImageBlock = (
    <div style={{ flex: "1 1 50%", minHeight: "400px", position: "relative", overflow: "hidden" }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={imageAlt || title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }}
          loading="lazy"
        />
      ) : (
        <div style={{
          width: "100%", height: "100%",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "absolute", inset: 0,
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
        </div>
      )}
    </div>
  );

  const TextBlock = (
    <div style={{
      flex: "1 1 50%",
      backgroundColor: colors.bg,
      padding: "64px 56px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "24px",
    }}>
      {title && (
        <h2 style={{
          fontSize: "clamp(28px, 3vw, 40px)",
          fontWeight: 800,
          color: colors.text,
          lineHeight: 1.15,
          margin: 0,
          letterSpacing: "-0.5px",
        }}>
          {title}
        </h2>
      )}

      {description && (
        <p style={{
          fontSize: "16px",
          lineHeight: 1.7,
          color: colors.desc,
          margin: 0,
          maxWidth: "480px",
        }}>
          {description}
        </p>
      )}

      {ctaUrl && ctaLabel && (
        <div>
          <style>{`
            .fifty-cta-${color.replace(/_/g, "-")} {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 13px 28px;
              border: 2px solid ${colors.ctaBorder};
              color: ${colors.cta};
              font-size: 13px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              text-decoration: none;
              transition: all 0.2s ease;
              background-color: transparent;
            }
            .fifty-cta-${color.replace(/_/g, "-")}:hover {
              background-color: ${colors.cta};
              color: ${colors.bg};
            }
          `}</style>
          <Link
            href={ctaUrl}
            className={`fifty-cta-${color.replace(/_/g, "-")}`}
          >
            {ctaLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <section>
      <style>{`
        .fifty-fifty-wrap {
          display: flex;
          min-height: 400px;
        }
        @media (max-width: 768px) {
          .fifty-fifty-wrap {
            flex-direction: column !important;
          }
          .fifty-fifty-wrap > div {
            min-height: 300px;
          }
        }
      `}</style>
      <div
        className="fifty-fifty-wrap"
        style={{ flexDirection: isImageLeft ? "row" : "row-reverse" }}
      >
        {ImageBlock}
        {TextBlock}
      </div>
    </section>
  );
}
