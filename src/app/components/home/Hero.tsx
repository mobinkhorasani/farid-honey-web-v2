'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, cubicBezier } from 'framer-motion';
import type { TargetAndTransition, Transition } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { fadeInUp, scaleIn, containerVariants } from '@/components/motion/variants';


const easeStd = cubicBezier(0.4, 0, 0.2, 1);
const easeEnter = cubicBezier(0.22, 1, 0.36, 1);

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);


  const parallax = useMemo(
    () => (f: number) => ({
      x: (mousePosition.x - viewport.w / 2) * f,
      y: (mousePosition.y - viewport.h / 2) * f,
    }),
    [mousePosition, viewport]
  );

 
  const floatingAnimation: TargetAndTransition = {
    y: [0, -12, 0],
    transition: { duration: 3.2, repeat: Infinity, ease: easeStd } as Transition,
  };

  const getBeeAnimation = (custom: number): TargetAndTransition => ({
    x: [0, 24, -12, 18, 0],
    y: [0, -18, 6, -10, 0],
    rotate: [0, 10, -6, 8, 0],
    transition: {
      duration: 4.5 + custom,
      repeat: Infinity,
      ease: easeStd,
      delay: custom * 0.45,
    } as Transition,
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F0] via-[#F9F7F2] to-[#F5F1E8] min-h-[90vh] lg:min-h-screen flex items-center">

      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <motion.div
          className="absolute top-16 right-8 w-[34rem] h-[34rem] bg-gradient-to-br from-[#E9B159]/25 to-[#D4A574]/10 rounded-full blur-3xl will-change-transform"
          style={parallax(0.01)}
          animate={{ scale: [1, 1.15, 1], opacity: [0.28, 0.45, 0.28] }}
          transition={{ duration: 8, repeat: Infinity, ease: easeStd }}
        />
        <motion.div
          className="absolute bottom-20 left-8 w-[28rem] h-[28rem] bg-gradient-to-br from-[#F4D03F]/18 to-[#E9B159]/12 rounded-full blur-3xl will-change-transform"
          style={parallax(-0.01)}
          animate={{ scale: [1.05, 0.98, 1.05], opacity: [0.22, 0.38, 0.22] }}
          transition={{ duration: 6, repeat: Infinity, ease: easeStd, delay: 1 }}
        />
      </div>


      <motion.div className="absolute top-6 left-6 z-10" animate={floatingAnimation} aria-hidden>
        <Leaf className="w-36 h-36 text-gray-300/70" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 z-10 rotate-45"
        animate={{ ...floatingAnimation, transition: { ...(floatingAnimation.transition as Transition), delay: 1.4 } }}
        aria-hidden
      >
        <Leaf className="w-48 h-48 text-gray-300/60" />
      </motion.div>


      <motion.div className="absolute top-24 left-1/3" animate={getBeeAnimation(0)} aria-hidden>
        <Bee className="w-10 h-10 text-[#E9B159]" />
      </motion.div>
      <motion.div className="absolute top-32 right-1/4" animate={getBeeAnimation(1)} aria-hidden>
        <Bee className="w-8 h-8 text-[#D4A574]" />
      </motion.div>
      <motion.div className="absolute bottom-40 left-1/4" animate={getBeeAnimation(2)} aria-hidden>
        <Bee className="w-9 h-9 text-[#E9B159]" />
      </motion.div>


      <svg className="absolute top-16 right-0 w-full h-36 opacity-40" viewBox="0 0 800 200" fill="none" aria-hidden>
        <motion.path
          d="M-100 100 Q 200 50, 400 80 T 900 60"
          stroke="#E9B159"
          strokeWidth="2"
          strokeDasharray="10 14"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7, strokeDashoffset: [0, -200] }}
          transition={{ duration: 3, ease: easeStd, delay: 1, repeat: Infinity }}
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
 
          <div className="order-2 lg:order-1 text-center lg:text-right">
            <motion.div variants={fadeInUp} className="mb-6">
              <motion.div className="inline-flex items-center gap-3 mb-4" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <div className="w-12 h-0.5 bg-[#E9B159]" />
                <span className="text-sm font-semibold text-gray-600 tracking-[0.3em] uppercase">بهترین عسلِ جهان</span>
                <div className="w-12 h-0.5 bg-[#E9B159]" />
              </motion.div>

              <motion.h1
                className="text-[44px] sm:text-[64px] lg:text-[80px] xl:text-[92px] font-black leading-[1.05]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: easeEnter }}
              >
                <span className="text-gray-900">عسل</span>{' '}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9B159] to-[#D4A574]"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  فرید
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              محصولات طبیعی زنبورعسل از بهترین زنبورداران؛ تازه، سالم و اصیل.
              <br />
              طعم طبیعت را سر سفره‌تان ببرید.
            </motion.p>

            <motion.div variants={scaleIn} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(233, 177, 89, 0.3)' }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#E9B159] to-[#D4A574] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span>همین حالا خرید کنید</span>
                  <motion.span className="mr-2" animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    ←
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#E9B159] text-[#E9B159] font-bold rounded-full hover:bg-[#E9B159] hover:text-white transition-all duration-300"
                >
                  درباره ما
                </Link>
              </motion.div>
            </motion.div>
          </div>

     
          <div className="order-1 lg:order-2 relative">
            <motion.div
              className="relative mx-auto will-change-transform"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: easeEnter }}
              style={{ perspective: 1000 }}
            >
      
              <motion.div
                className="relative z-20 mx-auto w-full max-w-[640px] h-[420px] sm:h-[520px] md:h-[560px] lg:h-[640px]"
                animate={floatingAnimation}
                whileHover={{ scale: 1.04, rotateY: 10 }}
                transition={{ duration: 0.25 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Image
                  src="/images/hero/jar.png"
                  alt="شیشه عسل"
                  fill
                  sizes="(min-width: 1024px) 640px, (min-width: 640px) 80vw, 92vw"
                  className="object-contain drop-shadow-2xl"
                  priority
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#E9B159]/25 to-[#D4A574]/25 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.75, 0.45] }}
                  transition={{ duration: 3, repeat: Infinity, ease: easeStd }}
                />
              </motion.div>

        
              <motion.div
                className="absolute -bottom-10 -right-16 z-10"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1, ease: easeEnter }}
                whileHover={{ scale: 1.08, rotate: 4 }}
                style={{ transition: 'all 0.25s ease' }}
              >
                <div className="relative w-[22rem] h-[16rem] md:w-[26rem] md:h-[18rem]">
                  <Image
                    src="/images/hero/comb.png"
                    alt="شان عسل"
                    fill
                    sizes="(min-width: 1024px) 416px, (min-width: 640px) 38vw, 60vw"
                    className="object-contain drop-shadow-xl"
                  />
                </div>
              </motion.div>

           
              <motion.div
                className="absolute top-4 -left-10 z-30"
                initial={{ opacity: 0, rotate: -40 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: easeEnter }}
                whileHover={{ rotate: 12 }}
                style={{ transition: 'all 0.25s ease' }}
              >
                <HoneyDipper className="w-24 h-24 text-[#D4A574]" />
              </motion.div>


              <motion.div
                className="absolute -top-6 -right-10 text-right"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.8, ease: easeEnter }}
              >
                <motion.h2
                  className="text-5xl sm:text-7xl font-black text-gray-800/90"
                  animate={{ rotate: [0, 2, 0, -2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: easeStd }}
                >
                </motion.h2>
                <motion.p
                  className="text-2xl text-gray-600 italic mt-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: easeStd, delay: 1 }}
                >
                </motion.p>
              </motion.div>

  
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2.5 h-2.5 bg-[#E9B159] rounded-full"
                  style={{ top: `${18 + i * 12}%`, right: `${8 + i * 10}%` }}
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: easeStd }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


/* ---------- SVG Components ---------- */
function Bee({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      aria-hidden
    >
      <ellipse cx="12" cy="12" rx="6" ry="4" fill="currentColor" />
      <path d="M8 9c-2-2-4-3-4-1.5S8 10 8 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M16 9c2-2 4-3 4-1.5S16 10 16 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M6 12h12" stroke="#fff" strokeWidth="1.5" />
      <path d="M6 14h12" stroke="#fff" strokeWidth="1" />
      <circle cx="18.5" cy="12" r="1.2" fill="currentColor" />
    </motion.svg>
  );
}

function Leaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 110C48 82 54 42 50 10" />
        <path d="M38 72c12-4 22-2 28 4M30 88c10-1 18 1 24 6M20 98c7 0 12 2 17 6" />
        <path d="M60 50c9-6 18-8 26-6M54 60c10-4 18-3 24 2" />
      </g>
    </svg>
  );
}

function HoneyDipper({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M12 2L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="20" r="2" fill="currentColor" />
      <path d="M8 18L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 16L15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
