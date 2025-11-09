import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// FIX: To resolve 'ion-icon' type errors, the namespace for JSX intrinsic elements was updated to `React.JSX`.
// This is necessary for modern React projects using the automatic JSX runtime.
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name?: string;
      };
    }
  }
}

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { href: '#about', label: 'Sobre mí' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#experience', label: 'Experiencia' },
    { href: '#certifications', label: 'Certificados' },
    { href: '#testimonials', label: 'Testimonios' },
    { href: '#contact', label: 'Contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const sections = navLinks.map(link => document.querySelector(link.href));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSectionId = '';

      for (const section of sections) {
        if (section) {
          const element = section as HTMLElement;
          if (element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
            currentSectionId = `#${element.id}`;
            break;
          }
        }
      }
      
      const homeElement = document.querySelector('#home') as HTMLElement;
      if (homeElement && homeElement.offsetTop <= scrollPosition && homeElement.offsetTop + homeElement.offsetHeight > scrollPosition) {
          currentSectionId = '#home';
      }


      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        currentSectionId = navLinks[navLinks.length - 1].href;
      }

      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinkItems = () => (
    <>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleNavClick(e, link.href)}
          className={`px-4 py-2 hover:text-cyan-400 transition-colors duration-300 ${activeSection === link.href ? 'text-cyan-400 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-50/90 dark:bg-[#0a192f]/90 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-700/50' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <motion.a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')} 
          className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent hover:from-cyan-400 hover:to-blue-400 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          JT
        </motion.a>
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <NavLinkItems />
        </nav>
        <div className="flex items-center">
          <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 focus:outline-none transition-colors duration-300">
            {/* FIX: Replaced `class` with `className` to align with React standards for JSX. */}
            {/* FIX: Changed to self-closing tag for ion-icon */}
            {isDarkMode ? <ion-icon name="moon-outline" className="text-2xl" /> : <ion-icon name="sunny-outline" className="text-2xl" />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 md:hidden text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400">
            {/* FIX: Replaced `class` with `className` to align with React standards for JSX. */}
            {/* FIX: Changed to self-closing tag for ion-icon */}
            <ion-icon name={isMenuOpen ? "close-outline" : "menu-outline"} className="text-3xl" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-slate-50/95 dark:bg-[#0a192f]/95 backdrop-blur-lg py-6 border-t border-slate-200 dark:border-slate-700 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col items-center space-y-3">
            <NavLinkItems />
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;