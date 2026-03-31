import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FG Stream",
  description: "FG Stream — Powered by Drupal 11 + Next.js on Pantheon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
      }}>
        <Header />
        <div style={{ flex: 1, paddingTop: "72px" }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
