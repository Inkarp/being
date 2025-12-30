'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import EnquiryModal from '../../../components/EnquiryModal';

export default function Model() {
  const router = useRouter();
  const { slug } = useParams();
  const [categorySlug, subSlug, modelSlug] = slug || [];

  const [subCategory, setSubCategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!categorySlug || !subSlug || !modelSlug) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/products/${categorySlug}`);
        const data = await res.json();

        const sub = data.subcategories.find(s => s.slug === subSlug);
        const model = sub?.models.find(m => m.meta.slug === modelSlug);

        setSubCategory(sub || null);
        setProduct(model || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, subSlug, modelSlug]);

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading product…</p>
      </section>
    );
  }

  if (!product || !subCategory) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-white">
        <p className="text-red-500 text-sm">Product not found</p>
      </section>
    );
  }

  const images = [
    product.meta.thumbnail,
    product.meta.thumbnail,
    product.meta.thumbnail,
  ];

  const pageTitle = product?.meta?.title
    ? `${product.meta.title} | Inkarp Instruments`
    : 'Product | Inkarp Instruments';

  const pageDescription =
    product?.meta?.description ||
    'High-performance scientific instruments from Inkarp Instruments, designed for precision, reliability, and laboratory excellence.';

  const pageKeywords =
    product?.meta?.keywords?.join(', ') ||
    'laboratory equipment, scientific instruments, analytical instruments, Inkarp';

  const canonicalUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : '';

  return (
    <section className="bg-white text-gray-900">

      {/* ================= SEO META ================= */}
      <Head>
        <title>{pageTitle}</title>

        <meta name="description" content={pageDescription} />

        <meta name="keywords" content={pageKeywords} />

        {canonicalUrl && (
          <link rel="canonical" href={canonicalUrl} />
        )}
      </Head>

      <div className="w-full mx-auto px-6 py-10">

        {/* BREADCRUMB */}
        <div className="text-sm text-gray-500 mb-6">
          <button onClick={() => router.push('/products')} className="hover:text-blue-600">
            Products
          </button>
          <span className="mx-2">/</span>
          <span className="capitalize">{categorySlug}</span>
          <span className="mx-2">/</span>
          <span className="capitalize">{subSlug}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.meta.title}</span>
        </div>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* IMAGE GALLERY */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`border rounded-md p-1 ${
                    activeImg === i ? 'border-blue-600' : 'border-gray-300'
                  }`}
                >
                  <Image src={img} alt="thumb" width={70} height={70} className="object-contain" />
                </button>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-center border border-gray-200 rounded-lg p-6">
              <Image
                src={images[activeImg]}
                alt={product.meta.title}
                width={420}
                height={420}
                className="object-contain"
              />
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div>
            {/* ✅ H1 = PRODUCT NAME */}
            <h1 className="text-2xl font-semibold mb-3">
              {product.meta.title}
            </h1>

            <p className="text-sm text-gray-500 mb-5">
              Internal Volume: Custom
            </p>

            {/* MODEL SELECTOR */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Available Models</p>
              <div className="flex flex-wrap gap-2">
                {subCategory.models.map(m => (
                  <button
                    key={m.meta.slug}
                    onClick={() =>
                      router.push(`/products/${categorySlug}/${subSlug}/${m.meta.slug}`)
                    }
                    className={`px-4 py-1.5 rounded-md text-sm border ${
                      m.meta.slug === modelSlug
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-600'
                    }`}
                  >
                    {m.meta.title}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <button className="bg-orange-500 text-white px-6 py-2.5 rounded-md text-sm hover:bg-orange-600">
                Request a Quote
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="border border-orange-500 text-orange-500 px-6 py-2.5 rounded-md text-sm hover:bg-orange-50"
              >
                Enquiry
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="mt-12 border border-gray-200 rounded-lg">

          {/* TABS */}
          <div className="flex gap-6 border-b px-6 py-3 text-sm font-medium">
            {['info', 'features', 'specs', 'applications'].map(tab => {
              if (
                (tab === 'features' && !product.keyFeatures) ||
                (tab === 'specs' && !product.specifications) ||
                (tab === 'applications' && !product.applications)
              ) return null;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  {tab === 'info'
                    ? 'Overview'
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT */}
          <div className="p-6 text-sm text-gray-700">
            {activeTab === 'info' && <p className="max-w-4xl leading-relaxed">{product.overview}</p>}

            {activeTab === 'features' && product.keyFeatures && (
              <ul className="list-disc list-inside space-y-2">
                {product.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}

            {activeTab === 'specs' && product.specifications && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{k.replace(/([A-Z])/g, ' $1')}</span>
                    <span>{typeof v === 'object' ? JSON.stringify(v) : v}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'applications' && product.applications && (
              <ul className="list-disc list-inside space-y-2">
                {product.applications.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productData={{
          category: categorySlug,
          subcategory: subSlug,
          model: product.meta.title,
          modelSlug,
        }}
      />
    </section>
  );
}
