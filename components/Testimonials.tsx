import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import ShimmerCard from './ShimmerCard';
import Reveal from './Reveal';

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(a => (a + 1) % testimonials.length);

  // Auto-avance en mobile — pausa si el usuario reduce movimiento o interactúa
  React.useEffect(() => {
    if (reduceMotion || paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [reduceMotion, paused]);

  return (
    <section id="testimonials" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-surface)' }}>
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <Reveal className="mb-14">
          <p className="section-label mb-3">// TESTIMONIOS</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">
            LO QUE DICEN<span className="neon-text">.</span>
          </h2>
          <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
          <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
            La opinión de las personas para las que he trabajado.
          </p>
        </Reveal>

        {/* Mobile: carrusel. Desktop: grid */}
        <>
          {/* Desktop grid — 3 columnas */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <ShimmerCard
                  className="glass-card rounded-xl p-7 flex flex-col relative overflow-hidden h-full"
                  style={{ borderTop: '2px solid rgba(56,189,248,0.15)' }}
                >
                  {/* Quote mark decorativo */}
                  <div className="absolute top-4 right-5 font-orbitron font-black text-6xl leading-none select-none pointer-events-none"
                    style={{ color: 'rgba(56,189,248,0.05)' }}>"</div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, s) => (
                      <span key={s} style={{ color: 'var(--neon-cyan)', fontSize: '13px' }}>★</span>
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed flex-grow mb-6"
                    style={{ color: 'var(--text-strong)', fontStyle: 'italic', fontFamily: "'Inter', sans-serif" }}>
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}>
                      <span className="font-orbitron font-bold text-xs" style={{ color: '#000' }}>
                        {getInitials(t.name)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{t.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>{t.title}</p>
                    </div>
                  </div>
                </ShimmerCard>
              </motion.div>
            ))}
          </div>

          {/* Mobile carrusel — pausa el auto-avance al interactuar */}
          <div className="md:hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card glass-shimmer rounded-xl p-6"
                  style={{ borderTop: '2px solid rgba(56,189,248,0.15)' }}
                  onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    el.style.setProperty('--shimmer-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                    el.style.setProperty('--shimmer-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
                    el.style.setProperty('--shimmer-opacity', '1');
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.setProperty('--shimmer-opacity', '0');
                  }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <span key={s} style={{ color: 'var(--neon-cyan)', fontSize: '13px' }}>★</span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6"
                    style={{ color: 'var(--text-strong)', fontStyle: 'italic', fontFamily: "'Inter', sans-serif" }}>
                    "{testimonials[active].quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}>
                      <span className="font-orbitron font-bold text-xs" style={{ color: '#000' }}>
                        {getInitials(testimonials[active].name)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{testimonials[active].name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>{testimonials[active].title}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controles carrusel */}
            <div className="flex items-center justify-between mt-5">
              <button onClick={prev}
                className="w-10 h-10 flex items-center justify-center rounded-lg glass-card"
                style={{ border: '1px solid rgba(56,189,248,0.2)' }}
                aria-label="Testimonio anterior">
                <ion-icon name="chevron-back-outline" style={{ color: 'var(--neon-cyan)', fontSize: '18px' } as React.CSSProperties} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: i === active ? '20px' : '8px',
                      height: '8px',
                      background: i === active ? 'var(--neon-cyan)' : 'var(--text-faint)',
                    }}
                    aria-label={`Ir al testimonio ${i + 1}`}
                  />
                ))}
              </div>

              <button onClick={next}
                className="w-10 h-10 flex items-center justify-center rounded-lg glass-card"
                style={{ border: '1px solid rgba(56,189,248,0.2)' }}
                aria-label="Siguiente testimonio">
                <ion-icon name="chevron-forward-outline" style={{ color: 'var(--neon-cyan)', fontSize: '18px' } as React.CSSProperties} />
              </button>
            </div>
          </div>
        </>
      </div>
    </section>
  );
};

export default Testimonials;
