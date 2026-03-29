import React, { useState } from 'react';
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
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import LoadingScreen from './components/LoadingScreen';
import WhatsAppFloat from './components/WhatsAppFloat';
import { ErrorBoundary } from './components/ErrorBoundary';

// Divisor visual entre secciones — transición intencional, no abrupta
const Divider: React.FC = () => (
  <div className="section-divider" aria-hidden="true" />
);

const App: React.FC = () => {
  const [isDarkMode] = React.useState(true);
  const [loading, setLoading] = useState(true);
  const toggleTheme = () => {};

  return (
    <ErrorBoundary>
      <LoadingScreen onDone={() => setLoading(false)} />
      {!loading && (
        <div style={{ background: 'var(--dark-bg)', color: 'rgba(255,255,255,0.8)' }}>
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
