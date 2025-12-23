'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function OvensPage() {
  const [ovensData, setOvensData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOvens = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/products/ovens');
        const data = await res.json();
        setOvensData(data);
      } catch (error) {
        console.error('Error fetching ovens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOvens();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading ovens...</p>;
  }

  if (!ovensData) {
    return <p className="text-center py-10 text-red-600">Failed to load data.</p>;
  }

  const subcategories = ovensData.subcategories || [];
  const subcategory = subcategories[0]; // assuming one subcategory for now

  return (
    <div className="flex p-5 gap-6 max-w-7xl mx-auto">
      {/* Sidebar */}
      <aside className="w-64 bg-white border rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Subcategories</h2>
        <ul className="space-y-2">
          {subcategories.map((sub, i) => (
            <li key={i} className="text-blue-600 font-medium">
              {sub.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Models */}
      <main className="flex-1">
        <h2 className="text-2xl font-bold mb-6">{subcategory.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subcategory.models.map((model) => (
            <Link
              key={model.meta.slug}
              href={`/products/ovens/${model.meta.slug}`}
              className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white"
            >
              <Image
                src={model.meta.thumbnail || '/ovens.png'}
                alt={model.meta.title}
                width={500}
                height={300}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black">
                  {model.meta.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {model.overview.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
