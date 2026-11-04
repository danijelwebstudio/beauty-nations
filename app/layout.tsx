import type { Metadata } from "next";
import { Anton, Oswald, Outfit } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site-url";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Beauty Nations | One World. One Beauty Stage.",
  description:
    "An international competition combining nail artistry, makeup, costume and photography through one creative theme. Grand Final: 18 September 2027, Zagreb.",
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
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}