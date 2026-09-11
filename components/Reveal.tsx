import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* Shared scroll-reveal variants (stagger + blur) */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* Fade+blur entrance WITHOUT y, for combining with independent parallax y */
export const fadeBlur = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  parallax?: number; // px parallax drift while scrolling (default 60)
}

/**
 * Section reveal wrapper: enters with fade+blur and adds a subtle
 * parallax drift while the section scrolls through the viewport.
 * Entrance (opacity/filter) and parallax (y) are driven independently
 * to avoid conflicts between the variant animation and the scroll value.
 */
const Reveal: React.FC<RevealProps> = ({ children, className = '', parallax = 60 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.75'] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, 0]);

  return (
    <motion.div
      ref={ref}
      variants={fadeBlur}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;