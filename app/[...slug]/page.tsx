import { notFound } from "next/navigation";
import { resolveDrupalPath, fetchDrupalResource } from "@/lib/drupal";
import ParagraphResolver from "@/components/paragraphs/ParagraphResolver";

const INCLUDE_MAP: Record<string, string[]> = {
  landing_page: [
    "field_components",
    "field_components.field_stream_c_cards",
    "field_components.field_stream_c_cards.field_stream_c_image",
    "field_components.field_50_50_media",
    "field_components.field_article_teaser_teasers",
    "field_components.field_desc_subh",
    "field_components.field_desc_media",
  ],
  article: [
    "field_paragraphs",
  ],
};

const DRUPAL_BASE = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;

export default async function DrupalPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  console.log("SLUG:", slug);

  if (!slug || slug.length === 0) {
    console.log("NO SLUG - returning notFound");
    return notFound();
  }

  const path = "/" + slug.join("/");
  console.log("PATH:", path);

  const route = await resolveDrupalPath(path);
  console.log("ROUTE:", JSON.stringify(route));

  if (!route) {
    console.log("NO ROUTE - returning notFound");
    return notFound();
  }

  const includes = INCLUDE_MAP[route.bundle] || [];
  const data = await fetchDrupalResource(route.jsonapiUrl, includes);
  console.log("DATA:", data ? "found" : "null");

  if (!data?.data) {
    console.log("NO DATA - returning notFound");
    return notFound();
  }

  const node = data.data;
  const included: any[] = data.included || [];

  const fileMap: Record<string, string> = {};
  included.forEach((item: any) => {
    if (item.type === "file--file" && item.attributes?.uri?.url) {
      const url = item.attributes.uri.url.startsWith("http")
        ? item.attributes.uri.url
        : `${DRUPAL_BASE}${item.attributes.uri.url}`;
      fileMap[item.id] = url;
    }
  });

  const enrichedIncluded = included.map((item: any) => {
    if (item.type === "paragraph--stream_cards") {
      const imageRef = item.relationships?.field_stream_c_image?.data;
      if (imageRef && fileMap[imageRef.id]) {
        return { ...item, _imageUrl: fileMap[imageRef.id] };
      }
    }
    return item;
  });

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
        <h1 style={{
          fontSize: "48px",
          fontWeight: 800,
          color: "#ffffff",
          marginBottom: "40px"
        }}>
          {node.attributes.title}
        </h1>
        {paragraphs.map((paragraph: any) => (
          <ParagraphResolver key={paragraph.id} paragraph={paragraph} />
        ))}
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 32px" }}>
      <h1 style={{ fontSize: "48px", fontWeight: 800, color: "#ffffff" }}>
        {node.attributes.title}
      </h1>
    </main>
  );
}
