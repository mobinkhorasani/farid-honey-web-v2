'use client';

import { useEffect, useState } from 'react';
import { TagIcon } from '@heroicons/react/24/outline';
import { SearchField } from './SearchField';
import { SmartDropdown } from './SmartDropdown';
import { CategoryTabs } from './CategoryTabs';

interface ProductsToolbarProps {
  query?: string;
  onQueryChange?: (v: string) => void;
  onQueryDebouncedChange?: (v: string) => void;
  onPriceRangeChange?: (range: string) => void;
  onCategoryChange?: (category: string) => void;
  initialPriceRange?: string;
  initialCategory?: string;
}

const priceRanges = ["فیلتر بر اساس قیمت", 'زیر ۲۰۰ هزار', '۲۰۰-۴۰۰ هزار', 'بالای ۴۰۰ هزار'];

export const ProductsToolbar = ({
  query,
  onQueryChange,
  onQueryDebouncedChange,
  onPriceRangeChange,
  onCategoryChange,
  initialPriceRange = "فیلتر بر اساس قیمت",
  initialCategory = "همه محصولات",
}: ProductsToolbarProps) => {
  const [activePriceRange, setActivePriceRange] = useState(initialPriceRange);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    setActivePriceRange(initialPriceRange);
  }, [initialPriceRange]);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  return (
    <div className="flex flex-col gap-4 mb-8">
      <CategoryTabs
        selected={activeCategory}
        onSelect={(v) => {
          setActiveCategory(v);
          onCategoryChange?.(v);
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3">
        <SearchField
          value={query}
          onChange={onQueryChange}
          onDebouncedChange={onQueryDebouncedChange}
          placeholder="جستجو در محصولات..."
          size="md"
          className="w-full"
        />

        <SmartDropdown
          className="w-full sm:w-auto sm:min-w-[200px]"
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