import Link from "next/link";
import Hero from "@/components/Hero";

async function getArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/article`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <main>
      <style>{`
        .article-card {
          background-color: #1a1a1a;
          border: 1px solid #2a2a2a;
          padding: 28px;
          min-height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: border-color 0.2s, background-color 0.2s;
          cursor: pointer;
        }
        .article-card:hover {
          border-color: #0066cc;
          background-color: #1f1f2e;
        }
        .article-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
      `}</style>

      {/* Hero Section */}
      <Hero
        title="Francisco Guardado Super Drupal"
        subtitle="A modern decoupled CMS powered by Drupal 11 and Next.js. Content managed by editors, beautifully rendered by React components."
        tag="Now Live"
        primaryLabel="Read Articles"
        primaryHref="/articles"
        secondaryLabel="Learn More"
        secondaryHref="/about"
      />

      {/* Articles Section */}
      <section style={{ padding: "60px 32px", maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "28px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          borderBottom: "2px solid #0066cc",
          paddingBottom: "12px",
          display: "inline-block",
        }}>
          Latest Articles
        </h2>

        <div className="article-grid">
          {articles.map((article: any) => (
            <Link
              key={article.id}
              href={`/articles/${article.attributes.field_slug}`}
              style={{ textDecoration: "none" }}
            >
              <div className="article-card">
                <div>
                  <p style={{
                    color: "#0066cc",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "10px",
                  }}>
                    Available Now
                  </p>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.3,
                  }}>
                    {article.attributes.title}
                  </h3>
                </div>
                <span style={{
                  fontSize: "12px",
                  color: "#666666",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginTop: "16px",
                  display: "block",
                }}>
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <p style={{ color: "#666666" }}>No articles yet. Create some in Drupal!</p>
        )}
      </section>
    </main>
  );
}
