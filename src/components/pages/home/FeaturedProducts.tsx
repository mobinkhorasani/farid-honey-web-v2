'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, containerVariants, scaleIn } from '@/components/motion/variants';

type Product = {
  id: string | number;
  title: string;
  subtitle?: string;
  price: number;              // قیمت به تومان
  images: string[];           // یک یا چند تصویر. اگر 4 تصویر بدهی، به صورت کلاژ 2×2 نمایش می‌دهیم
  tag?: string;               // مثل: "جدید" یا "پرفروش"
};

interface FeaturedProductsProps {
  products?: Product[];
  title?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

const formatPrice = (price: number) =>
  `${price.toLocaleString('fa-IR')} تومان`;

export default function FeaturedProducts({
  title = 'محصولات ویژه',
  ctaHref = '/products',
  ctaLabel = 'مشاهده همه',
  products = SAMPLE_PRODUCTS,
}: FeaturedProductsProps) {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10 flex items-center justify-between">
          <motion.h2
            className="text-2xl sm:text-3xl font-extrabold text-gray-900"
            initial="hidden" animate="show" variants={fadeInUp}
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

        {/* Grid: موبایل 2 ستون، تبلت 3 ستون، دسکتاپ 4 ستون */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden" animate="show" variants={containerVariants}
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Product Card ---------------- */
function ProductCard({ product }: { product: Product }) {
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
                  alt={product.title}
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

      {/* متن و قیمت */}
      <div className="p-3.5 sm:p-5">
        <h3 className="text-sm sm:text-lg font-bold text-gray-800 line-clamp-1">
          {product.title}
        </h3>
        {product.subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-1">{product.subtitle}</p>
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
}

/* ---------------- Sample data (می‌توانی حذف/جایگزین کنی) ---------------- */
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'گِرده گل طبیعی',
    subtitle: 'ارگانیک و تازه',
    price: 390000,
    images: ['/images/products/pollen-jar.png'],
    tag: 'جدید',
  },
  {
    id: '2',
    title: 'عسل طبیعی کوهستان',
    price: 320000,
    images: ['/images/products/honey.png'],
  },
  {
    id: '3',
    title: 'ژل رویال خالص',
    price: 650000,
    images: ['/images/products/royal-jar.png'],
    tag: 'ویژه',
  },
  {
    id: '4',
    title: 'عسل بر موم',
    price: 450000,
    images: ['/images/products/flower-jar.png'],
  },
];
