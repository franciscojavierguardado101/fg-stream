"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface StreamCard {
  id: string;
  type: string;
  attributes: {
    field_stream_c_status: string;
    field_stream_c_card_title: string;
    field_stream_c_card_desc: string;
    field_stream_c_card_url: { uri: string; title: string } | null;
  };
  relationships?: any;
  _imageUrl?: string;
}

interface StreamCarouselProps {
  title: string;
  cards: StreamCard[];
}

const CARDS_VISIBLE = 4;

export default function StreamCarousel({ title, cards }: StreamCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = cards.length;

  function prev() {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }

  function next() {
    setCurrentIndex((i) => (i + 1) % total);
  }

  const visibleCards = Array.from(
    { length: Math.min(CARDS_VISIBLE, total) },
    (_, i) => cards[(currentIndex + i) % total]
  );

  function getCardUrl(card: StreamCard): string {
    const uri = card.attributes.field_stream_c_card_url?.uri || "";
    return uri.replace("internal:", "");
  }

  function getStatusLabel(status: string): string {
    if (status === "available_now") return "AVAILABLE NOW";
    if (status === "coming_soon") return "COMING SOON";
    return status.toUpperCase().replace(/_/g, " ");
  }

  if (!cards || cards.length === 0) return null;

  return (
    <section style={{
      padding: "48px 0 40px",
      backgroundColor: "#ffffff",
      position: "relative",
    }}>
      <style>{`
        .stream-track {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .stream-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        .stream-card-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #111827;
          position: relative;
        }
        .stream-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .stream-card-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #111827 0%, #1e3a5f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stream-card-meta {
          padding: 14px 4px 0;
        }
        .stream-card-status {
          font-size: 11px;
          font-weight: 500;
          color: #666666;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .stream-card-title {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .stream-card-desc {
          font-size: 13px;
          color: #555555;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
        }
        .stream-card-link:hover .stream-card-title {
          color: #0066cc;
        }
        .stream-arrow {
          position: absolute;
          top: calc(48px + ((100vw / 4 - 40px) * 9/16) / 2);
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          z-index: 10;
        }
        .stream-arrow:hover svg path {
          opacity: 0.5;
        }
        .stream-arrow-left { left: 12px; }
        .stream-arrow-right { right: 12px; }
        @media (max-width: 900px) {
          .stream-track { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .stream-track { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#1a1a1a",
          margin: 0,
          letterSpacing: "-0.5px",
        }}>
          {title}
        </h2>
      </div>

      {/* Carousel */}
      <div style={{ position: "relative", padding: "0 56px" }}>

        {/* Left Arrow */}
        <button className="stream-arrow stream-arrow-left" onClick={prev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M16 18.6792L14.5999 20L4 10L14.5999 0L16 1.32082L6.7999 10L16 18.6792Z" fill="black"/>
          </svg>
        </button>

        {/* Cards */}
        <div className="stream-track">
          {visibleCards.map((card, idx) => {
            const url = getCardUrl(card);
            const status = getStatusLabel(card.attributes.field_stream_c_status || "");
            const imageUrl = card._imageUrl || null;

            return (
              <Link
                key={card.id + "-" + idx}
                href={url || "#"}
                className="stream-card-link"
              >
                {/* Image */}
                <div className="stream-card-img-wrap">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={card.attributes.field_stream_c_card_title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="stream-card-placeholder">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="stream-card-meta">
                  <div className="stream-card-status">{status}</div>
                  <div className="stream-card-title">
                    {card.attributes.field_stream_c_card_title}
                  </div>
                  <p className="stream-card-desc">
                    {card.attributes.field_stream_c_card_desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button className="stream-arrow stream-arrow-right" onClick={next} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 1.32082L5.40006 0L16 10L5.40006 20L4 18.6792L13.2001 10L4 1.32082Z" fill="black"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
