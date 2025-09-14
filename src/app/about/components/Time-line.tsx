'use client';

import { motion } from 'framer-motion';
import { TimelineProps } from './types';
import { fadeInUp, stagger, scaleIn } from '@/components/motion/variants';

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
  // کارت با کانکتور 0.5rem (gap-2) به سمت ستون وسط
  const base =
    "relative w-full min-h-[120px] rounded-xl border border-gray-100 bg-white/90 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-200 text-right before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:h-[2px] before:w-2 before:bg-black/10";
  const dir =
    side === 'right'
      ? 'mr-2 before:left-full' // کارت سمت راست: 0.5rem فاصله از ستون + خط اتصال 0.5rem
      : 'ml-2 before:right-full'; // کارت سمت چپ: مشابه

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`${base} ${dir}`}
    >
      <div className="text-[#E9B159] font-bold text-lg mb-1">{year}</div>
      <p className="text-gray-700 leading-7">{title}</p>
    </motion.div>
  );
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="relative inline-block text-2xl md:text-3xl font-bold text-gray-900">
            تاریخچه فعالیت ما
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 block w-12 h-0.5 bg-[#E9B159]" />
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Desktop: ستون وسط + راست/چپ */}
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative hidden md:block"
          >
            {/* خط عمودی وسط */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-[#E9B15933] via-gray-200 to-[#E9B15933]" />

            {items.map((it, idx) => {
              const side: Side = idx % 2 === 0 ? 'right' : 'left'; // آیتم اول سمت راست
              return (
                <li key={idx} className="relative flex min-h-[140px] py-4">
                  {/* نیمه‌ی چپ */}
                  <div className="relative w-1/2 flex items-center justify-end">
                    {side === 'left' && (
                      <Card side="left" year={it.year} title={it.title} />
                    )}
                  </div>

                  {/* نقطه‌ی وسط */}
                  <motion.span
                    variants={scaleIn}
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 grid place-items-center w-4 h-4 rounded-full bg-[#E9B159] shadow ring-2 ring-white"
                  >
                    <span className="block w-2 h-2 bg-white rounded-full" />
                  </motion.span>

                  {/* نیمه‌ی راست */}
                  <div className="relative w-1/2 flex items-center justify-start">
                    {side === 'right' && (
                      <Card side="right" year={it.year} title={it.title} />
                    )}
                  </div>
                </li>
              );
            })}
          </motion.ul>

          {/* Mobile: تک‌ستونه */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="md:hidden space-y-4"
          >
            {items.map((it, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-200">
                  <div className="flex items-center mb-2">
                    <span className="mr-3 block w-3 h-3 rounded-full bg-[#E9B159]" />
                    <div className="text-[#E9B159] font-bold text-lg">{it.year}</div>
                  </div>
                  <p className="text-gray-700 leading-7 pr-6">{it.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
