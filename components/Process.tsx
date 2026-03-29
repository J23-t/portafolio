import React from 'react';
import { motion } from 'framer-motion';
import { SITE } from '../config/site';

const steps = [
  {
    num: '01',
    icon: 'chatbubbles-outline',
    title: 'Consulta inicial',
    desc: 'Hablamos sobre tu proyecto, objetivos y presupuesto. Sin compromiso. Respondo en menos de 24 horas.',
    color: 'var(--neon-cyan)',
    cta: { label: 'Empezar ahora', href: SITE.whatsapp, external: true },
    featured: true,
  },
  {
    num: '02',
    icon: 'document-text-outline',
    title: 'Propuesta y planificación',
    desc: 'Preparo una propuesta detallada con alcance, tecnologías, plazos y precio. Todo por escrito.',
    color: 'var(--neon-violet)',
    featured: false,
  },
  {
    num: '03',
    icon: 'code-slash-outline',
    title: 'Desarrollo iterativo',
    desc: 'Construyo en sprints cortos con actualizaciones frecuentes. Puedes ver el progreso en todo momento.',
    color: 'var(--neon-cyan)',
    featured: false,
  },
  {
    num: '04',
    icon: 'rocket-outline',
    title: 'Entrega y soporte',
    desc: 'Despliegue en producción y soporte post-lanzamiento incluido por 30 días.',
    color: 'var(--neon-green)',
    featured: false,
  },
];

const Process: React.FC = () => (
  <section id="process" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-surface)' }}>
    <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-14">
        <p className="section-label mb-3">// PROCESO</p>
        <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">
          CÓMO TRABAJO<span className="neon-text">.</span>
        </h2>
        <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
        <p className="mt-4 text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Space Grotesk', sans-serif" }}>
          Un proceso claro y transparente para que sepas exactamente qué esperar.
        </p>
      </motion.div>

      {/* Desktop: horizontal con conectores */}
      <div className="hidden lg:block relative">
        {/* Línea conectora */}
        <div className="absolute top-10 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--neon-cyan), var(--neon-violet), var(--neon-cyan), var(--neon-green))', opacity: 0.2 }} />

        <div className="grid lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="relative flex flex-col p-6 rounded-xl"
              style={{
                background: step.featured
                  ? `linear-gradient(135deg, ${step.color}12, rgba(6,13,20,0.8))`
                  : 'rgba(6,13,20,0.5)',
                border: `1px solid ${step.featured ? step.color + '35' : 'rgba(255,255,255,0.06)'}`,
                boxShadow: step.featured ? `0 0 30px ${step.color}08` : 'none',
              }}
            >
              {/* Dot en la línea */}
              <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'var(--dark-surface)', border: `2px solid ${step.color}`, boxShadow: `0 0 10px ${step.color}60` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: step.color }} />
              </div>

              <span className="font-orbitron text-xs mb-4 mt-4 block" style={{ color: step.color, opacity: 0.7 }}>{step.num}</span>

              <div className={`${step.featured ? 'w-14 h-14' : 'w-11 h-11'} rounded-xl flex items-center justify-center mb-4 flex-shrink-0`}
                style={{ background: `${step.color}12`, border: `1px solid ${step.color}30` }}>
                <ion-icon name={step.icon} style={{ fontSize: step.featured ? '26px' : '20px', color: step.color } as React.CSSProperties} />
              </div>

              <h3 className={`font-orbitron font-bold text-white mb-3 ${step.featured ? 'text-base' : 'text-sm'}`}>{step.title}</h3>
              <p className="text-sm leading-relaxed flex-grow" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Space Grotesk', sans-serif" }}>
                {step.desc}
              </p>

              {step.cta && (
                <a href={step.cta.href}
                  target={step.cta.external ? '_blank' : undefined}
                  rel={step.cta.external ? 'noopener noreferrer' : undefined}
                  className="mt-5 flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: step.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {step.cta.label}
                  <ion-icon name="arrow-forward-outline" style={{ fontSize: '14px' } as React.CSSProperties} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical con línea lateral */}
      <div className="lg:hidden relative">
        <div className="absolute left-5 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, var(--neon-cyan), var(--neon-violet), var(--neon-green), transparent)' }} />

        <div className="space-y-5 pl-14">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="relative p-5 rounded-xl"
              style={{
                background: step.featured ? `linear-gradient(135deg, ${step.color}10, rgba(6,13,20,0.8))` : 'rgba(6,13,20,0.5)',
                border: `1px solid ${step.featured ? step.color + '30' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {/* Dot lateral */}
              <div className="absolute -left-[2.35rem] top-6 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: 'var(--dark-surface)', border: `2px solid ${step.color}`, boxShadow: `0 0 8px ${step.color}60` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${step.color}12`, border: `1px solid ${step.color}30` }}>
                  <ion-icon name={step.icon} style={{ fontSize: '18px', color: step.color } as React.CSSProperties} />
                </div>
                <div>
                  <span className="font-orbitron text-xs block" style={{ color: step.color, opacity: 0.6 }}>{step.num}</span>
                  <h3 className="font-orbitron font-bold text-sm text-white">{step.title}</h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Space Grotesk', sans-serif" }}>
                {step.desc}
              </p>

              {step.cta && (
                <a href={step.cta.href}
                  target={step.cta.external ? '_blank' : undefined}
                  rel={step.cta.external ? 'noopener noreferrer' : undefined}
                  className="mt-4 flex items-center gap-2 text-sm font-medium"
                  style={{ color: step.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {step.cta.label}
                  <ion-icon name="arrow-forward-outline" style={{ fontSize: '14px' } as React.CSSProperties} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Process;
