import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

type ProjectType = typeof projects[0];

// Full-screen project modal
const ProjectModal: React.FC<{ project: ProjectType; onClose: () => void }> = ({ project, onClose }) => {
  // Escape key + body scroll lock
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
      style={{ background: 'rgba(2,4,8,0.95)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="glass-card rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        style={{ border: '1px solid rgba(0,245,255,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative h-56 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,13,20,1) 0%, rgba(6,13,20,0.5) 50%, transparent 100%)' }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--neon-cyan), transparent)' }} />

          {/* Close */}
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center glass-card rounded-lg"
            aria-label="Cerrar modal"
            style={{ border: '1px solid rgba(0,245,255,0.3)' }}>
            <ion-icon name="close-outline" style={{ color: 'var(--neon-cyan)', fontSize: '18px' } as React.CSSProperties} />
          </button>

          <div className="absolute bottom-4 left-6">
            <span className="cyber-tag mb-2 block w-fit">{project.category}</span>
            <h2 className="font-orbitron font-bold text-2xl text-white">{project.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>{project.description}</p>

          {/* Tech */}
          <div>
            <p className="section-label mb-3" style={{ fontSize: '0.6rem' }}>TECNOLOGÍAS</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => <span key={tag} className="cyber-tag">{tag}</span>)}
            </div>
          </div>

          {/* Details grid */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'PROBLEMA', value: project.problem, color: 'rgba(255,80,80,0.7)' },
              { label: 'SOLUCIÓN', value: project.solution, color: 'var(--neon-cyan)' },
              { label: 'RETOS', value: project.challenges, color: 'var(--neon-violet)' },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}20` }}>
                <p className="font-orbitron text-xs mb-2" style={{ color, fontSize: '0.6rem', letterSpacing: '0.2em' }}>{label}</p>
                <p className="font-mono-jb text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cyber-btn flex-1 text-center">
              <span className="flex items-center justify-center gap-2">
                <ion-icon name="open-outline" />VER DEMO
              </span>
            </a>
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

const ProjectCard: React.FC<{ project: ProjectType; index: number; onOpen: () => void }> = ({ project, index, onOpen }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) await navigator.share({ title: project.title, url: project.liveUrl });
      else { await navigator.clipboard.writeText(project.liveUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass-card rounded-xl overflow-hidden flex flex-col group cursor-pointer project-card"
      onClick={onOpen}    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <motion.img
          src={project.image} alt={project.title}
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }}
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,4,8,0.97) 0%, rgba(2,4,8,0.3) 60%, transparent 100%)' }} />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'rgba(0,245,255,0.05)' }}
        >
          <div className="font-orbitron text-xs tracking-widest px-4 py-2 rounded"
            style={{ border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)', background: 'rgba(0,245,255,0.1)' }}>
            VER DETALLES
          </div>
        </motion.div>

        <div className="absolute top-3 left-3 z-10">
          <span className="cyber-tag">{project.category}</span>
        </div>

        <div className="absolute bottom-3 left-4 z-10">
          <h3 className="font-orbitron font-bold text-base text-white">{project.title}</h3>
          {/* Impacto del proyecto — más convincente que solo el tech stack */}
          {'impact' in project && (project as any).impact && (
            <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--neon-green)', fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--neon-green)' }} />
              {(project as any).impact}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm leading-relaxed mb-4 flex-grow" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag, i) => <span key={i} className="cyber-tag">{tag}</span>)}
          {project.tags.length > 3 && (
            <span className="cyber-tag" style={{ color: 'rgba(255,255,255,0.35)', borderColor: 'rgba(255,255,255,0.1)', background: 'transparent' }}>+{project.tags.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(0,245,255,0.07)' }}>
          <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="text-xl transition-all duration-300 hover:neon-text"
              style={{ color: 'rgba(255,255,255,0.35)' }} aria-label="GitHub">
              <ion-icon name="logo-github" />
            </a>
            <div className="relative">
              <button onClick={handleShare} className="text-xl transition-all duration-300 hover:neon-text"
                style={{ color: 'rgba(255,255,255,0.35)' }} aria-label="Compartir">
                <ion-icon name="share-social-outline" />
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded font-mono-jb text-xs whitespace-nowrap"
                    style={{ background: 'var(--dark-card)', border: '1px solid rgba(0,245,255,0.3)', color: 'var(--neon-cyan)' }}>
                    Copiado
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            className="cyber-btn flex items-center gap-1.5"
            style={{ padding: '5px 14px', fontSize: '0.58rem' }}>
            <ion-icon name="open-outline" />DEMO
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const categories = ['Todos', ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = filter === 'Todos' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-10">
          <p className="section-label mb-3">// PROYECTOS</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white mb-3">
            MI TRABAJO<span className="neon-text">.</span>
          </h2>
          <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
          <p className="mt-4 text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Grotesk', sans-serif" }}>
            Aplicaciones reales construidas para clientes reales.
          </p>
        </motion.div>

        {/* Filter — scroll horizontal en mobile */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className="text-xs font-medium px-4 py-2 rounded-lg flex-shrink-0 transition-all duration-200"
              style={{
                border: `1px solid ${filter === cat ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.12)'}`,
                color: filter === cat ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.5)',
                background: filter === cat ? 'rgba(0,245,255,0.06)' : 'transparent',
                fontFamily: "'Space Grotesk', sans-serif",
                whiteSpace: 'nowrap',
              }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} onOpen={() => setSelectedProject(project)} />
            ))}
          </AnimatePresence>
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
