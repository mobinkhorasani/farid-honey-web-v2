// متغیرهای انیمیشن سبک و قابل‌استفاده‌مجدد
import { type Variants, cubicBezier } from "framer-motion";

// Easingهای استاندارد (به‌صورت EasingFunction تایپ‌شده)
const easeStd   = cubicBezier(0.25, 0.46, 0.45, 0.94);
const easeEnter = cubicBezier(0.22, 1, 0.36, 1);
const easeBack  = cubicBezier(0.34, 1.56, 0.64, 1);

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: easeEnter },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeStd },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.45, ease: easeBack },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

// انیمیشن‌های اضافی مفید
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.5, ease: easeStd },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.5, ease: easeStd },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: easeEnter },
  },
};

export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: easeStd },
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.95 },
  show: {
    opacity: 1, rotate: 0, scale: 1,
    transition: { duration: 0.5, ease: easeBack },
  },
};

export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: cubicBezier(0.68, -0.55, 0.265, 1.55) },
  },
};

// Hover
export const hoverScale: Variants = {
  hidden: { scale: 1 },
  show: {
    scale: 1.05,
    transition: { duration: 0.2, ease: easeStd },
  },
};

export const hoverGlow: Variants = {
  hidden: { boxShadow: "0 0 0 rgba(233, 177, 89, 0)" },
  show: {
    boxShadow: "0 8px 32px rgba(233, 177, 89, 0.3)",
    transition: { duration: 0.3, ease: easeStd },
  },
};

// پیچیده‌تر
export const complexStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2, when: "beforeChildren" },
  },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// خروج
export const fadeOut: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 0,
    transition: { duration: 0.3, ease: easeStd },
  },
};

export const slideOut: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: {
    opacity: 0, y: -20,
    transition: { duration: 0.4, ease: easeStd },
  },
};

export const containerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};


