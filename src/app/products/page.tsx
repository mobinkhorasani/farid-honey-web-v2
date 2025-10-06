'use client';

import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation"; // ✨ اضافه شد
import { getProductsList } from "@/api/products/productsServices";
import { containerStagger, fadeInUp } from "@/components/motion/variants";
import type { ProductsResponse, ProductCardData } from "@/types/d.type";
import { ProductsToolbar } from "./components/toolbar";
import { ProductsGrid } from "./components";
import { filterProducts } from "./utils/filterAndSort";

const ProductsPage = () => {
  const searchParams = useSearchParams(); // ✨ اضافه شد
  
  // ✨ خواندن category از URL
  const categoryFromUrl = searchParams.get('category') || 'همه محصولات';
  
  const [category, setCategory] = useState<string>(categoryFromUrl);
  const [priceRange, setPriceRange] = useState<string>("فیلتر بر اساس قیمت");
  
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  // ✨ وقتی URL تغییر کرد، category رو به‌روز کن
  useEffect(() => {
    setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const { data, isLoading, isError, refetch, isFetching } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: getProductsList,
  });

  const filtered = useMemo(() => {
    const products: ProductCardData[] = (data?.products as ProductCardData[]) ?? [];
    return filterProducts(products, category, priceRange);
  }, [data?.products, category, priceRange]);

  const filteredByQuery = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) return filtered;
    const norm = q.replace(/\s+/g, " ").toLowerCase();
    return filtered.filter((p) => p.name.toLowerCase().includes(norm));
  }, [filtered, debouncedQuery]);

  const productsToShow = filteredByQuery;

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
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">محصولات ما</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#E9B159] to-[#D4A574] mx-auto rounded-full" />
        </motion.div>

        <ProductsToolbar
          query={query}
          onQueryChange={setQuery}
          onQueryDebouncedChange={setDebouncedQuery}
          onCategoryChange={handleCategoryChange}
          onPriceRangeChange={handlePriceRangeChange}
          initialCategory={category} // ✨ تغییر یافت - از state می‌خونه
          initialPriceRange="فیلتر بر اساس قیمت"
        />

        <ProductsGrid products={productsToShow} isLoading={isLoading || isFetching} />
      </motion.div>
    </div>
  );
};

export default ProductsPage;