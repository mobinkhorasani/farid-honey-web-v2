'use client';

import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/components/motion/variants";

export const AboutHero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-8 md:pt-16 md:pb-12">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/40" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.7 }}
          className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/50 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-amber-700 font-medium text-xs sm:text-sm">از سال ۱۳۵۵</span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.7 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-900 via-amber-700 to-amber-600 bg-clip-text text-transparent mb-4 sm:mb-6"
        >
          داستان ما
        </motion.h1>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.7 }}
          className="w-16 sm:w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full mx-auto mb-6 sm:mb-8"
        />

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-amber-800/90 font-light leading-relaxed max-w-3xl mx-auto px-2"
        >
          سفری پر از <span className="font-semibold text-amber-700">عشق به طبیعت</span> و 
          <span className="font-semibold text-amber-700"> تعهد به کیفیت</span>
        </motion.p>
      </div>
    </section>
  );
};