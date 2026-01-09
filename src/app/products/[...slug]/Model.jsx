'use client';

import { useParams } from 'next/navigation';
import CategoryClient from './CategoryClient';
import ModelClient from './ModelClient';
import { ProductProvider } from '../../../app/context/ProductContext';


export default function Model() {
  const { slug } = useParams();

  if (!slug || slug.length === 0) return null;

  return (
    <ProductProvider>
      {slug.length === 3 ? <ModelClient /> : <CategoryClient />}
    </ProductProvider>
  );
}
