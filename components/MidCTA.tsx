import React from 'react'
import { SITE } from '../config/site'
import Reveal from './Reveal'
import Magnetic from './Magnetic'

const MidCTA: React.FC = () => (
  <section className="py-16 relative overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
    <div className="absolute inset-x-0 top-0 mx-auto w-full max-w-3xl h-px"
      style={{ background: 'linear-gradient(to right, transparent, var(--neon-cyan), transparent)' }} />
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(600px 200px at 50% 50%, rgba(56,189,248,0.06), transparent 70%)' }} />

    <Reveal className="container mx-auto px-5 sm:px-8 text-center relative z-10">
      <p className="section-label mb-4">// LISTO PARA EMPEZAR</p>
      <h2 className="font-orbitron font-bold text-2xl sm:text-4xl text-white mb-3">
        Convierte el proceso de tu negocio en<span className="neon-text"> software real</span>
      </h2>
      <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--text-body)', fontFamily: "'Inter', sans-serif" }}>
        Cuéntame tu necesidad por WhatsApp y recibe una propuesta clara. Sin compromiso, respondo en menos de 24 horas.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <Magnetic strength={12} radius={240}>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="cyber-btn">
            <span className="flex items-center gap-2">
              <ion-icon name="logo-whatsapp" style={{ fontSize: '15px' } as React.CSSProperties} />
              INICIAR PROYECTO
            </span>
          </a>
        </Magnetic>
      </div>
    </Reveal>
  </section>
)

export default MidCTA