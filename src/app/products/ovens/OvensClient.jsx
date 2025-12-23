'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function OvensClient() {
  const [ovensData, setOvensData] = useState(null);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/products/ovens');
        const data = await res.json();

        setOvensData(data);
        setAllSubcategories(data.subcategories);
      } catch (error) {
        console.error('Error fetching ovens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const fetchFilteredOvens = async (subcategory = null) => {
    setLoading(true);
    try {
      const url = subcategory
        ? `http://localhost:5001/api/products/ovens?subcategory=${encodeURIComponent(subcategory)}`
        : `http://localhost:5001/api/products/ovens`;

      const res = await fetch(url);
      const data = await res.json();

      setOvensData(data);
    } catch (error) {
      console.error('Error fetching filtered ovens:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !ovensData) {
    return <p className="text-center py-10">Loading ovens...</p>;
  }

  if (!ovensData) {
    return (
      <p className="text-center py-10 text-red-600">
        Failed to load ovens data
      </p>
    );
  }

  const models = ovensData.subcategories.flatMap(sub => sub.models);

  return (
    <div className="flex gap-6 max-w-7xl mx-auto p-6">

      {/* Sidebar */}
      <aside className="w-64 bg-white border rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Subcategories</h2>

        <ul className="space-y-2">
          <li
            onClick={() => {
              setActiveSubcategory(null);
              fetchFilteredOvens();
            }}
            className={`cursor-pointer font-medium ${
              !activeSubcategory ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            All Models
          </li>

          {allSubcategories.map((sub, i) => (
            <li
              key={i}
              onClick={() => {
                setActiveSubcategory(sub.name);
                fetchFilteredOvens(sub.name);
              }}
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

        {loading ? (
          <p className="text-gray-500">Loading models...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map(model => (
              <Link
                key={model.meta.slug}
                href={`/products/ovens/${model.meta.slug}`}
              >
                <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white">
                  <Image
                    src={model.meta.thumbnail || '/ovens.png'}
                    alt={model.meta.title}
                    width={500}
                    height={300}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">
                      {model.meta.title}
                    </h3>
                    <p className="w-[50%] mt-2 text-sm text-gray-600 line-clamp-2">
                      {model.overview?.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
