import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { SITE } from '../config/site';
import Magnetic from './Magnetic';

/** Cursor glow — radial light that follows mouse inside Hero */
const useCursorGlow = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 22 });
  const sy = useSpring(my, { stiffness: 80, damping: 22 });
  const [visible, setVisible] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
    if (!visible) setVisible(true);
  }, [mx, my, visible]);

  const onLeave = useCallback(() => {
    setVisible(false);
  }, []);

  return { onMove, onLeave, glow: (
    <motion.div
      className="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          x: sx,
          y: sy,
          width: 520,
          height: 520,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(129,140,248,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  )};
};

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf: number;
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 35 : 70;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.1 + 0.4,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56,189,248,0.22)';
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(129,140,248,${(1 - dist / 110) * 0.05})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" style={{ opacity: 0.6 }} />;
};

const Aurora: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="absolute rounded-full"
      style={{ width: 'min(680px,90vw)', height: 'min(680px,90vw)', background: 'radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)', top: '-15%', left: '-10%', filter: 'blur(90px)', animation: 'auroraA 16s ease-in-out infinite' }} />
    <div className="absolute rounded-full"
      style={{ width: 'min(560px,80vw)', height: 'min(560px,80vw)', background: 'radial-gradient(circle, rgba(129,140,248,0.09) 0%, transparent 70%)', bottom: '-15%', right: '-10%', filter: 'blur(90px)', animation: 'auroraB 20s ease-in-out infinite' }} />
  </div>
);

const Hero: React.FC = () => {
  const cursor = useCursorGlow();

  return (
    <section
      id="home"
      aria-label="Jordan Talledo - Desarrollador Web Full Stack en Lima, Perú"
      className="relative flex items-center justify-center overflow-hidden cyber-grid"
      style={{ background: 'var(--dark-bg)', minHeight: '100svh', paddingTop: '96px', paddingBottom: '72px' }}
      onMouseMove={cursor.onMove}
      onMouseLeave={cursor.onLeave}
    >
      <Aurora />
      <ParticleCanvas />
      {cursor.glow}

    <div className="container mx-auto px-5 sm:px-8 relative z-10 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">

        {/* Badge disponibilidad */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="mb-7"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(52,211,153,0.35)', background: 'rgba(52,211,153,0.07)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)' }} />
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--neon-green)', fontFamily: "'Inter', sans-serif" }}>
              Disponible para proyectos · Lima, Perú
            </span>
          </span>
        </motion.div>

        {/* H1 — propuesta de valor real */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="font-orbitron font-bold leading-[1.08] tracking-tight mb-6 text-[clamp(2rem,6vw,3.4rem)]"
          style={{ color: 'var(--text-bright)' }}
        >
          Desarrollos web que{' '}
          <span className="neon-text">resuelven</span>{' '}
          las necesidades de tu negocio
        </motion.h1>

        {/* Nombres + rol */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="mb-5"
        >
          <p style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
            Soy <span className="font-semibold" style={{ color: 'var(--text-bright)' }}>Jordan Talledo</span>, desarrollador Full Stack en Lima.
            Sistemas de gestión empresarial, software para restaurantes y 10+ proyectos reales con Next.js, React, Node.js, Firebase y MongoDB.
          </p>
        </motion.div>

        {/* Rol — typing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 h-7 flex items-center justify-center"
        >
          <TypeAnimation
            sequence={[
              'Sistemas de gestión empresarial a medida', 2600,
              'Software para restaurantes: pedidos, mesas, cocina', 2400,
              'Tiendas online y control de inventario digital', 2400,
              'Aplicaciones web con IA como aliada del desarrollo', 2200,
            ]}
            wrapper="span" speed={60} repeat={Infinity}
            className="text-sm sm:text-base font-mono-jb"
            style={{ color: 'var(--text-body)' }}
          />
          <span className="font-mono-jb text-sm sm:text-base blink ml-0.5" style={{ color: 'var(--neon-cyan)' }}>_</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 mb-12 px-2 sm:px-0"
        >
          <Magnetic strength={14} radius={260}>
          <a href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="cyber-btn text-center" style={{ minWidth: '180px' }}
            aria-label="Ver proyectos de Jordan Talledo">
            Ver proyectos
          </a>
        </Magnetic>
          <Magnetic strength={14} radius={260}>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
              className="cyber-btn cyber-btn-violet text-center" style={{ minWidth: '180px' }}
              aria-label="Contactar a Jordan Talledo por WhatsApp">
              <span className="flex items-center justify-center gap-2">
                <ion-icon name="logo-whatsapp" style={{ fontSize: '15px' } as React.CSSProperties} />
                Hablemos de tu proyecto
              </span>
            </a>
          </Magnetic>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <div className="grid grid-cols-3 divide-x divide-slate-700/60 rounded-2xl px-2 py-4 w-full max-w-xl"
            style={{ background: 'rgba(14,22,38,0.5)', border: '1px solid rgba(148,163,184,0.12)', backdropFilter: 'blur(10px)' }}>
            {[
              { value: '10+', label: 'Proyectos reales' },
              { value: '100%', label: 'Clientes satisfechos' },
              { value: '<24h', label: 'Tiempo de respuesta' },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="text-center px-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 + i * 0.1, duration: 0.4, type: 'spring', stiffness: 240 }}
              >
                <p className="font-orbitron font-bold text-xl sm:text-2xl" style={{ color: 'var(--text-bright)' }}>{value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech strip — credibilidad inmediata */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 mt-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {['Next.js', 'React', 'Node.js', 'MongoDB', 'Firebase', 'APIs'].map(tech => (
            <span key={tech} className="flex items-center gap-1.5 font-mono-jb text-xs"
              style={{ color: 'var(--text-faint)' }}>
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--neon-cyan)', boxShadow: '0 0 6px var(--neon-cyan)' }} />
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <a href="#about"
      onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
      className="absolute bottom-6 left-1/2 z-10 flex flex-col items-center gap-1.5 group"
      style={{ animation: 'scrollBounce 2.2s ease-in-out infinite' }}
      aria-label="Ir a Sobre mí">
      <span style={{ color: 'var(--text-faint)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.24em', fontSize: '0.55rem' }}>SCROLL</span>
      <div className="w-px h-6" style={{ background: 'linear-gradient(to bottom, rgba(56,189,248,0.4), transparent)' }} />
      <ion-icon name="chevron-down-outline" style={{ color: 'rgba(56,189,248,0.5)', fontSize: '15px' } as React.CSSProperties} />
    </a>
    </section>
  );
};

export default Hero;