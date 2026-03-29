import React from 'react'
import { motion } from 'framer-motion'
import { SITE } from '../config/site'

const MidCTA: React.FC = () => (
  <section className="py-16 relative overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="container mx-auto px-5 sm:px-8 text-center relative z-10"
    >
      <p className="section-label mb-4">// LISTO PARA EMPEZAR</p>
      <h2 className="font-orbitron font-bold text-2xl sm:text-4xl text-white mb-3">
        Convierte tu idea en<span className="neon-text"> realidad</span>
      </h2>
      <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Grotesk', sans-serif" }}>
        Hablemos sobre tu proyecto. Sin compromiso, respondo en menos de 24 horas.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="cyber-btn">INICIAR PROYECTO</a>
      </div>
    </motion.div>
  </section>
)

export default MidCTA
