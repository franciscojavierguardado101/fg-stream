import HeroBanner from "./HeroBanner";
import StreamCarousel from "./StreamCarousel";
import FiftyFifty from "./FiftyFifty";
import Description from "./Description";

interface Paragraph {
  id: string;
  type: string;
  attributes: any;
  relationships?: any;
  _included?: any[];
  _imageUrl?: string;
}

const DRUPAL_BASE = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || "";

function resolveImageUrl(included: any[], imageRef: any): { url: string | null; alt: string } {
  if (!imageRef) return { url: null, alt: "" };
  const file = included.find((item: any) => item.id === imageRef.id);
  if (!file?.attributes?.uri?.url) return { url: null, alt: "" };
  const url = file.attributes.uri.url.startsWith("http")
    ? file.attributes.uri.url
    : `${DRUPAL_BASE}${file.attributes.uri.url}`;
  return { url, alt: imageRef.meta?.alt || "" };
}

export default function ParagraphResolver({ paragraph }: { paragraph: Paragraph }) {
  const type = paragraph.type.replace("paragraph--", "");
  const included = paragraph._included || [];

  switch (type) {
    case "hero_banner":
      return (
        <HeroBanner
          subtitle={paragraph.attributes.field_hero_subtitle || ""}
          body={paragraph.attributes.field_hero_body || ""}
        />
      );

    case "stream_carousel": {
      const cardRefs = paragraph.relationships?.field_stream_c_cards?.data || [];
      const cardIds = cardRefs.map((c: any) => c.id);
      const cards = included.filter((item: any) => cardIds.includes(item.id));
      return (
        <StreamCarousel
          title={paragraph.attributes.field_stream_carousel_title || ""}
          cards={cards}
        />
      );
    }

    case "50_50": {
      const imageRef = paragraph.relationships?.field_50_50_media?.data;
      const { url: imageUrl, alt: imageAlt } = resolveImageUrl(included, imageRef);
      const ctaField = paragraph.attributes.field_50_50_cta;
      const ctaUrl = ctaField?.uri?.replace("internal:", "") || null;
      const ctaLabel = ctaField?.title || "Learn More";
      return (
        <FiftyFifty
          title={paragraph.attributes.field_50_50_title || ""}
          description={paragraph.attributes.field_50_50_desc || ""}
          imageUrl={paragraph._imageUrl || imageUrl}
          imageAlt={imageAlt}
          ctaUrl={ctaUrl}
          ctaLabel={ctaLabel}
          color={paragraph.attributes.field_50_50_color || "field_50_50_color_white"}
          position={paragraph.attributes.field_50_50_position || "field_50_50_left"}
        />
      );
    }

    case "description": {
      const subhRef = paragraph.relationships?.field_desc_subh?.data;
      const mediaRef = paragraph.relationships?.field_desc_media?.data;
      const { url: subheaderUrl, alt: subheaderAlt } = resolveImageUrl(included, subhRef);
      const { url: mediaUrl, alt: mediaAlt } = resolveImageUrl(included, mediaRef);
      return (
        <Description
          subheaderUrl={subheaderUrl}
          subheaderAlt={subheaderAlt}
          mediaUrl={mediaUrl}
          mediaAlt={mediaAlt}
          caption={paragraph.attributes.field_desc_caption || ""}
          title={paragraph.attributes.field_desc_title || ""}
          description={paragraph.attributes.field_desc_desc || ""}
          color={paragraph.attributes.field_desc_color || "field_desc_color_white"}
        />
      );
    }

    default:
      return null;
  }
}
