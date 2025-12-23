'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function OvensPage() {
  const [ovensData, setOvensData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

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

  /* 🔥 Decide which models to show */
  const displayedModels = activeSubcategory
    ? subcategories.find(sub => sub.name === activeSubcategory)?.models || []
    : subcategories.flatMap(sub => sub.models);

  return (
    <div className="flex p-5 gap-6 max-w-7xl mx-auto">

      {/* Sidebar */}
      <aside className="w-64 bg-white border rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Subcategories</h2>

        <ul className="space-y-2">

          {/* All Models */}
          <li
            onClick={() => setActiveSubcategory(null)}
            className={`cursor-pointer font-medium ${
              activeSubcategory === null
                ? 'text-blue-600'
                : 'text-gray-700'
            }`}
          >
            All Models
          </li>

          {subcategories.map((sub, i) => (
            <li
              key={i}
              onClick={() => setActiveSubcategory(sub.name)}
              className={`cursor-pointer font-medium ${
                activeSubcategory === sub.name
                  ? 'text-blue-600'
                  : 'text-gray-700'
              }`}
            >
              {sub.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Models */}
      <main className="flex-1">
        <h2 className="text-2xl font-bold mb-6">
          {activeSubcategory || 'All Ovens'}
        </h2>

        {displayedModels.length === 0 ? (
          <p className="text-gray-500">No models found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedModels.map((model) => (
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
        )}
      </main>
    </div>
  );
}
