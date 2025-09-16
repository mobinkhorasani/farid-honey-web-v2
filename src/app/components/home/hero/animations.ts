import { cubicBezier } from 'framer-motion';
import type { TargetAndTransition, Transition } from 'framer-motion';

export const easeStd = cubicBezier(0.4, 0, 0.2, 1);
export const easeEnter = cubicBezier(0.22, 1, 0.36, 1);

export const floatingAnimation: TargetAndTransition = {
  y: [0, -12, 0],
  transition: { duration: 3.2, repeat: Infinity, ease: easeStd } as Transition,
};

export const getBeeAnimation = (custom: number): TargetAndTransition => ({
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
