'use client';

import { motion } from 'framer-motion';
import { fadeInUp, stagger, scaleIn } from '@/components/motion/variants';
import { TimelineProps } from '@/constants/about-data';

type Side = 'left' | 'right';

function Card({
  year,
  title,
  side,
}: {
  year: number;
  title: string;
  side: Side;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative w-full min-h-[100px] sm:min-h-[120px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-amber-50/30 border border-amber-100/80 backdrop-blur-sm p-4 sm:p-6 shadow-lg shadow-amber-100/50 hover:shadow-xl hover:shadow-amber-200/50 transition-all duration-300 hover:border-amber-300/60 ${
        side === 'right' 
          ? 'mr-2 sm:mr-4 before:absolute before:left-full before:top-1/2 before:-translate-y-1/2 before:border-4 sm:before:border-8 before:border-l-amber-100 before:border-y-transparent before:border-r-transparent' 
          : 'ml-2 sm:ml-4 before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 sm:before:border-8 before:border-r-amber-100 before:border-y-transparent before:border-l-transparent'
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-300 rounded-t-xl sm:rounded-t-2xl" />
      
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full" />
        <div className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
          {year}
        </div>
      </div>
      
      <p className="text-gray-700 leading-6 sm:leading-7 md:leading-8 text-right sm:text-justify text-sm sm:text-base md:text-lg font-medium pr-1 sm:pr-2">
        {title}
      </p>
    </motion.div>
  );
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-white to-amber-25 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent mb-3 md:mb-4">
            تاریخچه فعالیت ما
          </h2>
          <div className="w-12 sm:w-16 md:w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full mx-auto" />
          <p className="mt-3 md:mt-4 text-amber-700/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            مسیر پربار ۴۵ ساله ما در صنعت زنبورداری
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative hidden md:block"
          >
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-400 shadow-lg" />

            {items.map((it, idx) => {
              const side: Side = idx % 2 === 0 ? 'right' : 'left';
              return (
                <li key={idx} className="relative flex min-h-[120px] md:min-h-[140px] py-4">
                  <div className="relative w-1/2 flex items-center justify-end pr-4 md:pr-8">
                    {side === 'left' && (
                      <Card side="left" year={it.year} title={it.title} />
                    )}
                  </div>

                  <motion.span
                    variants={scaleIn}
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 grid place-items-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 shadow-lg ring-2 md:ring-4 ring-amber-50 z-10"
                  >
                    <span className="block w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                  </motion.span>

                  <div className="relative w-1/2 flex items-center justify-start pl-4 md:pl-8">
                    {side === 'right' && (
                      <Card side="right" year={it.year} title={it.title} />
                    )}
                  </div>
                </li>
              );
            })}
          </motion.ul>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="md:hidden space-y-3 sm:space-y-4"
          >
            {items.map((it, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="rounded-xl bg-gradient-to-br from-white to-amber-50/30 border border-amber-100/80 p-4 shadow-lg shadow-amber-100/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-200/50 hover:border-amber-300/60">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full" />
                    <div className="text-lg sm:text-xl font-black bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                      {it.year}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-6 sm:leading-7 text-right sm:text-justify text-sm sm:text-base pr-1">
                    {it.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};