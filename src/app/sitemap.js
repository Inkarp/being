import { PRODUCT_CATEGORY_SLUGS } from "../lib/productCategories";
import { GET as getBiologicalSafetyCabinetProducts } from "./api/products/biological-saftey-cabinets/route";
import { GET as getChillerProducts } from "./api/products/chillers/route";
import { GET as getFreezerProducts } from "./api/products/freezers/route";
import { GET as getIncubatorProducts } from "./api/products/incubators/route";
import { GET as getLaboratoryOvenProducts } from "./api/products/laboratory-ovens/route";
import { GET as getMuffleFurnaceProducts } from "./api/products/muffle-furnace/route";
import { GET as getPumpProducts } from "./api/products/pumps/route";
import { GET as getRotaryEvaporatorProducts } from "./api/products/rotary-evaporators/route";
import { GET as getWaterBathProducts } from "./api/products/water-baths/route";

const SITE_URL = (
  "https://www.beinglab.co.in/"
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
  "biological-saftey-cabinets": getBiologicalSafetyCabinetProducts,
  pumps: getPumpProducts,
  "rotary-evaporators": getRotaryEvaporatorProducts,
  "water-baths": getWaterBathProducts,
  freezers: getFreezerProducts,
  chillers: getChillerProducts,
  "muffle-furnace": getMuffleFurnaceProducts,
};

function sitemapEntry(path, priority = 0.7, changeFrequency = "monthly") {
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
