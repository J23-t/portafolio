import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '../config/site';

interface HeaderProps {}

const navLinks = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#services', label: 'Servicios' },
  { href: '#testimonials', label: 'Testimonios' },
  { href: '#contact', label: 'Contacto' },
];

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const lastY = useRef(0);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      const pos = window.scrollY + window.innerHeight / 3;
      for (const link of navLinks) {
        const el = document.querySelector(link.href) as HTMLElement | null;
        if (el && el.offsetTop <= pos && el.offsetTop + el.offsetHeight > pos) {
          setActiveSection(link.href);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 240 && !isMenuOpen) setIsHidden(true);
      else if (y < lastY.current || y <= 240) setIsHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? 'var(--header-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(18px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(148,163,184,0.1)' : '1px solid transparent',
        transform: isHidden ? 'translateY(-110%)' : 'translateY(0)',
      }}
    >
      {/* Scroll progress */}
      <div className="absolute bottom-0 left-0 h-[2px] rounded-r-full"
        style={{ width: `${scrollProgress}%`, background: 'linear-gradient(to right, var(--neon-cyan), var(--neon-violet))', transition: 'width 0.1s linear' }} />

      <div className="container mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-baseline gap-0.5 flex-shrink-0"
          aria-label="Jordan Talledo - Inicio">
          <span className="font-orbitron font-bold text-2xl text-white" style={{ letterSpacing: '-0.02em' }}>
            Jordan<span className="neon-text">T</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative nav-link text-sm"
              style={{
                color: activeSection === link.href ? 'var(--neon-cyan)' : 'var(--text-muted)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: activeSection === link.href ? 600 : 500,
              }}
              aria-current={activeSection === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          {/* CTA — desktop */}
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(56,189,248,0.14), rgba(129,140,248,0.14))',
              border: '1px solid rgba(56,189,248,0.35)',
              color: 'var(--neon-cyan)',
              fontFamily: "'Inter', sans-serif",
            }}
            aria-label="Contratar a Jordan Talledo">
            <ion-icon name="logo-whatsapp" style={{ fontSize: '14px' } as React.CSSProperties} />
            Contratar
          </a>

          {/* CV — desktop */}
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
            style={{
              background: 'rgba(148,163,184,0.06)',
              border: '1px solid rgba(148,163,184,0.18)',
              color: 'var(--text-strong)',
              fontFamily: "'Inter', sans-serif",
            }}
            aria-label="Ver currículum de Jordan Talledo">
            <ion-icon name="document-text-outline" style={{ fontSize: '14px' } as React.CSSProperties} />
            CV
          </a>

          {/* Mobile menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl"
            style={{ border: '1px solid rgba(148,163,184,0.18)', background: 'rgba(148,163,184,0.06)' }}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            <ion-icon
              name={isMenuOpen ? 'close-outline' : 'menu-outline'}
              style={{ fontSize: '20px', color: 'var(--text-strong)' } as React.CSSProperties}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'var(--mobile-menu-bg)', borderBottom: '1px solid rgba(148,163,184,0.1)' }}
          >
            <nav className="flex flex-col px-5 py-4" aria-label="Menú móvil">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between py-4 text-base font-medium border-b"
                  style={{
                    color: activeSection === link.href ? 'var(--neon-cyan)' : 'var(--text-strong)',
                    borderColor: 'rgba(148,163,184,0.08)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <span style={{ color: 'var(--neon-cyan)', fontSize: '10px' }}>●</span>
                  )}
                </a>
              ))}
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.4)', color: 'var(--neon-cyan)', fontFamily: "'Inter', sans-serif" }}>
                <ion-icon name="logo-whatsapp" style={{ fontSize: '16px' } as React.CSSProperties} />
                Contratar ahora
              </a>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.18)', color: 'var(--text-strong)', fontFamily: "'Inter', sans-serif" }}>
                <ion-icon name="document-text-outline" style={{ fontSize: '16px' } as React.CSSProperties} />
                Ver CV
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;