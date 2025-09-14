'use client';

import { useEffect, useState } from 'react';
import {
  FunnelIcon,
  TagIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import SmartDropdown from './SmartDropdown';
import SearchField from './SearchField';

interface ProductsToolbarProps {
  query?: string;
  onQueryChange?: (v: string) => void;
  onQueryDebouncedChange?: (v: string) => void;

  onSortChange?: (sort: string) => void;
  onCategoryChange?: (category: string) => void;
  onPriceRangeChange?: (range: string) => void;

  initialSort?: string;
  initialCategory?: string;
  initialPriceRange?: string;
}

const categories = ['همه', 'عسل‌های گل‌دار', 'عسل‌های درختی', 'عسل‌های کوهستانی', 'محصولات زنبور'];
const sortOptions = ['جدیدترین', 'پرفروش‌ترین', 'ارزان‌ترین', 'گران‌ترین', 'محبوب‌ترین'];
const priceRanges = ['دسته‌بندی', 'زیر ۲۰۰ هزار', '۲۰۰-۴۰۰ هزار', 'بالای ۴۰۰ هزار'];

export default function ProductsToolbar({
  query,
  onQueryChange,
  onQueryDebouncedChange,
  onSortChange,
  onCategoryChange,
  onPriceRangeChange,
  initialSort = 'جدیدترین',
  initialCategory = 'محبوب‌ترین',
  initialPriceRange = 'دسته‌بندی',
}: ProductsToolbarProps) {
  const [activeSort, setActiveSort] = useState(initialSort);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activePriceRange, setActivePriceRange] = useState(initialPriceRange);

  useEffect(() => { setActiveSort(initialSort); }, [initialSort]);
  useEffect(() => { setActiveCategory(initialCategory); }, [initialCategory]);
  useEffect(() => { setActivePriceRange(initialPriceRange); }, [initialPriceRange]);

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Search */}
      <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <SearchField
          value={query}
          onChange={onQueryChange}
          onDebouncedChange={onQueryDebouncedChange}
          placeholder="جستجو در محصولات..."
          size="md"
        />
      </div>

      {/* Filters */}
      <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm relative overflow-visible">
        {/* موبایل: grid سه‌ستونه — از sm به بعد: فلکس یک ردیف */}
        <div className="grid grid-cols-3 gap-1.5 w-full sm:flex sm:flex-nowrap sm:items-center sm:gap-3">
          <SmartDropdown
            className="w-full sm:w-auto"
            label="دسته‌بندی"
            items={priceRanges}
            selected={activePriceRange}
            onSelect={(v) => { setActivePriceRange(v); onPriceRangeChange?.(v); }}
            Icon={TagIcon}
            activeWhen={(s) => s !== 'دسته‌بندی'}
            compact
          />
          <SmartDropdown
            className="w-full sm:w-auto"
            label="محبوب‌ترین"
            items={categories}
            selected={activeCategory}
            onSelect={(v) => { setActiveCategory(v); onCategoryChange?.(v); }}
            Icon={Squares2X2Icon}
            activeWhen={(s) => s !== 'محبوب‌ترین'}
            compact
          />
          <SmartDropdown
            className="w-full sm:w-auto"
            label="جدیدترین"
            items={sortOptions}
            selected={activeSort}
            onSelect={(v) => { setActiveSort(v); onSortChange?.(v); }}
            Icon={FunnelIcon}
            activeWhen={(s) => s !== 'جدیدترین'}
            compact
          />
        </div>
      </div>
    </div>
  );
}