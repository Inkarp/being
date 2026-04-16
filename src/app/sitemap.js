import { PRODUCT_CATEGORY_SLUGS } from "../lib/productCategories";
import { GET as getCabinetProducts } from "./api/products/cabinet/route";
import { GET as getIncubatorProducts } from "./api/products/incubators/route";
import { GET as getLaboratoryOvenProducts } from "./api/products/laboratory-ovens/route";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

const staticRoutes = [
  "",
  "/about-us",
  "/blogs",
  "/contact-us",
  "/customers",
  "/events",
  "/products",
  "/thank-you",
];

const categoryLoaders = {
  "laboratory-ovens": getLaboratoryOvenProducts,
  incubators: getIncubatorProducts,
  cabinet: getCabinetProducts,
};

function sitemapEntry(path, priority = 0.7, changeFrequency = "weekly") {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

async function getCategoryData(categorySlug) {
  const loadCategory = categoryLoaders[categorySlug];

  if (!loadCategory) return null;

  try {
    const res = await loadCategory();

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.warn(`Sitemap skipped category: ${categorySlug}`, error);
    return null;
  }
}

export default async function sitemap() {
  const routes = staticRoutes.map((path) =>
    sitemapEntry(path, path === "" ? 1 : 0.8)
  );

  for (const categorySlug of PRODUCT_CATEGORY_SLUGS) {
    const categoryData = await getCategoryData(categorySlug);

    if (!categoryData) continue;

    routes.push(sitemapEntry(`/products/${categorySlug}`, 0.8));

    categoryData.subcategories?.forEach((subcategory) => {
      routes.push(
        sitemapEntry(`/products/${categorySlug}/${subcategory.slug}`, 0.7)
      );

      subcategory.models?.forEach((model) => {
        if (!model?.meta?.slug) return;

        routes.push(
          sitemapEntry(
            `/products/${categorySlug}/${subcategory.slug}/${model.meta.slug}`,
            0.9
          )
        );
      });
    });
  }

  return routes;
}
