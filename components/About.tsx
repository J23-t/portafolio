import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: 2, suffix: '+', label: 'Años de experiencia', color: 'var(--neon-cyan)' },
  { value: 10, suffix: '+', label: 'Proyectos entregados', color: 'var(--neon-violet)' },
  { value: 4, suffix: '', label: 'Certificaciones', color: 'var(--neon-green)' },
  { value: 100, suffix: '%', label: 'Clientes satisfechos', color: 'var(--neon-cyan)' },
];

// Datos personales que humanizan el perfil
const personalFacts = [
  { icon: 'location-outline', text: 'Lima, Perú 🇵🇪' },
  { icon: 'school-outline', text: 'Técnico en Desarrollo de Sistemas de Información' },
  { icon: 'heart-outline', text: 'Apasionado por el diseño y el código' },
  { icon: 'rocket-outline', text: 'Siempre aprendiendo algo nuevo' },
];

// Clip-path hexagonal para la foto
const HEX_CLIP = 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)';

const About: React.FC = () => {
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0 });

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-surface)' }}>
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-14">
          <p className="section-label mb-3">// SOBRE MÍ</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">QUIÉN SOY<span className="neon-text">.</span></h2>
          <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: texto humanizado */}
          <motion.div className="space-y-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            {/* Historia específica — no genérica */}
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Soy <span className="font-semibold neon-text">Jordan Talledo</span>, desarrollador web de Lima, Perú.
              A los 18 años construí mi primer proyecto real — una tienda online para una ferretería local que no tenía presencia digital.
              Ese proyecto me enseñó que el código bien hecho cambia negocios reales.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Hoy me especializo en{' '}
              <span className="font-mono-jb" style={{ color: 'var(--neon-cyan)' }}>Next.js</span>,{' '}
              <span className="font-mono-jb" style={{ color: 'var(--neon-cyan)' }}>Firebase</span> y{' '}
              <span className="font-mono-jb" style={{ color: 'var(--neon-cyan)' }}>SQL Server</span>{' '}
              para construir aplicaciones que la gente realmente usa. Cada proyecto que entrego tiene que funcionar bien, verse bien y resolver un problema real.
            </p>

            {/* Datos personales — humaniza el perfil */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {personalFacts.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                    style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.15)', color: 'var(--neon-cyan)' }}>
                    <ion-icon name={icon} />
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Space Grotesk', sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3 pt-2">
              {stats.map(({ value, suffix, label, color }) => (
                <div key={label} className="glass-card rounded-xl p-4 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />
                  <p className="font-orbitron font-bold text-2xl sm:text-3xl" style={{ color }}>
                    {statsInView ? <CountUp end={value} duration={1.8} suffix={suffix} /> : <span>0{suffix}</span>}
                  </p>
                  <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Grotesk', sans-serif" }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: foto hexagonal + disponibilidad */}
          <motion.div className="flex flex-col items-center gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            {/* Foto con clip-path hexagonal — único, no circular genérico */}
            <div className="relative flex items-center justify-center">
              {/* Glow de fondo */}
              <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--neon-cyan), transparent 70%)', filter: 'blur(30px)' }} />

              {/* Hexágono exterior — borde animado */}
              <motion.div
                className="absolute"
                style={{
                  width: '300px', height: '300px',
                  clipPath: HEX_CLIP,
                  background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))',
                  padding: '3px',
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div style={{ width: '100%', height: '100%', clipPath: HEX_CLIP, background: 'var(--dark-surface)' }} />
              </motion.div>

              {/* Foto */}
              <div style={{ width: '280px', height: '280px', clipPath: HEX_CLIP, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                <img
                  src="foto/perfil.png"
                  alt="Jordan Talledo - Desarrollador Full Stack en Lima, Perú"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  loading="lazy" width="280" height="280"
                />
              </div>

              {/* Badge disponible */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full glass-card whitespace-nowrap z-20"
                style={{ border: '1px solid rgba(0,255,136,0.3)' }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--neon-green)', boxShadow: '0 0 6px var(--neon-green)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--neon-green)', fontFamily: "'Space Grotesk', sans-serif" }}>Disponible para proyectos</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
