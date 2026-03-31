import Link from "next/link";
import ParagraphResolver from "@/components/paragraphs/ParagraphResolver";

interface ArticleContentProps {
  title: string;
  paragraphs: any[];
}

export default function ArticleContent({ title, paragraphs }: ArticleContentProps) {
  return (
    <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 32px 80px" }}>
      <Link
        href="/"
        style={{
          color: "#999999",
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: 600,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "32px",
        }}
      >
        ← Back to all articles
      </Link>
      <h1 style={{
        fontSize: "48px",
        fontWeight: 800,
        color: "#ffffff",
        marginBottom: "40px",
        lineHeight: 1.1,
      }}>
        {title}
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {paragraphs.map((paragraph: any) => (
          <ParagraphResolver key={paragraph.id} paragraph={paragraph} />
        ))}
      </div>
    </main>
  );
}
