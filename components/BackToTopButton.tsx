import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// FIX: To resolve 'ion-icon' type errors, the namespace for JSX intrinsic elements was updated to `React.JSX`.
// This is necessary for modern React projects using the automatic JSX runtime.
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name?: string;
      };
    }
  }
}

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-full shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 focus:outline-none group overflow-hidden"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Go to top"
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            {/* FIX: Replaced `class` with `className` to align with React standards for JSX. */}
            {/* FIX: Changed to self-closing tag for ion-icon */}
            <ion-icon name="arrow-up-outline" className="text-3xl" />
          </div>
          
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-full"
            animate={{ scale: [1, 1.3, 1.3, 1], opacity: [1, 0.5, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;