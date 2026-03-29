import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { SITE } from '../config/site';

interface HeroProps { isDarkMode: boolean; }

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 15 : 35;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.4,
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
        ctx.fillStyle = 'rgba(0,245,255,0.35)';
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,245,255,${(1 - dist / 100) * 0.07})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" style={{ opacity: 0.45 }} />;
};

const Aurora: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="absolute rounded-full"
      style={{ width: 'min(600px,80vw)', height: 'min(600px,80vw)', background: 'radial-gradient(circle, rgba(0,245,255,0.09) 0%, transparent 70%)', top: '-10%', left: '-10%', filter: 'blur(80px)', animation: 'auroraA 14s ease-in-out infinite' }} />
    <div className="absolute rounded-full"
      style={{ width: 'min(500px,70vw)', height: 'min(500px,70vw)', background: 'radial-gradient(circle, rgba(191,0,255,0.07) 0%, transparent 70%)', bottom: '-10%', right: '-10%', filter: 'blur(80px)', animation: 'auroraB 18s ease-in-out infinite' }} />
  </div>
);

const Hero: React.FC<HeroProps> = () => (
  <section
    id="home"
    aria-label="Jordan Talledo - Desarrollador Full Stack que construye aplicaciones web para empresas en Lima"
    className="relative flex items-center justify-center overflow-hidden cyber-grid"
    style={{ background: 'var(--dark-bg)', minHeight: '100svh', paddingTop: '80px', paddingBottom: '60px' }}
  >
    <Aurora />
    <ParticleCanvas />

    <div className="absolute top-24 left-6 w-5 h-5 border-t border-l hidden lg:block" style={{ borderColor: 'rgba(0,245,255,0.2)' }} aria-hidden="true" />
    <div className="absolute top-24 right-6 w-5 h-5 border-t border-r hidden lg:block" style={{ borderColor: 'rgba(0,245,255,0.2)' }} aria-hidden="true" />

    <div className="container mx-auto px-5 sm:px-8 relative z-10 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto">

        {/* Propuesta de valor — primera cosa que lee el visitante */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-sm sm:text-base font-medium mb-5 sm:mb-6"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.02em' }}
        >
          Desarrollador Full Stack en Lima, Perú
          <span className="mx-2" style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span style={{ color: 'var(--neon-cyan)' }}>Disponible para proyectos</span>
        </motion.p>

        {/* H1 SEO oculto */}
        <h1 className="sr-only">Jordan Talledo – Desarrollador Full Stack Next.js Firebase SQL Server Lima Peru</h1>

        {/* Nombre — glitch decorativo */}
        <div className="relative mb-1 select-none" aria-hidden="true">
          <div className="font-orbitron font-black text-[clamp(2.5rem,10vw,6rem)] text-white leading-none tracking-tight">JORDAN</div>
          <div className="glitch-layer glitch-layer-1 font-orbitron font-black text-[clamp(2.5rem,10vw,6rem)] leading-none tracking-tight">JORDAN</div>
          <div className="glitch-layer glitch-layer-2 font-orbitron font-black text-[clamp(2.5rem,10vw,6rem)] leading-none tracking-tight">JORDAN</div>
        </div>
        <div className="mb-5 sm:mb-7" aria-hidden="true">
          <div className="font-orbitron font-bold text-[clamp(2rem,8vw,5rem)] leading-none tracking-tight neon-text">TALLEDO</div>
        </div>

        {/* Rol — typing */}
        <div className="mb-5 h-6 sm:h-7 flex items-center justify-center">
          <TypeAnimation
            sequence={[
              'Construyo apps web con Next.js y Firebase', 2800,
              'Especialista en E-commerce y SaaS', 2200,
              'Diseño UX/UI centrado en conversión', 2200,
              'Entrego proyectos en tiempo y forma', 2200,
            ]}
            wrapper="span" speed={65} repeat={Infinity}
            className="text-sm sm:text-base font-mono-jb"
            style={{ color: 'rgba(0,245,255,0.8)' }}
          />
          <span className="font-mono-jb text-sm sm:text-base blink ml-0.5" style={{ color: 'var(--neon-cyan)' }}>_</span>
        </div>

        {/* Descripción — propuesta de valor específica */}
        <p className="text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Space Grotesk', sans-serif" }}>
          Ayudo a empresas y emprendedores a lanzar sus productos digitales.{' '}
          <strong style={{ color: 'rgba(255,255,255,0.88)' }}>+10 proyectos</strong> entregados con{' '}
          <strong style={{ color: 'rgba(255,255,255,0.88)' }}>Next.js</strong>,{' '}
          <strong style={{ color: 'rgba(255,255,255,0.88)' }}>Firebase</strong> y{' '}
          <strong style={{ color: 'rgba(255,255,255,0.88)' }}>SQL Server</strong>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 mb-10 sm:mb-14 px-4 sm:px-0">
          <a href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="cyber-btn text-center" style={{ minWidth: '160px' }}
            aria-label="Ver proyectos de Jordan Talledo">
            VER PROYECTOS
          </a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="cyber-btn cyber-btn-violet text-center" style={{ minWidth: '160px' }}
            aria-label="Contactar a Jordan Talledo por WhatsApp">
            CONTACTAR
          </a>
        </div>

        {/* Stats con animación de entrada escalonada */}
        <motion.div
          className="flex justify-center gap-6 sm:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[
            { value: '2+', label: 'Años exp.' },
            { value: '10+', label: 'Proyectos' },
            { value: '100%', label: 'Satisfacción' },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
            >
              <p className="font-orbitron font-bold text-xl sm:text-3xl neon-text">{value}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Grotesk', sans-serif" }}>{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <a href="#about"
      onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 group"
      style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
      aria-label="Ir a Sobre mí">
      <span style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.2em', fontSize: '0.55rem' }}>SCROLL</span>
      <div className="w-px h-6" style={{ background: 'linear-gradient(to bottom, rgba(0,245,255,0.4), transparent)' }} />
      <ion-icon name="chevron-down-outline" style={{ color: 'rgba(0,245,255,0.4)', fontSize: '16px' } as React.CSSProperties} />
    </a>
  </section>
);

export default Hero;
