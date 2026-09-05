import type { Variants } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1] as const;
const easeInOut = [0.65, 0, 0.35, 1] as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'left'): Variants => {
  const offset = {
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
    up: { x: 0, y: -40 },
    down: { x: 0, y: 40 },
  }[direction];

  return {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: easeOut } },
  };
};

export const staggerContainer = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: easeInOut } },
};

export const hoverAnimations = {
  lift: {
    whileHover: { y: -6, transition: { duration: 0.25, ease: easeOut } },
    whileTap: { y: -2, scale: 0.98 },
  },
  scale: {
    whileHover: { scale: 1.03, transition: { duration: 0.2, ease: easeOut } },
    whileTap: { scale: 0.97 },
  },
  tap: {
    whileTap: { scale: 0.95 },
  },
};

export { easeOut, easeInOut };
