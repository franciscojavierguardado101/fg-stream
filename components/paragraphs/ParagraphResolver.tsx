import HeroBanner from "./HeroBanner";

interface Paragraph {
  type: string;
  attributes: {
    field_hero_subtitle?: string;
    field_hero_body?: string;
  };
}

export default function ParagraphResolver({ paragraph }: { paragraph: Paragraph }) {
  const type = paragraph.type.replace("paragraph--", "");

  switch (type) {
    case "hero_banner":
      return (
        <HeroBanner
          subtitle={paragraph.attributes.field_hero_subtitle || ""}
          body={paragraph.attributes.field_hero_body || ""}
        />
      );
    default:
      return null;
  }
}
