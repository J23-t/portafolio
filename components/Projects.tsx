import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { projects, type Project } from '../data/projects';

const AUTOPLAY_MS = 6000;

// Imagen con fallback elegante hasta que lleguen las capturas reales
const ProjectImage: React.FC<{ src: string; alt: string; title: string }> = ({ src, alt, title }) => {
  const [error, setError] = useState(false);
  const showFallback = !src || error;

  if (showFallback) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3"
        style={{
          background: 'radial-gradient(120% 120% at 20% 20%, rgba(56,189,248,0.2), rgba(129,140,248,0.14) 45%, rgba(5,8,15,0.95) 100%)',
        }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ border: '1px solid rgba(56,189,248,0.4)', background: 'rgba(5,8,15,0.55)', color: 'var(--neon-cyan)' }}>
          <ion-icon name="layers-outline" style={{ fontSize: '26px' } as React.CSSProperties} />
        </div>
        <span className="font-orbitron font-bold text-lg px-4 text-center" style={{ color: 'var(--text-bright)' }}>
          {title}
        </span>
        <span className="font-mono-jb text-[0.62rem] tracking-widest" style={{ color: 'var(--text-faint)' }}>
          CAPTURA PRONTO
        </span>
      </div>
    );
  }

  return (
    <img src={src} alt={alt} className="w-full h-full object-cover object-center" loading="lazy" onError={() => setError(true)} />
  );
};

