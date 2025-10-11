"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  fadeInUp,
  scaleIn,
  containerVariants,
} from "@/components/motion/variants";
import { BeeIcon } from "@/components/icons/bee-icon";
import {
  easeEnter,
  easeStd,
  floatingAnimation,
  getBeeAnimation,
} from "./hero/animations";
import { Leaf } from "./hero/leaf";
import { HoneyDipper } from "./hero/honey-dipper";

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const parallax = useMemo(
    () => (f: number) => ({
      x: (mousePosition.x - viewport.w / 2) * f,
      y: (mousePosition.y - viewport.h / 2) * f,
    }),
    [mousePosition, viewport]
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F0] via-[#F9F7F2] to-[#F5F1E8] min-h-[90vh] lg:min-h-screen flex items-center">
      {/* پس‌زمینه سبک */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden
      >
        <motion.div
          className="absolute top-16 right-8 w-[28rem] h-[28rem] bg-gradient-to-br from-[#E9B159]/20 to-[#D4A574]/5 rounded-full blur-2xl will-change-transform"
          style={parallax(0.01)}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: easeStd }}
        />
        <motion.div
          className="absolute bottom-20 left-8 w-[24rem] h-[24rem] bg-gradient-to-br from-[#F4D03F]/15 to-[#E9B159]/8 rounded-full blur-2xl will-change-transform"
          style={parallax(-0.01)}
          animate={{ scale: [1, 1.02, 1], opacity: [0.25, 0.35, 0.25] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: easeStd,
            delay: 1,
          }}
        />
      </div>

      {/* برگ‌ها */}
      <motion.div
        className="absolute top-6 left-6 z-10"
        animate={floatingAnimation}
        aria-hidden
      >
        <Leaf className="w-28 h-28 text-gray-300/50" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 z-10 rotate-45"
        animate={{
          ...floatingAnimation,
          transition: { ...(floatingAnimation.transition as any), delay: 1.2 },
        }}
        aria-hidden
      >
        <Leaf className="w-36 h-36 text-gray-300/45" />
      </motion.div>

      {/* زنبورهای سبک */}
      <motion.div
        className="absolute top-24 left-1/3"
        animate={getBeeAnimation(0)}
        aria-hidden
      >
        <BeeIcon className="w-10 h-10 text-[#E9B159]" />
      </motion.div>
      <motion.div
        className="absolute top-32 right-1/4"
        animate={getBeeAnimation(1)}
        aria-hidden
      >
        <BeeIcon className="w-8 h-8 text-[#D4A574]" />
      </motion.div>

      {/* کانتینر اصلی */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* ستون متن */}
          <div className="order-2 lg:order-1 text-center lg:text-right">
            <motion.div variants={fadeInUp} className="mb-6">
              <motion.div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-[#E9B159]" />
                <span className="text-sm font-semibold text-gray-600 tracking-[0.3em] uppercase">
                  بهترین عسل جهان
                </span>
                <div className="w-12 h-0.5 bg-[#E9B159]" />
              </motion.div>

              <motion.h1
                className="text-[44px] sm:text-[64px] lg:text-[80px] xl:text-[92px] font-black leading-[1.05]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: easeEnter }}
              >
                <span className="text-gray-900">عسل</span>{" "}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9B159] to-[#D4A574]"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  فرید
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              محصولات طبیعی زنبورعسل از بهترین زنبورداران؛ تازه، سالم و اصیل.
              <br />
              طعم طبیعت را سر سفره‌تان ببرید.
            </motion.p>

            <motion.div
              variants={scaleIn}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#E9B159] to-[#D4A574] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>همین حالا خرید کنید</span>
                <motion.span
                  className="mr-2"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#E9B159] text-[#E9B159] font-bold rounded-full hover:bg-[#E9B159] hover:text-white transition-all duration-300"
              >
                درباره ما
              </Link>
            </motion.div>
          </div>

          {/* ستون تصویر */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              className="relative mx-auto will-change-transform"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: easeEnter }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative z-20 mx-auto w-full max-w-[640px] h-[420px] sm:h-[520px] md:h-[560px] lg:h-[640px]"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: easeStd }}
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
                  animate={{ scale: [1, 1.04, 1], opacity: [0.45, 0.65, 0.45] }}
                  transition={{ duration: 6, repeat: Infinity, ease: easeStd }}
                />
              </motion.div>

              <motion.div
                className="absolute -bottom-10 -right-16 z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: easeEnter }}
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
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: easeEnter }}
              >
                <HoneyDipper className="w-20 h-20 text-[#D4A574]" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
