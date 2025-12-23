'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryClient() {
  const { slug } = useParams(); // ovens

  const [data, setData] = useState(null);
  const [activeSub, setActiveSub] = useState(null);      
  const [activeSubSlug, setActiveSubSlug] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const json = await res.json();

        setData(json);

        // ✅ initialize FIRST subcategory
        if (json.subcategories?.length) {
          setActiveSub(json.subcategories[0].name);
          setActiveSubSlug(json.subcategories[0].slug);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-20">Loading category...</p>;
  }

  if (!data) {
    return (
      <p className="text-center py-20 text-red-500">
        Category not found
      </p>
    );
  }

  const models =
    data.subcategories.find(s => s.slug === activeSubSlug)?.models || [];

  return (
    <div className="max-w-7xl mx-auto p-6 flex gap-6">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border border-gray-300 rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-4">{data.category}</h2>

        <ul className="space-y-2">
          {data.subcategories.map(sub => (
            <li
              key={sub.slug}
              onClick={() => {
                setActiveSub(sub.name);
                setActiveSubSlug(sub.slug);
              }}
              className={`cursor-pointer font-medium ${
                activeSubSlug === sub.slug
                  ? 'text-blue-600'
                  : 'text-gray-700'
              }`}
            >
              {sub.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* RIGHT MODELS */}
      <main className="flex-1">
        <h2 className="text-2xl font-bold mb-6">{activeSub}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map(model => (
            <Link
              key={model.meta.slug}
              href={`/products/${slug}/${activeSubSlug}/${model.meta.slug}`}
              className="border border-gray-300 rounded-lg shadow hover:shadow-lg transition bg-white overflow-hidden"
            >
              <Image
                src={model.meta.thumbnail}
                alt={model.meta.title}
                width={500}
                height={300}
                className="w-full h-[180px] object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">{model.meta.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {model.overview}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
