import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
import { projectsSchema, breadcrumbSchema } from './components/SEO';

const Divider: React.FC = () => (
  <div className="section-divider" aria-hidden="true" />
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  }, []);

  useEffect(() => {
    document.querySelectorAll('ion-icon').forEach(icon => icon.setAttribute('aria-hidden', 'true'));
  }, []);

  return (
    <ErrorBoundary>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(projectsSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <LoadingScreen onDone={() => setLoading(false)} />
      {!loading && (
        <div className="app-theme" style={{ background: 'var(--dark-bg)', color: 'var(--text-primary)' }}>
          <Header />
          <main role="main" aria-label="Contenido principal">
            <Hero />
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
