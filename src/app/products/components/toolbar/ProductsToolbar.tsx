'use client';

import { useEffect, useState } from 'react';
import { TagIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { SearchField } from './SearchField';
import { SmartDropdown } from './SmartDropdown';
import { CategoryTabs } from './CategoryTabs';

interface ProductsToolbarProps {
  query?: string;
  onQueryChange?: (v: string) => void;
  onQueryDebouncedChange?: (v: string) => void;
  onPriceRangeChange?: (range: string) => void;
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
  initialPriceRange?: string;
  initialCategory?: string;
  initialSort?: string;
}

const priceRanges = [
  'فیلتر بر اساس قیمت',
  'زیر ۲۰۰ هزار',
  '۲۰۰-۴۰۰ هزار',
  'بالای ۴۰۰ هزار',
];

const sortOptions = ['مرتب‌سازی', 'ارزان‌ترین', 'گران‌ترین'];

export const ProductsToolbar = ({
  query,
  onQueryChange,
  onQueryDebouncedChange,
  onPriceRangeChange,
  onCategoryChange,
  onSortChange,
  initialPriceRange = 'فیلتر بر اساس قیمت',
  initialCategory = 'همه محصولات',
  initialSort = 'مرتب‌سازی',
}: ProductsToolbarProps) => {
  const [activePriceRange, setActivePriceRange] = useState(initialPriceRange);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSort, setActiveSort] = useState(initialSort);

  useEffect(() => {
    setActivePriceRange(initialPriceRange);
  }, [initialPriceRange]);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setActiveSort(initialSort);
  }, [initialSort]);
  

  return (
    <div className="flex flex-col gap-4 mb-8">
      <CategoryTabs
        selected={activeCategory}
        onSelect={(v) => {
          setActiveCategory(v);
          onCategoryChange?.(v);
        }}
      />

      {/* 🆕 چینش جدید: هر سه فیلد کنار هم در دسکتاپ */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchField
          value={query}
          onChange={onQueryChange}
          onDebouncedChange={onQueryDebouncedChange}
          placeholder="جستجو در محصولات..."
          size="md"
          className="w-full sm:w-[400px]"
        />

        <SmartDropdown
          className="w-full sm:w-[160px]"
          label="مرتب‌سازی"
          items={sortOptions}
          selected={activeSort}
          onSelect={(v) => {
            setActiveSort(v);
            onSortChange?.(v);
          }}
          Icon={ArrowsUpDownIcon}
          activeWhen={(s) => s !== 'مرتب‌سازی'}
          compact
        />

        <SmartDropdown
          className="w-full sm:w-[200px]"
          label="فیلتر قیمت"
          items={priceRanges}
          selected={activePriceRange}
          onSelect={(v) => {
            setActivePriceRange(v);
            onPriceRangeChange?.(v);
          }}
          Icon={TagIcon}
          activeWhen={(s) => s !== 'فیلتر بر اساس قیمت'}
          compact
        />
      </div>
    </div>
  );
};
