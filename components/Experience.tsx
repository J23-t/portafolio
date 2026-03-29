import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header con animación slideLeft — variedad */}
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
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
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
              {/* Timeline dot */}
              <div className="absolute left-4 top-6 w-4 h-4 rounded-full hidden sm:flex items-center justify-center"
                style={{ background: 'var(--dark-bg)', border: '2px solid var(--neon-cyan)', boxShadow: '0 0 12px var(--neon-cyan)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--neon-cyan)' }} />
              </div>

              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                className="glass-card rounded-xl p-6 sm:p-8"
              >
                {/* Year badge */}
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full"
                  style={{ border: '1px solid rgba(0,245,255,0.2)', background: 'rgba(0,245,255,0.05)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--neon-cyan)', boxShadow: '0 0 6px var(--neon-cyan)' }} />
                  <span className="font-mono-jb text-xs" style={{ color: 'var(--neon-cyan)' }}>{item.year}</span>
                </div>

                <h3 className="font-orbitron font-bold text-lg text-white mb-1">{item.title}</h3>
                <p className="font-semibold mb-1" style={{ color: 'var(--neon-violet)' }}>{item.company}</p>
                <p className="font-mono-jb text-xs mb-4 flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  <ion-icon name="location-outline" />
                  {item.location}
                </p>
                <p className="leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="cyber-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA al final — no dejar la sección como dead-end */}
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
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Grotesk', sans-serif" }}>
            ¿Quieres trabajar conmigo?
            <ion-icon name="arrow-forward-outline" style={{ fontSize: '14px', color: 'var(--neon-cyan)' } as React.CSSProperties} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
