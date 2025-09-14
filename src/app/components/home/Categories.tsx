'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { stagger, scaleIn } from '@/components/motion/variants';
import { categories } from '@/constants/home-data';

export const Categories = () => {
  return (
    <section className="py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">دسته‌بندی محصولات</h2>
        </div>

      
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-5xl"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 md:gap-6 justify-items-center">
            {categories.map(({ id, title, href, icon: Icon }) => (
              <motion.div key={id} variants={scaleIn}>
                <Link href={href} aria-label={title} className="group block focus:outline-none">
                  <div className="aspect-square w-28 sm:w-32 md:w-36 rounded-2xl border border-amber-100 bg-amber-50/60 shadow-sm p-4
                                  flex flex-col items-center justify-center text-center
                                  transition-all duration-300 hover:shadow-md hover:border-amber-200
                                  focus-visible:ring-4 focus-visible:ring-[#E9B159]/25">
                    {Icon ? (
                      <Icon className="mb-2 h-7 w-7 text-[#E9B159] transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <span className="mb-2 h-7 w-7 rounded bg-[#E9B159]" />
                    )}
                    <span className="text-sm font-medium text-gray-800">{title}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

