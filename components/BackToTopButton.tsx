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
          className="fixed bottom-24 right-6 z-[110] w-12 h-12 flex items-center justify-center rounded-xl"
          style={{
            background: 'rgba(14,22,38,0.85)',
            border: '1px solid rgba(56,189,248,0.35)',
            boxShadow: '0 8px 26px rgba(2,6,23,0.5)',
            backdropFilter: 'blur(10px)',
          }}
          whileHover={{ scale: 1.1, boxShadow: '0 8px 30px rgba(56,189,248,0.3)' }}
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