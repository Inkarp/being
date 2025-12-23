'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ModelClient() {
  const { slug } = useParams();

  const categorySlug = slug[0];
  const subSlug = slug[1];
  const modelSlug = slug[2];

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await fetch(`/api/products/${categorySlug}`);
        const data = await res.json();

        const sub = data.subcategories.find(s => s.slug === subSlug);
        const model = sub?.models.find(m => m.meta.slug === modelSlug);

        setProduct(model || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [categorySlug, subSlug, modelSlug]);

  if (loading) {
    return <p className="text-center py-20">Loading product...</p>;
  }

  if (!product) {
    return (
      <p className="text-center py-20 text-red-500">
        Product not found
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center">
        {product.meta.title}
      </h1>

      {/* IMAGE + OVERVIEW */}
      <div className="flex flex-col md:flex-row gap-8">

        <div className="md:w-1/3 flex justify-center">
          <Image
            src={product.meta.thumbnail}
            alt={product.meta.title}
            width={350}
            height={350}
            className="rounded-lg object-contain"
          />
        </div>

        <div className="md:w-2/3 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.overview}
            </p>
          </section>

          {product.keyFeatures && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Key Features</h2>
              <ul className="list-disc list-inside space-y-1">
                {product.keyFeatures.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="border-b flex gap-8">
        <button
          onClick={() => setActiveTab('specs')}
          className={`pb-3 ${
            activeTab === 'specs'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Technical Specifications
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 ${
            activeTab === 'applications'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Applications
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'specs' && product.specifications && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b pb-2">
              <span className="font-medium">{key}</span>
              <span>{val}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'applications' && product.applications && (
        <ul className="list-disc list-inside space-y-2">
          {product.applications.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
