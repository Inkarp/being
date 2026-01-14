'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  const router = useRouter();
  const containerRef = useRef(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH SEARCH RESULTS ================= */
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.slice(0, 8)); // limit results
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchResults, 300);
    return () => clearTimeout(delay);
  }, [query]);

  /* ================= CLICK OUTSIDE TO CLOSE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* SEARCH INPUT */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full rounded-full border border-gray-300 placeholder-white
            py-2.5 pl-10 pr-4 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#2B7EC2]/40
          "
        />

        <FaSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
          size={14}
        />
      </div>

      {/* RESULTS DROPDOWN */}
      {results.length > 0 && (
        <div
          className="
            absolute left-0 right-0 z-50 mt-2
            rounded-2xl border border-gray-200
            bg-white shadow-2xl
            max-h-[420px] overflow-y-auto
            divide-y divide-gray-100
          "
        >
          {results.map((item, index) => (
            <button
              key={`${item.slug}-${index}`}
              onClick={() => {
                router.push(
                  `/products/${item.category.toLowerCase().replace(/\s+/g, '-')}/${item.subcategory
                    .toLowerCase()
                    .replace(/\s+/g, '-')}/${item.slug}`
                );
                setQuery('');
                setResults([]);
              }}
              className="
                flex items-center gap-4
                w-full px-4 py-3 text-left
                hover:bg-gray-50 transition
              "
            >
              <div className="relative w-14 h-14 shrink-0 bg-gray-50 rounded-xl overflow-hidden border">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={ item.title}
                    fill
                    className="object-contain p-1"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* TEXT */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-gray-900 truncate">
                  {item.name}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {item.subcategory}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="absolute mt-2 px-3 py-2 text-xs text-gray-500 bg-white rounded-lg shadow">
          Searching…
        </div>
      )}

      {/* NO RESULTS */}
      {query.length > 1 && !loading && results.length === 0 && (
        <div className="absolute mt-2 w-full rounded-xl border bg-white p-4 text-sm text-gray-500 shadow-lg">
          No products found
        </div>
      )}
    </div>
  );
}
