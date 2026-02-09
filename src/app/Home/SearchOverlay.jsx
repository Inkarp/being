'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchOverlay({ isOpen, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  /* AUTO FOCUS */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  /* ESC TO CLOSE */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  /* SEARCH */
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
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchResults, 300);
    return () => clearTimeout(delay);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md">
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-red-400"
      >
        <FaTimes size={24} />
      </button>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto pt-28 px-6">
        {/* SEARCH INPUT */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="
              w-full bg-transparent border-b border-gray-500
              pl-12 pr-4 py-4 text-xl text-white
              focus:outline-none focus:border-[#2B7EC2]
            "
          />
        </div>

        {/* RESULTS */}
        <div className="mt-10 space-y-4 max-h-[60vh] overflow-y-auto">
          {loading && (
            <p className="text-gray-400 text-sm">Searching…</p>
          )}

          {!loading && query.length > 1 && results.length === 0 && (
            <p className="text-gray-400 text-sm">No products found</p>
          )}

          {results.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                router.push(item.url);
                setQuery('');
                onClose();
              }}
              className="
                flex items-center gap-5 w-full text-left
                p-4 rounded-xl hover:bg-white/10 transition
              "
            >
              <div className="relative w-24 h-24 bg-white rounded-xl overflow-hidden">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                )}
              </div>

              <div>
                <h3 className="text-white font-medium">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 capitalize">
                  {item.category.replace('-', ' ')} / {item.subcategory}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
