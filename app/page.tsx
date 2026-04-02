import { resolveDrupalPath, fetchDrupalResource } from "@/lib/drupal";
import ParagraphResolver from "@/components/paragraphs/ParagraphResolver";

const DRUPAL_BASE = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;

const INCLUDE_MAP: Record<string, string[]> = {
  landing_page: [
    "field_components",
    "field_components.field_stream_c_cards",
    "field_components.field_stream_c_cards.field_stream_c_image",
    "field_components.field_50_50_media",
    "field_components.field_article_teaser_teasers",
  ],
  article: [
    "field_paragraphs",
  ],
};

export default async function HomePage() {

  // Step 1 — Resolve the front page path dynamically
  // Whatever node Drupal has set as the front page will be fetched
  // Editors can change the front page in Drupal at any time
  // without any code changes needed
  const route = await resolveDrupalPath("/");
  if (!route) {
    return (
      <main style={{ backgroundColor: "#ffffff", minHeight: "100vh" }} />
    );
  }

  // Step 2 — Fetch the resource with appropriate includes
  const includes = INCLUDE_MAP[route.bundle] || [];
  const data = await fetchDrupalResource(route.jsonapiUrl, includes);
  if (!data?.data) {
    return (
      <main style={{ backgroundColor: "#ffffff", minHeight: "100vh" }} />
    );
  }

  const node = data.data;
  const included: any[] = data.included || [];

  // Step 3 — Build file map for images
  const fileMap: Record<string, string> = {};
  included.forEach((item: any) => {
    if (item.type === "file--file" && item.attributes?.uri?.url) {
      const url = item.attributes.uri.url.startsWith("http")
        ? item.attributes.uri.url
        : `${DRUPAL_BASE}${item.attributes.uri.url}`;
      fileMap[item.id] = url;
    }
  });

  // Step 4 — Enrich stream_cards with image URLs
  const enrichedIncluded = included.map((item: any) => {
    if (item.type === "paragraph--stream_cards") {
      const imageRef = item.relationships?.field_stream_c_image?.data;
      if (imageRef && fileMap[imageRef.id]) {
        return { ...item, _imageUrl: fileMap[imageRef.id] };
      }
    }
    return item;
  });

  // Step 5 — Render based on bundle type
  if (route.bundle === "landing_page") {
    const componentIds = (
      node.relationships?.field_components?.data || []
    ).map((c: any) => c.id);

    const components = enrichedIncluded
      .filter((item: any) => componentIds.includes(item.id))
      .map((item: any) => ({ ...item, _included: enrichedIncluded }));

    return (
      <main style={{ backgroundColor: "#ffffff" }}>
        {components.map((component: any) => (
          <ParagraphResolver key={component.id} paragraph={component} />
        ))}
      </main>
    );
  }

  if (route.bundle === "article") {
    const paragraphIds = (
      node.relationships?.field_paragraphs?.data || []
    ).map((p: any) => p.id);

    const paragraphs = enrichedIncluded
      .filter((item: any) => paragraphIds.includes(item.id))
      .map((item: any) => ({ ...item, _included: enrichedIncluded }));

    return (
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 32px" }}>
        <h1 style={{ fontSize: "48px", fontWeight: 800, color: "#1a1a1a", marginBottom: "40px" }}>
          {node.attributes.title}
        </h1>
        {paragraphs.map((paragraph: any) => (
          <ParagraphResolver key={paragraph.id} paragraph={paragraph} />
        ))}
      </main>
    );
  }

  // Fallback for any other bundle type
  return (
    <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 32px" }}>
      <h1 style={{ fontSize: "48px", fontWeight: 800, color: "#1a1a1a" }}>
        {node.attributes.title}
      </h1>
    </main>
  );
}
