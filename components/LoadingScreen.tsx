import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Máximo 800ms total — velocidad sobre efecto
    const steps = [
      { val: 40, delay: 0 },
      { val: 75, delay: 150 },
      { val: 100, delay: 350 },
    ];

    steps.forEach(({ val, delay }) => {
      setTimeout(() => setProgress(val), delay);
    });

    // Salir a los 700ms
    setTimeout(() => {
      setDone(true);
      setTimeout(onDone, 300);
    }, 700);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--dark-bg)' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="mb-8 relative"
          >
            <div className="font-orbitron font-black text-5xl neon-text select-none">JT.</div>
            <div className="glitch-layer glitch-layer-1 font-orbitron font-black text-5xl" aria-hidden="true">JT.</div>
          </motion.div>

          <div className="w-40">
            <div className="h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(to right, var(--neon-cyan), var(--neon-violet))' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </div>
            <p className="text-center mt-3 font-mono-jb text-xs" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>
              {progress < 50 ? 'CARGANDO...' : progress < 100 ? 'PREPARANDO...' : 'LISTO'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
