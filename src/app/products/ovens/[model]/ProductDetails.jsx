'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ProductDetails() {
  const { model } = useParams(); // 👈 read param here

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!model) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/ovens/${model}`
        );

        if (!res.ok) {
          setError(true);
          return;
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [model]);

  /* ---------- STATES ---------- */

  if (loading) {
    return <p className="text-center py-20">Loading product...</p>;
  }

  if (error || !product) {
    return (
      <p className="text-center py-20 text-red-500">
        Model not found
      </p>
    );
  }

  /* ---------- UI ---------- */

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow space-y-8">

      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          {product.meta.title}
        </h1>
      </div>

      {/* Image + Overview */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* Image */}
        <div className="md:w-1/3 flex justify-center">
          <Image
            src={product.meta.thumbnail}
            alt={product.meta.title}
            width={300}
            height={300}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Overview + Features */}
        <div className="md:w-2/3 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.overview}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b flex gap-8">
        <button
          onClick={() => setActiveTab('specs')}
          className={`pb-3 font-medium ${
            activeTab === 'specs'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Technical Specifications
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 font-medium ${
            activeTab === 'applications'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Applications
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-6">

        {activeTab === 'specs' && (
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Technical Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between border-b pb-2 text-gray-700"
                >
                  <span className="font-medium">{key}</span>
                  <span>
                    {typeof value === 'object'
                      ? JSON.stringify(value)
                      : value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'applications' && (
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Applications
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {product.applications.map((app, index) => (
                <li key={index}>{app}</li>
              ))}
            </ul>
          </section>
        )}

      </div>
    </div>
  );
}
