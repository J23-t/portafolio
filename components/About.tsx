import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { SITE } from '../config/site';

const stats = [
  { value: 10, suffix: '+', label: 'Proyectos entregados', color: 'var(--neon-cyan)' },
  { value: 8, suffix: '+', label: 'Módulos de gestión empresarial', color: 'var(--neon-violet)' },
  { value: 4, suffix: '', label: 'Certificaciones', color: 'var(--neon-green)' },
  { value: 24, suffix: 'h', label: 'Tiempo de respuesta', color: 'var(--neon-cyan)' },
];

const personalFacts = [
  { icon: 'location-outline', text: 'Lima, Perú' },
  { icon: 'school-outline', text: 'Egresado técnico en Desarrollo de Sistemas de Información' },
  { icon: 'git-branch-outline', text: 'Ingeniería de Sistemas · Cibertec' },
  { icon: 'sparkles-outline', text: 'IA como apoyo al desarrollo' },
];

const About: React.FC = () => {
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0 });

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-surface)' }}>
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-14">
          <p className="section-label mb-3">// SOBRE MÍ</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">QUIÉN SOY<span className="neon-text">.</span></h2>
          <div className="mt-4 h-px w-24" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
          <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
            Egresado técnico en Desarrollo de Sistemas de Información, estudiante de Ingeniería de Sistemas en Cibertec.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: texto humanizado + stats */}
          <motion.div className="space-y-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}>
              Mi fuerte no es solo escribir código:{' '}
              <span className="font-semibold neon-text">convierto necesidades de negocio en funcionalidades concretas</span>{' '}
              dentro de una aplicación web.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-strong)', fontFamily: "'Inter', sans-serif" }}>
              Soy <span className="font-semibold" style={{ color: 'var(--text-bright)' }}>Jordan Talledo</span>, desarrollador web en Lima,
              egresado técnico en Desarrollo de Sistemas de Información y estudiante de Ingeniería de Sistemas en Cibertec.
              He construido sistemas reales para empresas: gestión comercial con ventas, inventario, clientes y catálogos;{' '}
              y software para restaurantes con mesas, pedidos, cocina y reservas.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
              Como diferenciador, uso inteligencia artificial como apoyo en todo el proceso — investigar, analizar problemas y
              acelerar el desarrollo — manteniendo siempre el control y criterio técnico del proyecto.
            </p>

            {/* Datos personales */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {personalFacts.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
                    style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.18)', color: 'var(--neon-cyan)' }}>
                    <ion-icon name={icon} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3 pt-2">
              {stats.map(({ value, suffix, label, color }) => (
                <div key={label} className="glass-card rounded-xl p-4 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />
                  <p className="font-orbitron font-bold text-2xl sm:text-3xl" style={{ color }}>
                    {statsInView ? <CountUp end={value} duration={1.6} suffix={suffix} /> : <span>0{suffix}</span>}
                  </p>
                  <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: foto premium */}
          <motion.div className="flex flex-col items-center gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <div className="relative flex items-center justify-center">
              {/* Glow de fondo */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.16), transparent 65%)', filter: 'blur(50px)' }} />

              {/* Marco animado + foto */}
              <div className="relative p-[2px] rounded-3xl"
                style={{ background: 'linear-gradient(140deg, rgba(56,189,248,0.55), rgba(129,140,248,0.35) 55%, rgba(148,163,184,0.15))' }}>
                <div className="rounded-3xl overflow-hidden" style={{ width: 'min(320px,78vw)', height: 'min(360px,88vw)', background: 'var(--dark-surface)' }}>
                  <img
                    src="/foto/perfil.png"
                    alt="Jordan Talledo - Desarrollador Web Full Stack en Lima, Perú"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                    loading="lazy" width="320" height="360"
                  />
                  {/* Overlay suave inferior */}
                  <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, var(--dark-surface), transparent)' }} />
                </div>
              </div>

              {/* Chip flotante — especialidad */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-2xl glass-card whitespace-nowrap"
                style={{ border: '1px solid rgba(56,189,248,0.3)', boxShadow: '0 12px 30px rgba(2,6,23,0.4)' }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--neon-green)', boxShadow: '0 0 6px var(--neon-green)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-bright)', fontFamily: "'Inter', sans-serif" }}>
                  Sistemas empresariales · Restaurantes · Web
                </span>
              </div>
            </div>

            {/* Enlace LinkedIn */}
            <motion.a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                marginTop: '20px',
                background: 'rgba(56,189,248,0.06)',
                border: '1px solid rgba(56,189,248,0.22)',
                color: 'var(--neon-cyan)',
                fontFamily: "'Inter', sans-serif",
              }}
              whileHover={{ y: -2 }}
              aria-label="Ver LinkedIn de Jordan Talledo"
            >
              <ion-icon name="logo-linkedin" style={{ fontSize: '16px' } as React.CSSProperties} />
              Conocer más en LinkedIn
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;