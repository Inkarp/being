'use client'

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();
  const url = 'https://dummyjson.com/products';

  const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.products;               // has category field[web:21]
  };

  useEffect(() => {
    fetcher(url)
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (product) => {
    const slug = `${product.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')}-${product.id}`;
    router.push(`/products/${slug}`);
  };

  // Unique categories for left aside
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  // Filtered products by selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <main className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Aside categories */}
        <aside className="w-64 hidden md:block">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-indigo-50'
                  }`}
                >
                  {cat === 'all' ? 'All products' : cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'all'
                ? 'All Products'
                : `Category: ${selectedCategory}`}
            </h1>
            <span className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:skew-x-4 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${product.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-indigo-600 font-semibold mb-4">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
