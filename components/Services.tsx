import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: 'business-outline',
    title: 'Sistemas de gestión empresarial',
    desc: 'Software a medida que digitaliza los procesos de tu empresa: ventas, inventario, productos, clientes, catálogos, gestión por tiendas y roles de usuario.',
    tags: ['Ventas', 'Inventario', 'Clientes', 'Catálogos'],
    color: 'var(--neon-cyan)',
    accent: 'rgba(56,189,248,0.07)',
  },
  {
    icon: 'restaurant-outline',
    title: 'Software para restaurantes',
    desc: 'Solución completa para tu restaurante: gestión de mesas, pedidos, cocina, menú, reservas, inventario, personal y portal para clientes.',
    tags: ['Mesas', 'Pedidos', 'Cocina', 'Reservas'],
    color: 'var(--neon-green)',
    accent: 'rgba(52,211,153,0.07)',
  },
  {
    icon: 'storefront-outline',
    title: 'Tiendas online que venden 24/7',
    desc: 'Tu negocio con catálogo, carrito, pagos y control de inventario en tiempo real. Vende aunque tu local esté cerrado.',
    tags: ['E-commerce', 'Catálogo', 'Carrito', 'Pagos'],
    color: 'var(--neon-violet)',
    accent: 'rgba(129,140,248,0.07)',
  },
  {
    icon: 'speedometer-outline',
    title: 'Dashboards e indicadores',
    desc: 'Paneles de control con métricas claras de ventas, inventario, tareas y operación, para que tomes decisiones informadas.',
    tags: ['Dashboard', 'Reportes', 'KPI', 'Decisiones'],
    color: 'var(--neon-cyan)',
    accent: 'rgba(56,189,248,0.07)',
  },
  {
    icon: 'code-slash-outline',
    title: 'APIs y aplicaciones web',
    desc: 'Desarrollo de APIs y aplicaciones web responsivas con React, Next.js, Node.js, MongoDB y Firebase. Listas para escalar.',
    tags: ['APIs', 'React', 'Next.js', 'Node.js'],
    color: 'var(--neon-violet)',
    accent: 'rgba(129,140,248,0.07)',
  },
  {
    icon: 'construct-outline',
    title: 'Mantenimiento y soporte continuo',
    desc: 'Actualizaciones, mejoras y soporte técnico de tu sitio o sistema. Tu aplicación siempre funcionando y mejorando.',
    tags: ['Soporte', 'Actualizaciones', 'Mejoras', 'Hosting'],
    color: 'var(--neon-green)',
    accent: 'rgba(52,211,153,0.07)',
  },
];

const Services: React.FC = () => (
  <section id="services" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-surface)' }}>
    <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-14">
        <p className="section-label mb-3">// SERVICIOS</p>
        <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">
          QUÉ OFREZCO<span className="neon-text">.</span>
        </h2>
        <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
        <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
          Convierto las necesidades de tu negocio en funcionalidades concretas dentro de una aplicación web.
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
            className="rounded-2xl p-6 group relative overflow-hidden service-card"
            style={{
              background: s.accent,
              border: `1px solid ${s.color}22`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${s.color}45`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 34px ${s.color}12`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${s.color}22`;
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 icon-box"
              style={{ background: `${s.color}14`, border: `1px solid ${s.color}30`, color: s.color }}>
              <ion-icon name={s.icon} />
            </div>

            <h3 className="font-orbitron font-bold text-base text-white mb-3 leading-snug">{s.title}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>{s.desc}</p>

            <div className="flex flex-wrap gap-1.5">
              {s.tags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
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
          aria-label="Solicitar propuesta sin compromiso">
          SOLICITAR PROPUESTA SIN COMPROMISO
        </a>
      </motion.div>
    </div>
  </section>
);

export default Services;