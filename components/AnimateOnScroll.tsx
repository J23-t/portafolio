import React from 'react';
// Fix for framer-motion variants type error by importing Variants type
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimateOnScrollProps {
  children: React.ReactNode;
}

// Fix for framer-motion variants type error
const variants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 80,
    },
  },
};

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05, // Reducido para mejor detección en móvil
    rootMargin: '50px', // Añadir margen para activar antes
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;
