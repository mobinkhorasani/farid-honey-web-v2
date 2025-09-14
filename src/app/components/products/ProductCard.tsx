'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/motion/variants';

export type Product = {
  id: string | number;
  title: string;
  subtitle?: string;
  price: number;
  images: string[];
  tag?: string;
};

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => `${price.toLocaleString('fa-IR')} تومان`;

const ProductCard = ({ product }: ProductCardProps) => {
  const isCollage = product.images.length === 4;

  return (
    <motion.article
      variants={fadeInUp}
      className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* تصاویر */}
      <div className="relative bg-[#F9F7F2]">
        {isCollage ? (
          <div className="grid grid-cols-2 gap-2 p-3">
            {product.images.slice(0, 4).map((src, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-white">
                <Image
                  src={src}
                  alt={`${product.title} - تصویر ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 12vw, (min-width: 768px) 18vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              priority
            />
          </div>
        )}

        {/* برچسب */}
        {product.tag && (
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-amber-500/90 text-white text-xs font-bold px-3 py-1 shadow">
              {product.tag}
            </span>
          </div>
        )}
      </div>

      {/* متن، قیمت و CTA داخل مرز کارت */}
      <div className="p-3.5 sm:p-5">
        <h3 className="text-sm sm:text-lg font-bold text-gray-800 line-clamp-1">
          {product.title}
        </h3>

        {product.subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-1">
            {product.subtitle}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm sm:text-base font-semibold text-gray-700">
            {formatPrice(product.price)}
          </div>

          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-[#E9B159] to-[#D4A574] text-white text-[11px] sm:text-sm font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 hover:opacity-95 transition"
          >
            افزودن به سبد
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;