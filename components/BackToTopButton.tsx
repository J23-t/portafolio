import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center glass-card"
          style={{
            border: '1px solid rgba(0,245,255,0.3)',
            boxShadow: '0 0 20px rgba(0,245,255,0.15)',
            clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
          }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0,245,255,0.4)' }}
          whileTap={{ scale: 0.9 }}
          aria-label="Volver arriba"
        >
          <ion-icon name="chevron-up-outline" style={{ fontSize: '20px', color: 'var(--neon-cyan)' } as React.CSSProperties} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
