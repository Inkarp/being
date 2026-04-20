import { NextResponse } from "next/server";
import { PRODUCT_CATEGORY_SLUGS } from "../../../lib/productCategories";

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

function getProductText(model) {
  return [
    model.title,
    model.model,
    model.meta?.title,
    model.meta?.keywords,
    model.meta?.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();

  const baseUrl = new URL(request.url).origin;

  const results = [];

  for (const categorySlug of PRODUCT_CATEGORY_SLUGS) {
    try {
      const res = await fetch(`${baseUrl}/api/products/${categorySlug}`, {
        cache: "no-store",
      });

      if (!res.ok) continue;

      const data = await res.json();

      data.subcategories?.forEach((sub) => {
        sub.models?.forEach((model) => {
          if (q && !getProductText(model).includes(q)) return;

          results.push({
            id: model.meta?.slug || model.model,
            title: model.title || model.model || model.meta?.title,
            image: model.thumbnail || model.meta?.thumbnail || "/testImg.webp",
            imageAlt: model.imgAltText || model.title || model.model || "Product image",
            price: model.price ?? null,
            discount: model.discount ?? null,
            model: model.model || model.meta?.id || model.meta?.slug,
            category: categorySlug,
            categoryName: data.category,
            subcategory: sub.slug,
            subcategoryName: sub.name,
            tags: asArray(model.tags || model.category),
            url: `/products/${categorySlug}/${sub.slug}/${model.meta?.slug}`,
          });
        });
      });
    } catch (err) {
      console.warn(`Search skipped: ${categorySlug}`);
    }
  }

  return NextResponse.json(q ? results.slice(0, 20) : results);
}
