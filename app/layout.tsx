import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

// Self-hosted and preloaded by next/font. v1 pulled these from a CSS @import,
// which blocks the first paint on a third-party round trip and flashes unstyled
// text on the way in.
const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  // Matches --bg, which is Letterboxd's own page colour, so mobile browser
  // chrome blends into the page instead of framing it in a different black.
  themeColor: "#14181c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // Without metadataBase, Next cannot resolve the OG image to an absolute URL
  // and social crawlers get nothing.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Letterboxd Card — Embed your stats anywhere",
    template: "%s · Letterboxd Card",
  },
  description:
    "Generate stat cards from your Letterboxd profile. Drop them into GitHub READMEs, portfolio sites, or anywhere that renders an image URL. Free, open source, no auth required.",
  keywords: ["letterboxd", "stats card", "github readme", "embed", "film stats", "movie tracker"],
  authors: [{ name: "letterboxd-card" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Letterboxd Card",
    description: "Embeddable stat cards for Letterboxd profiles",
    url: SITE_URL,
    siteName: "Letterboxd Card",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    // v1 declared summary_large_image with no image to show.
    card: "summary_large_image",
    title: "Letterboxd Card",
    description: "Embeddable stat cards for Letterboxd profiles",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${mono.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
