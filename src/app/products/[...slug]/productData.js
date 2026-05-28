function normalizeSlug(slug) {
  if (Array.isArray(slug)) return slug;
  if (!slug) return [];
  return [slug];
}

const CATEGORY_ALIASES = {
  cabinet: 'biological-safety-cabinets',
  cabinets: 'biological-safety-cabinets',
  'safety-cabinets': 'biological-safety-cabinets',
  'biological-saftey-cabinets': 'biological-safety-cabinets',
  'muffle-furnance': 'muffle-furnace',
};

function normalizeCategorySlug(slug) {
  return CATEGORY_ALIASES[slug] || slug;
}

export function getSiteUrl() {
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  return (process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || 'http://localhost:3000').replace(/\/$/, '');
}

export async function getCategoryFromSlug(slug) {
  const slugArray = normalizeSlug(slug);
  const categorySlug = normalizeCategorySlug(slugArray[0]);

  if (!categorySlug) return null;

  try {
    const res = await fetch(`${getSiteUrl()}/api/products/${categorySlug}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const categoryData = await res.json();

    return {
      categorySlug,
      categoryData,
    };
  } catch (error) {
    console.error('Category fetch error:', error);
    return null;
  }
}

export async function getProductFromSlug(slug) {
  const slugArray = normalizeSlug(slug);
  const [rawCategorySlug, subSlug, modelSlug] = slugArray;
  const categorySlug = normalizeCategorySlug(rawCategorySlug);

  if (!categorySlug || !subSlug || !modelSlug) return null;

  const categoryResult = await getCategoryFromSlug(slugArray);
  if (!categoryResult?.categoryData) return null;

  const subCategory = categoryResult.categoryData.subcategories?.find(
    (sub) => sub.slug?.toLowerCase() === subSlug.toLowerCase()
  );

  const product = subCategory?.models?.find(
    (model) =>
      model.meta?.slug?.toLowerCase() === modelSlug.toLowerCase() ||
      model.slug?.toLowerCase() === modelSlug.toLowerCase()
  );

  if (!subCategory || !product) return null;

  return {
    categorySlug,
    subSlug,
    modelSlug,
    categoryData: categoryResult.categoryData,
    subCategory,
    product,
  };
}

export function getPlainDescription(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(' ');
  if (!value) return '';
  return String(value);
}
