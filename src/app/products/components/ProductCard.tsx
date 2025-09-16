'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/motion/variants';
import { ProductCardData } from '@/types/d.type';


interface ProductCardProps {
  product: ProductCardData;
}

const formatPrice = (price: number) => `${price.toLocaleString('fa-IR')} تومان`;

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <motion.article
        variants={fadeInUp}
        className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
      >

        <div className="relative bg-[#F9F7F2]">
          <div className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden">
            <Image
              src={product?.image_url || "/images/honey-placeholder.jpg"}
              alt={product?.name || "محصول بدون نام"}
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              loading="lazy"
            />

          </div>



          {product.tag && (
            <div className="absolute top-3 right-3">
              <span className="rounded-full bg-amber-500/90 text-white text-xs font-bold px-3 py-1 shadow">
                {product.tag}
              </span>
            </div>
          )}
        </div>

        <div className="p-3.5 sm:p-5">
          <h3 className="text-sm sm:text-lg font-bold text-gray-800 line-clamp-1">
            {product?.name}
          </h3>


          <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center justify-between">
            <div className="text-sm sm:text-base font-semibold text-gray-700">
              {formatPrice(product.price)}
            </div>

            <button
              // href={`/products/${product.id}`}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#E9B159] to-[#D4A574] text-white text-[11px] sm:text-sm font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 hover:opacity-95 transition"
            >
              افزودن به سبد
            </button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};
