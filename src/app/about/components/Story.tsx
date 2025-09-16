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

export const Story = ({ aboutText } : StoryProps) => {
  const paragraphs = aboutText.split('\n\n');

  
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-1, 1], [6, -6]), { stiffness: 120, damping: 12 });
  const ry = useSpring(useTransform(x, [-1, 1], [-6, 6]), { stiffness: 120, damping: 12 });

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
    <section className="relative py-12 md:py-16">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 600px at 50% -10%, rgba(233,177,89,0.10), transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_25%_25%,#E9B159_1.2px,transparent_1.2px),radial-gradient(circle_at_75%_75%,#E9B159_1.2px,transparent_1.2px)] [background-size:36px_36px] [background-position:0_0,18px_18px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 md:mb-12">
          <h2 className="relative inline-block text-2xl md:text-3xl font-bold text-gray-900">
            داستان برند
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 block w-12 h-0.5 bg-[#E9B159]" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="order-2 lg:order-1"
          >
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeInUp}
                className={
                  'text-gray-700 leading-8 mb-6 text-justify ' +
                  (i === 0
                    ? 'first-letter:text-[#E9B159] first-letter:font-extrabold first-letter:text-4xl first-letter:leading-[0] first-letter:ml-1'
                    : '')
                }
              >
                {p}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="order-1 lg:order-2"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              whileHover={prefersReduced ? undefined : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
              className="relative will-change-transform [perspective:900px]"
            >
              <motion.div
                style={{
                  rotateX: prefersReduced ? 0 : (rx as any),
                  rotateY: prefersReduced ? 0 : (ry as any),
                  transformStyle: 'preserve-3d',
                }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-gray-100"
              >
                <Image
                  src={imgSrc}
                  alt="محصولات عسل فرید"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  onError={() => setImgSrc('/images/about/brand-jar.jpg')}
                  priority={false}
                  loading='lazy'
                />

 
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 via-black/10 to-transparent pointer-events-none"
                />

         
                <motion.div
                  aria-hidden="true"
                  initial={{ x: '-120%' }}
                  whileHover={prefersReduced ? undefined : { x: '120%' }}
                  transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-white/5 via-white/40 to-white/5 mix-blend-screen motion-reduce:hidden"
                />


                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl ring-1 ring-transparent"
                  whileHover={prefersReduced ? undefined : { boxShadow: '0 0 0 2px rgba(233,177,89,0.45) inset' }}
                  transition={{ duration: 0.25 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
