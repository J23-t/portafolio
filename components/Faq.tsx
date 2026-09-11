import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '../config/site';
import Reveal from './Reveal';

const faqs = [
  {
    q: '¿Qué servicios de desarrollo web ofreces en Lima, Perú?',
    a: 'Construyo sistemas de gestión empresarial (ventas, inventario, clientes, catálogos), software para restaurantes, tiendas online, sistemas de reservas y páginas web corporativas con Next.js, React, Node.js, Firebase y MongoDB.',
  },
  {
    q: '¿Puedes crear un sistema de gestión para mi empresa?',
    a: 'Sí. Desarrollo sistemas a medida con módulos como ventas, inventario, productos, clientes, usuarios y roles, dashboards y notificaciones, adaptados a la forma de trabajar de tu negocio.',
  },
  {
    q: '¿Tienes experiencia con software para restaurantes?',
    a: 'Sí. He trabajado en soluciones para restaurantes con gestión de mesas, pedidos, cocina, menú, reservas, inventario, personal, dashboard y portal para clientes.',
  },
  {
    q: '¿Cuánto cuesta una página web o sistema a medida?',
    a: 'El precio depende del alcance del proyecto. Al contactarme recibes una propuesta detallada y por escrito con alcance, tecnologías, plazos y precio, sin compromiso.',
  },
  {
    q: '¿En qué tiempo respondes a los mensajes?',
    a: 'Respondo en menos de 24 horas por email o WhatsApp.',
  },
  {
    q: '¿Ofreces soporte después de entregar el proyecto?',
    a: 'Sí, incluyo soporte post-lanzamiento por 30 días y ofrezco planes de mantenimiento continuo para proyectos existentes.',
  },
];

const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-surface)' }}>
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <Reveal className="mb-12">
          <p className="section-label mb-3">// PREGUNTAS FRECUENTES</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">
            DUDAS COMUNES<span className="neon-text">.</span>
          </h2>
          <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl overflow-hidden"
                style={{ borderColor: isOpen ? 'rgba(56,189,248,0.38)' : undefined, background: isOpen ? 'rgba(14,22,38,0.72)' : 'rgba(14,22,38,0.55)' }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="text-sm sm:text-base font-medium leading-snug" style={{ color: 'var(--text-bright)', fontFamily: "'Inter', sans-serif" }}>
                    {q}
                  </span>
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isOpen ? 'rgba(56,189,248,0.14)' : 'rgba(148,163,184,0.08)',
                      border: `1px solid ${isOpen ? 'rgba(56,189,248,0.4)' : 'rgba(148,163,184,0.2)'}`,
                      color: isOpen ? 'var(--neon-cyan)' : 'var(--text-muted)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ion-icon name="add-outline" style={{ fontSize: '16px' } as React.CSSProperties} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
          style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}
        >
          ¿Tienes otra pregunta?{' '}
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="font-semibold transition-colors"
            style={{ color: 'var(--neon-cyan)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecoration = 'underline'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecoration = 'none'}>
            Escríbeme por WhatsApp
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Faq;