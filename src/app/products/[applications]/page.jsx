import applicationsData from '@/data/products/ovens';
import ProductDetails from './ProductDetails';
import { notFound } from 'next/navigation';

export function generateMetadata({ params }) {
  const app = applicationsData[params.applications];

  if (!app) {
    return { title: 'Products | Inkarp' };
  }

  return {
    title: app.title,
  };
}

export default function Page({ params }) {
  const app = applicationsData[params.applications];
  if (!app) notFound();

  return <ProductDetails />;
}
