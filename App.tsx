import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import MidCTA from './components/MidCTA';
import Services from './components/Services';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import LoadingScreen from './components/LoadingScreen';
import WhatsAppFloat from './components/WhatsAppFloat';
import { ErrorBoundary } from './components/ErrorBoundary';

type Theme = 'dark' | 'light';

// Divisor visual entre secciones — transición intencional, no abrupta
const Divider: React.FC = () => (
  <div className="section-divider" aria-hidden="true" />
);

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('jt-theme') : null;
    if (saved === 'light') return false;
    if (saved === 'dark') return true;
    return true; // Por defecto dark (identidad visual neon)
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const theme: Theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('jt-theme', theme);
    const root = document.documentElement;
    root.classList.toggle('dark', isDarkMode);
    root.classList.toggle('light', !isDarkMode);
    root.style.colorScheme = theme;
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(d => !d);

  useEffect(() => {
    document.querySelectorAll('ion-icon').forEach(icon => icon.setAttribute('aria-hidden', 'true'));
  }, []);

  return (
    <ErrorBoundary>
      <LoadingScreen onDone={() => setLoading(false)} />
      {!loading && (
        <div className="app-theme" style={{ background: 'var(--dark-bg)', color: 'var(--text-primary)' }}>
          <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <main role="main" aria-label="Contenido principal">
            <Hero isDarkMode={isDarkMode} />
            <Divider />
            <About />
            <Divider />
            <Projects />
            <MidCTA />
            <Divider />
            <Services />
            <Process />
            <Divider />
            <Testimonials />
            <Divider />
            <Skills />
            <Experience />
            <Certifications />
            <Divider />
            <Faq />
            <Divider />
            <Contact />
          </main>
          <Footer />
          <BackToTopButton />
          <WhatsAppFloat />
        </div>
      )}
    </ErrorBoundary>
  );
};

export default App;
