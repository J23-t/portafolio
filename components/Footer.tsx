import React from 'react';
import { SITE } from '../config/site';

const navLinks = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#services', label: 'Servicios' },
  { href: '#testimonials', label: 'Testimonios' },
  { href: '#contact', label: 'Contacto' },
];

const Footer: React.FC = () => {
  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--dark-surface)', borderTop: '1px solid rgba(148,163,184,0.1)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--neon-cyan), transparent)' }} />

      <div className="container mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand + descripción */}
          <div>
            <span className="font-orbitron font-bold text-2xl text-white block mb-3">
              Jordan<span className="neon-text">T</span>
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>
              Desarrollador Web Full Stack en Lima, Perú. Construyo sistemas de gestión empresarial, software para
              restaurantes y aplicaciones web a medida con Next.js, React, Node.js, Firebase y MongoDB.
            </p>
          </div>

          {/* Nav rápida */}
          <div>
            <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: 'var(--text-faint)', fontFamily: "'Inter', sans-serif" }}>
              Navegación
            </p>
            <div className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} onClick={scrollTo(href)}
                  className="block text-sm transition-colors duration-200"
                  style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--neon-cyan)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto directo */}
          <div>
            <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: 'var(--text-faint)', fontFamily: "'Inter', sans-serif" }}>
              Contacto
            </p>
            <div className="space-y-2.5">
              <a href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--neon-cyan)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
                <ion-icon name="mail-outline" style={{ fontSize: '14px', color: 'var(--neon-cyan)', flexShrink: 0 } as React.CSSProperties} />
                <span className="truncate">{SITE.email}</span>
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--neon-green)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
                <ion-icon name="logo-whatsapp" style={{ fontSize: '14px', color: 'var(--neon-green)', flexShrink: 0 } as React.CSSProperties} />
                {SITE.phone}
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { href: SITE.github, icon: 'logo-github', label: 'GitHub', color: 'var(--text-strong)', bg: 'rgba(56,189,248,0.06)' },
                { href: SITE.linkedin, icon: 'logo-linkedin', label: 'LinkedIn', color: 'var(--neon-cyan)', bg: 'rgba(56,189,248,0.08)' },
                { href: SITE.whatsapp, icon: 'logo-whatsapp', label: 'WhatsApp', color: 'var(--neon-green)', bg: 'rgba(52,211,153,0.08)' },
                { href: `mailto:${SITE.email}`, icon: 'mail-outline', label: 'Email', color: 'var(--neon-violet)', bg: 'rgba(129,140,248,0.08)' },
              ].map(({ href, icon, label, color, bg }) => (
                <a key={label} href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid rgba(148,163,184,0.14)', background: bg, color }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = color; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.14)'; }}
                >
                  <ion-icon name={icon} style={{ fontSize: '16px' } as React.CSSProperties} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: '1px solid rgba(148,163,184,0.08)' }}>
          <p className="text-xs" style={{ color: 'var(--text-faint)', fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} Jordan Enrique Talledo Salazar · Lima, Perú
          </p>
          <p className="text-xs" style={{ color: 'var(--text-faint)', fontFamily: "'Inter', sans-serif" }}>
            Construido con React + Next.js + Firebase
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;