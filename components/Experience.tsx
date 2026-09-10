import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-surface)' }}>
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="section-label mb-3">// TRAYECTORIA</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">
            EXPERIENCIA<span className="neon-text">.</span>
          </h2>
          <div className="mt-4 h-px w-24" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
          <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
            Trayectoria construida con proyectos reales y aprendizaje continuo.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-6 top-2 bottom-2 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, var(--neon-cyan), var(--neon-violet), transparent)' }} />

          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative sm:pl-20 mb-10 last:mb-0"
            >
              <div className="absolute left-0 top-7 sm:left-4 w-5 h-5 hidden sm:flex items-center justify-center rounded-full"
                style={{ background: 'var(--dark-bg)', border: '2px solid var(--neon-cyan)', boxShadow: '0 0 14px rgba(56,189,248,0.35)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--neon-cyan)' }} />
              </div>

              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                className="glass-card rounded-2xl p-6 sm:p-8"
              >
                <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full"
                  style={{ border: '1px solid rgba(56,189,248,0.25)', background: 'rgba(56,189,248,0.06)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--neon-cyan)', boxShadow: '0 0 6px var(--neon-cyan)' }} />
                  <span className="font-mono-jb text-xs" style={{ color: 'var(--neon-cyan)' }}>{item.year}</span>
                </div>

                <h3 className="font-orbitron font-bold text-lg text-white mb-1">{item.title}</h3>
                <p className="font-semibold mb-1" style={{ color: 'var(--neon-violet)' }}>{item.company}</p>
                <p className="font-mono-jb text-xs mb-4 flex items-center gap-1.5" style={{ color: 'var(--text-faint)' }}>
                  <ion-icon name="location-outline" />
                  {item.location}
                </p>
                <p className="leading-relaxed mb-5" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>{item.description}</p>

                <ul className="space-y-2.5 mb-5">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-strong)', fontFamily: "'Inter', sans-serif" }}>
                      <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--neon-cyan)', boxShadow: '0 0 6px rgba(56,189,248,0.4)' }} />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="cyber-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>
            ¿Quieres lograr resultados similares en tu negocio?
            <ion-icon name="arrow-forward-outline" style={{ fontSize: '14px', color: 'var(--neon-cyan)' } as React.CSSProperties} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;