import type { Metadata } from "next";
import { Anton, Oswald, Outfit } from "next/font/google";
import "./globals.css";

// Display face: heavy, condensed, uppercase — used sparingly for hero/section headlines
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

// Heading face: condensed, bold — used for eyebrows, nav, labels, pillar titles
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

// Body face: clean, highly readable
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Beauty Nations | One World. One Beauty Stage.",
  description:
    "Beauty Nations unites countries, talents and beauty professionals through a platform that celebrates excellence, creativity and international collaboration.",
    icons: {
    icon: "/favicon-16x16.png", // Ovo govori Next.js-u gdje da nađe ikonicu
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
      <body className="bg-obsidian font-body text-white antialiased">
        {children}
      </body>
    </html>
  );
}
