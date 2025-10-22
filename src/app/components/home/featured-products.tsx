'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, containerVariants, scaleIn } from '@/components/motion/variants';
import { ProductCardData } from '@/types/d.type';
import { ProductCard } from '@/app/products/components';



type FeaturedProductsProps = {
  products?: ProductCardData[];
  title?: string;
  ctaHref?: string;
  ctaLabel?: string;
};


const SAMPLE_PRODUCTS: ProductCardData[] = [
  {
    id: '1',
    name: 'گِرده گل طبیعی',
    price: 390000,
    image_url: '/images/products/pollen-jar.png',
    tag: 'جدید',
  },
  {
    id: '2',
    name: 'عسل طبیعی کوهستان',
    price: 320000,
    image_url: '/images/products/honey.png',
  },
  {
    id: '3',
    name: 'ژل رویال خالص',
    price: 650000,
    image_url: '/images/products/royal-jar.png',
    tag: 'ویژه',
  },
  {
    id: '4',
    name: 'عسل بر موم',
    price: 450000,
    image_url: '/images/products/flower-jar.png',
  },
];


export const FeaturedProducts = ({
  title = 'محصولات ویژه',
  ctaHref = '/products',
  ctaLabel = 'مشاهده همه',
  products = SAMPLE_PRODUCTS,
}: FeaturedProductsProps) => {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8 sm:mb-10 flex items-center justify-between">
          <motion.h2
            className="text-2xl sm:text-3xl font-extrabold text-gray-900"
            initial="hidden"
            animate="show"
            variants={fadeInUp}
          >
            {title}
          </motion.h2>

          <motion.div initial="hidden" animate="show" variants={scaleIn}>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/70 px-4 py-2 text-amber-600 hover:bg-amber-50 transition"
            >
              {ctaLabel}
              <span className="text-lg -mb-0.5">←</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>ّّ
      </div>
    </section>
  );
}
