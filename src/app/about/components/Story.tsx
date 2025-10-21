'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { fadeInUp, scaleIn, stagger } from '@/components/motion/variants';
import { StoryProps } from '@/constants/about-data';

export const Story = ({ aboutText }: StoryProps) => {
  const paragraphs = aboutText.split('\n\n');

  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (prefersReduced) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px * 2 - 1);
    y.set(py * 2 - 1);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [imgSrc, setImgSrc] = useState('/images/about/brand-jar.JPG');

  return (
    <section className="relative py-8 md:py-16 bg-gradient-to-b from-amber-25 to-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent mb-3 md:mb-4">
            داستان برند ما
          </h2>
          <div className="w-12 sm:w-16 md:w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full mx-auto" />
          <p className="mt-3 md:mt-4 text-amber-700/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            از دل طبیعت بکر تا محصولی استثنایی
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* متن */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-4 md:space-y-6 order-2 lg:order-1"
          >
            {paragraphs.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group"
              >
                <p
                  className={`text-gray-800 leading-6 sm:leading-7 md:leading-8 text-right sm:text-right text-sm sm:text-base md:text-lg font-medium transition-all duration-300 group-hover:bg-amber-50/50 group-hover:shadow-sm group-hover:p-3 md:group-hover:p-4 group-hover:rounded-xl ${
                    i === 0
                      ? 'first-letter:text-2xl sm:first-letter:text-3xl md:first-letter:text-4xl first-letter:font-black first-letter:bg-gradient-to-r first-letter:from-amber-500 first-letter:to-amber-400 first-letter:bg-clip-text first-letter:text-transparent first-letter:float-right first-letter:ml-2 first-letter:mt-1'
                      : ''
                  }`}
                >
                  {p}
                </p>
              </motion.div>
            ))}

            {/* ویژگی های برند */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-2 sm:gap-3 mt-4 md:mt-6"
            >
              {[
                { icon: '🍯', text: 'عسل طبیعی' },
                { icon: '⚡', text: 'تکنولوژی' },
                { icon: '🌿', text: 'محیط زیست' },
                { icon: '🎯', text: 'کیفیت' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-amber-50/50 border border-amber-100/50 backdrop-blur-sm"
                >
                  <span className="text-base sm:text-lg">{item.icon}</span>
                  <span className="text-amber-700 font-medium text-xs sm:text-sm leading-tight">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* تصویر */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative order-1 lg:order-2 mb-4 md:mb-0"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              whileHover={prefersReduced ? undefined : { scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
              className="relative will-change-transform rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl shadow-amber-200/50 border border-amber-100/50"
            >
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100/20 to-amber-50/10">
                <Image
                  src={imgSrc}
                  alt="محصولات عسل فرید"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 40vw"
                  onError={() => setImgSrc('/images/about/brand-jar.jpg')}
                  priority={true}
                />

                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 via-black/15 to-transparent pointer-events-none" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg font-medium text-xs sm:text-sm"
            >
              محصول ممتاز
            </motion.div>
          </motion.div>
        </div>

        {/* آمار پایین */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 md:mt-12"
        >
          {[
            { number: '۴۵+', label: 'سال تجربه' },
            { number: '۱۰۰+', label: 'محصول طبیعی' },
            { number: '۵۰+', label: 'اختراع ثبت شده' },
            { number: '۹۹%', label: 'رضایت مشتری' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-sm border border-amber-100/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-amber-700 font-medium mt-1 text-xs sm:text-sm leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};