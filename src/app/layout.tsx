import type { Metadata, Viewport } from "next";
import { Overpass } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AdPixels } from "@/components/ad-pixels";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Overpass descends from Highway Gothic, the typeface on US interstate signs.
// One family, several weights, for both headlines and body.
const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const description =
  "Harlo is the TMS for carriers and brokers: loads, dispatch, compliance, carriers and money in one platform. Free to start.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Harlo: the TMS for carriers and brokers",
    template: "%s | Harlo",
  },
  description,
  applicationName: "Harlo",
  openGraph: {
    type: "website",
    siteName: "Harlo",
    url: SITE_URL,
    title: "Harlo: the TMS for carriers and brokers",
    description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={overpass.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Nav />
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
        <AdPixels />
      </body>
    </html>
  );
}
