'use client';

import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/components/motion/variants";

export const AboutHero = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-6 md:pt-14 md:pb-8">

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,#E9B1591a,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.7 }}
          className="relative inline-block text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900"
        >
          درباره ما
          <motion.span
            variants={scaleIn}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 block w-16 h-1 rounded-full bg-[#E9B159]"
          />
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.7 }}
          className="mt-6 text-gray-600 text-lg md:text-xl font-medium"
        >
           داستان ما از سال ۱۳۵۵ آغاز شد
        </motion.p>
      </div>
    </section>
  );
};
