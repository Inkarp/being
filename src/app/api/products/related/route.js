import { NextResponse } from "next/server";
import { PRODUCT_CATEGORY_SLUGS } from "../../../../lib/productCategories";

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

function normalizeId(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getProductId(model) {
  return normalizeId(model.meta?.slug || model.slug || model.model || model.title);
}

function getProductDescription(model) {
  const overview = asArray(model.overview)[0];
  return (
    model.shortDescription ||
    model.meta?.description ||
    overview ||
    "Explore this related laboratory solution from Being India."
  );
}

function toCardProduct(model, categorySlug, categoryName, subcategory) {
  const id = getProductId(model);

  return {
    id,
    name: model.title || model.model || model.meta?.title || id,
    model: model.model || model.meta?.id || id,
    shortDescription: getProductDescription(model),
    image: model.thumbnail || model.meta?.thumbnail || "/testImg.webp",
    imageAlt: model.imgAltText || model.title || model.model || "Product image",
    href: `/products/${categorySlug}/${subcategory.slug}/${model.meta?.slug || id}`,
    category: categorySlug,
    categoryName,
    subcategory: subcategory.slug,
    subcategoryName: subcategory.name,
  };
}

async function loadProducts(baseUrl) {
  const products = [];

  for (const categorySlug of PRODUCT_CATEGORY_SLUGS) {
    try {
      const res = await fetch(`${baseUrl}/api/products/${categorySlug}`, {
        cache: "no-store",
      });

      if (!res.ok) continue;

      const data = await res.json();

      data.subcategories?.forEach((subcategory) => {
        subcategory.models?.forEach((model) => {
          products.push({
            raw: model,
            card: toCardProduct(model, categorySlug, data.category, subcategory),
            relatedIds: asArray(model.related || model.relatedProducts)
              .map(normalizeId)
              .filter(Boolean),
          });
        });
      });
    } catch (err) {
      console.warn(`Related products skipped: ${categorySlug}`);
    }
  }

  return products;
}

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const productId = normalizeId(searchParams.get("product"));

  if (!productId) {
    return NextResponse.json({
      sourceProduct: null,
      relatedProducts: [],
    });
  }

  const products = await loadProducts(origin);
  const byId = new Map();

  products.forEach((product) => {
    if (!byId.has(product.card.id)) {
      byId.set(product.card.id, product);
    }
  });

  const sourceProduct =
    byId.get(productId) ||
    products.find((product) => normalizeId(product.raw.model) === productId) ||
    null;

  if (!sourceProduct) {
    return NextResponse.json({
      sourceProduct: null,
      relatedProducts: [],
    });
  }

  const relatedProducts = sourceProduct.relatedIds
    .map((id) => byId.get(id))
    .filter(Boolean)
    .filter((product) => product.card.id !== sourceProduct.card.id)
    .map((product) => product.card);

  return NextResponse.json({
    sourceProduct: sourceProduct.card,
    relatedProducts,
  });
}
