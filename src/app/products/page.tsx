"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { getProductsList } from "@/api/products/productsServices";
import { containerStagger, fadeInUp } from "@/components/motion/variants";
import type { ProductsResponse, ProductCardData } from "@/types/d.type";

// این‌ها باید از app/products/components/index.ts اکسپورت شده باشند
import {
  transformApiToCard,
  filterProducts,
  sortProducts,
  ProductsGrid,
  ProductsToolbar,
} from "./components";

const PAGE_SIZE = 8;

const ProductsPage = () => {
  // وضعیت ابزارک‌ها
  const [sortBy, setSortBy] = useState<string>("جدیدترین");
  const [category, setCategory] = useState<string>("محبوب‌ترین");
  const [priceRange, setPriceRange] = useState<string>("دسته‌بندی");

  // سرچ (کنترل‌شده + debounce)
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  // pagination
  const [visible, setVisible] = useState<number>(PAGE_SIZE);

  // گرفتن داده
  const { data, isLoading, isError, refetch, isFetching } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: getProductsList,
  });

  // آداپت داده‌ی API به فرمت کارت
  const cards: ProductCardData[] = useMemo(
    () => (data?.products ?? []).map(transformApiToCard),
    [data?.products]
  );

  // فیلتر براساس دسته و بازه قیمت
  const filtered = useMemo(
    () => filterProducts(cards, category, priceRange),
    [cards, category, priceRange]
  );

  // جستجو (روی عنوان)
  const filteredByQuery = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) return filtered;
    const norm = q.replace(/\s+/g, " ").toLowerCase();
    return filtered.filter((p) => p.title.toLowerCase().includes(norm));
  }, [filtered, debouncedQuery]);

  // مرتب‌سازی
  const sorted = useMemo(
    () => sortProducts(filteredByQuery, sortBy),
    [filteredByQuery, sortBy]
  );

  // صفحه‌بندی (load more)
  const pageItems = useMemo(() => sorted.slice(0, visible), [sorted, visible]);
  const canLoadMore = visible < sorted.length;

  // هر تغییری در فیلتر/سورت/جستجو رخ داد، صفحه‌بندی ریست شود
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [sortBy, category, priceRange, debouncedQuery]);

  // هندلرها
  const handleSortChange = (v: string) => setSortBy(v);
  const handleCategoryChange = (v: string) => setCategory(v);
  const handlePriceRangeChange = (v: string) => setPriceRange(v);

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-3">خطا در بارگذاری محصولات</div>
            <button
              onClick={() => refetch()}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <motion.div
        variants={containerStagger}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">محصولات ما</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#E9B159] to-[#D4A574] mx-auto rounded-full" />
        </motion.div>

        {/* Toolbar (با سرچ قابل استفاده مجدد) */}
        <ProductsToolbar
          query={query}
          onQueryChange={setQuery}
          onQueryDebouncedChange={setDebouncedQuery}
          onSortChange={handleSortChange}
          onCategoryChange={handleCategoryChange}
          onPriceRangeChange={handlePriceRangeChange}
          initialSort="جدیدترین"
          initialCategory="محبوب‌ترین"
          initialPriceRange="دسته‌بندی"
        />

        {/* Grid */}
        <ProductsGrid products={pageItems} isLoading={isLoading || isFetching} />

        {/* Load more */}
        {!isLoading && !isFetching && canLoadMore && (
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="inline-flex items-center px-8 py-3 bg-white border-2 border-amber-500 text-amber-600 font-semibold rounded-full hover:bg-amber-500 hover:text-white transition-colors"
            >
              بارگذاری بیشتر
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductsPage;
