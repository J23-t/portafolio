import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const mainSkills = [
  { name: 'Next.js', icon: 'layers-outline', level: 'Experto', projects: 10, color: 'var(--neon-cyan)', pct: 95, desc: 'Framework principal para todos mis proyectos' },
  { name: 'React', icon: 'logo-react', level: 'Experto', projects: 10, color: 'var(--neon-cyan)', pct: 95, desc: 'Base de todos mis frontends' },
  { name: 'Firebase', icon: 'logo-firebase', level: 'Experto', projects: 8, color: 'var(--neon-cyan)', pct: 90, desc: 'Auth, Firestore, Storage, Functions' },
  { name: 'Tailwind CSS', icon: 'terminal-outline', level: 'Experto', projects: 10, color: 'var(--neon-cyan)', pct: 92, desc: 'Estilos rápidos y consistentes' },
  { name: 'TypeScript', icon: 'code-slash-outline', level: 'Avanzado', projects: 7, color: 'var(--neon-violet)', pct: 80, desc: 'Tipado estático en todos los proyectos' },
  { name: 'Node.js', icon: 'logo-nodejs', level: 'Avanzado', projects: 5, color: 'var(--neon-violet)', pct: 75, desc: 'APIs y lógica de servidor' },
  { name: 'SQL Server', icon: 'server-outline', level: 'Avanzado', projects: 4, color: 'var(--neon-violet)', pct: 72, desc: 'Bases de datos relacionales' },
  { name: 'Git & GitHub', icon: 'logo-github', level: 'Avanzado', projects: 10, color: 'var(--neon-violet)', pct: 85, desc: 'Control de versiones en todos los proyectos' },
];

const levelColors: Record<string, string> = {
  'Experto': 'var(--neon-cyan)',
  'Avanzado': 'var(--neon-green)',
  'Intermedio': 'var(--neon-violet)',
};

const SkillBar: React.FC<{ pct: number; color: string; inView: boolean; delay: number }> = ({ pct, color, inView, delay }) => (
  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
    <motion.div
      className="h-full rounded-full"
      style={{ background: `linear-gradient(to right, ${color}, ${color}80)` }}
      initial={{ width: 0 }}
      animate={{ width: inView ? `${pct}%` : 0 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    />
  </div>
);

const Skills: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-surface)' }}>
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-12">
          <p className="section-label mb-3">// TECNOLOGÍAS</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">TECH STACK<span className="neon-text">.</span></h2>
          <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
          <p className="mt-4 text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Space Grotesk', sans-serif" }}>
            Las 8 tecnologías que uso en proyectos reales — no una lista de todo lo que he tocado.
          </p>
        </motion.div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mainSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-5 group skill-card"
            >
              {/* Icon + nombre */}
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl flex-shrink-0" style={{ color: skill.color }}>
                  <ion-icon name={skill.icon} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{skill.name}</p>
                  <p className="text-xs" style={{ color: levelColors[skill.level], fontFamily: "'Space Grotesk', sans-serif" }}>{skill.level}</p>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Space Grotesk', sans-serif" }}>
                {skill.desc}
              </p>

              {/* Barra de progreso */}
              <div className="mb-3">
                <SkillBar pct={skill.pct} color={skill.color} inView={inView} delay={i * 0.07 + 0.2} />
              </div>

              {/* Proyectos */}
              <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-1.5">
                  <ion-icon name="cube-outline" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' } as React.CSSProperties} />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Space Grotesk', sans-serif" }}>
                    {skill.projects} proyecto{skill.projects !== 1 ? 's' : ''}
                  </span>
                </div>
                <span className="font-mono-jb text-xs" style={{ color: skill.color, opacity: 0.7 }}>{skill.pct}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