// Slide a sangre completa, con imagen protagonista y efecto 3D de inclinación
const ProjectSlide: React.FC<{ project: Project; onOpen: () => void }> = ({ project, onOpen }) => {
  const reduceMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 16 });
  const sry = useSpring(ry, { stiffness: 140, damping: 16 });
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const noReduce = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanTilt(fine && noReduce);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * 8);
    ry.set((px - 0.5) * 8);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <div
      className="relative w-full h-full cursor-pointer"
      style={{ perspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-2xl glass-card"
        onClick={onOpen}
      >
        {/* Imagen a sangre completa con efecto Ken Burns */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="w-full h-full" style={{ animation: 'proj-kenburns 12s ease-in-out infinite alternate' }}>
            <ProjectImage src={project.image} alt={project.title} title={project.title} />
          </div>

          {/* Gradientes de legibilidad */}
          <div className="absolute inset-0 hidden md:block"
            style={{ background: 'linear-gradient(to right, rgba(5,8,15,0.92) 0%, rgba(5,8,15,0.55) 45%, rgba(5,8,15,0.08) 100%)' }} />
          <div className="absolute inset-0 md:hidden"
            style={{ background: 'linear-gradient(to top, rgba(5,8,15,0.96) 4%, rgba(5,8,15,0.5) 55%, transparent 100%)' }} />
        </div>

        {/* Fila superior: categoría + impacto */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3 pointer-events-none" style={{ transform: 'translateZ(34px)' }}>
          <span className="cyber-tag" style={{ background: 'rgba(5,8,15,0.6)', backdropFilter: 'blur(6px)', borderColor: 'rgba(56,189,248,0.4)' }}>
            {project.category}
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(52,211,153,0.4)', background: 'rgba(5,8,15,0.55)', backdropFilter: 'blur(8px)', maxWidth: '70%' }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--neon-green)' }} />
            <span className="text-xs font-medium truncate" style={{ color: 'var(--neon-green)', fontFamily: "'Inter', sans-serif" }}>
              {project.impact}
            </span>
          </span>
        </div>

        {/* Contenido en capa 3D */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 pointer-events-none" style={{ transform: 'translateZ(46px)' }}>
          <div className="max-w-xl">
            <h3 className="font-orbitron font-bold text-xl sm:text-3xl text-white mb-3 leading-snug drop-shadow-lg">
              {project.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-4 overflow-hidden"
              style={{
                color: 'var(--text-primary)',
                fontFamily: "'Inter', sans-serif",
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textShadow: '0 1px 8px rgba(5,8,15,0.8)',
              }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5 overflow-hidden">
              {project.tags.slice(0, 3).map(tag => (
                <span key={tag} className="cyber-tag" style={{ background: 'rgba(5,8,15,0.6)', backdropFilter: 'blur(6px)' }}>
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="cyber-tag" style={{ color: 'var(--text-faint)', borderColor: 'rgba(148,163,184,0.35)', background: 'rgba(5,8,15,0.6)' }}>
                  +{project.tags.length - 3}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 pointer-events-auto">
              <button
                onClick={e => { e.stopPropagation(); onOpen(); }}
                className="cyber-btn flex items-center gap-2"
                aria-label={`Ver detalles de ${project.title}`}
                style={{ padding: '11px 20px', fontSize: '0.62rem', background: 'rgba(5,8,15,0.5)' }}
              >
                <ion-icon name="expand-outline" />VER DETALLES
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="cyber-btn cyber-btn-violet flex items-center gap-2"
                  aria-label={`Abrir demo de ${project.title}`}
                  style={{ padding: '11px 20px', fontSize: '0.62rem', background: 'rgba(5,8,15,0.5)' }}
                >
                  <ion-icon name="open-outline" />DEMO
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Modal a pantalla completa con los detalles del proyecto
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles: ${project.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'var(--overlay-bg)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="glass-card rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        style={{ border: '1px solid rgba(56,189,248,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-56 overflow-hidden">
          <ProjectImage src={project.image} alt={project.title} title={project.title} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,15,28,1) 0%, rgba(10,15,28,0.55) 50%, transparent 100%)' }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--neon-cyan), transparent)' }} />

          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center glass-card rounded-lg"
            aria-label="Cerrar modal"
            style={{ border: '1px solid rgba(56,189,248,0.3)' }}>
            <ion-icon name="close-outline" style={{ color: 'var(--neon-cyan)', fontSize: '18px' } as React.CSSProperties} />
          </button>

          <div className="absolute bottom-4 left-6">
            <span className="cyber-tag mb-2 block w-fit">{project.category}</span>
            <h3 className="font-orbitron font-bold text-2xl text-white">{project.title}</h3>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <p style={{ color: 'var(--text-body)' }}>{project.description}</p>

          <div>
            <p className="section-label mb-3" style={{ fontSize: '0.6rem' }}>TECNOLOGÍAS</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => <span key={tag} className="cyber-tag">{tag}</span>)}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'PROBLEMA', value: project.problem, color: 'rgba(255,80,80,0.7)' },
              { label: 'SOLUCIÓN', value: project.solution, color: 'var(--neon-cyan)' },
              { label: 'RETOS', value: project.challenges, color: 'var(--neon-violet)' },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}20` }}>
                <p className="font-orbitron text-xs mb-2" style={{ color, fontSize: '0.6rem', letterSpacing: '0.2em' }}>{label}</p>
                <p className="font-mono-jb text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cyber-btn flex-1 text-center">
                <span className="flex items-center justify-center gap-2">
                  <ion-icon name="open-outline" />VER DEMO
                </span>
              </a>
            ) : (
              <div className="cyber-btn cyber-btn-violet flex-1 text-center" style={{ opacity: 0.85, cursor: 'not-allowed' }}>
                <span className="flex items-center justify-center gap-2">
                  <ion-icon name="desktop-outline" />APP DE ESCRITORIO
                </span>
              </div>
            )}
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="cyber-btn cyber-btn-violet flex-1 text-center">
              <span className="flex items-center justify-center gap-2">
                <ion-icon name="logo-github" />CÓDIGO
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Fundido cinematográfico: opacidad + desenfoque + escala suave
const fadeVariants = {
  enter: { opacity: 0, scale: 0.965, filter: 'blur(10px)' },
  center: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 1.03, filter: 'blur(8px)' },
};

const Projects: React.FC = () => {
  const total = projects.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const touchX = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => {
      if (total === 0) return;
      setIndex(((i % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (total <= 1 || paused || selectedProject) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next, paused, total, selectedProject]);

  if (total === 0) {
    return (
      <section id="projects" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
        <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-10">
            <p className="section-label mb-3">// PROYECTOS</p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white mb-3">
              MI TRABAJO<span className="neon-text">.</span>
            </h2>
            <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-10 text-center"
          >
            <ion-icon name="albums-outline" style={{ fontSize: '44px', color: 'var(--neon-cyan)' }} />
            <h3 className="font-orbitron font-bold text-lg text-white mt-4">Proyectos actualizándose...</h3>
            <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
              Estoy actualizando mi portafolio con los proyectos más recientes. Muy pronto podrás explorarlos aquí.
            </p>
            <a href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="cyber-btn inline-flex items-center gap-2 mt-6">
              <ion-icon name="chatbubble-ellipses-outline" />CONTÁCTAME
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  const current = projects[index];

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label mb-3">// PROYECTOS</p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white mb-3">
              MI TRABAJO<span className="neon-text">.</span>
            </h2>
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
            <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>
              Explora mis proyectos en este carrusel automático. Resultados reales para negocios reales.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="cyber-tag flex items-center gap-1.5">
              <ion-icon name="sync-outline" style={{ color: 'var(--neon-cyan)' }} />
              AUTOMÁTICO
            </span>
            <span className="font-mono-jb text-xs" style={{ color: 'var(--text-muted)' }}>
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </motion.div>

        {/* Carrusel */}
        <div
          role="region"
          aria-roledescription="carrusel"
          aria-label="Proyectos destacados"
          className="relative h-[560px] sm:h-[500px] md:h-[480px] lg:h-[460px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            if (touchX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(delta) > 48) (delta < 0 ? next() : prev());
            touchX.current = null;
          }}
        >
          {/* Glow trasero para dar profundidad */}
          <div className="absolute -inset-4 -z-0 pointer-events-none"
            style={{ background: 'radial-gradient(55% 70% at 50% 50%, rgba(56,189,248,0.12), transparent 70%)', filter: 'blur(30px)' }} />

          <AnimatePresence initial={false}>
            <motion.div
              key={current.title}
              variants={fadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <ProjectSlide project={current} onOpen={() => setSelectedProject(current)} />
            </motion.div>
          </AnimatePresence>

          {/* Flechas */}
          <button
            onClick={prev}
            aria-label="Proyecto anterior"
            className="absolute top-1/2 -translate-y-1/2 left-3 z-20 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full glass-card transition-all duration-300"
            style={{ border: '1px solid rgba(56,189,248,0.35)', color: 'var(--neon-cyan)', background: 'rgba(5,8,15,0.55)', boxShadow: '0 6px 20px rgba(2,6,23,0.4)' }}
          >
            <ion-icon name="chevron-back" />
          </button>
          <button
            onClick={next}
            aria-label="Proyecto siguiente"
            className="absolute top-1/2 -translate-y-1/2 right-3 z-20 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full glass-card transition-all duration-300"
            style={{ border: '1px solid rgba(56,189,248,0.35)', color: 'var(--neon-cyan)', background: 'rgba(5,8,15,0.55)', boxShadow: '0 6px 20px rgba(2,6,23,0.4)' }}
          >
            <ion-icon name="chevron-forward" />
          </button>

          {/* Barra de progreso del autoplay */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-40 h-0.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(148,163,184,0.18)' }}>
            <div
              key={index}
              className="h-full"
              style={{
                background: 'linear-gradient(to right, var(--neon-cyan), var(--neon-violet))',
                animation: `carousel-progress ${AUTOPLAY_MS}ms linear forwards`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
            />
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => goTo(i)}
              aria-label={`Ir al proyecto ${i + 1}`}
              aria-current={i === index}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 28 : 8,
                background: i === index ? 'var(--neon-cyan)' : 'rgba(148,163,184,0.28)',
                boxShadow: i === index ? '0 0 12px rgba(56,189,248,0.5)' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;