'use client';

import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { getProductsList } from "@/api/products/productsServices";
import { containerStagger, fadeInUp } from "@/components/motion/variants";
import type { ProductsResponse, ProductCardData } from "@/types/d.type";
import { ProductsToolbar } from "./components/toolbar";
import { ProductsGrid } from "./components";
// 🔴 مشکل اینجاست - باید sortProducts رو هم import کنی
import { filterProducts, sortProducts } from "./utils/filterAndSort";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  
  const categoryFromUrl = searchParams.get('category') || 'همه محصولات';
  
  const [category, setCategory] = useState<string>(categoryFromUrl);
  const [priceRange, setPriceRange] = useState<string>("فیلتر بر اساس قیمت");
  const [sortBy, setSortBy] = useState<string>("مرتب‌سازی"); // ✅ اضافه کن
  
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const { data, isLoading, isError, refetch, isFetching } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: getProductsList,
  });

  // ✅ تغییر این قسمت - اعمال فیلتر و مرتب‌سازی
  const processedProducts = useMemo(() => {
    const products: ProductCardData[] = (data?.products as ProductCardData[]) ?? [];
    
    // 1. ابتدا فیلتر میکنیم
    const filtered = filterProducts(products, category, priceRange);
    
    // 2. سپس مرتب‌سازی میکنیم
    const sorted = sortProducts(filtered, sortBy);
    
    return sorted;
  }, [data?.products, category, priceRange, sortBy]); // ✅ sortBy رو اضافه کن

  // ✅ تغییر filtered به processedProducts
  const filteredByQuery = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) return processedProducts; // تغییر دادم
    const norm = q.replace(/\s+/g, " ").toLowerCase();
    return processedProducts.filter((p) => p.name.toLowerCase().includes(norm));
  }, [processedProducts, debouncedQuery]); // تغییر دادم

  const productsToShow = filteredByQuery;

  const handleCategoryChange = (v: string) => setCategory(v);
  const handlePriceRangeChange = (v: string) => setPriceRange(v);
  const handleSortChange = (v: string) => setSortBy(v); // ✅ اضافه کن

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
          onSortChange={handleSortChange} // ✅ اضافه کن
          initialCategory={category}
          initialPriceRange={priceRange} // تغییر دادم
          initialSort={sortBy} // ✅ اضافه کن
        />
        <ProductsGrid products={productsToShow} isLoading={isLoading || isFetching} />
      </motion.div>
    </div>
  );
};

export default ProductsPage;