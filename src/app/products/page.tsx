'use client';

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getProductsList } from "@/api/products/productsServices";
import { containerStagger, fadeInUp } from "@/components/motion/variants";
import type { ProductsResponse, ProductCardData } from "@/types/d.type";
import { ProductsToolbar } from "./components/toolbar";
import { ProductsGrid } from "./components";
import { filterProducts, sortProducts } from "./utils/filterAndSort";

const ProductsPage = () => {
  // Stateهای مربوط به sort و category فعلا کامنت شدند
  // const [sortBy, setSortBy] = useState<string>("جدیدترین");
  // const [category, setCategory] = useState<string>("محبوب‌ترین");
  const [priceRange, setPriceRange] = useState<string>("دسته‌بندی");

  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const { data, isLoading, isError, refetch, isFetching } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: getProductsList,
  });

  const filtered = useMemo(() => {
    const products: ProductCardData[] = (data?.products as ProductCardData[]) ?? [];
    // category فعلا استفاده نمی‌شود، فقط priceRange اعمال می‌شود
    return filterProducts(products, "همه", priceRange);
  }, [data?.products, priceRange]);

  const filteredByQuery = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) return filtered;
    const norm = q.replace(/\s+/g, " ").toLowerCase();
    return filtered.filter((p) => p.name.toLowerCase().includes(norm));
  }, [filtered, debouncedQuery]);

  // sortBy فعلا کامنت شد، مرتب‌سازی پیش‌فرض
  // const sorted = useMemo(
  //   () => sortProducts(filteredByQuery, sortBy),
  //   [filteredByQuery, sortBy]
  // );

  const productsToShow = filteredByQuery; // بدون مرتب‌سازی فعلا

  // Handlers مربوط به sort و category فعلا کامنت شدند
  // const handleSortChange = (v: string) => setSortBy(v);
  // const handleCategoryChange = (v: string) => setCategory(v);
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
          // onSortChange={handleSortChange}       // فعلا غیر فعال
          // onCategoryChange={handleCategoryChange} // فعلا غیر فعال
          onPriceRangeChange={handlePriceRangeChange}
          // initialSort="جدیدترین"               // فعلا غیر فعال
          // initialCategory="محبوب‌ترین"         // فعلا غیر فعال
          initialPriceRange="فیلتر بر اساس قیمت"
        />

        <ProductsGrid products={productsToShow} isLoading={isLoading || isFetching} />
      </motion.div>
    </div>
  );
};

export default ProductsPage;
