import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

/* ---------------- LOAD ALL PRODUCTS ---------------- */
async function loadAllProducts() {
  const productsDir = path.join(process.cwd(), "app/products");
  const categories = [];

  try {
    const categoryFolders = await fs.readdir(productsDir);

    for (const category of categoryFolders) {
      try {
        const { GET } = await import(
          `api/products/${category}/route.js`
        );
        const req = new Request(`api/products/${category}`);
        const res = await GET(req);
        const data = await res.json();

        categories.push({
          name: category.replace(/-/g, " "),
          data,
        });
      } catch {
        console.warn(`Skipping ${category}`);
      }
    }
  } catch (err) {
    console.error("Product load error:", err);
  }

  return categories;
}

/* ---------------- SEARCH HANDLER ---------------- */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();

  const categories = await loadAllProducts();
  const allProducts = [];

  categories.forEach((cat) => {
    cat.data?.subcategories?.forEach((sub) => {
      sub.models?.forEach((model) => {
        allProducts.push({
          id: `${cat.name}-${sub.name}-${model.meta.slug}`,
          name: model.meta.title,
          slug: model.meta.slug,
          image: model.meta.thumbnail,
          category: cat.name,
          subcategory: sub.name,
        });

      });
    });
  });

  if (!q) {
    return NextResponse.json([]);
  }

  const filtered = allProducts.filter((p) => {
    const name = p.name.toLowerCase();
    const category = p.category.toLowerCase();
    const sub = p.subcategory.toLowerCase();

    return (
      name.includes(q) ||
      name.split(" ").some((w) => w.startsWith(q)) ||
      category.includes(q) ||
      sub.includes(q)
    );
  });

  return NextResponse.json(filtered.slice(0, 10));
}
