'use client';

import { motion } from 'framer-motion';
import { containerStagger } from '@/components/motion/variants';
import type { ProductCardData } from '@/types/d.type';
import { ProductSkeleton } from './product-skeleton';
import { ProductCard } from './product-card';

interface ProductsGridProps {
  products: ProductCardData[];
  isLoading?: boolean;
}

export const ProductsGrid = ({ products, isLoading }: ProductsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">هیچ محصولی یافت نشد</div>
        <p className="text-gray-400">لطفاً فیلترهای خود را تغییر دهید</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerStagger}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </motion.div>
  );
};