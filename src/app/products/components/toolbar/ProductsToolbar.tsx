'use client';

import { useEffect, useState } from 'react';
import { TagIcon } from '@heroicons/react/24/outline';
import { SearchField } from './SearchField';
import { SmartDropdown } from './SmartDropdown';

interface ProductsToolbarProps {
  query?: string;
  onQueryChange?: (v: string) => void;
  onQueryDebouncedChange?: (v: string) => void;
  onPriceRangeChange?: (range: string) => void;
  initialPriceRange?: string;
}

const priceRanges = [ "فیلتر بر اساس قیمت", 'زیر ۲۰۰ هزار', '۲۰۰-۴۰۰ هزار', 'بالای ۴۰۰ هزار'];

export const ProductsToolbar = ({
  query,
  onQueryChange,
  onQueryDebouncedChange,
  onPriceRangeChange,
  initialPriceRange =  "فیلتر بر اساس قیمت",
}: ProductsToolbarProps) => {
  const [activePriceRange, setActivePriceRange] = useState(initialPriceRange);

  useEffect(() => {
    setActivePriceRange(initialPriceRange);
  }, [initialPriceRange]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 p-4 bg-white  rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <SearchField
          value={query}
          onChange={onQueryChange}
          onDebouncedChange={onQueryDebouncedChange}
          placeholder="جستجو در محصولات..."
          size="md"
          className="w-full md:w-[400px]"
        />

        <SmartDropdown
          className="w-full sm:w-auto"
          label="فیلتر قیمت"
          items={priceRanges}
          selected={activePriceRange}
          onSelect={(v) => {
            setActivePriceRange(v);
            onPriceRangeChange?.(v);
          }}
          Icon={TagIcon}
          activeWhen={(s) => s !== 'دسته‌بندی'}
          compact
        />
      </div>
    </div>
  );
};
