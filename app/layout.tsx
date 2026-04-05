import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Letterboxd Card — Embed your stats anywhere",
  description:
    "Generate beautiful stat cards from your Letterboxd profile. Drop them into GitHub READMEs, portfolio sites, or anywhere that renders an image URL. Free, open source, no auth required.",
  keywords: [
    "letterboxd",
    "stats card",
    "github readme",
    "embed",
    "film stats",
    "movie tracker",
  ],
  authors: [{ name: "letterboxd-card" }],
  openGraph: {
    title: "Letterboxd Card",
    description: "Beautiful embeddable stat cards for Letterboxd profiles",
    url: "https://letterboxd-card.vercel.app",
    siteName: "Letterboxd Card",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Letterboxd Card",
    description: "Beautiful embeddable stat cards for Letterboxd profiles",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
