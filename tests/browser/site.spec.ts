import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Browser checks never load a live CAPTCHA or reach a form provider.
  await page.route("https://challenges.cloudflare.com/**", (route) => route.abort());
  await page.route("https://formspree.io/**", (route) => route.abort());
  await page.route("**/api/applications", (route) => route.abort());
});

test("eight countries, MK inquiry, original poster and slider fit the approved layout", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const heroCount = page.locator("main > section").first().getByText("8 Nations", { exact: true });
  await expect(heroCount).toHaveCount(1);
  if (testInfo.project.name === "desktop") await expect(heroCount).toBeVisible();
  const select = page.getByLabel("Select your country");
  await expect(select.locator("option")).toHaveCount(9);
  await select.selectOption("North Macedonia");
  await expect(page.getByRole("heading", { name: "Marija Stojanovska", exact: true })).toBeVisible();
  await expect(page.getByRole("form", { name: "competitor form" })).toBeVisible();
  await expect(page.locator("#compete a[href*='instagram.com']")).toHaveCount(0);
  await expect(page.locator("#compete button[type=submit]")).toBeDisabled();
  const flags = page.locator('img[src^="https://flagcdn.com/"][src$=".svg"]');
  await expect(flags).toHaveCount(8);
  const mkFlag = page.getByAltText("North Macedonia flag", { exact: true });
  await expect(mkFlag).toHaveAttribute("src", "https://flagcdn.com/mk.svg");
  await mkFlag.scrollIntoViewIfNeeded();
  await expect(mkFlag.locator("../..")).toHaveCSS("opacity", "1");
  await expect.poll(() => flags.evaluateAll((images) => images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await mkFlag.locator("../../../../..").screenshot({ path: testInfo.outputPath("flags.png") });

  const search = page.getByRole("searchbox", { name: "Search national coordinators by country or name" });
  await search.fill("Marija");
  const poster = page.getByRole("link", { name: /View the full original poster for Marija/ });
  await expect(poster).toBeVisible();
  await expect(poster).toHaveAttribute("href", "/directors/posters/north-macedonia.jpg");
  // The card's reveal animation starts only after it enters the viewport.
  await poster.scrollIntoViewIfNeeded();
  await expect(poster).toBeInViewport();
  const image = poster.locator("img");
  await expect(image).toHaveCSS("object-fit", "contain");
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  await expect(poster.locator("..")).toHaveCSS("opacity", "1");
  await poster.screenshot({ path: testInfo.outputPath("north-macedonia-card.png") });
  await expect(page.getByRole("button", { name: "Next national coordinators" })).toBeDisabled();
  await search.fill("");
  const rail = page.getByRole("region", { name: "Scrollable national coordinators" });
  await page.getByRole("button", { name: "Next national coordinators" }).click();
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect(page.getByRole("button", { name: "Previous national coordinators" })).toBeEnabled();
  await expect(page.getByText("Connect your brand with creative talent across 8 represented nations.", { exact: false })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
  // Reveal viewport-triggered motion before capturing the entire existing design.
  for (const section of await page.locator("main > section").all()) await section.scrollIntoViewIfNeeded();
  const founderHeading = page.getByRole("heading", { name: "MEET THE FOUNDER", exact: true });
  await founderHeading.scrollIntoViewIfNeeded();
  await expect(founderHeading.locator("..")).toHaveCSS("opacity", "1");
  const founderImage = page.locator('img[src*="LelaSlika2"]');
  await founderImage.scrollIntoViewIfNeeded();
  await expect(founderImage.locator("..")).toHaveCSS("opacity", "1");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: testInfo.outputPath("homepage.png"), fullPage: true });
});

test("legal drafts are hidden and noindexed; internal links, images, metadata and 404 work", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://beauty-nations.vercel.app");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /BeautyNationLogo.webp/);
  expect(await page.locator('script[src*="googletagmanager"]').count()).toBe(0);
  const missingAnchors = await page.locator('a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")!).filter((href) => href.length > 1 && !document.getElementById(href.slice(1))));
  expect(missingAnchors).toEqual([]);
  const paths = await page.locator('a[href^="/"]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")!))]);
  for (const path of paths) expect((await request.get(path)).status(), path).toBe(200);
  const unsafeLinks = await page.locator('a[target="_blank"]').evaluateAll((links) => links.filter((link) => !link.getAttribute("rel")?.includes("noopener")).length);
  expect(unsafeLinks).toBe(0);
  for (const path of ["/privacy-policy", "/terms-and-conditions"]) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByText("Legal information is under review.", { exact: false })).toBeVisible();
    expect(await page.content()).not.toContain("not currently a registered company");
    expect(await page.content()).not.toContain("production hosting provider");
    expect(await page.locator('link[rel="canonical"]').count()).toBe(0);
  }
  const response = await page.goto("/missing-page-for-smoke-test");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("<loc>");
});
