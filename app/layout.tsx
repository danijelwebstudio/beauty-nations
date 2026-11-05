import type { Metadata } from "next";
import { Anton, Oswald, Outfit } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site-url";
import LegalFooter from "@/components/LegalFooter";
import { GoogleAnalytics } from '@next/third-parties/google';

// Konfiguracija fontova
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

const siteTitle = "Beauty Nations | One World. One Beauty Stage.";
const siteDescription =
  "An international competition combining nail artistry, makeup, costume and photography through one creative theme. Grand Final: 18 September 2027, Zagreb.";
const isVercelPreview = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  // Keep Vercel Preview deployments out of search results.
  robots: isVercelPreview ? { index: false, follow: false } : undefined,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Beauty Nations",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: "/favicon-16x16.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${oswald.variable} ${outfit.variable}`}
    >
      <body className="bg-black font-body text-white antialiased">
        {children}
        <LegalFooter />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}