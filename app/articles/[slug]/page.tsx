import ParagraphResolver from "@/components/paragraphs/ParagraphResolver";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";

async function getArticleBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/article?filter[field_slug]=${slug}&include=field_paragraphs`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const json = await res.json();
  if (!json.data || json.data.length === 0) return null;
  return {
    article: json.data[0],
    included: json.included || [],
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);
  if (!data) return notFound();

  const { article, included } = data;
  const paragraphIds = (article.relationships?.field_paragraphs?.data || []).map((p: any) => p.id);
  const paragraphs = included.filter((item: any) => paragraphIds.includes(item.id));

  return (
    <ArticleContent
      title={article.attributes.title}
      paragraphs={paragraphs}
    />
  );
}
