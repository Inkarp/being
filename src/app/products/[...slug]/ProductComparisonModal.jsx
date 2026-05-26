'use client';

import { useEffect, useMemo, useState } from 'react';
import { FaBalanceScale, FaTimes } from 'react-icons/fa';
function titleFromSlug(slug = '') {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getModelId(categorySlug, subSlug, model) {
  return `${categorySlug}/${subSlug}/${model?.meta?.slug || ''}`;
}

function formatSpecValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (value === null || value === undefined || value === '') return '-';
  return String(value);
}

function normalizeSpecValue(value) {
  return formatSpecValue(value).trim().replace(/\s+/g, ' ').toLowerCase();
}

function SelectorColumn({
  label,
  badge,
  tone = 'primary',
  categories,
  selectedCategory,
  selectedSubcategory,
  selectedModelId,
  onCategoryChange,
  onSubcategoryChange,
  onModelChange,
}) {
  const category = categories.find((item) => item.slug === selectedCategory);
  const subcategories = category?.subcategories || [];
  const subcategory = subcategories.find((item) => item.slug === selectedSubcategory);
  const models = subcategory?.models || [];
  const isCompareSide = tone === 'compare';

  return (
    <div className={`rounded-xl border p-4 ${isCompareSide ? 'border-[#2B7EC2]/30 bg-[#F3F8FC]' : 'border-gray-200 bg-white'}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${isCompareSide ? 'border-[#2B7EC2] bg-white text-[#2B7EC2]' : 'border-[#2F4191] bg-[#2F4191]/10 text-[#2F4191]'}`}>
          {badge}
        </span>
        <div>
          <span className="block text-xs font-bold uppercase tracking-[0.12em] text-gray-600">
            {label}
          </span>
          {isCompareSide && (
            <span className="mt-1 block text-[11px] font-medium text-[#2B7EC2]">
              Comparison product
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          disabled={categories.length <= 1}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-[#2F4191] focus:bg-white disabled:cursor-not-allowed disabled:text-gray-700"
        >
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name || titleFromSlug(item.slug)}
            </option>
          ))}
        </select>

        <select
          value={selectedSubcategory}
          onChange={(event) => onSubcategoryChange(event.target.value)}
          disabled={!selectedCategory}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-[#2F4191] focus:bg-white disabled:cursor-not-allowed disabled:text-gray-400"
        >
          <option value="">Select product</option>
          {subcategories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name || titleFromSlug(item.slug)}
            </option>
          ))}
        </select>

        <select
          value={selectedModelId}
          onChange={(event) => onModelChange(event.target.value)}
          disabled={!selectedSubcategory}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-[#2F4191] focus:bg-white disabled:cursor-not-allowed disabled:text-gray-400"
        >
          <option value="">Select model</option>
          {models.map((model) => {
            const id = getModelId(selectedCategory, selectedSubcategory, model);
            return (
              <option key={id} value={id}>
                {model.title || model.model || model.meta?.title || model.meta?.slug}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default function ProductComparisonModal({
  isOpen,
  onClose,
  currentCategorySlug,
  currentSubSlug,
  currentModelSlug,
}) {
  const currentModelId = `${currentCategorySlug}/${currentSubSlug}/${currentModelSlug}`;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [leftCategory, setLeftCategory] = useState(currentCategorySlug || '');
  const [leftSubcategory, setLeftSubcategory] = useState(currentSubSlug || '');
  const [leftModelId, setLeftModelId] = useState(currentModelId || '');

  const [rightCategory, setRightCategory] = useState('');
  const [rightSubcategory, setRightSubcategory] = useState('');
  const [rightModelId, setRightModelId] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    setLeftCategory(currentCategorySlug || '');
    setLeftSubcategory(currentSubSlug || '');
    setLeftModelId(currentModelId || '');
    setRightCategory(currentCategorySlug || '');
  }, [isOpen, currentCategorySlug, currentSubSlug, currentModelId]);

  useEffect(() => {
    if (!isOpen || categories[0]?.slug === currentCategorySlug) return;

    const loadCategories = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(`/api/products/${currentCategorySlug}`);
        if (!res.ok) throw new Error(`Unable to load ${currentCategorySlug}`);

        const data = await res.json();
        setCategories([
          {
            ...data,
            slug: currentCategorySlug,
            name: data.name || data.title || titleFromSlug(currentCategorySlug),
          },
        ]);
      } catch (err) {
        console.error('[ProductComparison] Failed to load products', err);
        setError('Unable to load products for comparison.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [isOpen, categories, currentCategorySlug]);

  const modelMap = useMemo(() => {
    const map = new Map();

    categories.forEach((category) => {
      category.subcategories?.forEach((subcategory) => {
        subcategory.models?.forEach((model) => {
          map.set(getModelId(category.slug, subcategory.slug, model), {
            ...model,
            categorySlug: category.slug,
            categoryName: category.name || titleFromSlug(category.slug),
            subcategorySlug: subcategory.slug,
            subcategoryName: subcategory.name || titleFromSlug(subcategory.slug),
          });
        });
      });
    });

    return map;
  }, [categories]);

  const leftModel = modelMap.get(leftModelId);
  const rightModel = modelMap.get(rightModelId);

  const specRows = useMemo(() => {
    const labels = new Map();

    leftModel?.specifications?.items?.forEach((spec) => {
      if (spec?.label) labels.set(spec.label, spec.label);
    });

    rightModel?.specifications?.items?.forEach((spec) => {
      if (spec?.label) labels.set(spec.label, spec.label);
    });

    return Array.from(labels.values()).map((label) => {
      const leftSpec = leftModel?.specifications?.items?.find((spec) => spec.label === label);
      const rightSpec = rightModel?.specifications?.items?.find((spec) => spec.label === label);

      return {
        label,
        left: formatSpecValue(leftSpec?.value),
        right: formatSpecValue(rightSpec?.value),
        isDifferent: normalizeSpecValue(leftSpec?.value) !== normalizeSpecValue(rightSpec?.value),
      };
    });
  }, [leftModel, rightModel]);

  const differenceCount = useMemo(
    () => specRows.filter((row) => row.isDifferent).length,
    [specRows]
  );

  const handleLeftCategoryChange = (value) => {
    setLeftCategory(value);
    setLeftSubcategory('');
    setLeftModelId('');
  };

  const handleLeftSubcategoryChange = (value) => {
    setLeftSubcategory(value);
    setLeftModelId('');
  };

  const handleRightCategoryChange = (value) => {
    setRightCategory(value);
    setRightSubcategory('');
    setRightModelId('');
  };

  const handleRightSubcategoryChange = (value) => {
    setRightSubcategory(value);
    setRightModelId('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <FaBalanceScale className="text-[#2F4191]" />
              <h2 className="text-xl font-semibold text-gray-950">Product Comparison</h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Select two models to compare technical specifications side by side.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            aria-label="Close comparison"
          >
            <FaTimes size={14} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {loading && (
            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-[#2F4191]">
              Loading product models...
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
            <SelectorColumn
              label="First product"
              badge="A"
              categories={categories}
              selectedCategory={leftCategory}
              selectedSubcategory={leftSubcategory}
              selectedModelId={leftModelId}
              onCategoryChange={handleLeftCategoryChange}
              onSubcategoryChange={handleLeftSubcategoryChange}
              onModelChange={setLeftModelId}
            />

            <div className="hidden h-10 w-10 items-center justify-center self-center rounded-full border border-gray-200 bg-gray-50 text-xs font-bold text-gray-500 lg:flex">
              VS
            </div>

            <SelectorColumn
              label="Second product"
              badge="B"
              tone="compare"
              categories={categories}
              selectedCategory={rightCategory}
              selectedSubcategory={rightSubcategory}
              selectedModelId={rightModelId}
              onCategoryChange={handleRightCategoryChange}
              onSubcategoryChange={handleRightSubcategoryChange}
              onModelChange={setRightModelId}
            />
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200">
            {leftModel && rightModel && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Specification differences</p>
                  <p className="text-xs text-gray-500">Highlighted rows show where Product B differs from Product A.</p>
                </div>
                <span className="rounded-full border border-[#2B7EC2]/30 bg-[#F3F8FC] px-3 py-1 text-xs font-bold text-[#2B7EC2]">
                  {differenceCount} different
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 bg-gray-100 text-sm font-semibold text-gray-900 md:grid-cols-[1fr_1.2fr_1.2fr]">
              <div className="border-b border-gray-200 px-4 py-3 md:border-b-0 md:border-r">
                Specification
              </div>
              <div className="border-b border-gray-200 px-4 py-3 md:border-b-0 md:border-r">
                {leftModel?.title || 'Select first model'}
              </div>
              <div className="bg-[#2B7EC2] px-4 py-3 text-white">
                {rightModel?.title || 'Select second model'}
              </div>
            </div>

            {!leftModel || !rightModel ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                Choose both models to view the comparison.
              </div>
            ) : specRows.length ? (
              <div className="divide-y divide-gray-100">
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-1 text-sm md:grid-cols-[1fr_1.2fr_1.2fr] ${row.isDifferent ? 'bg-[#FFF8E8]' : 'bg-white'}`}
                  >
                    <div className="flex items-start justify-between gap-3 bg-gray-50 px-4 py-3 font-semibold text-gray-800 md:border-r">
                      <span>{row.label}</span>
                      {row.isDifferent && (
                        <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                          Diff
                        </span>
                      )}
                    </div>
                    <div className="px-4 py-3 text-gray-700 md:border-r">{row.left}</div>
                    <div className={`border-l-4 px-4 py-3 text-gray-800 ${row.isDifferent ? 'border-[#2B7EC2] bg-[#F3F8FC] font-semibold' : 'border-transparent bg-[#F8FBFD]'}`}>
                      {row.right}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No technical specifications are available for these models.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
