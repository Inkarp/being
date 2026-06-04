'use client';

import CategoryClient from './CategoryClient';
import ModelClient from './ModelClient';
import { ProductProvider } from '../../../app/context/ProductContext';


export default function Model({ slug = [], productResult = null, categoryResult = null }) {
  if (!slug || slug.length === 0) return null;

  return (
    <ProductProvider>
      {slug.length === 3 && productResult ? (
        <ModelClient
          categorySlug={productResult.categorySlug}
          subSlug={productResult.subSlug}
          modelSlug={productResult.modelSlug}
          categoryData={productResult.categoryData}
          subCategory={productResult.subCategory}
          product={productResult.product}
        />
      ) : (
        <CategoryClient
          categorySlug={categoryResult?.categorySlug}
          requestedSubSlug={slug[1]}
          categoryData={categoryResult?.categoryData}
        />
      )}
    </ProductProvider>
  );
}
