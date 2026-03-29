import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '../config/site';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Reduced to 5 key nav items — less cognitive load
const navLinks = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#services', label: 'Servicios' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#contact', label: 'Contacto' },
];

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

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
      setIsScrolled(window.scrollY > 20);
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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? 'rgba(2,4,8,0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0,245,255,0.08)' : '1px solid transparent',
      }}
    >
      {/* Scroll progress */}
      <div className="absolute bottom-0 left-0 h-px"
        style={{ width: `${scrollProgress}%`, background: 'linear-gradient(to right, var(--neon-cyan), var(--neon-violet))', transition: 'width 0.1s linear' }} />

      <div className="container mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')}
          className="font-orbitron font-black text-xl neon-text tracking-widest flex-shrink-0"
          aria-label="Jordan Talledo - Inicio">
          JT<span style={{ color: 'var(--neon-violet)' }}>.</span>
        </a>

        {/* Desktop nav — clean, no numbers */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-sm font-medium transition-colors duration-200"
              style={{
                color: activeSection === link.href ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.5)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              aria-current={activeSection === link.href ? 'page' : undefined}
            >
              {link.label}
              {activeSection === link.href && (
                <motion.div layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: 'var(--neon-cyan)' }} />
              )}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* CTA button — visible en desktop */}
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              background: 'rgba(0,245,255,0.08)',
              border: '1px solid rgba(0,245,255,0.25)',
              color: 'var(--neon-cyan)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            aria-label="Contratar a Jordan Talledo">
            <ion-icon name="logo-whatsapp" style={{ fontSize: '14px' } as React.CSSProperties} />
            Contratar
          </a>

          {/* Mobile menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ border: '1px solid rgba(0,245,255,0.2)', background: 'rgba(0,245,255,0.05)' }}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            <ion-icon
              name={isMenuOpen ? 'close-outline' : 'menu-outline'}
              style={{ fontSize: '20px', color: 'var(--neon-cyan)' } as React.CSSProperties}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — full screen, large touch targets */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(2,4,8,0.98)', borderBottom: '1px solid rgba(0,245,255,0.08)' }}
          >
            <nav className="flex flex-col px-5 py-4" aria-label="Menú móvil">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between py-4 text-base font-medium border-b"
                  style={{
                    color: activeSection === link.href ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.65)',
                    borderColor: 'rgba(255,255,255,0.06)',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <span style={{ color: 'var(--neon-cyan)', fontSize: '10px' }}>●</span>
                  )}
                </a>
              ))}
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium"
                style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.25)', color: 'var(--neon-cyan)', fontFamily: "'Space Grotesk', sans-serif" }}>
                <ion-icon name="logo-whatsapp" style={{ fontSize: '16px' } as React.CSSProperties} />
                Contratar ahora
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
