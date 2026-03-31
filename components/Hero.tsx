interface HeroProps {
  title: string;
  subtitle: string;
  tag?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function Hero({
  title,
  subtitle,
  tag = "NOW STREAMING",
  primaryLabel = "Watch Now",
  primaryHref = "#",
  secondaryLabel = "Find Out More",
  secondaryHref = "#",
}: HeroProps) {
  return (
    <section style={{
      position: "relative",
      width: "100%",
      minHeight: "560px",
      backgroundColor: "#111111",
      display: "flex",
      alignItems: "flex-end",
      overflow: "hidden",
    }}>
      {/* Background gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%), linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
        zIndex: 1,
      }} />

      {/* Background placeholder - will be replaced with real image later */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 30%, #01579b 60%, #006064 100%)",
        zIndex: 0,
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "80px 32px",
        width: "100%",
      }}>
        {/* Tag */}
        <p style={{
          color: "#aaaaaa",
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "3px",
          marginBottom: "12px",
        }}>
          {tag}
        </p>

        {/* Title */}
        <h1 style={{
          color: "#ffffff",
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 800,
          lineHeight: 1.05,
          marginBottom: "16px",
          maxWidth: "600px",
        }}>
          {title}
        </h1>

        {/* Subtitle */}
        <p style={{
          color: "#cccccc",
          fontSize: "16px",
          lineHeight: 1.6,
          marginBottom: "32px",
          maxWidth: "520px",
        }}>
          {subtitle}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href={primaryHref} style={{
            backgroundColor: "#0066cc",
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
          }}>
            ▶ {primaryLabel}
          </a>
          <a href={secondaryHref} style={{
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            padding: "14px 28px",
            textDecoration: "none",
            border: "2px solid rgba(255,255,255,0.5)",
            display: "inline-flex",
            alignItems: "center",
          }}>
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
