import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const steps = [
      { val: 40, delay: 0 },
      { val: 75, delay: 150 },
      { val: 100, delay: 350 },
    ];
    steps.forEach(({ val, delay }) => setTimeout(() => setProgress(val), delay));
    setTimeout(() => {
      setDone(true);
      setTimeout(onDone, 250);
    }, 650);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--dark-bg)' }}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <span className="font-orbitron font-bold text-4xl text-white select-none">
              Jordan<span className="neon-text">T</span>
            </span>
          </motion.div>

          <div className="w-44">
            <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(148,163,184,0.12)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(to right, var(--neon-cyan), var(--neon-violet))' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              />
            </div>
            <p className="text-center mt-3 font-mono-jb text-xs" style={{ color: 'var(--text-faint)', letterSpacing: '0.18em' }}>
              {progress < 50 ? 'CARGANDO' : progress < 100 ? 'PREPARANDO' : 'LISTO'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;