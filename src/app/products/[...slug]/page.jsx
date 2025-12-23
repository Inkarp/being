'use client';

import { useParams } from 'next/navigation';
import CategoryClient from './CategoryClient';
import ModelClient from './ModelClient';

export default function CategorySlugPage() {
  const { slug } = useParams();

  // Safety check
  if (!slug || slug.length === 0) {
    return null;
  }

  /**
   * URL patterns:
   * /products/ovens                             → category
   * /products/ovens/laboratory-drying-oven      → category (filtered)
   * /products/ovens/laboratory-drying-oven/bpg-9040a → model detail
   */

  // ✅ MODEL DETAIL PAGE
  if (slug.length === 3) {
    return <ModelClient />;
  }

  // ✅ CATEGORY / SUBCATEGORY PAGE
  return <CategoryClient />;
}
