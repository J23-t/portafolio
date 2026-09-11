import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skillGroups, type Skill } from '../data/skills';
import ShimmerCard from './ShimmerCard';
import Reveal from './Reveal';
import BootstrapIcon from './BootstrapIcon';

const levelColors: Record<string, string> = {
  'Intermedio': 'var(--neon-violet)',
  'Básico': '#fbbf24',
};

const cardAccents = [
  { color: 'var(--neon-cyan)', glow: 'rgba(34,211,238,0.55)', grad: 'linear-gradient(to right, #0ea5e9, #22d3ee)' },
  { color: 'var(--neon-violet)', glow: 'rgba(167,139,250,0.55)', grad: 'linear-gradient(to right, #8b5cf6, #c084fc)' },
];

const SkillCard: React.FC<{ skill: Skill; inView: boolean; delay: number; accent: (typeof cardAccents)[number] }> = ({ skill, inView, delay, accent }) => {
  const levelColor = levelColors[skill.label];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <ShimmerCard className="glass-card rounded-xl p-5 group skill-card">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl flex-shrink-0 flex items-center justify-center" style={{ color: accent.color, width: 28, height: 28 }}>
            {skill.svg
              ? <BootstrapIcon size={26} />
              : <ion-icon name={skill.icon} />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{skill.name}</p>
            <p className="text-xs" style={{ color: levelColor, fontFamily: "'Inter', sans-serif" }}>{skill.label}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[0.6rem] font-mono-jb tracking-widest" style={{ color: 'var(--text-faint)' }}>DOMINIO</span>
          <span className="font-orbitron text-sm font-bold" style={{ color: accent.color, textShadow: `0 0 12px ${accent.glow}` }}>{skill.level}%</span>
        </div>

        <div className="relative mt-1.5 h-2 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <motion.div
            className="relative h-full rounded-full"
            style={{ background: accent.grad, boxShadow: `0 0 10px ${accent.glow}` }}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${skill.level}%` : 0 }}
            transition={{ duration: 0.9, delay, ease: 'easeOut' }}
          >
            <span
              className="absolute top-1/2 right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 0 6px rgba(255,255,255,0.9)' }}
            />
          </motion.div>
        </div>
      </ShimmerCard>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <Reveal className="mb-12">
          <p className="section-label mb-3">// TECNOLOGÍAS</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">TECH STACK<span className="neon-text">.</span></h2>
          <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
          <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
            Las tecnologías que uso para construir sitios, aplicaciones y sistemas: lenguajes, frontend, backend, datos, móvil e IA.
          </p>
        </Reveal>

        <div ref={ref} className="space-y-12">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-9 h-9 flex items-center justify-center rounded-lg glass-card"
                  style={{ border: '1px solid rgba(56,189,248,0.3)', color: 'var(--neon-cyan)' }}>
                  <ion-icon name={group.icon} style={{ fontSize: '18px' } as React.CSSProperties} />
                </span>
                <div>
                  <p className="font-orbitron font-bold text-sm text-white tracking-wide">{group.label}</p>
                  <p className="text-[0.62rem] font-mono-jb tracking-widest" style={{ color: 'var(--text-faint)' }}>
                    {group.skills.length} TECNOLOGÍA{group.skills.length !== 1 ? 'S' : ''}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} inView={inView} delay={i * 0.05} accent={cardAccents[i % 2]} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;