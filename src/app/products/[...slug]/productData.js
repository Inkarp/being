import { GET as getBiologicalSafetyCabinetProducts } from '../../api/products/biological-safety-cabinets/route';
import { GET as getChillerProducts } from '../../api/products/chillers/route';
import { GET as getFreezerProducts } from '../../api/products/freezers/route';
import { GET as getIncubatorProducts } from '../../api/products/incubators/route';
import { GET as getLaboratoryOvenProducts } from '../../api/products/laboratory-ovens/route';
import { GET as getMuffleFurnaceProducts } from '../../api/products/muffle-furnace/route';
import { GET as getPumpProducts } from '../../api/products/pumps/route';
import { GET as getRotaryEvaporatorProducts } from '../../api/products/rotary-evaporators/route';
import { GET as getWaterBathProducts } from '../../api/products/water-baths/route';

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

const CATEGORY_LOADERS = {
  'laboratory-ovens': getLaboratoryOvenProducts,
  incubators: getIncubatorProducts,
  'biological-safety-cabinets': getBiologicalSafetyCabinetProducts,
  pumps: getPumpProducts,
  'rotary-evaporators': getRotaryEvaporatorProducts,
  'water-baths': getWaterBathProducts,
  freezers: getFreezerProducts,
  chillers: getChillerProducts,
  'muffle-furnace': getMuffleFurnaceProducts,
};

export function getSiteUrl() {
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  return (process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || 'http://localhost:3000').replace(/\/$/, '');
}

export async function getCategoryFromSlug(slug) {
  const slugArray = normalizeSlug(slug);
  const categorySlug = normalizeCategorySlug(slugArray[0]);

  if (!categorySlug) return null;

  try {
    const loadCategory = CATEGORY_LOADERS[categorySlug];
    if (!loadCategory) return null;

    const res = await loadCategory();

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
