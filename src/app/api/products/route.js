import { NextResponse } from "next/server";

/* 👇 ADD ALL CATEGORY SLUGS HERE */
const CATEGORY_SLUGS = [
  "laboratory-ovens",
  "incubators",
  // "freezers",
  // "chillers",
  // "rotary-evaporators",
  // "water-baths",
  // "pumps",
  // "muffle-furnace",
  // "digital-viscometer",
  // "cabinet",
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();

  if (!q) return NextResponse.json([]);

  // Get the base URL from request headers for proper origin on Vercel
  const protocol = request.headers.get("x-forwarded-proto") || "https";
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const baseUrl = `${protocol}://${host}`;

  const results = [];

  for (const categorySlug of CATEGORY_SLUGS) {
    try {
      const res = await fetch(
        `${baseUrl}/api/products/${categorySlug}`,
        { cache: "no-store" }
      );

      if (!res.ok) continue;

      const data = await res.json();

      data.subcategories?.forEach((sub) => {
        sub.models?.forEach((model) => {
          const title = model.meta.title?.toLowerCase() || "";
          const keywords = model.meta.keywords?.toLowerCase() || "";

          if (title.includes(q) || keywords.includes(q)) {
            results.push({
              id: model.meta.slug,
              title: model.title,
              image: model.thumbnail,
              category: categorySlug,
              subcategory: sub.slug,
              url: `/products/${categorySlug}/${sub.slug}/${model.meta.slug}`,
            });
          }
        });
      });
    } catch (err) {
      console.warn(`Search skipped: ${categorySlug}`);
    }
  }

  return NextResponse.json(results.slice(0, 20));
}
