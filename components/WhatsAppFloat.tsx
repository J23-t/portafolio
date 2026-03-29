import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '../config/site';

const WhatsAppFloat: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Aparece después de 3 segundos
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Muestra tooltip automáticamente la primera vez
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    }, 800);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="glass-card rounded-xl px-4 py-2.5 whitespace-nowrap"
                style={{ border: '1px solid rgba(0,255,136,0.25)' }}
              >
                <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  ¿Hablamos de tu proyecto?
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Respondo en menos de 24h
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón WhatsApp */}
          <div className="relative">
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full wa-ping"
              style={{ background: 'rgba(37,211,102,0.25)' }} />
            <motion.a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <ion-icon name="logo-whatsapp" style={{ fontSize: '28px', color: '#fff' } as React.CSSProperties} />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloat;
