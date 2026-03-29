import React from 'react';
import { SITE } from '../config/site';

const navLinks = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#services', label: 'Servicios' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#contact', label: 'Contacto' },
];

const Footer: React.FC = () => {
  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--dark-surface)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Línea neon top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--neon-cyan), transparent)' }} />

      {/* Contenido principal */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand + descripción */}
          <div>
            <span className="font-orbitron font-black text-2xl neon-text block mb-3">JT.</span>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Grotesk', sans-serif" }}>
              Desarrollador Full Stack en Lima, Perú. Construyo aplicaciones web con Next.js, Firebase y SQL Server.
            </p>
          </div>

          {/* Nav rápida */}
          <div>
            <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk', sans-serif" }}>
              Navegación
            </p>
            <div className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} onClick={scrollTo(href)}
                  className="block text-sm transition-colors duration-200 hover:neon-text"
                  style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto directo */}
          <div>
            <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk', sans-serif" }}>
              Contacto
            </p>
            <div className="space-y-2.5">
              <a href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-sm transition-colors duration-200 hover:neon-text"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Space Grotesk', sans-serif" }}>
                <ion-icon name="mail-outline" style={{ fontSize: '14px', color: 'var(--neon-cyan)', flexShrink: 0 } as React.CSSProperties} />
                <span className="truncate">{SITE.email}</span>
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors duration-200 hover:neon-text"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Space Grotesk', sans-serif" }}>
                <ion-icon name="logo-whatsapp" style={{ fontSize: '14px', color: 'var(--neon-green)', flexShrink: 0 } as React.CSSProperties} />
                {SITE.phone}
              </a>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors duration-200 hover:neon-text"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Space Grotesk', sans-serif" }}>
                <ion-icon name="logo-github" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', flexShrink: 0 } as React.CSSProperties} />
                github.com/J23-t
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { href: SITE.github, icon: 'logo-github', label: 'GitHub', color: 'rgba(255,255,255,0.5)' },
                { href: SITE.whatsapp, icon: 'logo-whatsapp', label: 'WhatsApp', color: 'var(--neon-green)' },
                { href: `mailto:${SITE.email}`, icon: 'mail-outline', label: 'Email', color: 'var(--neon-cyan)' },
              ].map(({ href, icon, label, color }) => (
                <a key={label} href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = color; (e.currentTarget as HTMLElement).style.background = `${color}10`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
                >
                  <ion-icon name={icon} style={{ fontSize: '15px' } as React.CSSProperties} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'Space Grotesk', sans-serif" }}>
            © {new Date().getFullYear()} Jordan Enrique Talledo Salazar · Lima, Perú
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)', fontFamily: "'Space Grotesk', sans-serif" }}>
            Construido con React + Next.js + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
