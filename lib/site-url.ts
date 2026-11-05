// Until the purchased domain is connected, keep SEO links pointed at the working preview.
// Set NEXT_PUBLIC_SITE_URL=https://beauty-nations.com at the official launch.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://beauty-nations.vercel.app"
).replace(/\/$/, "");

// Staging must be explicitly promoted after domain, forms and legal review.
export const isPreRelease = process.env.DEPLOYMENT_ENV !== "production" || process.env.VERCEL_ENV === "preview";
