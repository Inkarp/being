'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import applicationsData from '@/data/products/ovens';

export default function ProductDetails() {
  const { applications } = useParams();
  const appData = applicationsData[applications];

  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    setActiveCategory('');
  }, [applications]);

  if (!appData) {
    return <div className="p-10 text-center">Category not found</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">{appData.title}</h1>
    </div>
  );
}
