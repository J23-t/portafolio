import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: 'globe-outline',
    title: 'Desarrollo Web Full Stack',
    desc: 'Aplicaciones web completas con Next.js y React. Desde el diseño hasta el despliegue en producción.',
    tags: ['Next.js', 'React', 'Node.js', 'TypeScript'],
    color: 'var(--neon-cyan)',
    accent: 'rgba(0,245,255,0.08)',
  },
  {
    icon: 'flame-outline',
    title: 'Firebase & SQL Server',
    desc: 'Integración de Firebase (Auth, Firestore, Storage) y bases de datos SQL Server para apps escalables.',
    tags: ['Firebase', 'SQL Server', 'Firestore', 'Auth'],
    color: 'var(--neon-violet)',
    accent: 'rgba(191,0,255,0.08)',
  },
  {
    icon: 'storefront-outline',
    title: 'E-commerce & Tiendas Online',
    desc: 'Plataformas de venta online con catálogo, carrito, pagos y gestión de inventario en tiempo real.',
    tags: ['E-commerce', 'Pagos', 'Inventario', 'SEO'],
    color: 'var(--neon-green)',
    accent: 'rgba(0,255,136,0.08)',
  },
  {
    icon: 'phone-portrait-outline',
    title: 'Diseño UX/UI Responsive',
    desc: 'Interfaces modernas e intuitivas optimizadas para todos los dispositivos. Mobile-first.',
    tags: ['Tailwind CSS', 'Mobile-first', 'UX', 'Figma'],
    color: 'var(--neon-cyan)',
    accent: 'rgba(0,245,255,0.08)',
  },
  {
    icon: 'speedometer-outline',
    title: 'Optimización & SEO',
    desc: 'Mejora de rendimiento, Core Web Vitals y SEO técnico para posicionar tu negocio en Google.',
    tags: ['SEO', 'Performance', 'Core Web Vitals', 'Analytics'],
    color: 'var(--neon-violet)',
    accent: 'rgba(191,0,255,0.08)',
  },
  {
    icon: 'construct-outline',
    title: 'Mantenimiento & Soporte',
    desc: 'Mantenimiento continuo, actualizaciones y soporte técnico para proyectos existentes.',
    tags: ['Soporte', 'Updates', 'Bug Fixes', 'Hosting'],
    color: 'var(--neon-green)',
    accent: 'rgba(0,255,136,0.08)',
  },
];

const Services: React.FC = () => (
  <section id="services" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
    <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-14">
        <p className="section-label mb-3">// SERVICIOS</p>
        <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">
          QUÉ OFREZCO<span className="neon-text">.</span>
        </h2>
        <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
        <p className="mt-4 text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Soluciones digitales completas adaptadas a las necesidades de tu negocio.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            viewport={{ once: true }}
            className="rounded-xl p-6 group relative overflow-hidden service-card"
            style={{
              background: s.accent,
              border: `1px solid ${s.color}25`,
              transition: 'border-color 0.25s, box-shadow 0.25s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${s.color}50`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${s.color}10`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${s.color}25`;
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
              style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}>
              <ion-icon name={s.icon} />
            </div>

            <h3 className="font-orbitron font-bold text-sm text-white mb-3 leading-snug">{s.title}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.desc}</p>

            <div className="flex flex-wrap gap-1.5">
              {s.tags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full"
                  style={{ color: s.color, border: `1px solid ${s.color}30`, background: `${s.color}08`, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem' }}>
                  {tag}
                </span>
              ))}
            </div>
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
          className="cyber-btn"
          aria-label="Solicitar presupuesto">
          SOLICITAR PRESUPUESTO
        </a>
      </motion.div>
    </div>
  </section>
);

export default Services;
