import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data/certifications';

const Certifications: React.FC = () => (
  <section id="certifications" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
    <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

    {/* Glow de fondo */}
    <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <p className="section-label mb-3">// FORMACIÓN</p>
        <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">
          CERTIFICACIONES<span className="neon-text">.</span>
        </h2>
        <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
        <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
          Aprendizaje continuo y especialización en tecnologías actuales.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {certifications.map((cert, i) => {
          const isCisco = cert.issuer === 'Cisco Networking Academy';
          const color = isCisco ? 'var(--neon-violet)' : 'var(--neon-cyan)';
          const accent = isCisco ? 'rgba(129,140,248,0.08)' : 'rgba(56,189,248,0.06)';
          const borderColor = isCisco ? 'rgba(129,140,248,0.3)' : 'rgba(56,189,248,0.15)';

          return (
            <motion.a
              key={i}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-xl p-6 flex flex-col group relative overflow-hidden"
              style={{
                border: `1px solid ${borderColor}`,
                background: accent,
              }}
              aria-label={`Ver certificado: ${cert.title}`}
            >
              {/* Línea top de color */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />

              {/* Badge Cisco */}
              {isCisco && (
                <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.3)', color: 'var(--neon-violet)', fontFamily: "'Inter', sans-serif", fontSize: '0.6rem' }}>
                  Destacado
                </span>
              )}

              {/* Icono */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 flex-shrink-0"
                style={{ background: `${color}12`, border: `1px solid ${color}30`, color }}>
                <ion-icon name={cert.icon} />
              </div>

              <h3 className="font-orbitron font-bold text-sm text-white mb-1 leading-snug">{cert.title}</h3>
              <p className="text-xs mb-5 flex-grow" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>
                {cert.issuer}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                style={{ color, fontFamily: "'Inter', sans-serif" }}>
                Ver certificado
                <ion-icon name="arrow-forward-outline" style={{ fontSize: '12px' } as React.CSSProperties} />
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  </section>
);

export default Certifications;
